import React from 'react';
export function AboutSection() {
  return <section id="about" className="py-12 px-4 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-4">
              Our Story
            </h2>
            <p className="text-amber-900 mb-4">
              Sweet Delights was founded in 2010 with a simple mission: to bring
              the joy of freshly baked goods to our community. What started as a
              small family bakery has grown into a beloved local institution.
            </p>
            <p className="text-amber-900 mb-4">
              Every day, our bakers arrive before dawn to prepare the day's
              offerings, using only the finest ingredients and traditional
              methods passed down through generations.
            </p>
            <p className="text-amber-900">
              We take pride in our craft and are committed to creating baked
              goods that not only taste amazing but also bring people together
              around the table.
            </p>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 mb-6 md:mb-0">
            <img src="https://images.unsplash.com/photo-1556711905-b3f402e1f74d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Bakery interior" className="rounded-lg shadow-lg w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>;
}