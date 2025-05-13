
import { get, post, put, del } from './apiClient';
import { College } from '@/types/college';

// Get all colleges
export const fetchColleges = () => 
  get<College[]>('/api/colleges');

// Get a single college by ID
export const fetchCollegeById = (id: number) => 
  get<College>(`/api/colleges/${id}`);

// Get colleges that offer a specific degree
export const fetchCollegesByDegree = (degreeId: number) => 
  get<College[]>(`/api/colleges/degree/${degreeId}`);

// Get featured colleges
export const fetchFeaturedColleges = () =>
  get<College[]>('/api/colleges/featured');

// Get Bangalore colleges
export const fetchBangaloreColleges = () =>
  get<College[]>('/api/colleges/bangalore');

// Admin functions (require authentication)

// Create a new college
export const createCollege = (collegeData: Omit<College, 'id'>) => 
  post<College>('/api/colleges', collegeData, true);

// Update an existing college
export const updateCollege = (id: number, collegeData: Partial<College>) => 
  put<College>(`/api/colleges/${id}`, collegeData, true);

// Delete a college
export const deleteCollege = (id: number) => 
  del<null>(`/api/colleges/${id}`, true);
