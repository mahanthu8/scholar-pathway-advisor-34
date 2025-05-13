
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CollegeCard } from "@/components/CollegeCard";
import { fetchColleges } from "@/api/colleges";
import { fetchDegrees, fetchDegreeNames } from "@/api/degrees";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { College } from "@/types/college";
import { Degree } from "@/types/degree";

const Colleges = () => {
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState(0);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  // Get unique locations from colleges
  const locations = Array.from(new Set(colleges.map((college) => {
    const city = college.location.split(",")[0].trim();
    return city;
  })));

  // Load colleges and degrees
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [collegesData, degreesData] = await Promise.all([
          fetchColleges(),
          fetchDegrees()
        ]);
        setColleges(collegesData);
        setDegrees(degreesData);
        setFilteredColleges(collegesData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Error loading data",
          description: "Could not load colleges and degrees. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter colleges when search term or filters change
  useEffect(() => {
    const filtered = colleges.filter((college) => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === "" || 
        college.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesDegree = degreeFilter === 0 || college.degreesOffered.includes(degreeFilter);
      
      return matchesSearch && matchesLocation && matchesDegree;
    });
    setFilteredColleges(filtered);
  }, [searchTerm, locationFilter, degreeFilter, colleges]);

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Find Your Perfect College
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Explore colleges offering various degree programs and find an institution that matches your aspirations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Input
                  type="text"
                  placeholder="Search for colleges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select
                  value={locationFilter}
                  onValueChange={(value) => setLocationFilter(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={degreeFilter.toString()}
                  onValueChange={(value) => setDegreeFilter(parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">All Degrees</SelectItem>
                      {degrees.map((degree) => (
                        <SelectItem key={degree.id} value={degree.id.toString()}>
                          {degree.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Loading colleges...</p>
            </div>
          ) : filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} degrees={degrees} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No matching colleges found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Colleges;
