import React from 'react';
import { ShoppingBag } from 'lucide-react';
interface ProductCardProps {
  name: string;
  price: number;
  image: string;
}
export function ProductCard({
  name,
  price,
  image
}: ProductCardProps) {
  return <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg text-amber-900">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-amber-800 font-bold">${price.toFixed(2)}</p>
          <button className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors" aria-label={`Add ${name} to cart`}>
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>;
}