import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string, role: 'user' | 'admin' = 'user') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      })

      if (error) {
        return { data, error }
      }

      // If signup successful and user is created, create profile
      if (data.user) {
        // Wait a moment for the auth trigger to complete
        await new Promise(resolve => setTimeout(resolve, 100))
        
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([
            {
              id: data.user.id,
              full_name: fullName,
              role: role
            }
          ], {
            onConflict: 'id'
          })
        
        if (profileError) {
          console.error('Error creating profile:', profileError)
          // Don't return profile error as auth was successful
        }
      }

      return { data, error }
    } catch (err) {
      console.error('Signup error:', err)
      return { data: null, error: err as Error }
    }
  }

  const signUpAdmin = async (email: string, password: string, fullName: string) => {
    return signUp(email, password, fullName, 'admin')
  }

  const checkUserRole = async () => {
    if (!user) return null
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (error) {
        console.error('Error checking user role:', error)
        return null
      }
      
      return data?.role || 'user'
    } catch (err) {
      console.error('Error checking user role:', err)
      return null
    }
  }

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  return {
    user,
    loading,
    signUp,
    signUpAdmin,
    signIn,
    signOut,
    checkUserRole,
  }
}