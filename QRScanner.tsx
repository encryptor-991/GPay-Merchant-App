import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowLeft, Camera, Hash } from 'lucide-react';
import { DeviceInfo } from '../App';

interface QRScannerProps {
  onNext: (device: DeviceInfo) => void;
}

export function QRScanner({ onNext }: QRScannerProps) {
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');

  const handleQRDetected = () => {
    // Simulate QR code detection
    const mockDevice: DeviceInfo = {
      name: 'Google SmartSpeaker Pro',
      model: 'GSP-2024',
      serialNumber: 'GSP240187392'
    };
    onNext(mockDevice);
  };

  const handleManualEntry = () => {
    if (serialNumber.trim()) {
      const mockDevice: DeviceInfo = {
        name: 'Google SmartSpeaker',
        model: 'GS-2024',
        serialNumber: serialNumber.trim()
      };
      onNext(mockDevice);
    }
  };

  if (showManualEntry) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#4285F4] text-white px-4 py-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowManualEntry(false)}
              className="text-white hover:bg-blue-600 mr-2 p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-medium">Enter Serial Number</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-3">
              Device Serial Number
            </h2>
            <p className="text-gray-600 mb-6">
              Enter the serial number found on the back of your SmartSpeaker
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number
                </label>
                <Input
                  type="text"
                  placeholder="Enter serial number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  className="text-base"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleManualEntry}
            disabled={!serialNumber.trim()}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6">
        <h1 className="text-xl font-medium">Scan Device QR Code</h1>
        <p className="text-blue-100 mt-1">Point camera at QR code on device</p>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 relative bg-black">
        {/* Mock camera feed */}
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white text-center">
            <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-300">Camera viewfinder</p>
          </div>
        </div>

        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Scanning frame */}
            <div className="w-64 h-64 border-2 border-white relative">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#4285F4]"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#4285F4]"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#4285F4]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#4285F4]"></div>
              
              {/* Scanning line */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#4285F4] shadow-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Instructions overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="text-center text-white">
            <p className="text-lg mb-2">Position QR code in the frame</p>
            <p className="text-gray-300 text-sm">The QR code is located on the back of your device</p>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="bg-white px-6 py-6 space-y-3">
        {/* Simulate QR detection button for demo */}
        <Button
          onClick={handleQRDetected}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
        >
          Simulate QR Detection
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowManualEntry(true)}
          className="w-full border-gray-300 text-gray-700 py-3 h-auto"
        >
          <Hash className="w-4 h-4 mr-2" />
          Enter Serial Number
        </Button>
      </div>
    </div>
  );
}