

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    items: Array<{ name: string; quantity: number; price: number }>;
    total: number;
    deliveryInfo: {
      name: string;
      address: string;
      phone: string;
      notes: string;
    };
  };
}

export function OrderConfirmationModal({ isOpen, onClose, orderDetails }: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  const { items, total, deliveryInfo } = orderDetails;
  
  // Format items for WhatsApp message
  const formatItems = items.map(
    item => `${item.quantity}x ${item.name} - $${item.price.toFixed(2)}`
  ).join('%0A');
  
  const whatsappMessage = `*Nuevo Pedido*%0A%0A` +
    `*Productos:*%0A${formatItems}%0A%0A` +
    `*Total: $${total.toFixed(2)}*%0A%0A` +
    `*Datos de entrega*%0A` +
    `Nombre: ${deliveryInfo.name}%0A` +
    `Dirección: ${deliveryInfo.address}%0A` +
    `Teléfono: ${deliveryInfo.phone}%0A` +
    (deliveryInfo.notes ? `Notas: ${deliveryInfo.notes}%0A` : '') + 
    `%0A¿Podrías confirmar el pedido?`;
  
  const whatsappUrl = `https://wa.me/543413181724?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">¡Pedido Listo!</h2>
        
        <div className="mb-6">
          <p className="mb-4">¿Deseas enviar el pedido por WhatsApp o prefieres pagar con Mercado Pago?</p>
          
          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded text-center"
              onClick={onClose}
            >
              Enviar por WhatsApp
            </a>
            
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
              onClick={() => {
                // TODO: Implement Mercado Pago integration
                alert('Próximamente: Integración con Mercado Pago');
              }}
            >
              Pagar con Mercado Pago
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-amber-800"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
