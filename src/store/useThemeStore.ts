import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: true, // Default to dark theme for tech-driven feel

      toggleTheme: () => {
        const newTheme = !get().isDark;
        set({ isDark: newTheme });
        
        // Update DOM class
        if (newTheme) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setTheme: (isDark: boolean) => {
        set({ isDark });
        
        // Update DOM class
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ isDark: state.isDark }),
    }
  )
);