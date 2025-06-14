import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DeliveryForm } from '../components/checkout/DeliveryForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { useCartStore } from '../store/cartStore';
export function CheckoutPage() {
  const {
    items,
    total
  } = useCartStore();
  const navigate = useNavigate();
  if (items.length === 0) {
    navigate('/');
    return null;
  }
  return <main className="flex-grow py-8 px-4 bg-amber-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Finalizar Compra
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DeliveryForm />
          <OrderSummary items={items} total={total} />
        </div>
      </div>
    </main>;
}