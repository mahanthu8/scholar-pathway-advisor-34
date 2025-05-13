
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { registerStudent } from "@/api/students";
import { fetchDegrees } from "@/api/degrees";
import { useEffect } from "react";
import { Degree } from "@/types/degree";

const Register = () => {
  const { toast } = useToast();
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    school: "",
    city: "",
    state: "",
    pucStream: "",
    pucPercentage: "",
    preferredDegree: "",
    notes: "",
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    pucStream: false,
    pucPercentage: false,
    agreeToTerms: false,
  });

  useEffect(() => {
    const loadDegrees = async () => {
      try {
        const data = await fetchDegrees();
        setDegrees(data);
      } catch (error) {
        console.error("Error loading degrees:", error);
        toast({
          title: "Error loading data",
          description: "Could not load degree programs. Some options may not be available.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDegrees();
  }, [toast]);

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(formData.email),
      password: formData.password.length < 6,
      confirmPassword: formData.password !== formData.confirmPassword,
      phone: !/^[0-9]{10}$/.test(formData.phone),
      pucStream: formData.pucStream === "",
      pucPercentage: formData.pucPercentage === "" || isNaN(Number(formData.pucPercentage)) || Number(formData.pucPercentage) < 0 || Number(formData.pucPercentage) > 100,
      agreeToTerms: !formData.agreeToTerms,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (field in formErrors && formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitting(true);
        
        // Create registration data
        const studentData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          pucStream: formData.pucStream,
          pucPercentage: Number(formData.pucPercentage),
          preferredDegree: formData.preferredDegree || undefined,
          preferredLocation: formData.city ? `${formData.city}, ${formData.state}` : undefined,
          notes: formData.notes || undefined
        };
        
        // Send registration to API
        await registerStudent(studentData);
        
        toast({
          title: "Registration Successful!",
          description: "Thank you for registering. We will contact you with more information about your educational options.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          school: "",
          city: "",
          state: "",
          pucStream: "",
          pucPercentage: "",
          preferredDegree: "",
          notes: "",
          agreeToTerms: false,
        });
      } catch (error) {
        console.error("Registration failed:", error);
        toast({
          title: "Registration Failed",
          description: "There was an error during registration. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    } else {
      toast({
        title: "Form has errors",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Register for Personalized Guidance
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Fill out the form below and our education counselors will contact you with tailored recommendations for your academic journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={formErrors.name ? "border-red-500" : ""}
                      />
                      {formErrors.name && <p className="text-red-500 text-sm">Please enter your name</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={formErrors.email ? "border-red-500" : ""}
                      />
                      {formErrors.email && <p className="text-red-500 text-sm">Please enter a valid email</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        className={formErrors.password ? "border-red-500" : ""}
                      />
                      {formErrors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        className={formErrors.confirmPassword ? "border-red-500" : ""}
                      />
                      {formErrors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={formErrors.phone ? "border-red-500" : ""}
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="school">Current/Previous School</Label>
                      <Input
                        id="school"
                        placeholder="Name of your school"
                        value={formData.school}
                        onChange={(e) => handleChange("school", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="Your city"
                        value={formData.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="Your state"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h2 className="text-xl font-semibold">Educational Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pucStream">PUC Stream <span className="text-red-500">*</span></Label>
                      <Select
                        value={formData.pucStream}
                        onValueChange={(value) => handleChange("pucStream", value)}
                      >
                        <SelectTrigger className={formErrors.pucStream ? "border-red-500" : ""}>
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
                      {formErrors.pucStream && <p className="text-red-500 text-sm">Please select your PUC stream</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pucPercentage">PUC Percentage/CGPA <span className="text-red-500">*</span></Label>
                      <Input
                        id="pucPercentage"
                        placeholder="Your PUC percentage or CGPA"
                        value={formData.pucPercentage}
                        onChange={(e) => handleChange("pucPercentage", e.target.value)}
                        className={formErrors.pucPercentage ? "border-red-500" : ""}
                      />
                      {formErrors.pucPercentage && <p className="text-red-500 text-sm">Please enter a valid percentage (0-100)</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preferredDegree">Interested Degree Program</Label>
                    <Select
                      value={formData.preferredDegree}
                      onValueChange={(value) => handleChange("preferredDegree", value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a degree you're interested in (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="">Not sure yet</SelectItem>
                          {degrees.map((degree) => (
                            <SelectItem key={degree.id} value={degree.id.toString()}>
                              {degree.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Information</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific questions or information you'd like to share"
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleChange("agreeToTerms", Boolean(checked))}
                    className={formErrors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions <span className="text-red-500">*</span>
                    </Label>
                    {formErrors.agreeToTerms && <p className="text-red-500 text-sm">You must agree to the terms</p>}
                    <p className="text-sm text-gray-500">
                      By registering, you agree to receive educational information and guidance from EduPathfinder.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-edu-primary hover:bg-edu-dark"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
