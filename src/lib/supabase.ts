import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tczrewwpuewulkahtuya.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjenJld3dwdWV3dWxrYWh0dXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNzU4ODAsImV4cCI6MjA2NzY1MTg4MH0.UIfoyyglsNFVDhn9nSNL3pxJNZIUwKE_GFEOg3zMGtE'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database Types
export interface Profile {
  id: string
  full_name: string
  phone?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  user_id: string
  accused_name: string
  instagram_handle: string
  course_name: string
  description: string
  rating: number
  status: 'pending' | 'approved' | 'rejected'
  is_anonymous: boolean
  views: number
  created_at: string
  updated_at: string
  profiles?: Profile
}

export interface ProofFile {
  id: string
  report_id: string
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  created_at: string
}

export interface AdminNote {
  id: string
  report_id: string
  admin_id: string
  note: string
  created_at: string
}