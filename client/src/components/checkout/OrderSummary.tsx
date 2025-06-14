import { CartItem } from '../../store/cartStore';
import { Loader2 } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function OrderSummary({ items, total, onSubmit, isSubmitting }: OrderSummaryProps) {
  const deliveryFee = 5.99;
  const finalTotal = total + deliveryFee;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-amber-800 mb-6">
        Resumen del Pedido
      </h2>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-2 border-b border-amber-100">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-grow">
              <h4 className="text-amber-900 font-medium">{item.name}</h4>
              <div className="flex items-center justify-between">
                <p className="text-amber-800">
                  {item.quantity} x ${item.price.toFixed(2)}
                </p>
                <p className="font-medium text-amber-900">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-2 border-t border-amber-100 pt-4">
        <div className="flex justify-between text-amber-800">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-amber-800">
          <span>Envío</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-amber-900 border-t border-amber-100 pt-2">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`w-full mt-4 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Procesando...
          </>
        ) : (
          'Confirmar Pedido'
        )}
      </button>
    </div>
  );
}