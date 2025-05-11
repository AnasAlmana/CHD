
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the CHD Image Classification System
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-medical-blue to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upload New Image</CardTitle>
            <CardDescription>
              Upload DICOM, PNG, or JPEG images for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/upload')} className="w-full mt-2">
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Predictions</CardTitle>
            <CardDescription>
              View your recent classification results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={() => navigate('/history')} 
              className="w-full mt-2"
            >
              View History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">About the Model</CardTitle>
            <CardDescription>
              Learn how our AI classification system works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              onClick={() => navigate('/about')} 
              className="w-full mt-2"
            >
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CHD Image Classifier – AI-Powered Diagnosis</CardTitle>
          <CardDescription>
            A powerful tool to assist in the diagnosis of Congenital Heart Disease
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Our AI-powered system helps medical professionals analyze cardiac images to identify
            potential congenital heart defects. Upload your medical images for instant classification
            results with confidence scores to assist in diagnosis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
