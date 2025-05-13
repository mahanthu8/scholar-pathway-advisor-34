import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import { colleges as mockColleges, degrees as mockDegrees } from "@/data/mockData";
import { fetchColleges, fetchFeaturedColleges, fetchBangaloreColleges, getKarnatakaCollegesList, fetchKarnatakaColleges } from "@/api/colleges";

// Helper function to use mock data as fallback when API calls fail
export const useMockDataOnFailure = async <T>(
  apiCall: () => Promise<T>,
  mockData: T,
  errorMessage: string = "API call failed"
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error) {
    console.warn(`${errorMessage}, using mock data instead:`, error);
    return mockData;
  }
};

// Specific fallback functions for different data types
export const getColleges = async (fetchFunction: () => Promise<College[]> = fetchColleges): Promise<College[]> => {
  try {
    return await fetchFunction();
  } catch (error) {
    console.warn("Failed to fetch colleges from API, using fallback data", error);
    // Use our new function for the full list of Karnataka colleges
    return getKarnatakaCollegesList();
  }
};

export const getDegrees = async (apiCall: () => Promise<Degree[]>): Promise<Degree[]> => {
  return useMockDataOnFailure(apiCall, mockDegrees, "Failed to fetch degrees from API");
};

export const getFeaturedColleges = async (): Promise<College[]> => {
  try {
    return await fetchFeaturedColleges();
  } catch (error) {
    console.warn("Failed to fetch featured colleges from API, using fallback data", error);
    // Filter the full list for featured colleges
    const allColleges = getKarnatakaCollegesList();
    return allColleges.filter((college, index) => index % 5 === 0); // Mark every 5th college as featured for demo
  }
};

export const getBangaloreColleges = async (): Promise<College[]> => {
  try {
    return await fetchBangaloreColleges();
  } catch (error) {
    console.warn("Failed to fetch Bangalore colleges from API, using fallback data", error);
    // Filter the full list for Bangalore colleges
    const allColleges = getKarnatakaCollegesList();
    return allColleges.filter(college => 
      college.location.toLowerCase().includes("bengaluru") || 
      college.location.toLowerCase().includes("bangalore")
    );
  }
};

export const getKarnatakaColleges = async (): Promise<College[]> => {
  try {
    return await fetchKarnatakaColleges();
  } catch (error) {
    console.warn("Failed to fetch Karnataka colleges from API, using fallback data", error);
    return getKarnatakaCollegesList();
  }
};
