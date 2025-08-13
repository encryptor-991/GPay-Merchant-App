import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Smartphone, Clock } from 'lucide-react';

interface PhoneVerificationProps {
  onNext: () => void;
}

export function PhoneVerification({ onNext }: PhoneVerificationProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [step, countdown]);

  const handleSendOTP = () => {
    if (phoneNumber.trim()) {
      setStep('otp');
    }
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') { // Mock OTP verification
      onNext();
    } else {
      alert('Invalid OTP. Try 123456 for demo.');
    }
  };

  const handleResendOTP = () => {
    setCountdown(30);
    setCanResend(false);
  };

  if (step === 'otp') {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="bg-[#4285F4] text-white px-4 py-6">
          <h1 className="text-xl font-medium">Verify Phone Number</h1>
          <p className="text-blue-100 mt-1">Enter verification code</p>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8">
          <div className="mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Smartphone className="w-8 h-8 text-[#4285F4]" />
            </div>

            <h2 className="text-lg font-medium text-gray-900 mb-3 text-center">
              Verification Code Sent
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Enter the 6-digit code sent to<br />
              <span className="font-medium">{phoneNumber}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                />
              </div>

              {/* Resend timer */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Resend code in {countdown}s
                  </p>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleResendOTP}
                    className="text-[#4285F4] hover:text-[#3367D6] text-sm"
                  >
                    Resend Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleVerifyOTP}
            disabled={otp.length !== 6}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Verify & Link Device
          </Button>
        </div>

        {/* Demo hint */}
        <Card className="mx-6 mb-6 p-4 bg-yellow-50 border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Demo:</strong> Use verification code "123456" to continue
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6">
        <h1 className="text-xl font-medium">Phone Verification</h1>
        <p className="text-blue-100 mt-1">Verify your phone number</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Smartphone className="w-8 h-8 text-[#4285F4]" />
          </div>

          <h2 className="text-lg font-medium text-gray-900 mb-3 text-center">
            Verify Your Phone Number
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            We'll send a verification code to confirm your identity and link the SmartSpeaker to your account
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Why do we need this?</h4>
            <p className="text-sm text-gray-600">
              Your phone number is used to verify that you're the authorized merchant linking this SmartSpeaker to prevent unauthorized access.
            </p>
          </div>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={!phoneNumber.trim()}
          className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
        >
          Send Verification Code
        </Button>
      </div>
    </div>
  );
}