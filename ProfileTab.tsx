import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { QrCode, User, Building, CreditCard, Shield, Phone, Mail, MapPin, Copy, CheckCircle, Edit, Download, Bell } from 'lucide-react';
import { MerchantProfile } from '../App';

interface ProfileTabProps {
  merchantProfile: MerchantProfile;
}

export function ProfileTab({ merchantProfile }: ProfileTabProps) {
  const [copiedQR, setCopiedQR] = useState(false);

  const handleCopyMerchantId = () => {
    navigator.clipboard.writeText(merchantProfile.merchantId);
    setCopiedQR(true);
    setTimeout(() => setCopiedQR(false), 2000);
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Shield className="w-4 h-4 text-orange-600" />;
      case 'rejected':
        return <Shield className="w-4 h-4 text-red-600" />;
      default:
        return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="px-4 pt-6 pb-6">
      {/* Header */}
      <div className="bg-[#4285F4] text-white px-4 py-6 rounded-t-xl">
        <h1>Profile</h1>
        <p className="text-blue-100 mt-1">Manage your account</p>
      </div>

      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-4 space-y-6">
        {/* Profile Section */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Personal Information</h3>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${merchantProfile.name}&background=4285F4&color=fff`} />
              <AvatarFallback className="bg-[#4285F4] text-white">
                {merchantProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{merchantProfile.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{merchantProfile.businessName}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{merchantProfile.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{merchantProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{merchantProfile.address}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* KYC Status */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">KYC Verification</h3>
            <Badge className={`${getKycStatusColor(merchantProfile.kycStatus)} border-0`}>
              {getKycStatusIcon(merchantProfile.kycStatus)}
              <span className="ml-1 capitalize">{merchantProfile.kycStatus}</span>
            </Badge>
          </div>
          
          {merchantProfile.kycStatus === 'verified' ? (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Verification Complete</p>
                  <p className="text-sm text-green-700">Your account is fully verified and active</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-orange-800">Verification Pending</p>
                  <p className="text-sm text-orange-700">Complete your KYC to unlock all features</p>
                </div>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Complete KYC
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Bank Information */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Bank Information</h3>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{merchantProfile.bankAccount.bankName}</p>
                <p className="text-sm text-gray-600">{merchantProfile.bankAccount.accountHolderName}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Account Number:</span>
                <span className="text-sm font-mono text-gray-900">{merchantProfile.bankAccount.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">IFSC Code:</span>
                <span className="text-sm font-mono text-gray-900">{merchantProfile.bankAccount.ifscCode}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Merchant QR Code */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Merchant QR Code</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
          
          <div className="text-center space-y-4">
            {/* QR Code Placeholder */}
            <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Merchant ID</p>
              <div className="flex items-center justify-center space-x-2">
                <span className="font-mono text-lg text-gray-900">{merchantProfile.merchantId}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyMerchantId}
                  className="p-2"
                >
                  {copiedQR ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 max-w-sm">
              Share this QR code with customers to receive payments directly to your Google Pay merchant account
            </p>
          </div>
        </Card>

        {/* Account Settings */}
        <Card className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Account Settings</h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Privacy & Security
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              <User className="w-4 h-4 mr-2" />
              Deactivate Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}