import React, { useState } from 'react';
import { SignupFlow } from './components/SignupFlow';
import { Dashboard } from './components/Dashboard';
import { QRScanner } from './components/QRScanner';
import { ConfirmDevice } from './components/ConfirmDevice';
import { PhoneVerification } from './components/PhoneVerification';
import { LinkingSuccess } from './components/LinkingSuccess';
import { SoundBoxOrder } from './components/SoundBoxOrder';
import { AddressCollection } from './components/AddressCollection';
import { DeliveryTracking } from './components/DeliveryTracking';

export type FlowStep = 
  | 'signup' 
  | 'dashboard' 
  | 'qr-scanner' 
  | 'confirm-device' 
  | 'phone-verification' 
  | 'linking-success'
  | 'soundbox-order'
  | 'address-collection'
  | 'delivery-tracking';

export interface DeviceInfo {
  name: string;
  model: string;
  serialNumber: string;
}

export interface LinkedDevice extends DeviceInfo {
  id: string;
  status: 'online' | 'offline';
  batteryLevel: number;
  lastPing: Date;
  firmwareVersion: string;
  offlineReason?: 'no-internet' | 'sim-expired' | 'device-error';
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  customerName: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'upi' | 'card' | 'wallet';
  transactionId: string;
}

export interface MerchantProfile {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  merchantId: string;
  kycStatus: 'verified' | 'pending' | 'rejected' | 'not-started';
  bankAccount?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    accountHolderName: string;
  };
  isProfileComplete: boolean;
  totalTransactionVolume: number; // Total transaction volume for rewards
  rewardStatus: 'pending' | 'eligible' | 'claimed'; // Reward status for ₹500 at ₹50,000
}

export interface SoundBoxOrder {
  id: string;
  status: 'ordered' | 'shipped' | 'delivered' | 'pending-payment';
  orderDate: Date;
  estimatedDelivery: Date;
  trackingId: string;
  deliveryAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  amount: number;
  refundStatus: 'pending' | 'eligible' | 'refunded';
  transactionVolume: number; // Total transaction volume processed
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('signup');
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [linkedDevice, setLinkedDevice] = useState<LinkedDevice | null>(null);
  const [soundBoxOrder, setSoundBoxOrder] = useState<SoundBoxOrder | null>(null);

  // Mock merchant profile - starts incomplete
  const [merchantProfile, setMerchantProfile] = useState<MerchantProfile>({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    address: '',
    merchantId: '',
    kycStatus: 'not-started',
    isProfileComplete: false,
    totalTransactionVolume: 0,
    rewardStatus: 'pending'
  });

  // Mock transactions - empty initially
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const nextStep = (step: FlowStep, device?: DeviceInfo) => {
    if (device) {
      setDeviceInfo(device);
    }
    setCurrentStep(step);
  };

  const updateMerchantProfile = (updates: Partial<MerchantProfile>) => {
    setMerchantProfile(prev => ({ ...prev, ...updates }));
  };

  const completeMerchantSignup = (profile: MerchantProfile) => {
    setMerchantProfile(profile);
    // Generate more diverse transactions for demo
    const initialTransactions: Transaction[] = [
      {
        id: 'txn_001',
        amount: 1250.00,
        currency: 'INR',
        customerName: 'Priya Sharma',
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'upi',
        transactionId: 'UPI123456789'
      },
      {
        id: 'txn_002',
        amount: 899.50,
        currency: 'INR',
        customerName: 'Amit Patel',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'card',
        transactionId: 'CARD987654321'
      },
      {
        id: 'txn_003',
        amount: 2500.00,
        currency: 'INR',
        customerName: 'Sneha Reddy',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        status: 'pending',
        paymentMethod: 'wallet',
        transactionId: 'WAL456789123'
      },
      {
        id: 'txn_004',
        amount: 750.00,
        currency: 'INR',
        customerName: 'Vikram Singh',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'upi',
        transactionId: 'UPI789123456'
      },
      {
        id: 'txn_005',
        amount: 3200.00,
        currency: 'INR',
        customerName: 'Anita Gupta',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        status: 'failed',
        paymentMethod: 'card',
        transactionId: 'CARD654321987'
      },
      {
        id: 'txn_006',
        amount: 450.00,
        currency: 'INR',
        customerName: 'Rohit Kumar',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'upi',
        transactionId: 'UPI654987321'
      },
      {
        id: 'txn_007',
        amount: 1875.00,
        currency: 'INR',
        customerName: 'Kavita Joshi',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'wallet',
        transactionId: 'WAL987321654'
      },
      {
        id: 'txn_008',
        amount: 625.00,
        currency: 'INR',
        customerName: 'Deepak Mehta',
        timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'card',
        transactionId: 'CARD159753468'
      },
      {
        id: 'txn_009',
        amount: 2800.00,
        currency: 'INR',
        customerName: 'Riya Kapoor',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        status: 'pending',
        paymentMethod: 'upi',
        transactionId: 'UPI852741963'
      },
      {
        id: 'txn_010',
        amount: 990.00,
        currency: 'INR',
        customerName: 'Suresh Yadav',
        timestamp: new Date(Date.now() - 60 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'wallet',
        transactionId: 'WAL741852963'
      },
      {
        id: 'txn_011',
        amount: 4500.00,
        currency: 'INR',
        customerName: 'Meera Iyer',
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'card',
        transactionId: 'CARD741963852'
      },
      {
        id: 'txn_012',
        amount: 320.00,
        currency: 'INR',
        customerName: 'Arjun Nair',
        timestamp: new Date(Date.now() - 84 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'upi',
        transactionId: 'UPI963741852'
      },
      {
        id: 'txn_013',
        amount: 1680.00,
        currency: 'INR',
        customerName: 'Pooja Agarwal',
        timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000),
        status: 'failed',
        paymentMethod: 'wallet',
        transactionId: 'WAL852963741'
      },
      {
        id: 'txn_014',
        amount: 775.00,
        currency: 'INR',
        customerName: 'Manish Tiwari',
        timestamp: new Date(Date.now() - 108 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'upi',
        transactionId: 'UPI147258369'
      },
      {
        id: 'txn_015',
        amount: 5250.00,
        currency: 'INR',
        customerName: 'Sunita Chawla',
        timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000),
        status: 'completed',
        paymentMethod: 'card',
        transactionId: 'CARD369147258'
      }
    ];

    // Calculate total transaction volume from completed transactions
    const completedTransactions = initialTransactions.filter(t => t.status === 'completed');
    const totalVolume = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Update profile with transaction volume and check reward eligibility
    const updatedProfile = {
      ...profile,
      totalTransactionVolume: totalVolume,
      rewardStatus: totalVolume >= 50000 ? 'eligible' : 'pending' as 'pending' | 'eligible' | 'claimed'
    };
    
    setMerchantProfile(updatedProfile);
    setTransactions(initialTransactions);
    setCurrentStep('dashboard');
  };

  const addLinkedDevice = (device: DeviceInfo) => {
    const newLinkedDevice: LinkedDevice = {
      ...device,
      id: `device_${Date.now()}`,
      status: 'online',
      batteryLevel: 85,
      lastPing: new Date(),
      firmwareVersion: '2.1.4',
    };
    setLinkedDevice(newLinkedDevice);
  };

  const removeLinkedDevice = () => {
    setLinkedDevice(null);
  };

  const updateDeviceStatus = (updates: Partial<LinkedDevice>) => {
    if (linkedDevice) {
      setLinkedDevice({ ...linkedDevice, ...updates });
    }
  };

  const createSoundBoxOrder = (deliveryAddress: SoundBoxOrder['deliveryAddress']) => {
    const newOrder: SoundBoxOrder = {
      id: `order_${Date.now()}`,
      status: 'ordered',
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      trackingId: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      deliveryAddress,
      amount: 500,
      refundStatus: 'pending',
      transactionVolume: 0
    };
    setSoundBoxOrder(newOrder);
    setCurrentStep('delivery-tracking');
  };

  const updateSoundBoxOrder = (updates: Partial<SoundBoxOrder>) => {
    if (soundBoxOrder) {
      setSoundBoxOrder({ ...soundBoxOrder, ...updates });
    }
  };

  const resetFlow = () => {
    setCurrentStep('dashboard');
    setDeviceInfo(null);
  };

  const completeFlow = () => {
    if (deviceInfo) {
      addLinkedDevice(deviceInfo);
    }
    resetFlow();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'signup' && (
        <SignupFlow onComplete={completeMerchantSignup} />
      )}
      {currentStep === 'dashboard' && (
        <Dashboard 
          linkedDevice={linkedDevice}
          soundBoxOrder={soundBoxOrder}
          transactions={transactions}
          merchantProfile={merchantProfile}
          onLinkDevice={() => nextStep('qr-scanner')} 
          onUnlinkDevice={removeLinkedDevice}
          onUpdateDevice={updateDeviceStatus}
          onOrderSoundBox={() => nextStep('soundbox-order')}
          onViewDelivery={() => nextStep('delivery-tracking')}
        />
      )}
      {currentStep === 'soundbox-order' && (
        <SoundBoxOrder 
          onNext={() => nextStep('address-collection')}
          onBack={() => nextStep('dashboard')}
        />
      )}
      {currentStep === 'address-collection' && (
        <AddressCollection 
          onNext={createSoundBoxOrder}
          onBack={() => nextStep('soundbox-order')}
        />
      )}
      {currentStep === 'delivery-tracking' && soundBoxOrder && (
        <DeliveryTracking 
          order={soundBoxOrder}
          onBack={() => nextStep('dashboard')}
          onLinkDevice={() => nextStep('qr-scanner')}
          onUpdateOrder={updateSoundBoxOrder}
        />
      )}
      {currentStep === 'qr-scanner' && (
        <QRScanner onNext={(device) => nextStep('confirm-device', device)} />
      )}
      {currentStep === 'confirm-device' && deviceInfo && (
        <ConfirmDevice 
          device={deviceInfo} 
          onNext={() => nextStep('phone-verification')} 
        />
      )}
      {currentStep === 'phone-verification' && (
        <PhoneVerification onNext={() => nextStep('linking-success')} />
      )}
      {currentStep === 'linking-success' && (
        <LinkingSuccess onComplete={completeFlow} />
      )}
    </div>
  );
}