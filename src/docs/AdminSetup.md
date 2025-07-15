# Admin Authentication Setup Guide

## Overview
This guide helps you configure admin roles and authentication in your Supabase project for secure admin access.

## Step 1: Configure Database Schema

### 1.1 Update Profiles Table
Add an admin role column to your profiles table:

```sql
-- Add role column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Update existing profiles to have user role
UPDATE profiles SET role = 'user' WHERE role IS NULL;
```

### 1.2 Create Admin-Specific Tables (Optional)
```sql
-- Create admin_logs table for audit trail
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,
    target_table TEXT,
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_logs
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
```

## Step 2: Configure Row Level Security (RLS)

### 2.1 Profiles Table RLS Policies
```sql
-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Allow admins to read all profiles
CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow admins to update all profiles
CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

### 2.2 Reports Table RLS Policies
```sql
-- Allow anyone to read approved reports
CREATE POLICY "Anyone can read approved reports" ON reports
    FOR SELECT USING (status = 'approved');

-- Allow users to read their own reports
CREATE POLICY "Users can read own reports" ON reports
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own reports
CREATE POLICY "Users can insert own reports" ON reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow admins to read all reports
CREATE POLICY "Admins can read all reports" ON reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow admins to update all reports
CREATE POLICY "Admins can update all reports" ON reports
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
```

## Step 3: Create Admin Functions

### 3.1 Check Admin Role Function
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3.2 Create Admin User Function
```sql
CREATE OR REPLACE FUNCTION create_admin_user(
    user_email TEXT,
    user_password TEXT,
    admin_name TEXT
)
RETURNS JSON AS $$
DECLARE
    new_user_id UUID;
    result JSON;
BEGIN
    -- Create auth user (this would typically be done through your application)
    -- This is a placeholder - actual user creation should be done via Supabase Auth
    
    -- Insert admin profile
    INSERT INTO profiles (id, full_name, role)
    VALUES (auth.uid(), admin_name, 'admin')
    RETURNING id INTO new_user_id;
    
    result := json_build_object(
        'success', true,
        'user_id', new_user_id,
        'message', 'Admin user created successfully'
    );
    
    RETURN result;
EXCEPTION WHEN OTHERS THEN
    RETURN json_build_object(
        'success', false,
        'error', SQLERRM
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Step 4: Environment Configuration

### 4.1 Supabase Configuration
Ensure your Supabase project has the following settings:

1. **Auth Settings**:
   - Enable email authentication
   - Configure password requirements
   - Set up email templates (optional)

2. **Database Settings**:
   - Enable RLS on all tables
   - Configure connection pooling

### 4.2 Application Configuration
In your React application, ensure you have:

1. **Environment Variables**: All handled by Supabase integration
2. **Auth Configuration**: Using the existing Supabase client

## Step 5: Create First Admin User

### 5.1 Manual Database Insert
```sql
-- First, sign up normally through your app, then update the role
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'your-user-id-here';
```

### 5.2 Using Admin Signup Page
1. Navigate to `/admin/login`
2. Use the signup form to create an admin account
3. The system will create the profile with admin role

## Step 6: Testing Admin Authentication

### 6.1 Test Admin Login
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Verify access to admin dashboard

### 6.2 Test Admin Permissions
1. Try accessing admin-only features
2. Verify RLS policies are working
3. Check that regular users cannot access admin features

## Security Best Practices

### 6.1 Password Security
- Use strong passwords (min 12 characters)
- Enable 2FA when available
- Regular password rotation

### 6.2 Access Control
- Implement proper role checking in frontend
- Use RLS policies for database security
- Log all admin actions

### 6.3 Monitoring
- Monitor admin login attempts
- Set up alerts for suspicious activity
- Regular security audits

## Common Issues and Solutions

### Issue 1: RLS Policy Not Working
**Solution**: Check that RLS is enabled and policies are correctly defined

### Issue 2: Admin Role Not Recognized
**Solution**: Verify the profile was created with the correct role

### Issue 3: Authentication Errors
**Solution**: Check Supabase configuration and network connectivity

## Admin Dashboard Features

Once admin authentication is set up, you can access:

1. **Report Management**: Approve/reject reports
2. **User Management**: View and manage user accounts
3. **Analytics**: View platform statistics
4. **Content Moderation**: Manage reported content

## Next Steps

1. Set up admin dashboard components
2. Implement admin-specific routes
3. Add admin notifications
4. Configure monitoring and logging