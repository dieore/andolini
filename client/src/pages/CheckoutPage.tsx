import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DeliveryForm, type DeliveryFormData } from '../components/checkout/DeliveryForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { OrderConfirmationModal } from '../components/OrderConfirmationModal';
import { useCartStore } from '../store/cartStore';

export function CheckoutPage() {
  const { items, total } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<DeliveryFormData | null>(null);
  const navigate = useNavigate();

  const formMethods = useForm<DeliveryFormData>();

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleOrderSubmit = (formData: DeliveryFormData) => {
    // This will be called when the form is valid
    setIsSubmitting(true);
    try {
      // Store the form data in state for the confirmation modal
      setConfirmationData(formData);
      // Show confirmation modal
      setShowConfirmation(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOrderButtonClick = async () => {
    // First trigger form validation on all fields
    const isValid = await formMethods.trigger(undefined, { shouldFocus: true });
    
    if (isValid) {
      // If form is valid, get the values and submit
      const formData = formMethods.getValues();
      handleOrderSubmit(formData);
    } else {
      // If form is invalid, scroll to the first error
      const errorElement = document.querySelector('.border-red-500');
      errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderButtonClick();
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <main className="flex-grow py-8 px-4 bg-amber-50">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center">
          Finalizar Compra
        </h1>
        <form onSubmit={onFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <DeliveryForm formMethods={formMethods} />
            </div>
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items} 
                total={total} 
                onSubmit={onOrderButtonClick}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>

      <OrderConfirmationModal 
        isOpen={showConfirmation} 
        onClose={closeConfirmation} 
        orderDetails={{
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total,
          deliveryInfo: {
            name: confirmationData?.name || '',
            address: confirmationData?.address || '',
            phone: confirmationData?.phone || '',
            notes: confirmationData?.notes || ''
          }
        }}
      />
    </main>
  );
}