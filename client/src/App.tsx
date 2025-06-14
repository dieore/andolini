import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductsPage } from './pages/ProductsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { Toaster } from 'sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecipesCarousel } from './components/RecipesCarousel';
export function App() {
  return <GoogleOAuthProvider clientId="510479026102-7gd0cqsqghnmouhjru33etlvgm3dbbtg.apps.googleusercontent.com">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-amber-50">
          <Header />
          <Routes>
            <Route path="/" element={<main className="flex-grow">
                  <Hero />
                  <FeaturedProducts />
                  <RecipesCarousel />
                  <AboutSection />
                </main>} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>;
}