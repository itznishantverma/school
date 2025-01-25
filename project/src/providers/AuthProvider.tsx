import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../hooks/useToast';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: any;
  profile: any;
  userRole: string | null;
  signIn: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        // Check active session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setProfile(profile);
            setUserRole(profile.role);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initialize();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setProfile(profile);
              setUserRole(profile.role);
            }
          } else {
            setUser(null);
            setProfile(null);
            setUserRole(null);
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email: string, password: string, role: string) {
    try {
      setLoading(true);
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      if (!signInData.user) throw new Error('No user data returned');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', signInData.user.id)
        .single();

      if (profileError) {
        await supabase.auth.signOut();
        throw new Error('Error fetching user profile');
      }

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error('No profile found');
      }

      if (profile.role !== role) {
        await supabase.auth.signOut();
        throw new Error(`Invalid role. Expected ${role} but got ${profile.role}`);
      }

      setUser(signInData.user);
      setProfile(profile);
      setUserRole(profile.role);
      showToast('Successfully signed in', 'success');
    } catch (error) {
      console.error('Error in signIn function:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setUserRole(null);
      showToast('Successfully signed out', 'success');
    } catch (error) {
      console.error('Error signing out:', error);
      showToast('Error signing out', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates: any) {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from update');

      setProfile(data);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Error updating profile', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    user,
    profile,
    userRole,
    signIn,
    signOut,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}