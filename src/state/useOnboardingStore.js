import { create } from 'zustand';

export const useOnboardingStore = create((set) => ({
  languages: [],
  level: null,
  dailyGoalMin: 10,
  motivation: [],
  completed: false,
  
  setLanguages: (arr) => set({ languages: arr }),
  setLevel: (v) => set({ level: v }),
  setDailyGoalMin: (v) => set({ dailyGoalMin: v }),
  setMotivation: (arr) => set({ motivation: arr }),
  setCompleted: (v) => set({ completed: v }),
  
  reset: () => set({ 
    languages: [], 
    level: null, 
    dailyGoalMin: 10, 
    motivation: [], 
    completed: false 
  })
}));