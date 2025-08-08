
import { Link } from 'react-router-dom';
import { Button } from '../components/base/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-accent-100 to-neural-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-white text-4xl" />
          </div>
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/dashboard">
            <Button size="lg">
              <i className="ri-home-line mr-2 w-5 h-5 flex items-center justify-center" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div>
            <Link 
              to="/auth/login" 
              className="text-accent-100 hover:text-accent-200 text-sm transition-colors"
            >
              Need to sign in?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
