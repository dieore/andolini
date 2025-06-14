import React from 'react';
import { Link } from 'react-router-dom';
export function Hero() {
  return <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" alt="Freshly baked goods" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      <div className="container px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Freshly Baked Happiness
        </h2>
        <p className="text-xl text-white mb-8 max-w-xl mx-auto">
          Handcrafted with love, baked to perfection every morning.
        </p>
        <Link to="/products" className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-colors inline-block">
          Order Now
        </Link>
      </div>
    </section>;
}