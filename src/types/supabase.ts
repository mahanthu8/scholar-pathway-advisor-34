
import { Database } from "@/integrations/supabase/types";

// Type for college data from Supabase
export type CollegeFromSupabase = Database['public']['Tables']['colleges']['Row'];

// Type for degree data from Supabase
export type DegreeFromSupabase = Database['public']['Tables']['degrees']['Row'];

// Type for college-degree junction data from Supabase
export type CollegeDegreeFromSupabase = Database['public']['Tables']['college_degrees']['Row'];

// Type for KCET cutoffs data from Supabase
export type KcetCutoffFromSupabase = Database['public']['Tables']['kcet_cutoffs']['Row'];

// Helper function to convert Supabase college data to our College type
export const mapSupabaseToCollege = (college: CollegeFromSupabase): College => {
  return {
    id: college.id,
    name: college.name,
    location: college.location,
    description: college.description,
    rating: Number(college.rating),
    fees: college.fees,
    imageUrl: college.image_url,
    degreesOffered: [], // This will need to be populated separately
    isFeatured: college.is_featured || false,
    collegeCode: college.college_code || undefined
  };
};
