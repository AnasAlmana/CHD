import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, HeartPulse } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "normal" | "abnormal">("all");
  const [predictions, setPredictions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:8000/history");
        if (!response.ok) throw new Error("Failed to fetch history");
        const data = await response.json();
        setPredictions(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredPredictions = predictions.filter((prediction) => {
    const matchesSearch = prediction.result
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
                Search by result
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
            {loading ? "Loading..." : `${filteredPredictions.length} results found`}
            {error && <span className="text-red-500 ml-2">{error}</span>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredPredictions.length > 0 ? (
                filteredPredictions.map((prediction, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {format(new Date(prediction.timestamp), "MMM d, yyyy h:mm a")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`$ {
                          prediction.result === "normal"
                            ? "bg-medical-normal text-white"
                            : "bg-medical-abnormal text-white"
                        }`}
                      >
                        <HeartPulse className="mr-1 h-3 w-3" />
                        {prediction.result.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{prediction.confidence.toFixed(2)}%</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-10">
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
