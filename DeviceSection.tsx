import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Plus, 
  Speaker, 
  Battery, 
  Wifi, 
  WifiOff, 
  Volume2, 
  Download, 
  Unlink,
  AlertTriangle,
  Clock,
  CheckCircle,
  Shield,
  Award,
  Users,
  Star,
  Package,
  Truck,
  IndianRupee,
  Link
} from 'lucide-react';
import { LinkedDevice, SoundBoxOrder } from '../App';

interface DeviceSectionProps {
  linkedDevice: LinkedDevice | null;
  soundBoxOrder: SoundBoxOrder | null;
  onLinkDevice: () => void;
  onUnlinkDevice: () => void;
  onUpdateDevice: (updates: Partial<LinkedDevice>) => void;
  onOrderSoundBox: () => void;
  onViewDelivery: () => void;
}

export function DeviceSection({ 
  linkedDevice, 
  soundBoxOrder,
  onLinkDevice, 
  onUnlinkDevice, 
  onUpdateDevice,
  onOrderSoundBox,
  onViewDelivery
}: DeviceSectionProps) {
  const [testingAlert, setTestingAlert] = useState(false);

  const playTestSound = () => {
    setTestingAlert(true);
    
    // Create audio context for generating test sounds
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Array of different test messages
    const testMessages = [
      "Payment received: Rupees one thousand two hundred fifty",
      "UPI payment successful: Rupees eight hundred ninety nine",
      "Card payment confirmed: Rupees two thousand five hundred",
      "Wallet payment received: Rupees seven hundred fifty",
      "Transaction successful: Rupees three thousand two hundred"
    ];
    
    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    
    // Use speech synthesis for test message
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      // Try to use an Indian English voice if available
      const voices = speechSynthesis.getVoices();
      const indianVoice = voices.find(voice => 
        voice.lang.includes('en-IN') || voice.name.includes('Indian')
      );
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback: Generate a simple beep sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    }
    
    setTimeout(() => {
      setTestingAlert(false);
    }, 3000);
  };

  const handleUpdateFirmware = () => {
    onUpdateDevice({ firmwareVersion: '2.1.5' });
  };

  const formatLastPing = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getOfflineReasonText = (reason?: string) => {
    switch (reason) {
      case 'no-internet':
        return 'Device has no internet connection';
      case 'sim-expired':
        return 'SIM card has expired';
      case 'device-error':
        return 'Device hardware error';
      default:
        return 'Unknown connectivity issue';
    }
  };

  const getOfflineSteps = (reason?: string) => {
    switch (reason) {
      case 'no-internet':
        return [
          'Check if your WiFi router is working',
          'Restart your internet modem',
          'Move device closer to router'
        ];
      case 'sim-expired':
        return [
          'Contact your service provider',
          'Check SIM card expiry date',
          'Renew your data plan'
        ];
      case 'device-error':
        return [
          'Restart the device by unplugging for 10 seconds',
          'Check all cable connections',
          'Contact support if issue persists'
        ];
      default:
        return [
          'Check device power and connections',
          'Restart your internet connection',
          'Contact support if needed'
        ];
    }
  };

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case 'ordered':
        return 'Order Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'pending-payment':
        return 'Payment Pending';
      default:
        return 'Unknown';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending-payment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TrustIndicators = () => (
    <div className="px-4 mb-[21px] space-y-3 mt-[8px] mr-[0px] ml-[0px] p-[0px]">
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Shield className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xs text-gray-600">Bank Grade Security</p>
        </Card>
        
        <Card className="p-3 text-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs text-gray-600">400M+ Users</p>
        </Card>
        
        <Card className="p-3 text-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-xs text-gray-600">RBI Approved</p>
        </Card>
      </div>
      
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-center space-x-3">
          <Star className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-800">Trusted by 50M+ merchants</p>
            <p className="text-sm text-green-700">Join India's largest payments network</p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="px-4 pt-6">
      {/* Device/SoundBox Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="bg-[#4285F4] text-white px-4 py-4 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium">SoundBox</h2>
              <p className="text-blue-100 text-sm">
                {linkedDevice ? 'Device Connected' : 
                 soundBoxOrder ? 'Order Status' : 'Get payment confirmations'}
              </p>
            </div>
            {!linkedDevice && !soundBoxOrder && (
              <Package className="w-6 h-6 text-blue-200" />
            )}
          </div>
        </div>

        <div className="p-4">
          {/* No device and no order - Show ordering option */}
          {!linkedDevice && !soundBoxOrder && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Speaker className="w-10 h-10 text-gray-400" />
              </div>
              
              <h3 className="text-lg text-gray-900 mb-2">Get Your SoundBox</h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                Hear instant payment confirmations and never miss a transaction
              </p>

              {/* Pricing */}
              <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-900">500</span>
                  <span className="text-sm text-blue-700">delivery charge</span>
                </div>
                <p className="text-sm text-blue-800">
                  <strong>100% Refundable</strong> after ₹5,000 transactions
                </p>
              </Card>

              {/* Features */}
              <div className="text-left mb-6 space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Voice confirmations in local language</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Works without internet (SIM based)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Long battery life (7+ days)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Free replacement warranty</span>
                </div>
              </div>

              <Button
                onClick={onOrderSoundBox}
                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
              >
                <Package className="w-4 h-4 mr-2" />
                Get SoundBox - ₹500
              </Button>
            </div>
          )}

          {/* Order placed but not delivered */}
          {soundBoxOrder && soundBoxOrder.status !== 'delivered' && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">SoundBox Order</h3>
                      <p className="text-sm text-gray-600">#{soundBoxOrder.id}</p>
                    </div>
                  </div>
                  <Badge className={getOrderStatusColor(soundBoxOrder.status)}>
                    {getOrderStatusText(soundBoxOrder.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="text-gray-900">{soundBoxOrder.orderDate.toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected Delivery:</span>
                    <span className="text-gray-900">{soundBoxOrder.estimatedDelivery.toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tracking ID:</span>
                    <span className="text-gray-900 font-mono">{soundBoxOrder.trackingId}</span>
                  </div>
                </div>
              </Card>

              <Button
                onClick={onViewDelivery}
                variant="outline"
                className="w-full"
              >
                <Truck className="w-4 h-4 mr-2" />
                Track Delivery
              </Button>
            </div>
          )}

          {/* Order delivered but device not linked */}
          {soundBoxOrder && soundBoxOrder.status === 'delivered' && !linkedDevice && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-lg text-gray-900 mb-2">SoundBox Delivered!</h3>
              <p className="text-gray-600 mb-6">
                Your SoundBox has been delivered. Link it now to start receiving payment confirmations.
              </p>

              <Button
                onClick={onLinkDevice}
                className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
              >
                <Link className="w-4 h-4 mr-2" />
                Link Your SoundBox
              </Button>
            </div>
          )}

          {/* Device linked */}
          {linkedDevice && (
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#4285F4] rounded-lg flex items-center justify-center">
                      <Speaker className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{linkedDevice.name}</h3>
                      <p className="text-sm text-gray-600">{linkedDevice.model}</p>
                      <p className="text-xs text-gray-500 font-mono">{linkedDevice.serialNumber}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge 
                      variant={linkedDevice.status === 'online' ? 'default' : 'destructive'}
                      className={linkedDevice.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {linkedDevice.status === 'online' ? (
                        <Wifi className="w-3 h-3 mr-1" />
                      ) : (
                        <WifiOff className="w-3 h-3 mr-1" />
                      )}
                      {linkedDevice.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </div>

                {/* Device Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Battery className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Battery</span>
                    <span className="text-sm font-medium">{linkedDevice.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Last ping</span>
                    <span className="text-sm font-medium">{formatLastPing(linkedDevice.lastPing)}</span>
                  </div>
                </div>

                {/* Battery Progress */}
                <div className="mb-4">
                  <Progress 
                    value={linkedDevice.batteryLevel} 
                    className="h-2"
                  />
                </div>

                {/* Test Alert Feedback */}
                {testingAlert && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">Playing test message...</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={playTestSound}
                    disabled={linkedDevice.status === 'offline' || testingAlert}
                    className="h-auto py-2"
                  >
                    {testingAlert ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <Volume2 className="w-4 h-4 mr-1" />
                    )}
                    {testingAlert ? 'Testing' : 'Test'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpdateFirmware}
                    disabled={linkedDevice.status === 'offline'}
                    className="h-auto py-2"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Update
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onUnlinkDevice}
                    className="h-auto py-2 text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Unlink className="w-4 h-4 mr-1" />
                    Unlink
                  </Button>
                </div>

                {/* Firmware Version */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Firmware: v{linkedDevice.firmwareVersion}
                  </p>
                </div>
              </Card>

              {/* Troubleshooting Section - Only show if device is offline */}
              {linkedDevice.status === 'offline' && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-orange-900 mb-1">Device Offline</h4>
                        <p className="text-sm text-orange-800">
                          {getOfflineReasonText(linkedDevice.offlineReason)}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-orange-900 mb-2">Troubleshooting Steps:</h5>
                        <ol className="text-sm text-orange-800 space-y-1">
                          {getOfflineSteps(linkedDevice.offlineReason).map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 w-4 h-4 bg-orange-200 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Refund Status */}
              {soundBoxOrder && (
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-blue-900">Delivery Charge Refund</h4>
                      <p className="text-sm text-blue-700">
                        ₹{soundBoxOrder.transactionVolume.toLocaleString('en-IN')} / ₹5,000 processed
                      </p>
                    </div>
                    <Badge variant="outline" className="text-blue-700 border-blue-300">
                      {soundBoxOrder.refundStatus === 'refunded' ? 'Refunded' : 
                       soundBoxOrder.transactionVolume >= 5000 ? 'Eligible' : 'Pending'}
                    </Badge>
                  </div>
                  <Progress 
                    value={(soundBoxOrder.transactionVolume / 5000) * 100} 
                    className="h-2 mt-3"
                  />
                </Card>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Trust and Security Indicators - Only show at bottom when no device linked and no soundbox ordered */}
      {!linkedDevice && !soundBoxOrder && <TrustIndicators />}
    </div>
  );
}