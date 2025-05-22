import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import torch.nn.functional as F
import matplotlib.pyplot as plt
import numpy as np
import io
import base64
import cv2
from app.utils import apply_clahe


class CHDModel:
    def __init__(self, model_path: str, device: str = "cpu"):
        self.device = torch.device(device)

        # Model definition exactly as in predict.py
        self.model = models.resnet50(pretrained=False)
        self.model.fc = nn.Linear(self.model.fc.in_features, 4)
        self.model.load_state_dict(torch.load(model_path, map_location=self.device))
        self.model = self.model.to(self.device)
        self.model.eval()

        # Transform exactly as in predict.py
        self.transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])
        ])

        self.idx_to_class = {0: 'ASD', 1: 'Normal', 2: 'PDA', 3: 'VSD'}

    def _generate_gradcam(self, input_tensor, class_idx):
        gradients = []
        activations = []
        def backward_hook(module, grad_input, grad_output):
            gradients.append(grad_output[0].detach())
        def forward_hook(module, input, output):
            activations.append(output.detach())
        last_conv = self.model.layer4[-1].conv3
        handle_fw = last_conv.register_forward_hook(forward_hook)
        handle_bw = last_conv.register_backward_hook(backward_hook)
        output = self.model(input_tensor)
        self.model.zero_grad()
        one_hot = torch.zeros_like(output)
        one_hot[0, class_idx] = 1
        output.backward(gradient=one_hot)
        grads_val = gradients[0]
        acts_val = activations[0]
        weights = grads_val.mean(dim=[2, 3], keepdim=True)
        gradcam_map = (weights * acts_val).sum(dim=1, keepdim=True)
        gradcam_map = torch.relu(gradcam_map)
        gradcam_map = torch.nn.functional.interpolate(
            gradcam_map, size=(224, 224), mode="bilinear", align_corners=False
        )
        gradcam_map = gradcam_map.squeeze().cpu().numpy()
        gradcam_map = (gradcam_map - gradcam_map.min()) / (gradcam_map.max() - gradcam_map.min() + 1e-8)
        handle_fw.remove()
        handle_bw.remove()
        return gradcam_map

    def predict(self, image: Image.Image) -> dict:
        # Load and convert PIL to numpy RGB
        image_rgb = np.array(image.convert("RGB"))
        # Apply CLAHE as in predict.py
        clahe_img = apply_clahe(image_rgb)
        # Transform and predict
        input_tensor = self.transform(clahe_img).unsqueeze(0).to(self.device)
        with torch.no_grad():
            outputs = self.model(input_tensor)
            probs = torch.softmax(outputs, dim=1)
            confidence, predicted_class = torch.max(probs, 1)
        predicted_label = self.idx_to_class[predicted_class.item()]
        confidence_score = confidence.item() * 100
        # Grad-CAM (optional, keep as before)
        input_tensor.requires_grad_()
        gradcam_map = self._generate_gradcam(input_tensor, predicted_class.item())
        img_np = cv2.resize(clahe_img, (224, 224))
        heatmap = plt.get_cmap("jet")(gradcam_map)[:, :, :3]
        overlay = (0.5 * img_np / 255.0 + 0.5 * heatmap)
        overlay = np.clip(overlay, 0, 1)
        buf = io.BytesIO()
        plt.imsave(buf, overlay, format="png")
        buf.seek(0)
        img_bytes = buf.read()
        gradcam_b64 = base64.b64encode(img_bytes).decode("utf-8")
        return {
            "prediction": predicted_label,
            "confidence": round(confidence_score, 2),
            "gradcam": gradcam_b64
        }
