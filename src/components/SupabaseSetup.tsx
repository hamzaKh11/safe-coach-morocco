import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Shield, Upload, Users, AlertCircle } from "lucide-react";

export const SupabaseSetup = () => {
  const sqlCode = `-- Enable Row Level Security
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.proof_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.admin_notes ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  instagram_handle TEXT NOT NULL,
  accused_name TEXT NOT NULL,
  course_name TEXT NOT NULL,
  description TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  price DECIMAL(10,2),
  category TEXT NOT NULL DEFAULT 'احتيال مالي',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create proof_files table
CREATE TABLE IF NOT EXISTS public.proof_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_notes table
CREATE TABLE IF NOT EXISTS public.admin_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage bucket for proof files
INSERT INTO storage.buckets (id, name, public)
VALUES ('proof-files', 'proof-files', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Reports policies
CREATE POLICY "Anyone can view approved reports" ON public.reports
FOR SELECT USING (status = 'approved');

CREATE POLICY "Users can view own reports" ON public.reports
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON public.reports
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending reports" ON public.reports
FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- Proof files policies
CREATE POLICY "Anyone can view proof files for approved reports" ON public.proof_files
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.reports 
    WHERE reports.id = proof_files.report_id 
    AND reports.status = 'approved'
  )
);

CREATE POLICY "Users can view proof files for own reports" ON public.proof_files
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.reports 
    WHERE reports.id = proof_files.report_id 
    AND reports.user_id = auth.uid()
  )
);

CREATE POLICY "Users can insert proof files for own reports" ON public.proof_files
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.reports 
    WHERE reports.id = proof_files.report_id 
    AND reports.user_id = auth.uid()
  )
);

-- Storage policies
CREATE POLICY "Anyone can view approved report files" ON storage.objects
FOR SELECT USING (bucket_id = 'proof-files');

CREATE POLICY "Authenticated users can upload proof files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'proof-files' 
  AND auth.role() = 'authenticated'
);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_status ON public.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON public.reports(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_proof_files_report_id ON public.proof_files(report_id);`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlCode);
      alert('تم نسخ كود SQL إلى الحافظة!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <AlertCircle className="w-5 h-5" />
            إعداد قاعدة البيانات مطلوب
          </CardTitle>
          <CardDescription className="text-amber-700">
            لتشغيل التطبيق بشكل كامل، يجب تشغيل كود SQL التالي في Supabase SQL Editor
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            إعداد قاعدة بيانات Supabase
          </CardTitle>
          <CardDescription>
            انسخ والصق هذا الكود في Supabase SQL Editor لإنشاء الجداول والسياسات المطلوبة
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Row Level Security
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              User Authentication
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Upload className="w-3 h-3" />
              File Storage
            </Badge>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto max-h-96">
              {sqlCode}
            </pre>
          </div>

          <Button onClick={copyToClipboard} className="w-full">
            نسخ كود SQL
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>خطوات الإعداد</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">1</span>
              <div>
                <p className="font-medium">اتصل بـ Supabase</p>
                <p className="text-muted-foreground">اضغط على زر Supabase في أعلى الصفحة وقم بالاتصال</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">2</span>
              <div>
                <p className="font-medium">انسخ كود SQL</p>
                <p className="text-muted-foreground">اضغط على زر "نسخ كود SQL" أعلاه</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">3</span>
              <div>
                <p className="font-medium">افتح SQL Editor في Supabase</p>
                <p className="text-muted-foreground">اذهب إلى لوحة تحكم Supabase &gt; SQL Editor</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">4</span>
              <div>
                <p className="font-medium">الصق الكود وشغله</p>
                <p className="text-muted-foreground">الصق الكود المنسوخ واضغط "Run" لتنفيذه</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">5</span>
              <div>
                <p className="font-medium">حدث إعدادات Supabase في الكود</p>
                <p className="text-muted-foreground">حدث المتغيرات في ملف src/lib/supabase.ts بقيم مشروعك</p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};