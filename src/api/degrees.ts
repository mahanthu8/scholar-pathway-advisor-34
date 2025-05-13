
import { get, post, put, del } from './apiClient';
import { Degree } from '@/data/mockData';

// Type for API responses
type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

// Get all degrees
export const fetchDegrees = () => 
  get<ApiResponse<Degree[]>>('/degrees');

// Get a single degree by ID
export const fetchDegreeById = (id: string) => 
  get<ApiResponse<Degree>>(`/degrees/${id}`);

// Get degrees by category
export const fetchDegreesByCategory = (category: string) => 
  get<ApiResponse<Degree[]>>(`/degrees/category/${category}`);

// Admin functions (require authentication)

// Create a new degree
export const createDegree = (degreeData: Omit<Degree, 'id'>) => 
  post<ApiResponse<Degree>>('/degrees', degreeData, true);

// Update an existing degree
export const updateDegree = (id: string, degreeData: Partial<Degree>) => 
  put<ApiResponse<Degree>>(`/degrees/${id}`, degreeData, true);

// Delete a degree
export const deleteDegree = (id: string) => 
  del<ApiResponse<null>>(`/degrees/${id}`, true);
