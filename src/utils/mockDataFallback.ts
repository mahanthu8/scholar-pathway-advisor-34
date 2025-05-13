
import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import { colleges as mockColleges, degrees as mockDegrees } from "@/data/mockData";

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
export const getColleges = async (apiCall: () => Promise<College[]>): Promise<College[]> => {
  return useMockDataOnFailure(apiCall, mockColleges, "Failed to fetch colleges from API");
};

export const getDegrees = async (apiCall: () => Promise<Degree[]>): Promise<Degree[]> => {
  return useMockDataOnFailure(apiCall, mockDegrees, "Failed to fetch degrees from API");
};

export const getFeaturedColleges = async (apiCall: () => Promise<College[]>): Promise<College[]> => {
  return useMockDataOnFailure(
    apiCall,
    mockColleges.filter(college => college.isFeatured),
    "Failed to fetch featured colleges from API"
  );
};

export const getBangaloreColleges = async (apiCall: () => Promise<College[]>): Promise<College[]> => {
  return useMockDataOnFailure(
    apiCall,
    mockColleges.filter(college => 
      college.location.toLowerCase().includes("bangalore") || 
      college.location.toLowerCase().includes("bengaluru")
    ),
    "Failed to fetch Bangalore colleges from API"
  );
};
