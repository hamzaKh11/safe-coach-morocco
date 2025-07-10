import { createClient } from '@supabase/supabase-js'

// These would normally come from environment variables
// For demo purposes, you'll need to replace with your actual Supabase credentials
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Profile {
  id: string
  email: string
  full_name: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  user_id: string
  full_name: string
  email: string
  phone?: string
  instagram_handle: string
  accused_name: string
  course_name: string
  description: string
  rating: number
  price?: number
  category: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface ProofFile {
  id: string
  report_id: string
  file_url: string
  file_name: string
  file_type: string
  file_size: number
  created_at: string
}