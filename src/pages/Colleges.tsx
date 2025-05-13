
import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { CollegeCard } from "@/components/CollegeCard";
import { fetchColleges, fetchFeaturedColleges, fetchBangaloreColleges } from "@/api/colleges";
import { fetchDegrees } from "@/api/degrees";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import { MapPin, GraduationCap, Star, Filter } from "lucide-react";
import { getColleges, getDegrees, getFeaturedColleges, getBangaloreColleges } from "@/utils/mockDataFallback";

const Colleges = () => {
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState(0);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique locations from colleges
  const locations = useMemo(() => {
    const uniqueLocations = Array.from(new Set(colleges.map((college) => {
      const city = college.location.split(",")[0].trim();
      return city;
    })));
    return uniqueLocations;
  }, [colleges]);

  // Get Bangalore colleges
  const bangaloreColleges = useMemo(() => {
    return colleges.filter(college => 
      college.location.toLowerCase().includes("bangalore") || 
      college.location.toLowerCase().includes("bengaluru")
    );
  }, [colleges]);

  // Load colleges and degrees
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Using our fallback utility to get data with mock data as fallback
        const [collegesData, degreesData] = await Promise.all([
          getColleges(fetchColleges),
          getDegrees(fetchDegrees)
        ]);
        
        setColleges(collegesData);
        setDegrees(degreesData);
        setFilteredColleges(collegesData);
      } catch (error) {
        console.error("Error loading data:", error);
        toast({
          title: "Notice",
          description: "Using mock data since the API server is not available.",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter colleges when search term or filters change
  useEffect(() => {
    let filtered = colleges;
    
    // Filter based on active tab first
    if (activeTab === "bangalore") {
      filtered = bangaloreColleges;
    } 
    
    // Then apply other filters
    filtered = filtered.filter((college) => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = locationFilter === "all" || 
        college.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesDegree = degreeFilter === 0 || college.degreesOffered.includes(degreeFilter);
      
      const matchesRating = ratingFilter === "all" || 
        (ratingFilter === "4plus" && college.rating >= 4) ||
        (ratingFilter === "4.5plus" && college.rating >= 4.5);
      
      return matchesSearch && matchesLocation && matchesDegree && matchesRating;
    });
    
    setFilteredColleges(filtered);
  }, [searchTerm, locationFilter, degreeFilter, ratingFilter, colleges, activeTab, bangaloreColleges]);

  return (
    <Layout>
      <section className="bg-gradient-to-r from-edu-primary to-edu-secondary py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect College
            </h1>
            <p className="text-lg mb-8 opacity-90">
              Explore colleges offering various degree programs with a special focus on institutions in Bangalore.
            </p>
            
            <Tabs defaultValue="all" className="w-full mb-8" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="all">All Colleges</TabsTrigger>
                <TabsTrigger value="bangalore">Bangalore Colleges</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="w-full md:w-2/3">
                  <Input
                    type="text"
                    placeholder="Search for colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border-gray-300 text-gray-800"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white text-edu-primary border-edu-primary hover:bg-edu-light w-full md:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
              </div>
              
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Select
                      value={locationFilter}
                      onValueChange={(value) => setLocationFilter(value)}
                    >
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Filter by location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">All Locations</SelectItem>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                {location}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Program</label>
                    <Select
                      value={degreeFilter.toString()}
                      onValueChange={(value) => setDegreeFilter(parseInt(value))}
                    >
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Filter by degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="0">All Degrees</SelectItem>
                          {degrees.map((degree) => (
                            <SelectItem key={degree.id} value={degree.id.toString()}>
                              <div className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-2" />
                                {degree.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <Select
                      value={ratingFilter}
                      onValueChange={(value) => setRatingFilter(value)}
                    >
                      <SelectTrigger className="w-full text-left">
                        <SelectValue placeholder="Filter by rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="all">Any Rating</SelectItem>
                          <SelectItem value="4plus">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                              4.0 & Above
                            </div>
                          </SelectItem>
                          <SelectItem value="4.5plus">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                              4.5 & Above
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "bangalore" && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Top Colleges in Bangalore</h2>
                <Badge className="bg-edu-secondary px-3 py-1">{bangaloreColleges.length} Institutions</Badge>
              </div>
              <p className="text-gray-600">
                Bangalore, known as India's Silicon Valley, hosts some of the country's premier educational institutions. 
                These colleges offer cutting-edge facilities, industry connections, and diverse degree programs.
              </p>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-edu-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="text-gray-500 text-lg mt-4">Loading colleges...</p>
            </div>
          ) : filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} degrees={degrees} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No matching colleges found.</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("all");
                  setDegreeFilter(0);
                  setRatingFilter("all");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Colleges;
