
import { ReactNode, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { useThemeStore } from '../../store/useThemeStore';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Initialize theme on mount
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-main text-white">
      <div className="flex h-screen">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNavbar />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-darker">
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};