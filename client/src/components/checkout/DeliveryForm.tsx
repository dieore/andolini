import { useEffect } from 'react';
import { UseFormReturn, FieldErrors } from 'react-hook-form';
import { Map } from './Map';
import { useUserStore } from '../../store/userStore';

export interface DeliveryFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface DeliveryFormProps {
  formMethods: UseFormReturn<DeliveryFormData>;
  errors: FieldErrors<DeliveryFormData>;
}

export function DeliveryForm({ formMethods, errors: propErrors }: DeliveryFormProps) {
  const { user } = useUserStore();
  const { register, formState: { errors: formErrors }, setValue, clearErrors } = formMethods;
  
  // Combine form validation errors with our custom errors
  const mergedErrors = { ...formErrors, ...propErrors };

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      // You might want to store these in the user profile later
      setValue('phone', '');
      setValue('address', '');
      setValue('notes', '');
    }
  }, [user, setValue]);

  // No need for separate validation here as it's handled by the parent

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-amber-800 mb-6">
          Información de Entrega
        </h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">
              Nombre Completo *
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Este campo es obligatorio' })}
              className={`w-full px-3 py-2 border rounded-md ${mergedErrors.name ? 'border-red-500' : 'border-amber-200'}`}
              disabled={!!user}
              onFocus={() => clearErrors('name')}
            />
            {mergedErrors.name && (
              <p className="mt-1 text-sm text-red-600">{String(mergedErrors.name.message)}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
              Email *
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              className={`w-full px-3 py-2 border rounded-md ${mergedErrors.email ? 'border-red-500' : 'border-amber-200'}`}
              disabled={!!user}
              onFocus={() => clearErrors('email')}
            />
            {mergedErrors.email && (
              <p className="mt-1 text-sm text-red-600">{String(mergedErrors.email.message)}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-amber-800 mb-1">
              Teléfono *
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[0-9+\-\s()]*$/,
                  message: 'Número de teléfono inválido',
                },
              })}
              className={`w-full px-3 py-2 border rounded-md ${mergedErrors.phone ? 'border-red-500' : 'border-amber-200'}`}
              onFocus={() => clearErrors('phone')}
            />
            {mergedErrors.phone && (
              <p className="mt-1 text-sm text-red-600">{String(mergedErrors.phone.message)}</p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-amber-800 mb-1">
              Dirección de Entrega *
            </label>
            <input
              id="address"
              type="text"
              {...register('address', { required: 'Este campo es obligatorio' })}
              className={`w-full px-3 py-2 border rounded-md ${mergedErrors.address ? 'border-red-500' : 'border-amber-200'}`}
              onFocus={() => clearErrors('address')}
            />
            {mergedErrors.address && (
              <p className="mt-1 text-sm text-red-600">{String(mergedErrors.address.message)}</p>
            )}
          </div>

          <div className="h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
            <Map />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Área de cobertura de entrega
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-amber-800 mb-1">
              Notas adicionales (opcional)
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="w-full px-3 py-2 border border-amber-200 rounded-md"
              placeholder="Indicaciones especiales para la entrega"
            />
          </div>
        </div>
      </div>
    </div>
  );
}