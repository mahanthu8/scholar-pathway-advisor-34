
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { College } from '@/types/college';
import { Degree } from '@/types/degree';
import { MapPin, Book, Star, Award, Building } from "lucide-react";

interface CollegeCardProps {
  college: College;
  degrees?: Degree[];
}

export const EnhancedCollegeCard = ({ college, degrees = [] }: CollegeCardProps) => {
  // Find degree names for this college
  const collegeDegreesMap = new Map();
  college.degreesOffered.forEach((degId) => {
    const degree = degrees.find(d => d.id === degId);
    if (degree) {
      collegeDegreesMap.set(degId, degree.name);
    }
  });
  
  const degreeNames = Array.from(collegeDegreesMap.values());
  const limitedDegrees = degreeNames.slice(0, 3);
  const hasMoreDegrees = degreeNames.length > 3;

  return (
    <Card className="h-full flex flex-col transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={college.imageUrl} 
            alt={college.name} 
            className="w-full h-full object-cover rounded-t-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          {college.rank && (
            <div className="absolute top-3 right-3 bg-edu-primary text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Award className="h-4 w-4" />
              <span className="font-bold">Rank #{college.rank}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4">
        <div className="space-y-3">
          <Link to={`/college/${college.id}`} className="block">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 hover:text-edu-primary transition-colors">
              {college.name}
            </h3>
          </Link>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1 text-edu-secondary" />
            <span>{college.location}</span>
          </div>
          
          {college.affiliation && (
            <div className="flex items-center text-sm text-gray-600">
              <Building className="h-4 w-4 mr-1 text-edu-secondary" />
              <span>{college.affiliation}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{college.rating}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600">{college.fees}</span>
          </div>
          
          {college.specialization && college.specialization.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Book className="h-4 w-4 mr-1 text-edu-secondary" />
                <span className="font-medium">Specializations:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {college.specialization.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {spec}
                  </Badge>
                ))}
                {college.specialization.length > 3 && (
                  <Badge variant="outline" className="bg-gray-50">
                    +{college.specialization.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <p className="text-gray-600 line-clamp-2 text-sm">{college.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t px-4 py-3">
        <div className="w-full">
          <div className="flex flex-wrap gap-1">
            {limitedDegrees.map((degreeName, index) => (
              <Badge key={index} className="bg-edu-light text-edu-primary">
                {degreeName}
              </Badge>
            ))}
            {hasMoreDegrees && (
              <Badge className="bg-gray-100 text-gray-600">
                +{degreeNames.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
