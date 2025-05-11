
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader, Upload as UploadIcon } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  result: string;
  confidence: number;
  timestamp: string;
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreview(event.target?.result as string);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setPreview(null);
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://chd-backend.onrender.com/predict", {
        method: "POST",
        body: formData,
      });

      console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend returned error text:", errorText);
        throw new Error("Prediction failed");
      }

      const data = await response.json();
      console.log("✅ Backend JSON:", data);

      const parsedResult: PredictionResult = {
        result: data.prediction,
        confidence: data.confidence ?? 99.0,
        timestamp: new Date().toISOString(),
      };

      console.log("📦 Parsed Result:", parsedResult);

      setResult(parsedResult);
      toast.success("Image analyzed successfully");
    } catch (error) {
      console.error("❌ Error during submission:", error);
      toast.error("Failed to analyze image");
    } finally {
      setIsLoading(false);
    }
  };




  
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Upload Image</h1>
        <p className="text-muted-foreground">
          Upload medical images for CHD classification
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Upload DICOM, PNG, or JPG files for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <div className="mb-2">
                  <Label htmlFor="file-upload" className="font-medium cursor-pointer">
                    Click to upload
                  </Label>
                  <span className="text-muted-foreground"> or drag and drop</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  DICOM, PNG, JPG (Max 10MB)
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png,image/jpeg,application/dicom"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Selected file:</p>
                  <p className="text-sm text-muted-foreground">{file.name}</p>
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={!file || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preview & Results</CardTitle>
            <CardDescription>
              Image preview and classification results
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {result && <pre className="text-left w-full text-sm bg-gray-100 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>}
            {preview ? (
              <div className="border rounded-lg overflow-hidden w-full max-h-64 flex items-center justify-center mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            ) : (
              <div className="border rounded-lg p-10 w-full flex items-center justify-center mb-4 bg-muted/20">
                <p className="text-muted-foreground">No image preview</p>
              </div>
            )}
            
            {result && (
              <Card className={`w-full ${
                result.result === "normal" ? "bg-medical-normal/10" : "bg-medical-abnormal/10"
              }`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Classification Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Diagnosis:</div>
                      <div className={`text-lg font-bold ${
                        result.result === "normal" ? "text-medical-normal" : "text-medical-abnormal"
                      }`}>
                        {result.result.toUpperCase()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Confidence:</div>
                      <div>{result.confidence.toFixed(2)}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium">Time:</div>
                      <div>
                        {new Date(result.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
