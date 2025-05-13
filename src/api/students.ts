
import { get, post } from './apiClient';

// Student registration data type
export type StudentRegistration = {
  name: string;
  email: string;
  phone: string;
  pucStream: string;
  pucPercentage: number;
  preferredDegree?: string;
  preferredLocation?: string;
  notes?: string;
};

// Type for API responses
type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

// Register a new student
export const registerStudent = (studentData: StudentRegistration) => 
  post<ApiResponse<{ id: string }>>('/students/register', studentData);

// Admin functions (require authentication)

// Get all registered students (admin only)
export const fetchStudents = () => 
  get<ApiResponse<StudentRegistration[]>>('/students', true);

// Get a single student by ID (admin only)
export const fetchStudentById = (id: string) => 
  get<ApiResponse<StudentRegistration>>(`/students/${id}`, true);
