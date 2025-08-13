import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowLeft, Speaker, Check } from 'lucide-react';
import { DeviceInfo } from '../App';

interface ConfirmDeviceProps {
  device: DeviceInfo;
  onNext: () => void;
}

export function ConfirmDevice({ device, onNext }: ConfirmDeviceProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6">
        <h1 className="text-xl font-medium">Confirm Device</h1>
        <p className="text-blue-100 mt-1">Verify device details</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-3">
            Device Detected
          </h2>
          <p className="text-gray-600 mb-6">
            Please confirm the details of your SmartSpeaker
          </p>

          {/* Device Card */}
          <Card className="p-6 border-2 border-green-200 bg-green-50">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-[#4285F4] rounded-lg flex items-center justify-center">
                <Speaker className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{device.name}</h3>
                  <Check className="w-5 h-5 text-green-600 ml-2" />
                </div>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Model:</span>
                    <span className="text-sm text-gray-900 ml-2">{device.model}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Serial Number:</span>
                    <span className="text-sm text-gray-900 ml-2 font-mono">{device.serialNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Device capabilities */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Device Features</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Payment confirmation announcements</li>
              <li>• Voice-guided transaction verification</li>
              <li>• Real-time payment notifications</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
        >
          Link Device
        </Button>
      </div>

      {/* Bottom note */}
      <div className="px-6 pb-6">
        <p className="text-xs text-gray-500 text-center">
          By linking this device, you agree to receive payment notifications
        </p>
      </div>
    </div>
  );
}