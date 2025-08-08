
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'counselor' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Accept any entries - simplified authentication
        if (email && password) {
          const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            name: email.includes('@') ? email.split('@')[0] : email,
            avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`,
            role: 'student'
          };

          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Accept any entries - simplified registration
        if (email && password && name) {
          const mockUser: User = {
            id: 'user-' + Date.now(),
            email,
            name,
            avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`,
            role: 'student'
          };

          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ 
            user: { ...currentUser, ...updates } 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
