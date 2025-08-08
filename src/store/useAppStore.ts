import { create } from 'zustand';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'college' | 'scholarship' | 'career' | 'essay';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
}

interface Progress {
  totalTasks: number;
  completedTasks: number;
  weeklyGoal: number;
  currentWeekProgress: number;
}

interface AppState {
  recommendations: Recommendation[];
  progress: Progress;
  sidebarOpen: boolean;
  isLoading: boolean;

  // Actions
  fetchRecommendations: () => Promise<void>;
  updateRecommendation: (id: string, updates: Partial<Recommendation>) => void;
  setSidebarOpen: (open: boolean) => void;
  updateProgress: (progress: Partial<Progress>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  recommendations: [],
  progress: {
    totalTasks: 0,
    completedTasks: 0,
    weeklyGoal: 5,
    currentWeekProgress: 0,
  },
  sidebarOpen: true,
  isLoading: false,

  fetchRecommendations: async () => {
    set({ isLoading: true });

    try {
      // Simulate API call to /api/recommendations
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          title: 'Complete Common Application Essay',
          description: 'Draft your personal statement for college applications. Focus on a meaningful experience that shaped your perspective.',
          category: 'essay',
          priority: 'high',
          completed: false,
          dueDate: '2024-02-15'
        },
        {
          id: '2',
          title: 'Research MIT Computer Science Program',
          description: 'Explore MIT\'s CS curriculum, faculty research areas, and application requirements.',
          category: 'college',
          priority: 'medium',
          completed: false,
          dueDate: '2024-02-20'
        },
        {
          id: '3',
          title: 'Apply for Merit-Based Scholarships',
          description: 'Submit applications for 5 merit-based scholarships that match your profile.',
          category: 'scholarship',
          priority: 'high',
          completed: false,
          dueDate: '2024-02-10'
        },
        {
          id: '4',
          title: 'Schedule SAT Subject Tests',
          description: 'Register for Math Level 2 and Physics subject tests for competitive programs.',
          category: 'college',
          priority: 'medium',
          completed: true,
          dueDate: '2024-01-30'
        }
      ];

      set({ 
        recommendations: mockRecommendations,
        progress: {
          totalTasks: mockRecommendations.length,
          completedTasks: mockRecommendations.filter(r => r.completed).length,
          weeklyGoal: 5,
          currentWeekProgress: 2,
        },
        isLoading: false 
      });
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      set({ isLoading: false });
    }
  },

  updateRecommendation: (id: string, updates: Partial<Recommendation>) => {
    const recommendations = get().recommendations.map(rec => 
      rec.id === id ? { ...rec, ...updates } : rec
    );

    set({ 
      recommendations,
      progress: {
        ...get().progress,
        completedTasks: recommendations.filter(r => r.completed).length,
      }
    });
  },

  setSidebarOpen: (open: boolean) => {
    set({ sidebarOpen: open });
  },

  updateProgress: (progress: Partial<Progress>) => {
    set({ 
      progress: { ...get().progress, ...progress } 
    });
  },
}));
