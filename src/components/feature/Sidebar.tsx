import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAppStore } from '../../store/useAppStore';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: 'ri-home-4-line' },
  { name: 'Recommendations', href: '/dashboard/recommendations', icon: 'ri-lightbulb-line' },
  { name: 'Forms', href: '/dashboard/forms', icon: 'ri-file-list-3-line' },
  { name: 'Progress', href: '/dashboard/progress', icon: 'ri-bar-chart-line' },
  { name: 'Profile', href: '/dashboard/profile', icon: 'ri-user-line' },
];

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={clsx(
        'fixed inset-y-0 left-0 z-50 w-64 bg-dark-200 border-r border-dark-400 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-dark-400">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-100 to-neural-200 rounded-lg flex items-center justify-center">
                <i className="ri-graduation-cap-line text-white text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CollegeAI</h1>
                <p className="text-xs text-gray-400">Smart Counseling</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => clsx(
                  'flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-accent-100 text-white shadow-lg shadow-accent-100/20'
                    : 'text-gray-300 hover:text-white hover:bg-dark-400'
                )}
              >
                <i className={clsx(item.icon, 'w-5 h-5 mr-3 flex items-center justify-center')} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* AI Assistant Card */}
          <div className="px-4 pb-4">
            <div className="bg-gradient-to-br from-neural-100/20 to-neural-200/20 p-4 rounded-lg border border-neural-200/30">
              <div className="flex items-center space-x-2 mb-2">
                <i className="ri-robot-line text-neural-200" />
                <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">
                Get instant help with essays, college research, and planning.
              </p>
              <button className="w-full bg-neural-200 hover:bg-neural-100 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors whitespace-nowrap">
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};