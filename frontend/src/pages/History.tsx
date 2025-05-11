
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, HeartPulse } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

// Mock data for the prediction history
const MOCK_PREDICTIONS = [
  {
    id: "1",
    fileName: "patient_001.dcm",
    result: "abnormal",
    confidence: 92.7,
    date: "2025-05-10T08:23:15Z",
  },
  {
    id: "2",
    fileName: "heart_scan_12.jpg",
    result: "normal",
    confidence: 88.4,
    date: "2025-05-09T14:18:22Z",
  },
  {
    id: "3",
    fileName: "ecg_image_1.png",
    result: "abnormal",
    confidence: 79.6,
    date: "2025-05-08T11:05:37Z",
  },
  {
    id: "4",
    fileName: "patient_002.dcm",
    result: "normal",
    confidence: 95.2,
    date: "2025-05-07T09:32:10Z",
  },
  {
    id: "5",
    fileName: "heart_analysis.jpg",
    result: "normal",
    confidence: 89.0,
    date: "2025-05-06T16:45:33Z",
  },
  {
    id: "6",
    fileName: "chd_scan_004.dcm",
    result: "abnormal",
    confidence: 84.3,
    date: "2025-05-05T13:27:19Z",
  },
  {
    id: "7",
    fileName: "patient_005.jpg",
    result: "normal",
    confidence: 91.8,
    date: "2025-05-04T10:12:45Z",
  },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "normal" | "abnormal">("all");
  
  const filteredPredictions = MOCK_PREDICTIONS.filter((prediction) => {
    const matchesSearch = prediction.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || prediction.result === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Prediction History</h1>
        <p className="text-muted-foreground">
          View and filter your past image classifications
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Filter Predictions</CardTitle>
          <CardDescription>
            Search and filter your prediction history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-2/3">
              <Label htmlFor="search" className="mb-2 block">
                Search by filename
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-1/3">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={filter === "normal" ? "default" : "outline"}
                onClick={() => setFilter("normal")}
                className="flex-1"
              >
                Normal
              </Button>
              <Button
                variant={filter === "abnormal" ? "default" : "outline"}
                onClick={() => setFilter("abnormal")}
                className="flex-1"
              >
                Abnormal
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Prediction Results</CardTitle>
          <CardDescription>
            {filteredPredictions.length} results found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPredictions.length > 0 ? (
                filteredPredictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell>
                      {format(new Date(prediction.date), "MMM d, yyyy h:mm a")}
                    </TableCell>
                    <TableCell>{prediction.fileName}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          prediction.result === "normal"
                            ? "bg-medical-normal text-white"
                            : "bg-medical-abnormal text-white"
                        }`}
                      >
                        <HeartPulse className="mr-1 h-3 w-3" />
                        {prediction.result.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{prediction.confidence.toFixed(1)}%</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
