
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
import { StudentEligibilityForm, StudentDetails } from "@/components/StudentEligibilityForm";
import { getEligibleDegrees, getEligibleColleges } from "@/utils/eligibilityFilter";

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
  
  // New state for student eligibility-based filtering
  const [isEligibilityMode, setIsEligibilityMode] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [eligibleDegrees, setEligibleDegrees] = useState<Degree[]>([]);
  const [findingMatches, setFindingMatches] = useState(false);

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

  // Handle student eligibility form submission
  const handleEligibilitySubmit = (details: StudentDetails) => {
    setFindingMatches(true);
    
    setTimeout(() => {
      // Find eligible degrees based on student details
      const eligible = getEligibleDegrees(degrees, details);
      setEligibleDegrees(eligible);
      
      // Get IDs of eligible degrees
      const eligibleDegreeIds = eligible.map(degree => degree.id);
      
      // Filter colleges that offer eligible degrees and match location preference
      const matchingColleges = getEligibleColleges(
        colleges,
        eligibleDegreeIds,
        details.preferredLocation
      );
      
      setFilteredColleges(matchingColleges);
      setStudentDetails(details);
      setIsEligibilityMode(true);
      setFindingMatches(false);
      
      toast({
        title: "Results Found",
        description: `Found ${matchingColleges.length} colleges and ${eligible.length} degree programs matching your profile.`,
      });
    }, 1000); // Simulate processing time
  };

  // Reset eligibility filtering
  const resetEligibilityFilter = () => {
    setIsEligibilityMode(false);
    setStudentDetails(null);
    setEligibleDegrees([]);
    
    // Restore normal filtering
    let filtered = colleges;
    
    if (activeTab === "bangalore") {
      filtered = bangaloreColleges;
    }
    
    setFilteredColleges(filtered);
  };

  // Filter colleges when search term or filters change (normal filtering mode)
  useEffect(() => {
    // Skip if in eligibility mode
    if (isEligibilityMode) return;
    
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
  }, [searchTerm, locationFilter, degreeFilter, ratingFilter, colleges, activeTab, bangaloreColleges, isEligibilityMode]);

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
            
            {/* New toggle for switching between normal search and eligibility-based search */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-md shadow-sm">
                <Button 
                  variant={!isEligibilityMode ? "default" : "outline"} 
                  className={!isEligibilityMode ? "bg-white text-edu-primary border-r" : "bg-transparent text-white"} 
                  onClick={() => isEligibilityMode && resetEligibilityFilter()}
                >
                  Standard Search
                </Button>
                <Button 
                  variant={isEligibilityMode ? "default" : "outline"} 
                  className={isEligibilityMode ? "bg-white text-edu-primary" : "bg-transparent text-white"}
                  onClick={() => !isEligibilityMode && setIsEligibilityMode(true)}
                >
                  Eligibility-Based Search
                </Button>
              </div>
            </div>
            
            {!isEligibilityMode ? (
              <>
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
              </>
            ) : (
              <div className="mb-8">
                {studentDetails ? (
                  <div className="bg-white rounded-lg p-6 shadow-lg text-left">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your Academic Profile</h3>
                        <div className="space-y-1 text-gray-700">
                          <p><span className="font-medium">PUC Stream:</span> {studentDetails.pucStream === "science" ? "Science (PCM)" : 
                                                           studentDetails.pucStream === "scienceBio" ? "Science (PCB)" : 
                                                           studentDetails.pucStream === "commerce" ? "Commerce" : "Arts"}</p>
                          <p><span className="font-medium">PUC Percentage:</span> {studentDetails.pucPercentage}%</p>
                          {studentDetails.preferredLocation && (
                            <p><span className="font-medium">Preferred Location:</span> {studentDetails.preferredLocation}</p>
                          )}
                        </div>
                        <div className="mt-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mr-2">
                            {eligibleDegrees.length} eligible degrees
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                            {filteredColleges.length} matching colleges
                          </Badge>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={resetEligibilityFilter}
                        className="text-gray-700"
                      >
                        Modify Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Your Academic Details</h3>
                    <StudentEligibilityForm 
                      onSubmit={handleEligibilitySubmit}
                      isLoading={findingMatches}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isEligibilityMode && studentDetails && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Colleges Matching Your Profile</h2>
                <Badge className="bg-edu-secondary px-3 py-1">{filteredColleges.length} Institutions</Badge>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Eligible Degree Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {eligibleDegrees.map(degree => (
                    <Badge key={degree.id} className="bg-edu-light text-edu-primary py-1 px-3">
                      {degree.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "bangalore" && !isEligibilityMode && (
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
                  if (isEligibilityMode) {
                    resetEligibilityFilter();
                  } else {
                    setSearchTerm("");
                    setLocationFilter("all");
                    setDegreeFilter(0);
                    setRatingFilter("all");
                  }
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
