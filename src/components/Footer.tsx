
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-edu-primary mb-4">EduPathfinder</h3>
            <p className="text-gray-600 text-sm">
              Helping students make informed decisions about their academic future after PUC.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-edu-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/degrees" className="text-gray-600 hover:text-edu-primary text-sm">
                  Degrees
                </Link>
              </li>
              <li>
                <Link to="/colleges" className="text-gray-600 hover:text-edu-primary text-sm">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-edu-primary text-sm">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/eligibility" className="text-gray-600 hover:text-edu-primary text-sm">
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-edu-primary text-sm">
                  Career Prospects
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-edu-primary text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
            <p className="text-gray-600 text-sm mb-2">
              Email: ananyama09@gmail.com
            </p>
            <p className="text-gray-600 text-sm">
              Phone: +91 8618714564
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} EduPathfinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
