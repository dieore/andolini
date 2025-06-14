import React from 'react';
export function ProductCategories() {
  const categories = [{
    id: 1,
    name: 'Bread',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }, {
    id: 2,
    name: 'Pastries',
    image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }, {
    id: 3,
    name: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80'
  }, {
    id: 4,
    name: 'Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }];
  return <section id="products" className="py-12 px-4 bg-amber-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-8 text-center">
          Browse Our Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(category => <div key={category.id} className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md">
              <div className="h-40 md:h-48 overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white font-bold text-xl">
                  {category.name}
                </h3>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
}