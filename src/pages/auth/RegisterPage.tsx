
import { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Card } from '../../components/base/Card';

export const RegisterPage = () => {
  const { register, isLoading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const success = await register(formData.email, formData.password, formData.name);
    if (!success) {
      setError('Failed to create account. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-6">
      <Card className="w-full max-w-md p-8 card-gradient">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text-primary mb-2">Create Account</h1>
          <p className="text-gray-400">Join our college counseling platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            icon={<i className="ri-user-line" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<i className="ri-mail-line" />}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            icon={<i className="ri-lock-line" />}
            hint="Must be at least 6 characters"
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            icon={<i className="ri-lock-line" />}
            required
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/auth/login')}
              className="gradient-text-secondary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-accent-100 hover:text-accent-200">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-accent-100 hover:text-accent-200">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
};
