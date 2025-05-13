
import { get, post, put, del } from './apiClient';
import { College } from '@/data/mockData';

// Type for API responses
type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

// Get all colleges
export const fetchColleges = () => 
  get<ApiResponse<College[]>>('/colleges');

// Get a single college by ID
export const fetchCollegeById = (id: string) => 
  get<ApiResponse<College>>(`/colleges/${id}`);

// Get colleges that offer a specific degree
export const fetchCollegesByDegree = (degreeId: string) => 
  get<ApiResponse<College[]>>(`/colleges/degree/${degreeId}`);

// Admin functions (require authentication)

// Create a new college
export const createCollege = (collegeData: Omit<College, 'id'>) => 
  post<ApiResponse<College>>('/colleges', collegeData, true);

// Update an existing college
export const updateCollege = (id: string, collegeData: Partial<College>) => 
  put<ApiResponse<College>>(`/colleges/${id}`, collegeData, true);

// Delete a college
export const deleteCollege = (id: string) => 
  del<ApiResponse<null>>(`/colleges/${id}`, true);
