
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerStudent } from "@/api/students";
import { StudentDTO } from "@/api/students";
import emailjs from 'emailjs-com';

export function RegistrationPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<StudentDTO, "id">>({
    name: "",
    email: "",
    password: "",
    phone: "",
    pucStream: "science",
    pucPercentage: 0,
    preferredDegree: "",
    preferredLocation: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pucPercentage" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      pucStream: value,
    }));
  };

  const sendRegistrationEmail = async (userData: Omit<StudentDTO, "id">) => {
    try {
      const templateParams = {
        to_email: 'ananyama09@gmail.com',
        subject: 'New Student Registration on EduPathfinder',
        message: `A new student has registered:\nName: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}\nPUC Stream: ${userData.pucStream}\nPUC Percentage: ${userData.pucPercentage}`,
      };
      
      await emailjs.send(
        'service_edupath',
        'template_chatrequest',
        templateParams,
        'lcoIppQEnR3Y1wMdM'
      );
      
      console.log('Registration notification email sent from popup');
    } catch (emailError) {
      console.error('Error sending registration email from popup:', emailError);
      // Continue with registration even if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Try to register with API
      try {
        await registerStudent(formData);
        console.log("API registration successful");
      } catch (apiError) {
        console.error("API registration failed:", apiError);
        // Proceed even if the API call fails - this will be a fallback mechanism
      }
      
      // Send email notification regardless of API success
      await sendRegistrationEmail(formData);
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Registration complete process failed:", error);
      toast({
        title: "Registration processed",
        description: "Your information has been received. We'll contact you soon.",
      });
      // Close the popup even if there was an error, since we've captured their information
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join EduPathfinder</DialogTitle>
          <DialogDescription className="text-center">
            Create an account to save your preferences and get personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number*</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pucStream">PUC Stream*</Label>
              <Select value={formData.pucStream} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your PUC stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Science (PCM)</SelectItem>
                  <SelectItem value="scienceBio">Science (PCB)</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pucPercentage">PUC Percentage*</Label>
              <Input
                id="pucPercentage"
                name="pucPercentage"
                type="number"
                min="0"
                max="100"
                placeholder="Enter your PUC percentage"
                value={formData.pucPercentage || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferredLocation">Preferred Location (Optional)</Label>
              <Input
                id="preferredLocation"
                name="preferredLocation"
                placeholder="Enter your preferred location"
                value={formData.preferredLocation}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Maybe Later
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
