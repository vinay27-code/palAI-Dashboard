
import { useState } from 'react';
import clsx from 'clsx';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAppStore } from '../../store/useAppStore';

export const TopNavbar = () => {
  const { user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-dark-300 border-b border-dark-400 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-400 text-gray-300 hover:text-white transition-colors"
          >
            <i className="ri-menu-line text-xl w-5 h-5 flex items-center justify-center" />
          </button>
          
          <div className="hidden lg:block">
            <h2 className="text-lg font-semibold text-white">Welcome back, {user?.name}</h2>
            <p className="text-sm text-gray-400">Ready to achieve your college goals?</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="ri-search-line text-gray-400 text-sm w-4 h-4 flex items-center justify-center" />
            </div>
            <input
              type="text"
              placeholder="Search colleges, scholarships..."
              className="w-64 pl-10 pr-4 py-2 bg-dark-400 border border-dark-400 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-accent-100/50 focus:border-accent-100 transition-all text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-dark-400 text-gray-300 hover:text-white transition-colors">
            <i className="ri-notification-line text-xl w-5 h-5 flex items-center justify-center" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-100 rounded-full"></span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-dark-400 text-gray-300 hover:text-white transition-colors"
          >
            <i className={clsx(
              isDark ? 'ri-sun-line' : 'ri-moon-line',
              'text-xl w-5 h-5 flex items-center justify-center'
            )} />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-dark-400 transition-colors"
            >
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avatars/svg?seed=default'}
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
              </div>
              <i className="ri-arrow-down-s-line text-gray-400 w-4 h-4 flex items-center justify-center" />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-300 border border-dark-400 rounded-lg shadow-lg py-1 z-50">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-dark-400 hover:text-white transition-colors flex items-center">
                  <i className="ri-user-line w-4 h-4 mr-2 flex items-center justify-center" />
                  Profile Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-dark-400 hover:text-white transition-colors flex items-center">
                  <i className="ri-settings-line w-4 h-4 mr-2 flex items-center justify-center" />
                  Preferences
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-dark-400 hover:text-white transition-colors flex items-center">
                  <i className="ri-question-line w-4 h-4 mr-2 flex items-center justify-center" />
                  Help & Support
                </button>
                <hr className="border-dark-400 my-1" />
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-dark-400 hover:text-red-300 transition-colors flex items-center"
                >
                  <i className="ri-logout-box-line w-4 h-4 mr-2 flex items-center justify-center" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
