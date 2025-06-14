import { create } from 'zustand';
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
export const useCartStore = create<CartStore>(set => ({
  items: [],
  isOpen: false,
  total: 0,
  toggleCart: () => set(state => ({
    isOpen: !state.isOpen
  })),
  addItem: item => set(state => {
    const existingItem = state.items.find(i => i.id === item.id);
    const newItems = existingItem ? state.items.map(i => i.id === item.id ? {
      ...i,
      quantity: i.quantity + 1
    } : i) : [...state.items, {
      ...item,
      quantity: 1
    }];
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    };
  }),
  removeItem: id => set(state => {
    const newItems = state.items.filter(i => i.id !== id);
    return {
      items: newItems,
      total: newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    };
  }),
  clearCart: () => set({
    items: [],
    total: 0
  })
}));