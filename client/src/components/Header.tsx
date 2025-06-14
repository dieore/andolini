import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartDropdown } from './CartDropdown';
import { useCartStore } from '../store/cartStore';
export function Header() {
  const {
    items,
    toggleCart
  } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return <header className="sticky top-0 z-50 bg-amber-100 shadow-sm">
      <div className="container px-4 py-3 mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors">
          Sweet Delights
        </Link>
        <div className="relative">
          <button className="p-1 relative" aria-label="Carrito de compras" onClick={toggleCart}>
            <ShoppingBag size={24} className="text-amber-800" />
            {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>}
          </button>
          <CartDropdown />
        </div>
      </div>
    </header>;
}