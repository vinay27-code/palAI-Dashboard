
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useAppStore } from '../../store/useAppStore';
import { Card } from '../../components/base/Card';
import { Button } from '../../components/base/Button';

const categoryIcons = {
  college: 'ri-school-line',
  scholarship: 'ri-money-dollar-circle-line',
  career: 'ri-briefcase-line',
  essay: 'ri-edit-line',
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-green-500/20 text-green-400',
};

export const RecommendationsPage = () => {
  const { recommendations, fetchRecommendations, updateRecommendation, isLoading } = useAppStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'pending' && rec.completed) return false;
    if (filter === 'completed' && !rec.completed) return false;
    if (categoryFilter !== 'all' && rec.category !== categoryFilter) return false;
    return true;
  });

  const handleToggleComplete = (id: string, completed: boolean) => {
    updateRecommendation(id, { completed: !completed });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text-primary">Smart Recommendations</h1>
          <p className="text-gray-400 mt-1">
            AI-powered suggestions tailored to your college goals
          </p>
        </div>
        <Button>
          <i className="ri-refresh-line mr-2 w-4 h-4 flex items-center justify-center" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-gradient">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Status:</span>
            <div className="flex rounded-lg bg-dark-400 p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'pending', label: 'Pending' },
                { key: 'completed', label: 'Completed' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={clsx(
                    'px-3 py-1 text-sm rounded-md transition-all whitespace-nowrap',
                    filter === key
                      ? 'bg-accent-100 text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Category:</span>
            <div className="flex rounded-lg bg-dark-400 p-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'college', label: 'College' },
                { key: 'scholarship', label: 'Scholarship' },
                { key: 'essay', label: 'Essay' },
                { key: 'career', label: 'Career' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={clsx(
                    'px-3 py-1 text-sm rounded-md transition-all whitespace-nowrap',
                    categoryFilter === key
                      ? 'bg-accent-100 text-white'
                      : 'text-gray-400 hover:text-white'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse card-gradient">
              <div className="h-4 bg-dark-400 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-dark-400 rounded w-full mb-2"></div>
              <div className="h-3 bg-dark-400 rounded w-2/3"></div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.id} hover className={clsx(
              'transition-all duration-200 card-gradient',
              rec.completed && 'opacity-75'
            )}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={clsx(
                    'p-2 rounded-lg',
                    rec.completed ? 'bg-green-500/20' : 'bg-accent-100/20'
                  )}>
                    <i className={clsx(
                      categoryIcons[rec.category],
                      rec.completed ? 'text-green-400' : 'text-accent-100',
                      'w-5 h-5 flex items-center justify-center'
                    )} />
                  </div>
                  <div>
                    <span className={clsx(
                      'px-2 py-1 text-xs rounded-full',
                      priorityColors[rec.priority]
                    )}>
                      {rec.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleComplete(rec.id, rec.completed)}
                  className={clsx(
                    'p-1 rounded-lg transition-colors',
                    rec.completed
                      ? 'text-green-400 hover:bg-green-500/20'
                      : 'text-gray-400 hover:text-accent-100 hover:bg-accent-100/20'
                  )}
                >
                  <i className={clsx(
                    rec.completed ? 'ri-check-double-line' : 'ri-check-line',
                    'w-5 h-5 flex items-center justify-center'
                  )} />
                </button>
              </div>

              <h3 className={clsx(
                'font-semibold mb-2',
                rec.completed ? 'text-gray-400 line-through' : 'gradient-text-neural'
              )}>
                {rec.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {rec.description}
              </p>

              {rec.dueDate && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center" />
                  Due {new Date(rec.dueDate).toLocaleDateString()}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 capitalize">
                  {rec.category}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <i className="ri-more-line w-4 h-4 flex items-center justify-center" />
                  </Button>
                  {!rec.completed && (
                    <Button size="sm">
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredRecommendations.length === 0 && !isLoading && (
        <Card className="text-center py-12 card-gradient">
          <div className="w-16 h-16 bg-dark-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-lightbulb-line text-2xl text-gray-400 w-8 h-8 flex items-center justify-center" />
          </div>
          <h3 className="text-lg font-medium gradient-text-accent mb-2">No recommendations found</h3>
          <p className="text-gray-400">
            Try adjusting your filters or check back later for new suggestions.
          </p>
        </Card>
      )}
    </div>
  );
};
