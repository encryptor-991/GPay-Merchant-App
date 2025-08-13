import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin,
  Phone,
  Copy,
  Link
} from 'lucide-react';
import { SoundBoxOrder } from '../App';

interface DeliveryTrackingProps {
  order: SoundBoxOrder;
  onBack: () => void;
  onLinkDevice: () => void;
  onUpdateOrder: (updates: Partial<SoundBoxOrder>) => void;
}

export function DeliveryTracking({ order, onBack, onLinkDevice, onUpdateOrder }: DeliveryTrackingProps) {
  const [copiedTracking, setCopiedTracking] = React.useState(false);

  // Simulate delivery progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (order.status === 'ordered') {
        setTimeout(() => {
          onUpdateOrder({ status: 'shipped' });
        }, 5000); // After 5 seconds, mark as shipped
      } else if (order.status === 'shipped') {
        setTimeout(() => {
          onUpdateOrder({ status: 'delivered' });
        }, 10000); // After 10 more seconds, mark as delivered
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [order.status, onUpdateOrder]);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(order.trackingId);
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2000);
  };

  const getStatusProgress = () => {
    switch (order.status) {
      case 'ordered':
        return 25;
      case 'shipped':
        return 75;
      case 'delivered':
        return 100;
      default:
        return 0;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'ordered':
        return 'Order Confirmed';
      case 'shipped':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrackingSteps = () => {
    const steps = [
      {
        id: 'ordered',
        title: 'Order Confirmed',
        description: 'Your SoundBox order has been confirmed',
        time: order.orderDate.toLocaleString('en-IN'),
        completed: true
      },
      {
        id: 'shipped',
        title: 'Shipped',
        description: 'Your SoundBox is on the way',
        time: order.status === 'shipped' || order.status === 'delivered' ? 'In Transit' : 'Pending',
        completed: order.status === 'shipped' || order.status === 'delivered'
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'SoundBox delivered successfully',
        time: order.status === 'delivered' ? 'Just delivered' : `Expected: ${order.estimatedDelivery.toLocaleDateString('en-IN')}`,
        completed: order.status === 'delivered'
      }
    ];

    return steps;
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
            <h1 className="text-lg font-medium">Track Delivery</h1>
            <p className="text-blue-100 text-sm">SoundBox Order #{order.id}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <GooglePayHeader />
      
      <div className="px-4 py-6 space-y-6">
        {/* Order Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#4285F4] rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Google Pay SoundBox</h3>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
              </div>
            </div>
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{getStatusProgress()}%</span>
            </div>
            <Progress value={getStatusProgress()} className="h-2" />
          </div>

          {/* Tracking ID */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-600">Tracking ID</p>
              <p className="font-mono text-gray-900">{order.trackingId}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyTrackingId}
              className="p-2"
            >
              {copiedTracking ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-3">Delivery Address</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">{order.deliveryAddress.name}</p>
              <p className="text-sm text-gray-600">{order.deliveryAddress.phone}</p>
              <p className="text-sm text-gray-600 mt-1">
                {order.deliveryAddress.addressLine1}
                {order.deliveryAddress.addressLine2 && `, ${order.deliveryAddress.addressLine2}`}
              </p>
              <p className="text-sm text-gray-600">
                {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>
        </Card>

        {/* Tracking Timeline */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Delivery Timeline</h3>
          <div className="space-y-4">
            {getTrackingSteps().map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  {index < getTrackingSteps().length - 1 && (
                    <div className={`w-0.5 h-8 mt-2 ${
                      step.completed ? 'bg-green-300' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${
                    step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className={`text-sm ${
                    step.completed ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                  <p className={`text-xs mt-1 ${
                    step.completed ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {step.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivered - Link Device CTA */}
        {order.status === 'delivered' && (
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-800">SoundBox Delivered!</h3>
                <p className="text-sm text-green-700">
                  Your SoundBox is ready to use. Link it now to start receiving payment confirmations.
                </p>
              </div>
            </div>
            
            <Button
              onClick={onLinkDevice}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 h-auto"
            >
              <Link className="w-4 h-4 mr-2" />
              Link Your SoundBox Now
            </Button>
          </Card>
        )}

        {/* Support */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700 mb-3">
            Contact our support team for any delivery-related queries
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Support
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Chat with Us
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}