
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';

export const HomePage = () => {
  const { user } = useAuthStore();
  const { recommendations, progress, fetchRecommendations, updateRecommendation, isLoading } = useAppStore();

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const handleCompleteTask = (id: string) => {
    updateRecommendation(id, { completed: true });
  };

  const urgentTasks = recommendations.filter(r => !r.completed && r.priority === 'high').slice(0, 3);
  const recentActivity = recommendations.filter(r => r.completed).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text-primary mb-2">
            Good morning, {user?.name}! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Ready to make progress on your college journey today?
          </p>
        </div>
        <Button>
          <i className="ri-calendar-check-line mr-2 w-4 h-4 flex items-center justify-center" />
          Schedule Meeting
        </Button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-accent-100/20 to-accent-100/5 border-accent-100/20 card-gradient">
          <div className="flex items-center">
            <div className="p-3 bg-accent-100/20 rounded-lg">
              <i className="ri-task-line text-accent-100 text-xl w-6 h-6 flex items-center justify-center" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold gradient-text-secondary">{progress.completedTasks}/{progress.totalTasks}</p>
              <p className="text-sm text-gray-400">Tasks Completed</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-neural-200/20 to-neural-200/5 border-neural-200/20 card-gradient">
          <div className="flex items-center">
            <div className="p-3 bg-neural-200/20 rounded-lg">
              <i className="ri-graduation-cap-line text-neural-200 text-xl w-6 h-6 flex items-center justify-center" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold gradient-text-accent">12</p>
              <p className="text-sm text-gray-400">College Matches</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent-300/20 to-accent-300/5 border-accent-300/20 card-gradient">
          <div className="flex items-center">
            <div className="p-3 bg-accent-300/20 rounded-lg">
              <i className="ri-money-dollar-circle-line text-accent-300 text-xl w-6 h-6 flex items-center justify-center" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold gradient-text-neural">$45K</p>
              <p className="text-sm text-gray-400">Scholarships Found</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-accent-400/20 to-accent-400/5 border-accent-400/20 card-gradient">
          <div className="flex items-center">
            <div className="p-3 bg-accent-400/20 rounded-lg">
              <i className="ri-calendar-line text-accent-400 text-xl w-6 h-6 flex items-center justify-center" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold gradient-text-primary">45</p>
              <p className="text-sm text-gray-400">Days to Deadline</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Tasks */}
        <div className="lg:col-span-2">
          <Card className="card-gradient">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold gradient-text-secondary">Urgent Tasks</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-dark-400 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-dark-400 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {urgentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-dark-400/50 rounded-lg border border-dark-400">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{task.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                          High Priority
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleCompleteTask(task.id)}
                      className="ml-4"
                    >
                      Complete
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* AI Insights */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-neural-100/10 to-neural-200/5 border-neural-200/20 card-gradient">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-neural-200/20 rounded-lg">
                <i className="ri-robot-line text-neural-200 w-5 h-5 flex items-center justify-center" />
              </div>
              <h3 className="ml-3 font-semibold gradient-text-neural">AI Insight</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Based on your profile, you have a 85% match with MIT's Computer Science program. Consider highlighting your robotics experience in your essay.
            </p>
            <Button size="sm" variant="outline">
              Learn More
            </Button>
          </Card>

          <Card className="card-gradient">
            <h3 className="font-semibold gradient-text-accent mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent-100 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.title}</p>
                    <p className="text-xs text-gray-400">Completed</p>
                  </div>
                  <i className="ri-check-line text-accent-400 w-4 h-4 flex items-center justify-center" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="card-gradient">
            <h3 className="font-semibold gradient-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <i className="ri-edit-line mr-3 w-4 h-4 flex items-center justify-center" />
                Write Essay Draft
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <i className="ri-search-line mr-3 w-4 h-4 flex items-center justify-center" />
                Research Colleges
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <i className="ri-calendar-check-line mr-3 w-4 h-4 flex items-center justify-center" />
                Schedule Interview
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
