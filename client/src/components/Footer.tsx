import React from 'react';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
export function Footer() {
  return <footer id="contact" className="bg-amber-800 text-amber-100 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sweet Delights</h3>
            <p className="mb-4">
              Bringing freshly baked happiness to your day.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="flex items-center mb-3">
              <MapPin size={18} className="mr-2" />
              <p>123 Bakery Street, Flour City</p>
            </div>
            <div className="flex items-center mb-3">
              <Phone size={18} className="mr-2" />
              <p>(555) 123-4567</p>
            </div>
            <div className="flex items-center">
              <Mail size={18} className="mr-2" />
              <p>hello@sweetdelights.com</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <div className="flex items-center mb-3">
              <Clock size={18} className="mr-2" />
              <div>
                <p>Monday - Friday: 7am - 7pm</p>
                <p>Saturday: 8am - 8pm</p>
                <p>Sunday: 8am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-amber-700 mt-8 pt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Sweet Delights Bakery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>;
}