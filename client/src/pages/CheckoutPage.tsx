import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { DeliveryForm, type DeliveryFormData } from '../components/checkout/DeliveryForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { useCartStore } from '../store/cartStore';

interface CheckoutPageProps {}

export function CheckoutPage({}: CheckoutPageProps) {
  const { items, total } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<DeliveryFormData>>({});
  const navigate = useNavigate();

  const formMethods = useForm<DeliveryFormData>();
  
  // Update form errors when they change
  const handleValidationError = (errors: Array<{ field: string; message: string }>) => {
    const newErrors: FieldErrors<DeliveryFormData> = {};
    
    errors.forEach(error => {
      newErrors[error.field as keyof DeliveryFormData] = {
        type: 'manual',
        message: error.message
      };
    });
    
    setFieldErrors(newErrors);
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const handleOrderSubmit = () => {
    // This will be called when the form is valid
    setIsSubmitting(true);
    try {
      // The actual submission is now handled by the OrderSummary component
      // which will open WhatsApp directly
    } finally {
      setIsSubmitting(false);
    }
  };

  const onOrderButtonClick = async () => {
    // First trigger form validation on all fields
    const isValid = await formMethods.trigger(undefined, { shouldFocus: true });
    
    if (isValid) {
      // If form is valid, handle the order submission
      handleOrderSubmit();
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

  return (
    <main className="flex-grow py-8 px-4 bg-amber-50">
      <div className="container mx-auto max-w-6xl px-0 sm:px-4">
        <h1 className="text-3xl font-bold text-amber-800 mb-8 text-center px-4 sm:px-0">
          Finalizar Compra
        </h1>
        <form onSubmit={onFormSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 md:gap-8 w-full">
            <div className="w-full bg-white p-4 sm:p-8 rounded-lg shadow-md">
              <DeliveryForm formMethods={formMethods} errors={fieldErrors} />
            </div>
            <div className="w-full">
              <div className="sticky top-24">
                <OrderSummary 
                  items={items} 
                  total={total} 
                  onSubmit={onOrderButtonClick}
                  isSubmitting={isSubmitting}
                  onValidationError={handleValidationError}
                  deliveryInfo={{
                    name: formMethods.watch('name') || '',
                    address: formMethods.watch('address') || '',
                    phone: formMethods.watch('phone') || '',
                    notes: formMethods.watch('notes') || ''
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

    </main>
  );
}