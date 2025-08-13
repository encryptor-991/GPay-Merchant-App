import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Package, IndianRupee, CheckCircle, Speaker, Wifi, Battery, Volume2 } from 'lucide-react';

interface SoundBoxOrderProps {
  onNext: () => void;
  onBack: () => void;
}

export function SoundBoxOrder({ onNext, onBack }: SoundBoxOrderProps) {
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
            <h1 className="text-lg font-medium">Get SoundBox</h1>
            <p className="text-blue-100 text-sm">Payment confirmation device</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <GooglePayHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* Product showcase */}
        <Card className="p-6 text-center">
          <div className="w-32 h-32 bg-[#4285F4] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Speaker className="w-16 h-16 text-white" />
          </div>
          
          <h2 className="text-2xl text-gray-900 mb-2">Google Pay SoundBox</h2>
          <p className="text-gray-600 mb-6">
            Never miss a payment with instant voice confirmations
          </p>

          {/* Pricing */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <IndianRupee className="w-6 h-6 text-blue-600" />
              <span className="text-3xl font-bold text-blue-900">500</span>
            </div>
            <p className="text-blue-800 font-medium">Delivery Charge</p>
            <p className="text-sm text-blue-700 mt-2">
              <strong>100% Refundable</strong> after processing ₹5,000 in transactions
            </p>
          </div>

          {/* What's included */}
          <div className="text-left">
            <h3 className="font-medium text-gray-900 mb-4">What's Included:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">SoundBox device with SIM card</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Charging cable and adapter</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">Quick setup guide</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">1 year replacement warranty</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Volume2 className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Voice Alerts</p>
              <p className="text-xs text-gray-600">11 local languages</p>
            </div>
            
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">No Internet</p>
              <p className="text-xs text-gray-600">Works with SIM</p>
            </div>
            
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Battery className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Long Battery</p>
              <p className="text-xs text-gray-600">7+ days backup</p>
            </div>
            
            <div className="text-center p-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-sm font-medium text-gray-900">Free Setup</p>
              <p className="text-xs text-gray-600">Plug & play</p>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-medium text-green-800 mb-3">Why Merchants Love SoundBox</h3>
          <div className="space-y-2 text-sm text-green-700">
            <p>• Confirm payments instantly without checking phone</p>
            <p>• Reduce fake payment screenshots and disputes</p>
            <p>• Works even during network issues</p>
            <p>• Customers feel more confident about payments</p>
            <p>• Increase business efficiency and trust</p>
          </div>
        </Card>

        {/* Refund policy */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Refund Policy</h3>
          <p className="text-sm text-blue-700">
            The ₹500 delivery charge will be automatically refunded to your bank account 
            once you process ₹5,000 worth of transactions through your SoundBox. 
            This typically happens within 2-3 weeks for active merchants.
          </p>
        </Card>
      </div>

      {/* Order button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button
          onClick={onNext}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-4 h-auto"
        >
          <Package className="w-5 h-5 mr-2" />
          Order SoundBox - ₹500
        </Button>
      </div>
    </div>
  );
}