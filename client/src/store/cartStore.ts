import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
  total: number;
}

// Custom storage object to handle Next.js hydration issues
const createCustomStorage = (): StateStorage => {
  const isServer = typeof window === 'undefined';
  
  return {
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
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      total: 0,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const newItems = existingItem
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { ...item, quantity: 1 }];
          
          const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          
          return {
            items: newItems,
            total: newTotal,
          };
        }),
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          const newTotal = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          
          return {
            items: newItems,
            total: newTotal,
          };
        }),
      clearCart: () =>
        set({
          items: [],
          total: 0,
        }),
    }),
    {
      name: 'andolini-cart-storage', // unique name for localStorage key
      storage: createJSONStorage(createCustomStorage),
      // Only persist these fields
      partialize: (state) => ({
        items: state.items,
        total: state.total,
      }),
    }
  )
);