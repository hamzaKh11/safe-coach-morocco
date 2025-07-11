import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tczrewwpuewulkahtuya.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjenJld3dwdWV3dWxrYWh0dXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNzU4ODAsImV4cCI6MjA2NzY1MTg4MH0.UIfoyyglsNFVDhn9nSNL3pxJNZIUwKE_GFEOg3zMGtE'

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