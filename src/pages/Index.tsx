
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { degrees, colleges } from "@/data/mockData";
import { DegreeCard } from "@/components/DegreeCard";
import { CollegeCard } from "@/components/CollegeCard";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredDegrees = degrees.slice(0, 4);
  const featuredColleges = colleges.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-edu-primary to-edu-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Academic Path After PUC
            </h1>
            <p className="text-xl mb-8">
              Explore degree options, eligibility criteria, and career prospects
              tailored to your interests and qualifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/degrees">
                <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100">
                  Explore Degrees
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Degrees */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Degree Programs</h2>
            <Link to="/degrees" className="text-edu-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredDegrees.map((degree) => (
              <DegreeCard key={degree.id} degree={degree} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose EduPathfinder?
            </h2>
            <p className="text-gray-600">
              We help students make informed decisions about their academic future with comprehensive information and personalized guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Comprehensive Database
              </h3>
              <p className="text-gray-600">
                Access information on hundreds of degree programs and colleges across India.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Verified Information
              </h3>
              <p className="text-gray-600">
                All details are verified and updated regularly to ensure accuracy and relevance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Career Guidance
              </h3>
              <p className="text-gray-600">
                Discover potential career paths and understand job prospects for each degree program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Colleges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Top Colleges</h2>
            <Link to="/colleges" className="text-edu-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-edu-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Academic Path?
            </h2>
            <p className="text-xl mb-8">
              Register for personalized degree and college recommendations tailored to your interests and qualifications.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-white text-edu-primary hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
