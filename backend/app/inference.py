import torch
import torch.nn as nn
import torchxrayvision as xrv
from torchvision import transforms
from PIL import Image
import torch.nn.functional as F


class CHDModel:
    def __init__(self, model_path: str, device: str = "cpu"):
        self.device = torch.device(device)

        # Rebuild the exact model architecture
        base_model = xrv.models.DenseNet(weights="densenet121-res224-all")
        self.model = nn.Sequential(
            base_model.features,
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(1024, 4)  # 4 classes: ASD, Normal, PDA, VSD
        )

        # Optional: freeze backbone
        for param in self.model[0].parameters():
            param.requires_grad = False

        # Load weights
        state_dict = torch.load(model_path, map_location=self.device)
        self.model.load_state_dict(state_dict)
        self.model.to(self.device)
        self.model.eval()

        # Image transform (for grayscale images)
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.5], [0.5]),
        ])

        self.idx_to_class = {0: 'ASD', 1: 'Normal', 2: 'PDA', 3: 'VSD'}

    def predict(self, image: Image.Image) -> dict:
        image = image.convert("L")
        tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            output = self.model(tensor)
            probabilities = F.softmax(output, dim=1)
            confidence, predicted_idx = torch.max(probabilities, dim=1)
        
        return {
            "prediction": self.idx_to_class[predicted_idx.item()],
            "confidence": round(confidence.item() * 100, 2)
        }
