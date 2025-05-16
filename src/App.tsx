
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Degrees from "./pages/Degrees";
import DegreeDetails from "./pages/DegreeDetails";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import Eligibility from "./pages/Eligibility";
import Careers from "./pages/Careers";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { RegistrationPopup } from "./components/RegistrationPopup";

const queryClient = new QueryClient();

const App = () => {
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  
  useEffect(() => {
    // Show the registration popup after a small delay when the app loads
    const timer = setTimeout(() => {
      setShowRegistrationPopup(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/degrees" element={<Degrees />} />
            <Route path="/degrees/:id" element={<DegreeDetails />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetails />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <RegistrationPopup 
          open={showRegistrationPopup} 
          onOpenChange={setShowRegistrationPopup} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
