import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle, Speaker, Volume2, Shield } from 'lucide-react';

interface LinkingSuccessProps {
  onComplete: () => void;
}

export function LinkingSuccess({ onComplete }: LinkingSuccessProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6">
        <h1 className="text-xl font-medium">Device Linked</h1>
        <p className="text-blue-100 mt-1">Setup complete</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        {/* Success icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success message */}
        <h2 className="text-xl font-medium text-gray-900 mb-3 text-center">
          SmartSpeaker Linked Successfully!
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-sm">
          Your SmartSpeaker is now linked and ready to receive payment confirmations
        </p>

        {/* Feature cards */}
        <div className="w-full space-y-3 mb-8">
          <Card className="p-4 border-l-4 border-l-green-500">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Payment Announcements</p>
                <p className="text-sm text-gray-600">Hear transaction details instantly</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-blue-500">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Secure Verification</p>
                <p className="text-sm text-gray-600">Confirm payments with confidence</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-purple-500">
            <div className="flex items-center space-x-3">
              <Speaker className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Real-time Notifications</p>
                <p className="text-sm text-gray-600">Get instant payment updates</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Next steps */}
        <Card className="w-full p-4 bg-blue-50 border-blue-200 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">What's Next?</h4>
          <p className="text-sm text-gray-600">
            Your SmartSpeaker will now announce payment confirmations whenever customers make payments. Test it with your next transaction!
          </p>
        </Card>

        {/* CTA Button */}
        <Button
          onClick={onComplete}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
        >
          Go to Device Management
        </Button>
      </div>
    </div>
  );
}