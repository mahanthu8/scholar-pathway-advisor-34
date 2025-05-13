
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export type StudentDetails = {
  pucStream: string;
  pucPercentage: number;
  preferredLocation?: string;
};

interface StudentEligibilityFormProps {
  onSubmit: (details: StudentDetails) => void;
  isLoading: boolean;
}

export function StudentEligibilityForm({ onSubmit, isLoading }: StudentEligibilityFormProps) {
  const { toast } = useToast();
  const [details, setDetails] = useState<StudentDetails>({
    pucStream: "",
    pucPercentage: 0,
    preferredLocation: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!details.pucStream) {
      toast({
        title: "Error",
        description: "Please select your PUC stream",
        variant: "destructive",
      });
      return;
    }
    
    if (isNaN(details.pucPercentage) || details.pucPercentage < 0 || details.pucPercentage > 100) {
      toast({
        title: "Error",
        description: "Please enter a valid percentage between 0 and 100",
        variant: "destructive",
      });
      return;
    }

    onSubmit(details);
  };

  return (
    <Card className="p-6 bg-white shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pucStream">PUC Stream</Label>
          <Select
            value={details.pucStream}
            onValueChange={(value) => setDetails({ ...details, pucStream: value })}
          >
            <SelectTrigger id="pucStream" className="w-full">
              <SelectValue placeholder="Select your PUC stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="science">Science (PCM)</SelectItem>
                <SelectItem value="scienceBio">Science (PCB)</SelectItem>
                <SelectItem value="commerce">Commerce</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pucPercentage">PUC Percentage</Label>
          <Input
            id="pucPercentage"
            type="number"
            placeholder="Enter your percentage"
            min="0"
            max="100"
            value={details.pucPercentage || ""}
            onChange={(e) => setDetails({ ...details, pucPercentage: parseFloat(e.target.value) })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredLocation">Preferred Location (Optional)</Label>
          <Input
            id="preferredLocation"
            placeholder="e.g., Bangalore, Delhi"
            value={details.preferredLocation || ""}
            onChange={(e) => setDetails({ ...details, preferredLocation: e.target.value })}
          />
        </div>

        <Button type="submit" className="w-full bg-edu-primary hover:bg-edu-dark" disabled={isLoading}>
          {isLoading ? "Finding matches..." : "Find Matching Courses & Colleges"}
        </Button>
      </form>
    </Card>
  );
}
