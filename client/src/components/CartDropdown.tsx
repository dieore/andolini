import React from 'react';
import { ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';
export function CartDropdown() {
  const {
    items,
    removeItem,
    total,
    isOpen,
    toggleCart
  } = useCartStore();
  if (!isOpen) return null;
  return <div className="fixed sm:absolute top-16 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-4 mt-2 w-[90vw] sm:w-96 bg-white rounded-lg shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-amber-800">Carrito</h3>
        <button onClick={toggleCart} className="text-amber-800 hover:text-amber-600" aria-label="Cerrar carrito">
          <X size={20} />
        </button>
      </div>
      {items.length === 0 ? <div className="text-center py-6">
          <ShoppingBag className="mx-auto text-amber-300" size={32} />
          <p className="text-amber-800 mt-2">Tu carrito está vacío</p>
        </div> : <>
          <div className="max-h-96 overflow-auto mb-4">
            {items.map(item => <div key={item.id} className="flex items-center gap-4 py-2 border-b border-amber-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-grow">
                  <h4 className="text-amber-900 font-medium">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-amber-800">
                      {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-600" aria-label={`Eliminar ${item.name} del carrito`}>
                      <X size={16} />
                    </button>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="border-t border-amber-100 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-amber-900">Total:</span>
              <span className="font-bold text-amber-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <Link to="/checkout" className="bg-amber-500 hover:bg-amber-600 text-white w-full py-2 rounded-full text-center block transition-colors" onClick={toggleCart}>
              Finalizar Compra
            </Link>
          </div>
        </>}
    </div>;
}