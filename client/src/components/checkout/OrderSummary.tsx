import { CartItem } from '../../store/cartStore';
import { Loader2 } from 'lucide-react';
// No need for local state as we're using form state for errors now

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
  onSubmit: () => void;
  isSubmitting: boolean;
  deliveryInfo?: {
    name: string;
    address: string;
    phone: string;
    notes: string;
  };
  onValidationError?: (errors: Array<{ field: string; message: string }>) => void;
}

export function OrderSummary({ items, total, onSubmit, isSubmitting, deliveryInfo, onValidationError }: OrderSummaryProps) {
  const deliveryFee = 5.99;
  const finalTotal = total + deliveryFee;
  // Errors are now handled by the form state in the parent component
  
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!deliveryInfo) {
      console.error('Delivery information is missing');
      return;
    }

    // Validate required fields
    const newErrors: Array<{ field: string; message: string }> = [];
    
    if (!deliveryInfo.name?.trim()) {
      newErrors.push({ field: 'name', message: 'El nombre es requerido' });
    }
    if (!deliveryInfo.address?.trim()) {
      newErrors.push({ field: 'address', message: 'La dirección es requerida' });
    }
    if (!deliveryInfo.phone?.trim()) {
      newErrors.push({ field: 'phone', message: 'El teléfono es requerido' });
    }

    if (newErrors.length > 0) {
      onValidationError?.(newErrors);
      
      // Focus the first field with error
      const firstErrorField = newErrors[0].field;
      const inputElement = document.querySelector(`[name="${firstErrorField}"]`) as HTMLInputElement;
      inputElement?.focus();
      
      // Scroll to the first error
      inputElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      return;
    }
    
    // Format items for WhatsApp message
    const formatItems = items.map(
      item => `${item.quantity}x ${item.name} - $${item.price.toFixed(2)}`
    ).join('%0A');
    
    // Create WhatsApp message
    const whatsappMessage = `*Nuevo Pedido*%0A%0A` +
      `*Productos:*%0A${formatItems}%0A%0A` +
      `*Total: $${finalTotal.toFixed(2)}*%0A%0A` +
      `*Datos de entrega*%0A` +
      `Nombre: ${deliveryInfo.name}%0A` +
      `Dirección: ${deliveryInfo.address}%0A` +
      `Teléfono: ${deliveryInfo.phone}%0A` +
      (deliveryInfo.notes?.trim() ? `Notas: ${deliveryInfo.notes}%0A` : '') + 
      `%0A¿Podrías confirmar el pedido?`;
    
    // Open WhatsApp
    window.open(`https://wa.me/543413181724?text=${whatsappMessage}`, '_blank');
    
    // Call the original onSubmit if needed
    onSubmit();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
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
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <h3 className="font-medium text-amber-800">Método de pago</h3>
          <div className="p-3 border rounded-lg bg-amber-50">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full border-2 border-amber-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
              </div>
              <span>Efectivo al recibir</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Procesando...
            </>
          ) : (
            'Enviar pedido por WhatsApp'
          )}
        </button>
      </div>
    </div>
  );
}