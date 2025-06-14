import React from 'react';
import { ProductCard } from './ProductCard';
export function FeaturedProducts() {
  const featuredProducts = [{
    id: 1,
    name: 'Croissant de Chocolate',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
  }, {
    id: 2,
    name: 'Pan de Masa Madre',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1537734796389-e1fc293cf856?q=80&w=3085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }, {
    id: 3,
    name: 'Muffin de Arándanos',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }];
  return <section className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-8 text-center">
          Especiales del Día
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name} 
              price={product.price} 
              image={product.image} 
            />
          ))}
        </div>
      </div>
    </section>;
}