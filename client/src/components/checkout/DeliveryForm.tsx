import React from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import { Map } from './Map';
interface DeliveryFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}
export function DeliveryForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<DeliveryFormData>();
  const onSubmit = (data: DeliveryFormData) => {
    console.log(data);
  };
  return <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-amber-800 mb-6">
        Información de Entrega
      </h2>
      <div className="mb-6">
        <GoogleLogin onSuccess={credentialResponse => {
        console.log(credentialResponse);
      }} onError={() => {
        console.log('Login Failed');
      }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-amber-800 mb-1">
            Nombre completo
          </label>
          <input {...register('name', {
          required: 'Este campo es requerido'
        })} type="text" id="name" className="w-full p-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-amber-800 mb-1">
            Email
          </label>
          <input {...register('email', {
          required: 'Este campo es requerido',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        })} type="email" id="email" className="w-full p-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-amber-800 mb-1">
            Teléfono
          </label>
          <input {...register('phone', {
          required: 'Este campo es requerido'
        })} type="tel" id="phone" className="w-full p-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-amber-800 mb-1">
            Selecciona ubicación de entrega
          </label>
          <div className="h-64 rounded-md overflow-hidden border border-amber-200">
            <Map />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-amber-800 mb-1">
            Dirección detallada
          </label>
          <textarea {...register('address', {
          required: 'Este campo es requerido'
        })} id="address" rows={3} className="w-full p-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          {errors.address && <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>}
        </div>
        <div>
          <label htmlFor="notes" className="block text-amber-800 mb-1">
            Notas adicionales
          </label>
          <textarea {...register('notes')} id="notes" rows={2} className="w-full p-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
      </form>
    </div>;
}