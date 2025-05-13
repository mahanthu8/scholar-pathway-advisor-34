
import { College, degrees } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CollegeCardProps {
  college: College;
}

export function CollegeCard({ college }: CollegeCardProps) {
  const degreesOffered = college.degreesOffered.map(
    (id) => degrees.find((degree) => degree.id === id)?.name || ""
  );

  return (
    <Link to={`/colleges/${college.id}`}>
      <Card className="h-full edu-card-hover overflow-hidden">
        <div className="h-40 overflow-hidden">
          <img
            src={college.imageUrl}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{college.name}</CardTitle>
            <div className="flex items-center text-sm bg-yellow-100 px-2 py-1 rounded">
              <svg
                className="h-4 w-4 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {college.rating}
            </div>
          </div>
          <div className="text-sm text-gray-500">{college.location}</div>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <span className="text-sm font-medium">Fees:</span>
            <span className="text-sm text-gray-600 ml-1">{college.fees}</span>
          </div>
          <div className="mb-3">
            <span className="text-sm font-medium">Degrees Offered:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {degreesOffered.slice(0, 2).map((degree, index) => (
                <Badge key={index} className="bg-edu-light text-edu-primary">
                  {degree}
                </Badge>
              ))}
              {degreesOffered.length > 2 && (
                <Badge className="bg-edu-light text-edu-primary">
                  +{degreesOffered.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
