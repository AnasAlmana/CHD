
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, HeartPulse, Info } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About the Model</h1>
        <p className="text-muted-foreground">
          Learn how our AI classification system works
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-medical-abnormal" />
            <CardTitle>CHD Image Classification Model</CardTitle>
          </div>
          <CardDescription>
            Artificial Intelligence for Congenital Heart Disease Detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Overview</h3>
            <p className="text-muted-foreground">
              Our Congenital Heart Disease (CHD) Image Classifier is an advanced artificial intelligence system 
              designed to assist medical professionals in the early detection and diagnosis of heart defects from 
              medical imaging. The model analyzes cardiac images and provides predictions with confidence scores 
              to help identify potential abnormalities.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Model Architecture</h3>
            <p className="text-muted-foreground mb-4">
              The CHD Image Classifier uses a deep convolutional neural network (CNN) architecture specifically 
              optimized for medical image analysis. The model includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>A backbone network based on ResNet-50 architecture with modifications for medical imaging</li>
              <li>Feature pyramid network for multi-scale feature extraction</li>
              <li>Attention mechanisms to focus on relevant cardiac structures</li>
              <li>Specialized layers for handling DICOM medical image formats</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Training Data</h3>
            <p className="text-muted-foreground mb-4">
              The model was trained on a diverse dataset of cardiac images:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Over 50,000 labeled cardiac images from multiple medical centers</li>
              <li>Balanced representation of normal and various CHD conditions</li>
              <li>Images include echocardiograms, MRIs, and CT scans</li>
              <li>Data augmentation techniques to improve model generalization</li>
              <li>Expert cardiologist annotations and validations</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Performance and Validation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="bg-medical-blue/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">94.2%</span>
                </CardContent>
              </Card>
              
              <Card className="bg-medical-blue/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sensitivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">92.7%</span>
                </CardContent>
              </Card>
              
              <Card className="bg-medical-blue/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Specificity</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-bold">95.1%</span>
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground">
              The model underwent rigorous validation using 5-fold cross-validation and was tested on an 
              independent test set from separate medical institutions not included in the training data.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Limitations and Considerations</h3>
            <div className="rounded-md bg-muted/50 p-4 mb-4">
              <div className="flex gap-2 items-start">
                <Info className="h-5 w-5 mt-0.5 text-medical-blue-dark" />
                <div>
                  <h4 className="font-medium">Important Medical Disclaimer</h4>
                  <p className="text-sm text-muted-foreground">
                    This tool is designed to assist medical professionals, not replace them. All predictions should be 
                    verified by qualified healthcare providers. This is not a medical device and is not FDA approved.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Users should be aware of the following limitations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Performance may vary for rare CHD conditions with limited training examples</li>
              <li>Image quality significantly affects prediction accuracy</li>
              <li>The model works best with standard imaging protocols</li>
              <li>Patient demographics may affect model performance if they differ significantly from the training population</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Development Team</h3>
            <p className="text-muted-foreground">
              This model was developed by a multidisciplinary team of cardiologists, medical imaging specialists, 
              and AI researchers committed to improving early detection of congenital heart defects.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="text-medical-blue-dark border-medical-blue-dark">
                <Heart className="h-3 w-3 mr-1" /> Cardiology
              </Badge>
              <Badge variant="outline" className="text-medical-blue-dark border-medical-blue-dark">
                <Heart className="h-3 w-3 mr-1" /> Medical Imaging
              </Badge>
              <Badge variant="outline" className="text-medical-blue-dark border-medical-blue-dark">
                <Heart className="h-3 w-3 mr-1" /> Machine Learning
              </Badge>
              <Badge variant="outline" className="text-medical-blue-dark border-medical-blue-dark">
                <Heart className="h-3 w-3 mr-1" /> Data Science
              </Badge>
              <Badge variant="outline" className="text-medical-blue-dark border-medical-blue-dark">
                <Heart className="h-3 w-3 mr-1" /> Pediatric Cardiology
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
