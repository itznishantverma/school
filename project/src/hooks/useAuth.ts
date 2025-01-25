import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

interface AuthState {
  user: any | null;
  profile: Profile | null;
  userRole: string | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  userRole: null,
  loading: true,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return;

    try {
      // Check current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          set({ 
            user: session.user,
            profile,
            userRole: profile.role
          });
        }
      }

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              set({ 
                user: session.user,
                profile,
                userRole: profile.role
              });
            }
          } else {
            set({ user: null, profile: null, userRole: null });
          }
        }
      );

      set({ initialized: true });
      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string, role: string) => {
    try {
      set({ loading: true });
      
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

      set({
        user: signInData.user,
        profile,
        userRole: profile.role
      });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({ user: null, profile: null, userRole: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (updates) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        set({ profile: data });
      }
    } finally {
      set({ loading: false });
    }
  }
}));