import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  adminLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(true);

  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const finishLoading = () => {
      if (isMounted) {
        setLoading(false);
        setAdminLoading(false);
      }
    };

    // Safety timeout - ensure loading completes even if something goes wrong
    const safetyTimeout = setTimeout(() => {
      if (isMounted && loading) {
        console.warn('Auth loading timeout - forcing completion');
        finishLoading();
      }
    }, 5000);

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isMounted) return;
        
        // Handle sign out or invalid session
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED' && !currentSession) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          finishLoading();
          return;
        }

        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to defer and avoid potential deadlocks
          setTimeout(async () => {
            if (!isMounted) return;
            setAdminLoading(true);
            const isAdminUser = await checkAdminRole(currentSession.user.id);
            if (isMounted) {
              setIsAdmin(isAdminUser);
              finishLoading();
            }
          }, 0);
        } else {
          setIsAdmin(false);
          finishLoading();
        }
      }
    );

    // THEN check for existing session
    const initSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        // If there's an error or no valid session, clear everything
        if (error || !currentSession) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          finishLoading();
          return;
        }
        
        setSession(currentSession);
        setUser(currentSession.user);
        
        if (currentSession.user) {
          setAdminLoading(true);
          const isAdminUser = await checkAdminRole(currentSession.user.id);
          if (isMounted) {
            setIsAdmin(isAdminUser);
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        if (isMounted) {
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          finishLoading();
        }
      }
    };

    initSession();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAdminLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, adminLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
