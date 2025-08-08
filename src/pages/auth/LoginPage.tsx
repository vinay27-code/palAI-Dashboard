import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/base/Button';
import { Input } from '../../components/base/Input';
import { Card } from '../../components/base/Card';
export const LoginPage = () => {
  const { login, isLoading, isAuthenticated } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',  });
  const [error, setError] = useState('');  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    setError('');
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    const success = await login(formData.email, formData.password);
    if (!success) {
      setError('Invalid email or password');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <div className="min-h-screen bg-gradient-main flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-black gradient-text-neural mb-8 font-display uppercase">PAL AI DASHBOARD</h1>
    <br />
      <Card className="w-full max-w-md p-8 card-gradient">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text-primary mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your college counseling dashboard</p>
        </div>        <form onSubmit={handleSubmit} className="space-y-4">
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
            value={formData.password}            onChange={handleChange}
            placeholder="Enter your password"            icon={<i className="ri-lock-line" />}            required
          />
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          <Button
            type="submit"            className="w-full"
            loading={isLoading}          >
            Sign In
          </Button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Don't have an account?
            <button
              onClick={() => navigate('/auth/register')}
              className="gradient-text-secondary hover:underline font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};