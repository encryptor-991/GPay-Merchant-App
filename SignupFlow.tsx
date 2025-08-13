import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  CheckCircle,
  Upload,
  Shield,
  QrCode,
  ArrowRight,
  Star,
  Gift,
  IndianRupee,
  Building2,
  Lock,
  Download,
  Search,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { MerchantProfile } from '../App';

interface SignupFlowProps {
  onComplete: (profile: MerchantProfile) => void;
}

type SignupStep = 'personal' | 'business' | 'kyc' | 'bank-select' | 'bank-permission' | 'bank-fetch' | 'bank-confirm' | 'complete';

interface BankInfo {
  id: string;
  name: string;
  code: string;
  logo: string;
}

interface FetchedBankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  accountHolderName: string;
  branch: string;
  accountType: string;
}

export function SignupFlow({ onComplete }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState<SignupStep>('personal');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [fetchingProgress, setFetchingProgress] = useState(0);
  const [fetchedBankDetails, setFetchedBankDetails] = useState<FetchedBankDetails | null>(null);
  const [profile, setProfile] = useState<Partial<MerchantProfile>>({
    kycStatus: 'not-started',
    totalTransactionVolume: 0,
    rewardStatus: 'pending'
  });

  const steps = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'business', label: 'Business Info', icon: Building },
    { id: 'kyc', label: 'KYC Verification', icon: Shield },
    { id: 'bank-select', label: 'Bank Selection', icon: Building2 },
    { id: 'bank-permission', label: 'Bank Permission', icon: Lock },
    { id: 'bank-fetch', label: 'Fetch Details', icon: Download },
    { id: 'bank-confirm', label: 'Confirm Details', icon: CheckCircle },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const banks: BankInfo[] = [
    { id: 'sbi', name: 'State Bank of India', code: 'SBI', logo: '🏦' },
    { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC', logo: '🏛️' },
    { id: 'icici', name: 'ICICI Bank', code: 'ICICI', logo: '🏪' },
    { id: 'axis', name: 'Axis Bank', code: 'AXIS', logo: '🏢' },
    { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KOTAK', logo: '🏰' },
    { id: 'pnb', name: 'Punjab National Bank', code: 'PNB', logo: '🏦' },
    { id: 'bob', name: 'Bank of Baroda', code: 'BOB', logo: '🏛️' },
    { id: 'canara', name: 'Canara Bank', code: 'CANARA', logo: '🏪' },
    { id: 'union', name: 'Union Bank of India', code: 'UNION', logo: '🏢' },
    { id: 'indian', name: 'Indian Bank', code: 'INDIAN', logo: '🏰' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateProfile = (updates: Partial<MerchantProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as SignupStep);
    }
  };

  const simulateBankDetailsFetch = () => {
    setCurrentStep('bank-fetch');
    setFetchingProgress(0);

    // Animate progress
    const interval = setInterval(() => {
      setFetchingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate fetched bank details
          const selectedBankInfo = banks.find(b => b.id === selectedBank);
          setFetchedBankDetails({
            accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
            ifscCode: `${selectedBankInfo?.code}0001234`,
            bankName: selectedBankInfo?.name || '',
            accountHolderName: profile.name || '',
            branch: 'Main Branch',
            accountType: 'Savings Account'
          });
          setTimeout(() => {
            setCurrentStep('bank-confirm');
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const confirmBankDetails = () => {
    if (fetchedBankDetails) {
      updateProfile({
        bankAccount: {
          accountNumber: fetchedBankDetails.accountNumber,
          ifscCode: fetchedBankDetails.ifscCode,
          bankName: fetchedBankDetails.bankName,
          accountHolderName: fetchedBankDetails.accountHolderName
        }
      });
    }
    nextStep();
  };

  const completeSignup = () => {
    const completedProfile: MerchantProfile = {
      name: profile.name || '',
      businessName: profile.businessName || '',
      email: profile.email || '',
      phone: profile.phone || '',
      address: profile.address || '',
      merchantId: `GPAY_MERCH_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      kycStatus: 'verified',
      bankAccount: profile.bankAccount,
      isProfileComplete: true,
      totalTransactionVolume: 0,
      rewardStatus: 'pending'
    };
    onComplete(completedProfile);
  };

  const GooglePayLogo = () => (
    <div className="flex items-center space-x-2 mb-6">
      <div className="w-8 h-8 bg-[#4285F4] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">G</span>
      </div>
      <span className="text-xl font-medium text-gray-900">Google Pay</span>
      <span className="text-sm text-gray-600">for Business</span>
    </div>
  );

  const RewardMotivation = () => (
    <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
      <div className="flex items-center space-x-3 mb-3">
        <Gift className="w-6 h-6 text-purple-600" />
        <div>
          <h3 className="font-medium text-purple-900">Special Launch Offer</h3>
          <p className="text-sm text-purple-700">Limited time milestone reward</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-1 mb-3">
        <IndianRupee className="w-5 h-5 text-purple-600" />
        <span className="text-2xl font-bold text-purple-900">500</span>
        <span className="text-sm text-purple-700">cashback reward</span>
      </div>
      
      <p className="text-sm text-purple-800 text-center">
        Complete ₹50,000 in transactions and earn ₹500 directly to your bank account!
      </p>
    </Card>
  );

  if (currentStep === 'personal') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h1 className="text-2xl text-gray-900 mb-2">Welcome to Google Pay Business</h1>
          <p className="text-gray-600 mb-8">Let's set up your merchant account to start accepting payments</p>

          <RewardMotivation />

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={profile.name || ''}
                onChange={(e) => updateProfile({ name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={profile.email || ''}
                onChange={(e) => updateProfile({ email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={profile.phone || ''}
                onChange={(e) => updateProfile({ phone: e.target.value })}
              />
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Secure & Trusted</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your information is protected with bank-grade security and never shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <Button
            onClick={nextStep}
            disabled={!profile.name || !profile.email || !profile.phone}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'business') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h1 className="text-2xl text-gray-900 mb-2">Business Information</h1>
          <p className="text-gray-600 mb-8">Tell us about your business to create your merchant account</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <Input
                type="text"
                placeholder="Your Business Name"
                value={profile.businessName || ''}
                onChange={(e) => updateProfile({ businessName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <Input
                type="text"
                placeholder="Complete business address"
                value={profile.address || ''}
                onChange={(e) => updateProfile({ address: e.target.value })}
              />
            </div>
          </div>

          {/* Business benefits */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">Accept payments from 400M+ Google Pay users</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">Instant settlement to your bank account</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">24/7 customer support for merchants</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-800">Earn ₹500 reward on reaching ₹50,000 transactions</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <Button
            onClick={nextStep}
            disabled={!profile.businessName || !profile.address}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'kyc') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h1 className="text-2xl text-gray-900 mb-2">KYC Verification</h1>
          <p className="text-gray-600 mb-8">Complete your identity verification to activate your merchant account</p>

          {/* KYC Cards */}
          <div className="space-y-4 mb-8">
            <Card className="p-4 border-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Aadhaar Card</p>
                    <p className="text-sm text-gray-600">Upload front and back</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Required
                </Badge>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">PAN Card</p>
                    <p className="text-sm text-gray-600">Business PAN details</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Required
                </Badge>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Upload className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Business License</p>
                    <p className="text-sm text-gray-600">GST or Shop License</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-gray-600 border-gray-200">
                  Optional
                </Badge>
              </div>
            </Card>
          </div>

          {/* Demo KYC completion */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-medium text-green-800">KYC Demo Mode</p>
                <p className="text-sm text-green-700">
                  For demo purposes, KYC verification is automatically approved
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="px-6 pb-8">
          <Button
            onClick={() => {
              updateProfile({ kycStatus: 'verified' });
              nextStep();
            }}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Complete KYC Verification
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'bank-select') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <h1 className="text-2xl text-gray-900 mb-2">Select Your Bank</h1>
          <p className="text-gray-600 mb-8">
            We'll automatically fetch your bank account details using your phone number {profile.phone}
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building2 className="w-4 h-4 inline mr-1" />
              Choose Your Bank
            </label>
            <Select value={selectedBank} onValueChange={setSelectedBank}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your bank" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{bank.logo}</span>
                      <div>
                        <p className="font-medium">{bank.name}</p>
                        <p className="text-sm text-gray-500">{bank.code}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Auto-fetch explanation */}
          <Card className="p-4 bg-blue-50 border-blue-200 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Secure Auto-Fetch</h4>
                <p className="text-sm text-blue-700 mt-1">
                  We use your registered mobile number to securely fetch your bank account details. 
                  This process is encrypted and RBI-approved.
                </p>
              </div>
            </div>
          </Card>

          {/* Benefits of auto-fetch */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">No manual typing required</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Eliminates data entry errors</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Bank-grade security verification</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Instant account validation</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <Button
            onClick={nextStep}
            disabled={!selectedBank}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Continue with {selectedBank ? banks.find(b => b.id === selectedBank)?.name : 'Selected Bank'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'bank-permission') {
    const selectedBankInfo = banks.find(b => b.id === selectedBank);
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-2xl text-gray-900 mb-2">Permission Required</h1>
            <p className="text-gray-600">
              We need your permission to securely fetch your bank account details from {selectedBankInfo?.name}
            </p>
          </div>

          {/* Bank info */}
          <Card className="p-4 mb-6 border-2 border-blue-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{selectedBankInfo?.logo}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{selectedBankInfo?.name}</h3>
                <p className="text-sm text-gray-600">Phone: {profile.phone}</p>
              </div>
              <Badge variant="outline" className="text-blue-700 border-blue-300">
                Secured
              </Badge>
            </div>
          </Card>

          {/* What we'll access */}
          <Card className="p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">What we'll access:</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Account holder name</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Account number (last 4 digits)</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">IFSC code and branch details</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Account type verification</span>
              </div>
            </div>
          </Card>

          {/* Security assurance */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-800">Your Security</h4>
                <p className="text-sm text-green-700 mt-1">
                  • Data is encrypted end-to-end<br/>
                  • No transaction history accessed<br/>
                  • No account balance information<br/>
                  • Compliant with RBI guidelines
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="px-6 pb-8 space-y-3">
          <Button
            onClick={simulateBankDetailsFetch}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            <Lock className="w-4 h-4 mr-2" />
            Allow Access & Fetch Details
          </Button>
          
          <Button
            onClick={() => setCurrentStep('bank-select')}
            variant="outline"
            className="w-full py-3 h-auto"
          >
            Choose Different Bank
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'bank-fetch') {
    const selectedBankInfo = banks.find(b => b.id === selectedBank);
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Download className="w-10 h-10 text-blue-600" />
            </div>
            
            <h1 className="text-2xl text-gray-900 mb-2">Fetching Bank Details</h1>
            <p className="text-gray-600">
              Securely connecting to {selectedBankInfo?.name} to fetch your account details...
            </p>
          </div>

          {/* Fetching progress */}
          <Card className="p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{selectedBankInfo?.logo}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{selectedBankInfo?.name}</h3>
                <p className="text-sm text-gray-600">Secure connection established</p>
              </div>
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fetching progress</span>
                <span className="text-gray-900">{Math.round(fetchingProgress)}%</span>
              </div>
              <Progress value={fetchingProgress} className="h-3" />
            </div>
          </Card>

          {/* Fetching steps */}
          <div className="space-y-3">
            <div className={`flex items-center space-x-3 transition-all duration-300 ${
              fetchingProgress > 20 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {fetchingProgress > 20 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <span className="text-sm">Authenticating with bank servers</span>
            </div>
            
            <div className={`flex items-center space-x-3 transition-all duration-300 ${
              fetchingProgress > 50 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {fetchingProgress > 50 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <span className="text-sm">Verifying account ownership</span>
            </div>
            
            <div className={`flex items-center space-x-3 transition-all duration-300 ${
              fetchingProgress > 80 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {fetchingProgress > 80 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              <span className="text-sm">Retrieving account details</span>
            </div>
            
            <div className={`flex items-center space-x-3 transition-all duration-300 ${
              fetchingProgress >= 100 ? 'text-green-600' : 'text-gray-400'
            }`}>
              {fetchingProgress >= 100 ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <Search className="w-4 h-4" />
              )}
              <span className="text-sm">Finalizing secure connection</span>
            </div>
          </div>

          {/* Security note */}
          <Card className="p-4 bg-gray-50 border-gray-200 mt-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-4 h-4 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">
                  Your data is being transmitted using 256-bit SSL encryption. 
                  We never store your banking credentials.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'bank-confirm') {
    const selectedBankInfo = banks.find(b => b.id === selectedBank);
    
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Step {currentStepIndex + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl text-gray-900 mb-2">Confirm Bank Details</h1>
            <p className="text-gray-600">
              Please verify that the fetched bank account details are correct
            </p>
          </div>

          {/* Fetched bank details */}
          <Card className="p-4 mb-6 border-2 border-green-200 bg-green-50">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">{selectedBankInfo?.logo}</span>
              </div>
              <div>
                <h3 className="font-medium text-green-800">Bank Details Retrieved</h3>
                <p className="text-sm text-green-700">Successfully fetched from {selectedBankInfo?.name}</p>
              </div>
            </div>
            
            {fetchedBankDetails && (
              <div className="space-y-3 pt-3 border-t border-green-200">
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Account Holder:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.accountHolderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Account Number:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">IFSC Code:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.ifscCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Bank Name:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Branch:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.branch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Account Type:</span>
                  <span className="text-sm font-medium text-green-800">{fetchedBankDetails.accountType}</span>
                </div>
              </div>
            )}
          </Card>

          {/* Confirmation question */}
          <Card className="p-4 border-2 border-blue-200">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Confirm Details</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Is this the bank account you want to link for receiving payments? 
                  Double-check that all details are correct.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="px-6 pb-8 space-y-3">
          <Button
            onClick={confirmBankDetails}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Yes, Link This Account
          </Button>
          
          <Button
            onClick={simulateBankDetailsFetch}
            variant="outline"
            className="w-full py-3 h-auto"
          >
            <Search className="w-4 h-4 mr-2" />
            Fetch Again
          </Button>
          
          <Button
            onClick={() => setCurrentStep('bank-select')}
            variant="outline"
            className="w-full py-3 h-auto text-gray-600"
          >
            Choose Different Bank
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-1 px-6 py-8">
          <GooglePayLogo />
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl text-gray-900 mb-2">Welcome to Google Pay Business!</h1>
            <p className="text-gray-600 mb-8">
              Your merchant account is ready. You can now start accepting payments from customers.
            </p>
          </div>

          {/* Reward reminder */}
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 mb-6">
            <div className="text-center">
              <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-purple-900 mb-1">Your ₹500 Reward Awaits!</h3>
              <p className="text-sm text-purple-700">
                Start accepting payments and reach ₹50,000 to unlock your cashback reward
              </p>
            </div>
          </Card>

          {/* QR Code Section */}
          <Card className="p-6 mb-6 text-center">
            <h3 className="font-medium text-gray-900 mb-4">Your Business QR Code</h3>
            
            {/* QR Code Placeholder */}
            <div className="w-40 h-40 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: 36 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Share this QR code with customers to receive instant payments
            </p>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex-1">
                <QrCode className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Share
              </Button>
            </div>
          </Card>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Start accepting payments immediately</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-700">Get a SoundBox for payment confirmations</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">Earn ₹500 reward on ₹50,000 transactions</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <Button
            onClick={completeSignup}
            className="w-full bg-[#4285F4] hover:bg-[#3367D6] text-white py-3 h-auto"
          >
            Start Using Google Pay Business
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}