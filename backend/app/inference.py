import torch
from torchvision import models
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import torch.nn.functional as F
import matplotlib.pyplot as plt
import numpy as np
import io
import base64


class CHDModel:
    def __init__(self, model_path: str, device: str = "cpu"):
        self.device = torch.device(device)

        # Rebuild the exact model architecture
        self.model = models.resnet50(pretrained=True)
        self.model.fc = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(self.model.fc.in_features, 4)
        )

        # Load weights
        state_dict = torch.load(model_path, map_location=self.device)
        self.model.load_state_dict(state_dict)
        self.model.to(self.device)
        self.model.eval()

        # Image transform (for grayscale images)
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.Grayscale(num_output_channels=3),
            transforms.ToTensor(),
            transforms.Normalize([0.5], [0.5])
        ])

        self.idx_to_class = {0: 'ASD', 1: 'Normal', 2: 'PDA', 3: 'VSD'}

    def _generate_gradcam(self, input_tensor, class_idx):
        # Hook the gradients of the last conv layer
        gradients = []
        activations = []
        def backward_hook(module, grad_input, grad_output):
            gradients.append(grad_output[0].detach())
        def forward_hook(module, input, output):
            activations.append(output.detach())
        # Get the last conv layer
        last_conv = self.model.layer4[-1].conv3
        handle_fw = last_conv.register_forward_hook(forward_hook)
        handle_bw = last_conv.register_backward_hook(backward_hook)
        # Forward
        output = self.model(input_tensor)
        # Zero grads
        self.model.zero_grad()
        # Backward with respect to the predicted class
        one_hot = torch.zeros_like(output)
        one_hot[0, class_idx] = 1
        output.backward(gradient=one_hot)
        # Get hooked gradients and activations
        grads_val = gradients[0]
        acts_val = activations[0]
        # Global average pooling of gradients
        weights = grads_val.mean(dim=[2, 3], keepdim=True)
        gradcam_map = (weights * acts_val).sum(dim=1, keepdim=True)
        gradcam_map = torch.relu(gradcam_map)
        gradcam_map = torch.nn.functional.interpolate(
            gradcam_map, size=(224, 224), mode="bilinear", align_corners=False
        )
        gradcam_map = gradcam_map.squeeze().cpu().numpy()
        gradcam_map = (gradcam_map - gradcam_map.min()) / (gradcam_map.max() - gradcam_map.min() + 1e-8)
        # Clean up hooks
        handle_fw.remove()
        handle_bw.remove()
        return gradcam_map

    def predict(self, image: Image.Image) -> dict:
        image = image.convert("L")
        tensor = self.transform(image).unsqueeze(0).to(self.device)
        with torch.no_grad():
            output = self.model(tensor)
            probabilities = F.softmax(output, dim=1)
            confidence, predicted_idx = torch.max(probabilities, dim=1)
        # Grad-CAM (run without torch.no_grad)
        tensor.requires_grad_()
        gradcam_map = self._generate_gradcam(tensor, predicted_idx.item())
        # Overlay heatmap on image
        img_np = np.array(image.resize((224, 224)).convert("RGB"))
        heatmap = plt.get_cmap("jet")(gradcam_map)[:, :, :3]
        overlay = (0.5 * img_np / 255.0 + 0.5 * heatmap)
        overlay = np.clip(overlay, 0, 1)
        # Save to buffer
        buf = io.BytesIO()
        plt.imsave(buf, overlay, format="png")
        buf.seek(0)
        img_bytes = buf.read()
        gradcam_b64 = base64.b64encode(img_bytes).decode("utf-8")
        return {
            "prediction": self.idx_to_class[predicted_idx.item()],
            "confidence": round(confidence.item() * 100, 2),
            "gradcam": gradcam_b64
        }
