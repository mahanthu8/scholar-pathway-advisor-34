
import { Layout } from "@/components/Layout";
import { degrees } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CareerPathway {
  career: string;
  relatedDegrees: number[];
  description: string;
  skills: string[];
  outlook: "Excellent" | "Good" | "Moderate";
}

const careerPathways: CareerPathway[] = [
  {
    career: "Software Developer",
    relatedDegrees: [1],
    description: "Design, develop, and maintain software applications and systems. Work on various stages of software development from requirements analysis to deployment.",
    skills: ["Programming", "Problem Solving", "System Design", "Testing", "Logical Thinking"],
    outlook: "Excellent"
  },
  {
    career: "Business Manager",
    relatedDegrees: [2, 6],
    description: "Oversee operations of a business or department, manage teams, implement strategies, and ensure organizational goals are met efficiently.",
    skills: ["Leadership", "Communication", "Strategic Planning", "Decision Making", "Financial Analysis"],
    outlook: "Good"
  },
  {
    career: "Medical Professional",
    relatedDegrees: [3],
    description: "Diagnose and treat illnesses, prescribe medications, perform medical procedures, and provide healthcare advice to patients.",
    skills: ["Clinical Knowledge", "Diagnostic Skills", "Communication", "Empathy", "Critical Thinking"],
    outlook: "Excellent"
  },
  {
    career: "Counselor/Psychologist",
    relatedDegrees: [4],
    description: "Provide psychological support, assessment, and therapy for individuals dealing with mental health issues, life challenges, or career decisions.",
    skills: ["Empathy", "Active Listening", "Analytical Skills", "Communication", "Emotional Intelligence"],
    outlook: "Good"
  },
  {
    career: "Research Scientist",
    relatedDegrees: [5, 7],
    description: "Conduct research to expand scientific knowledge, develop new technologies, materials, or methodologies in various fields of science.",
    skills: ["Analytical Thinking", "Research Methodology", "Data Analysis", "Technical Writing", "Creativity"],
    outlook: "Good"
  },
  {
    career: "Financial Analyst",
    relatedDegrees: [6, 8],
    description: "Analyze financial data, create financial models, evaluate investment opportunities, and provide recommendations for financial decisions.",
    skills: ["Quantitative Analysis", "Financial Modeling", "Market Research", "Critical Thinking", "Attention to Detail"],
    outlook: "Good"
  },
  {
    career: "Civil Engineer",
    relatedDegrees: [7],
    description: "Plan, design, and oversee construction projects such as buildings, roads, bridges, and water supply systems.",
    skills: ["Technical Knowledge", "Mathematics", "Design Skills", "Problem Solving", "Project Management"],
    outlook: "Good"
  },
  {
    career: "Economist",
    relatedDegrees: [8],
    description: "Study economic trends, analyze data, forecast market conditions, and provide recommendations on economic policies.",
    skills: ["Data Analysis", "Research", "Mathematical Skills", "Critical Thinking", "Communication"],
    outlook: "Moderate"
  }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getRelatedDegreesNames = (relatedDegrees: number[]) => {
    return relatedDegrees.map(id => {
      const degree = degrees.find(d => d.id === id);
      return degree ? degree.name : "";
    });
  };

  const filteredCareers = careerPathways.filter(career =>
    career.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRelatedDegreesNames(career.relatedDegrees).some(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getOutlookColor = (outlook: "Excellent" | "Good" | "Moderate") => {
    switch (outlook) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Moderate": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Career Prospects
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Explore potential career paths and job opportunities associated with different degree programs.
            </p>
            <div className="max-w-lg mx-auto">
              <Input
                type="text"
                placeholder="Search for careers or degrees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career, index) => (
                <Card key={index} className="edu-card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{career.career}</CardTitle>
                      <Badge className={getOutlookColor(career.outlook)}>
                        {career.outlook} Outlook
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{career.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, i) => (
                          <Badge key={i} className="bg-edu-accent text-edu-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Related Degrees:</h4>
                      <div className="flex flex-wrap gap-2">
                        {getRelatedDegreesNames(career.relatedDegrees).map((name, i) => (
                          <Badge key={i} className="bg-edu-light text-edu-primary">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p className="text-gray-500 text-lg">No matching career paths found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
