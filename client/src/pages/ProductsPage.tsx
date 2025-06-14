import React, { useState } from 'react';
import { toast } from 'sonner';
import { useCartStore } from '../store/cartStore';
const categories = [{
  id: 'bread',
  name: 'Pan'
}, {
  id: 'pastries',
  name: 'Pastelería'
}, {
  id: 'cakes',
  name: 'Tortas'
}, {
  id: 'cookies',
  name: 'Galletas'
}];
const products = [{
  id: 1,
  name: 'Pan de Masa Madre',
  price: 6.99,
  category: 'bread',
  image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
}, {
  id: 2,
  name: 'Baguette',
  price: 4.99,
  category: 'bread',
  image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
}, {
  id: 3,
  name: 'Croissant de Chocolate',
  price: 3.99,
  category: 'pastries',
  image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
}, {
  id: 4,
  name: 'Torta de Vainilla',
  price: 24.99,
  category: 'cakes',
  image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
}, {
  id: 5,
  name: 'Galletas con Chips de Chocolate',
  price: 2.99,
  category: 'cookies',
  image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
}, {
  id: 6,
  name: 'Pastel Danés',
  price: 3.99,
  category: 'pastries',
  image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80'
}];
export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const {
    addItem
  } = useCartStore();
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem(product);
    toast.success('¡Producto agregado al carrito!', {
      description: product.name
    });
  };
  return <main className="flex-grow py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Nuestros Productos
        </h1>
        <div className="relative mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            <button onClick={() => setSelectedCategory('all')} className={`flex-none px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === 'all' ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}>
              Todos
            </button>
            {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`flex-none px-6 py-2 rounded-full font-medium transition-colors ${selectedCategory === category.id ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-900 hover:bg-amber-200'}`}>
                {category.name}
              </button>)}
          </div>
          <div className="absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg text-amber-900">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-amber-800 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <button onClick={() => handleAddToCart(product)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full transition-colors" aria-label={`Agregar ${product.name} al carrito`}>
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </main>;
}