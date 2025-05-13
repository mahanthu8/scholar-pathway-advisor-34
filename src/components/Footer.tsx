
import { Link } from "react-router-dom";

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
              Email: info@edupathfinder.com
            </p>
            <p className="text-gray-600 text-sm">
              Phone: +91 9876543210
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.82 7.489h-1.908c-.161 0-.338.172-.338.399V11h2.237l-.259 2.301h-1.978v6.161h-2.79v-6.16H9.757V11h2.026V9.967c0-1.966 1.362-3.03 3.329-3.03.94 0 1.75.07 1.989.1v2.399l-.281.053z"></path>
                </svg>
              </a>
              <a href="#" className="text-edu-primary hover:text-edu-dark">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.957 7.571h-1.908c-.161 0-.338.172-.338.399V11h2.237l-.259 2.301h-1.978v6.161h-2.79v-6.16H9.757V11h2.026V9.967c0-1.966 1.362-3.03 3.329-3.03.94 0 1.75.07 1.989.1v2.399l-.144.135z"></path>
                </svg>
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
