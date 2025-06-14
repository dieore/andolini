import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  name: string;
  email: string;
  picture?: string;
  googleId: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

const isServer = typeof window === 'undefined';

const storage = {
  getItem: async (name: string) => {
    if (isServer) return null;
    return localStorage.getItem(name);
  },
  setItem: async (name: string, value: string) => {
    if (isServer) return;
    localStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    if (isServer) return;
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: {
        getItem: (name) => storage.getItem(name).then((value) => value ? JSON.parse(value) : null),
        setItem: (name, value) => storage.setItem(name, JSON.stringify(value)),
        removeItem: storage.removeItem,
      },
    }
  )
);
