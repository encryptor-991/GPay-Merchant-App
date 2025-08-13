import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ArrowLeft, MapPin, Package, Phone, User } from 'lucide-react';
import { SoundBoxOrder } from '../App';

interface AddressCollectionProps {
  onNext: (address: SoundBoxOrder['deliveryAddress']) => void;
  onBack: () => void;
}

export function AddressCollection({ onNext, onBack }: AddressCollectionProps) {
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!address.name.trim()) newErrors.name = 'Name is required';
    if (!address.phone.trim()) newErrors.phone = 'Phone number is required';
    if (address.phone.length < 10) newErrors.phone = 'Phone number must be 10 digits';
    if (!address.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.state.trim()) newErrors.state = 'State is required';
    if (!address.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (address.pincode.length !== 6) newErrors.pincode = 'Pincode must be 6 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(address);
    }
  };

  const updateAddress = (field: string, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const GooglePayHeader = () => (
    <div className="bg-[#4285F4] text-white px-4 py-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-blue-600 mr-2 p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#4285F4] font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-lg font-medium">Delivery Address</h1>
            <p className="text-blue-100 text-sm">Where should we deliver your SoundBox?</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <GooglePayHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* Delivery info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900">Free Delivery</p>
              <p className="text-sm text-blue-700">Delivered within 2-3 business days</p>
            </div>
          </div>
        </Card>

        {/* Address Form */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Delivery Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter full name"
                value={address.name}
                onChange={(e) => updateAddress('name', e.target.value)}
                className={errors.name ? 'border-red-300' : ''}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={address.phone}
                onChange={(e) => updateAddress('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={errors.phone ? 'border-red-300' : ''}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Address Line 1
              </label>
              <Input
                type="text"
                placeholder="House/Shop number, Street name"
                value={address.addressLine1}
                onChange={(e) => updateAddress('addressLine1', e.target.value)}
                className={errors.addressLine1 ? 'border-red-300' : ''}
              />
              {errors.addressLine1 && <p className="text-red-600 text-sm mt-1">{errors.addressLine1}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Line 2 (Optional)
              </label>
              <Input
                type="text"
                placeholder="Landmark, Area"
                value={address.addressLine2}
                onChange={(e) => updateAddress('addressLine2', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <Input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => updateAddress('city', e.target.value)}
                  className={errors.city ? 'border-red-300' : ''}
                />
                {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <Input
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => updateAddress('state', e.target.value)}
                  className={errors.state ? 'border-red-300' : ''}
                />
                {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={address.pincode}
                onChange={(e) => updateAddress('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={errors.pincode ? 'border-red-300' : ''}
              />
              {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>
        </Card>

        {/* Order summary */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Google Pay SoundBox</span>
              <span className="text-gray-900">₹0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Charge</span>
              <span className="text-gray-900">₹500</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-medium text-gray-900">₹500</span>
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Refund Guarantee:</strong> ₹500 will be refunded after ₹5,000 transactions
            </p>
          </div>
        </Card>
      </div>

      {/* Submit button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-4 h-auto"
        >
          <Package className="w-5 h-5 mr-2" />
          Place Order - ₹500
        </Button>
      </div>
    </div>
  );
}