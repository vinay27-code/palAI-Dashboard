
import { useState } from 'react';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';

interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: 'application' | 'scholarship' | 'recommendation' | 'essay';
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockForms: FormTemplate[] = [
  {
    id: '1',
    name: 'Common Application',
    description: 'Main college application form used by 900+ colleges',
    category: 'application',
    status: 'in_progress',
    dueDate: '2024-11-01',
    priority: 'high'
  },
  {
    id: '2',
    name: 'UC Application',
    description: 'University of California system application',
    category: 'application',
    status: 'not_started',
    dueDate: '2024-11-30',
    priority: 'high'
  },
  {
    id: '3',
    name: 'National Merit Scholarship',
    description: 'Merit-based scholarship application',
    category: 'scholarship',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Teacher Recommendation Request',
    description: 'Request form for teacher recommendations',
    category: 'recommendation',
    status: 'in_progress',
    priority: 'medium'
  },
  {
    id: '5',
    name: 'Personal Statement Draft',
    description: 'Main college essay and personal statement',
    category: 'essay',
    status: 'not_started',
    dueDate: '2024-10-15',
    priority: 'high'
  }
];

export const FormsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredForms = mockForms.filter(form => {
    const categoryMatch = selectedCategory === 'all' || form.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || form.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'not_started':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text-primary mb-2">Application Forms</h1>
        <p className="text-gray-400">Manage and track your college application forms</p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-gradient-darker rounded-xl border border-purple-500/30 card-gradient">
        <div className="flex items-center gap-2">
          <i className="ri-filter-line text-purple-400"></i>
          <span className="text-sm gradient-text-secondary">Filter by:</span>
        </div>
        
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-dark-300 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 pr-8"
        >
          <option value="all">All Categories</option>
          <option value="application">Applications</option>
          <option value="scholarship">Scholarships</option>
          <option value="recommendation">Recommendations</option>
          <option value="essay">Essays</option>
        </select>

        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-dark-300 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 pr-8"
        >
          <option value="all">All Status</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredForms.map((form) => (
          <Card key={form.id} className="p-6 hover:border-purple-500/40 transition-colors cursor-pointer card-gradient">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <div>
                  <h3 className="text-lg font-semibold gradient-text-neural">{form.name}</h3>
                  <span className="text-xs text-gray-500 capitalize">{form.category}</span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(form.priority)}`}>
                {form.priority}
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{form.description}</p>

            <div className="flex justify-between items-center mb-4">
              <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(form.status)}`}>
                {formatStatus(form.status)}
              </div>
              {form.dueDate && (
                <div className="text-xs text-gray-500">
                  Due: {new Date(form.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="space-y-2">
              {form.status === 'not_started' && (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  <i className="ri-play-fill w-4 h-4 flex items-center justify-center mr-2"></i>
                  Start Form
                </Button>
              )}
              {form.status === 'in_progress' && (
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  <i className="ri-edit-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  Continue
                </Button>
              )}
              {form.status === 'completed' && (
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <i className="ri-eye-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  View Submission
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-file-list-3-line text-6xl text-gray-600 mb-4"></i>
          <h3 className="text-xl font-semibold gradient-text-accent mb-2">No forms found</h3>
          <p className="text-gray-500">Try adjusting your filters to see more results.</p>
        </div>
      )}

      {/* Quick Actions */}
      <Card className="p-6 card-gradient">
        <h3 className="text-lg font-semibold gradient-text-secondary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 h-auto">
            <div className="text-center">
              <i className="ri-add-line text-2xl mb-2 block"></i>
              <div>Create New Form</div>
            </div>
          </Button>
          
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 h-auto">
            <div className="text-center">
              <i className="ri-download-line text-2xl mb-2 block"></i>
              <div>Import Form</div>
            </div>
          </Button>
          
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 h-auto">
            <div className="text-center">
              <i className="ri-calendar-line text-2xl mb-2 block"></i>
              <div>Schedule Reminder</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};
