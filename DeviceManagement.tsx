import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
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
  Router,
  CreditCard,
  Clock,
  CheckCircle
} from 'lucide-react';
import { LinkedDevice } from '../App';

interface DeviceManagementProps {
  linkedDevices: LinkedDevice[];
  onLinkNew: () => void;
  onUnlinkDevice: (deviceId: string) => void;
  onUpdateDevice: (deviceId: string, updates: Partial<LinkedDevice>) => void;
}

export function DeviceManagement({ linkedDevices, onLinkNew, onUnlinkDevice, onUpdateDevice }: DeviceManagementProps) {
  const [testingAlert, setTestingAlert] = useState<string | null>(null);

  const handleTestAlert = (deviceId: string) => {
    setTestingAlert(deviceId);
    // Simulate alert test
    setTimeout(() => {
      setTestingAlert(null);
    }, 2000);
  };

  const handleUpdateFirmware = (deviceId: string) => {
    onUpdateDevice(deviceId, { firmwareVersion: '2.1.5' });
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

  // Empty state
  if (linkedDevices.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#4285F4] text-white px-4 py-6">
          <h1>Device Management</h1>
          <p className="text-blue-100 mt-1">Manage your SmartSpeakers</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Empty state illustration */}
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <Speaker className="w-16 h-16 text-gray-400" />
          </div>

          {/* Empty state text */}
          <h2 className="text-xl text-gray-900 mb-3 text-center">
            No devices linked yet
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-sm">
            Link your first SmartSpeaker to start receiving payment confirmations
          </p>

          {/* CTA Button */}
          <Button
            onClick={onLinkNew}
            className="bg-[#4285F4] hover:bg-[#3367D6] text-white px-8 py-6 h-auto rounded-lg shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Link a New SmartSpeaker
          </Button>
        </div>

        {/* Bottom text */}
        <div className="px-6 pb-8">
          <p className="text-xs text-gray-500 text-center">
            SmartSpeakers help verify payments by announcing transaction details
          </p>
        </div>
      </div>
    );
  }

  // Device management state
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1>Device Management</h1>
            <p className="text-blue-100 mt-1">{linkedDevices.length} device{linkedDevices.length !== 1 ? 's' : ''} linked</p>
          </div>
          <Button
            onClick={onLinkNew}
            variant="ghost"
            className="text-white hover:bg-blue-600 p-2"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {linkedDevices.map((device) => (
          <div key={device.id} className="space-y-4">
            {/* Device Card */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-[#4285F4] rounded-lg flex items-center justify-center">
                    <Speaker className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{device.name}</h3>
                    <p className="text-sm text-gray-600">{device.model}</p>
                    <p className="text-xs text-gray-500 font-mono">{device.serialNumber}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge 
                    variant={device.status === 'online' ? 'default' : 'destructive'}
                    className={device.status === 'online' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {device.status === 'online' ? (
                      <Wifi className="w-3 h-3 mr-1" />
                    ) : (
                      <WifiOff className="w-3 h-3 mr-1" />
                    )}
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </div>

              {/* Device Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Battery className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Battery</span>
                  <span className="text-sm font-medium">{device.batteryLevel}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Last ping</span>
                  <span className="text-sm font-medium">{formatLastPing(device.lastPing)}</span>
                </div>
              </div>

              {/* Battery Progress */}
              <div className="mb-4">
                <Progress 
                  value={device.batteryLevel} 
                  className="h-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTestAlert(device.id)}
                  disabled={device.status === 'offline' || testingAlert === device.id}
                  className="h-auto py-2"
                >
                  {testingAlert === device.id ? (
                    <CheckCircle className="w-4 h-4 mr-1" />
                  ) : (
                    <Volume2 className="w-4 h-4 mr-1" />
                  )}
                  {testingAlert === device.id ? 'Testing' : 'Test Alert'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateFirmware(device.id)}
                  disabled={device.status === 'offline'}
                  className="h-auto py-2"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Update
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUnlinkDevice(device.id)}
                  className="h-auto py-2 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Unlink className="w-4 h-4 mr-1" />
                  Unlink
                </Button>
              </div>

              {/* Firmware Version */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Firmware: v{device.firmwareVersion}
                </p>
              </div>
            </Card>

            {/* Troubleshooting Section - Only show if device is offline */}
            {device.status === 'offline' && (
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-orange-900 mb-1">Device Offline</h4>
                      <p className="text-sm text-orange-800">
                        {getOfflineReasonText(device.offlineReason)}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-orange-900 mb-2">Troubleshooting Steps:</h5>
                      <ol className="text-sm text-orange-800 space-y-1">
                        {getOfflineSteps(device.offlineReason).map((step, index) => (
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
          </div>
        ))}

        {/* Add New Device Button */}
        <Card className="p-4 border-dashed border-2 border-gray-200">
          <Button
            onClick={onLinkNew}
            variant="ghost"
            className="w-full h-16 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Link Another SmartSpeaker
          </Button>
        </Card>
      </div>
    </div>
  );
}