
import { Card } from '../../components/base/Card';

interface ProgressItem {
  id: string;
  title: string;
  description: string;
  category: 'applications' | 'essays' | 'recommendations' | 'scholarships' | 'tests';
  progress: number;
  totalSteps: number;
  completedSteps: number;
  dueDate?: string;
  status: 'on_track' | 'behind' | 'ahead' | 'completed';
}

const mockProgress: ProgressItem[] = [
  {
    id: '1',
    title: 'College Applications',
    description: 'Complete applications for target schools',
    category: 'applications',
    progress: 67,
    totalSteps: 12,
    completedSteps: 8,
    dueDate: '2024-11-01',
    status: 'on_track'
  },
  {
    id: '2',
    title: 'Personal Essays',
    description: 'Write and revise personal statements',
    category: 'essays',
    progress: 45,
    totalSteps: 8,
    completedSteps: 3,
    dueDate: '2024-10-15',
    status: 'behind'
  },
  {
    id: '3',
    title: 'Teacher Recommendations',
    description: 'Collect recommendation letters',
    category: 'recommendations',
    progress: 100,
    totalSteps: 4,
    completedSteps: 4,
    status: 'completed'
  },
  {
    id: '4',
    title: 'Scholarship Applications',
    description: 'Apply for merit and need-based scholarships',
    category: 'scholarships',
    progress: 80,
    totalSteps: 10,
    completedSteps: 8,
    dueDate: '2024-12-01',
    status: 'ahead'
  },
  {
    id: '5',
    title: 'Standardized Tests',
    description: 'Complete SAT/ACT and subject tests',
    category: 'tests',
    progress: 90,
    totalSteps: 3,
    completedSteps: 2,
    dueDate: '2024-10-01',
    status: 'on_track'
  }
];

const overallStats = {
  totalTasks: 37,
  completedTasks: 25,
  overallProgress: 68,
  onTrackItems: 3,
  behindItems: 1,
  completedItems: 1
};

export const ProgressPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ahead':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on_track':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'behind':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'ahead':
        return 'from-blue-500 to-cyan-500';
      case 'on_track':
        return 'from-purple-500 to-pink-500';
      case 'behind':
        return 'from-red-500 to-orange-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'applications':
        return 'ri-file-text-line';
      case 'essays':
        return 'ri-quill-pen-line';
      case 'recommendations':
        return 'ri-user-star-line';
      case 'scholarships':
        return 'ri-award-line';
      case 'tests':
        return 'ri-pencil-ruler-2-line';
      default:
        return 'ri-checkbox-circle-line';
    }
  };

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text-primary mb-2">Progress Tracking</h1>
        <p className="text-gray-400">Monitor your college application journey</p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold gradient-text-neural">{overallStats.overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <i className="ri-progress-3-line text-white text-xl"></i>
            </div>
          </div>
          <div className="mt-4 bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${overallStats.overallProgress}%` }}
            ></div>
          </div>
        </Card>

        <Card className="p-6 card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completed Tasks</p>
              <p className="text-2xl font-bold gradient-text-secondary">{overallStats.completedTasks}/{overallStats.totalTasks}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <i className="ri-checkbox-circle-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">On Track</p>
              <p className="text-2xl font-bold gradient-text-accent">{overallStats.onTrackItems}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <i className="ri-time-line text-white text-xl"></i>
            </div>
          </div>
        </Card>

        <Card className="p-6 card-gradient">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Behind Schedule</p>
              <p className="text-2xl font-bold gradient-text-primary">{overallStats.behindItems}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <i className="ri-alarm-warning-line text-white text-xl"></i>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold gradient-text-secondary">Detailed Progress</h2>

        {mockProgress.map((item) => (
          <Card key={item.id} className="p-6 card-gradient">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-purple-500/20">
                  <i className={`${getCategoryIcon(item.category)} text-purple-400 text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold gradient-text-neural">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                    {item.dueDate && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                {formatStatus(item.status)}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {item.completedSteps} of {item.totalSteps} steps completed
                </span>
                <span className="text-sm font-semibold text-white">{item.progress}%</span>
              </div>

              <div className="bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 bg-gradient-to-r ${getProgressBarColor(item.status)} rounded-full transition-all duration-500`}
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>

              {item.status === 'behind' && (
                <div className="flex items-center gap-2 text-xs text-red-400">
                  <i className="ri-alarm-warning-line"></i>
                  <span>Action needed to stay on track</span>
                </div>
              )}

              {item.status === 'ahead' && (
                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <i className="ri-rocket-line"></i>
                  <span>Ahead of schedule - great work!</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Section */}
      <Card className="p-6 card-gradient">
        <h3 className="text-lg font-semibold gradient-text-accent mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i className="ri-trophy-line text-white text-sm"></i>
            </div>
            <div>
              <p className="text-green-400 font-medium">Recommendation Letters Completed</p>
              <p className="text-gray-400 text-sm">All 4 recommendation letters secured</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="ri-medal-line text-white text-sm"></i>
            </div>
            <div>
              <p className="text-blue-400 font-medium">Scholarship Applications Ahead</p>
              <p className="text-gray-400 text-sm">8 out of 10 scholarships completed early</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
