import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">🧠 About the Model</h1>
        <p className="text-muted-foreground">
          Explore how our AI model helps detect Congenital Heart Disease from medical images.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>❤️ CHD Image Classification System</CardTitle>
          <CardDescription>
            Artificial Intelligence for Accurate and Early Detection of Congenital Heart Defects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-muted-foreground mb-2">
              Our CHD Image Classifier is an AI-powered tool designed to assist healthcare professionals in detecting congenital heart defects from pediatric chest X-rays. The system can classify the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Normal</li>
              <li>Atrial Septal Defect (ASD)</li>
              <li>Ventricular Septal Defect (VSD)</li>
              <li>Patent Ductus Arteriosus (PDA)</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              It provides predictions along with confidence scores, offering an assistive second opinion to guide diagnosis.
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">🧬 Model Architecture</h3>
            <p className="text-muted-foreground mb-2">
              The model uses a deep Convolutional Neural Network (CNN) tailored for medical imaging tasks:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><b>Backbone:</b> ResNet-50 pretrained on ImageNet, fine-tuned for CHD X-rays</li>
              <li><b>Input:</b> Single-channel grayscale X-ray images resized to 224×224</li>
              <li><b>Preprocessing:</b> CLAHE (Contrast Limited Adaptive Histogram Equalization) applied to enhance contrast</li>
              <li><b>Augmentations:</b> Rotation, flipping, brightness/contrast changes</li>
              <li><b>Loss Function:</b> Focal Loss with Label Smoothing for class imbalance handling</li>
              <li><b>Output Layer:</b> Four-class softmax classification head</li>
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">📁 Training Data & GAN Augmentation</h3>
            <p className="text-muted-foreground mb-2">
              To train a high-performing model despite limited real-world samples, we combined original and synthetic data:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li><b>Real Dataset:</b> 4,500+ labeled pediatric chest X-rays</li>
              <li><b>Classes Covered:</b> ASD, VSD, PDA, and Normal</li>
              <li><b>Synthetic Samples:</b> Trained <b>Generative Adversarial Networks (GANs)</b> to produce high-quality, class-specific chest X-ray images to augment rare conditions like PDA and ASD.</li>
              <li><b>Data Split:</b>
                <ul className="list-disc pl-6 space-y-1">
                  <li>70% Training</li>
                  <li>20% Validation</li>
                  <li>10% Testing</li>
                </ul>
              </li>
            </ul>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">📊 Model Performance</h3>
            <p className="text-muted-foreground mb-2">
              The ResNet-50 model was trained for 10 epochs with the best performance saved at epoch 9:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-[300px] text-sm border mb-4">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-2 py-1 border">Metric</th>
                    <th className="px-2 py-1 border">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 border font-medium">Best Validation Accuracy</td>
                    <td className="px-2 py-1 border">76.04%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border font-medium">Final Training Accuracy</td>
                    <td className="px-2 py-1 border">99.53%</td>
                  </tr>
                </tbody>
              </table>
              <div className="font-medium mb-1">Per-Class Validation Accuracy</div>
              <table className="min-w-[200px] text-sm border">
                <thead>
                  <tr className="bg-muted">
                    <th className="px-2 py-1 border">Class</th>
                    <th className="px-2 py-1 border">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 border">ASD</td>
                    <td className="px-2 py-1 border">72.89%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border">Normal</td>
                    <td className="px-2 py-1 border">87.80%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border">PDA</td>
                    <td className="px-2 py-1 border">63.49%</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border">VSD</td>
                    <td className="px-2 py-1 border">80.24%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium mb-2">⚠️ Limitations & Medical Disclaimer</h3>
            <div className="rounded-md bg-muted/50 p-4 mb-4 flex gap-2 items-start">
              <Info className="h-5 w-5 mt-0.5 text-medical-blue-dark" />
              <div>
                <span className="font-medium">This tool is not a medical device and is not FDA approved.</span> It is intended as an assistive tool for professionals and should not be used for direct diagnosis or treatment decisions.
              </div>
            </div>
            <div className="text-muted-foreground mb-2">Limitations to consider:</div>
            <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
              <li>Rare CHD types not present in training may be misclassified</li>
              <li>Image quality significantly affects prediction performance</li>
              <li>Performance is optimized for pediatric patients and may not generalize to adults</li>
              <li>GAN-generated images enhance training but are not substitutes for diverse real-world data</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
