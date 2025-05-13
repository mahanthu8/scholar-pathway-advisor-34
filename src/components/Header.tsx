
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-edu-primary to-edu-secondary bg-clip-text text-transparent">
                EduPathfinder
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/degrees" className="text-gray-700 hover:text-edu-primary transition-colors">
              Degrees
            </Link>
            <Link to="/colleges" className="text-gray-700 hover:text-edu-primary transition-colors">
              Colleges
            </Link>
            <Link to="/eligibility" className="text-gray-700 hover:text-edu-primary transition-colors">
              Eligibility
            </Link>
            <Link to="/careers" className="text-gray-700 hover:text-edu-primary transition-colors">
              Careers
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-edu-primary hover:bg-edu-dark">
                Register
              </Button>
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-edu-primary focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/degrees"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Degrees
            </Link>
            <Link
              to="/colleges"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Colleges
            </Link>
            <Link
              to="/eligibility"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eligibility
            </Link>
            <Link
              to="/careers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-edu-primary hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-edu-primary text-white hover:bg-edu-dark"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
