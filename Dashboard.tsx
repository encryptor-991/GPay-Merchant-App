import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DeviceSection } from './DeviceSection';
import { AnalyticsSection } from './AnalyticsSection';
import { TransactionsTab } from './TransactionsTab';
import { ProfileTab } from './ProfileTab';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { LinkedDevice, Transaction, MerchantProfile, SoundBoxOrder } from '../App';
import { Home, BarChart3, CreditCard, User, Gift, IndianRupee, Star } from 'lucide-react';

interface DashboardProps {
  linkedDevice: LinkedDevice | null;
  soundBoxOrder: SoundBoxOrder | null;
  transactions: Transaction[];
  merchantProfile: MerchantProfile;
  onLinkDevice: () => void;
  onUnlinkDevice: () => void;
  onUpdateDevice: (updates: Partial<LinkedDevice>) => void;
  onOrderSoundBox: () => void;
  onViewDelivery: () => void;
}

export function Dashboard({ 
  linkedDevice, 
  soundBoxOrder,
  transactions, 
  merchantProfile,
  onLinkDevice, 
  onUnlinkDevice, 
  onUpdateDevice,
  onOrderSoundBox,
  onViewDelivery
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const GooglePayHeader = () => (
    <div className="bg-[#4285F4] text-white px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-[#4285F4] font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-lg font-medium">Google Pay</h1>
            <p className="text-blue-100 text-sm">for Business</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-blue-100 text-xs">Merchant ID</p>
          <p className="text-white text-sm font-mono">{merchantProfile.merchantId}</p>
        </div>
      </div>
    </div>
  );

  const RewardMilestone = () => {
    const rewardThreshold = 50000;
    const currentVolume = merchantProfile.totalTransactionVolume;
    const progress = Math.min((currentVolume / rewardThreshold) * 100, 100);
    const remaining = Math.max(rewardThreshold - currentVolume, 0);

    return (
      <Card className="mx-4 mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Gift className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-purple-900">Milestone Reward</h3>
          </div>
          {merchantProfile.rewardStatus === 'eligible' ? (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Star className="w-3 h-3 mr-1" />
              Eligible
            </Badge>
          ) : (
            <Badge variant="outline" className="text-purple-700 border-purple-300">
              In Progress
            </Badge>
          )}
        </div>
        
        <div className="mb-3">
          <div className="flex items-center justify-center space-x-1 mb-2">
            <IndianRupee className="w-6 h-6 text-purple-600" />
            <span className="text-2xl font-bold text-purple-900">500</span>
            <span className="text-sm text-purple-700">reward</span>
          </div>
          <p className="text-sm text-purple-800 text-center">
            Receive ₹50,000 via GPay to earn ₹500 cashback
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-700">
              ₹{currentVolume.toLocaleString('en-IN')} completed
            </span>
            <span className="text-purple-700">
              {merchantProfile.rewardStatus === 'eligible' ? 'Completed!' : `₹${remaining.toLocaleString('en-IN')} to go`}
            </span>
          </div>
          <Progress 
            value={progress} 
            className="h-3 bg-purple-100"
          />
        </div>

        {merchantProfile.rewardStatus === 'eligible' && (
          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 text-center font-medium">
              🎉 Congratulations! Your ₹500 reward will be credited within 24 hours.
            </p>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        {/* Tab Content */}
        <div className="flex-1 pb-20">
          <TabsContent value="dashboard" className="mt-0 h-full">
            <GooglePayHeader />
            <RewardMilestone />
            <div className="space-y-6">
              <DeviceSection
                linkedDevice={linkedDevice}
                soundBoxOrder={soundBoxOrder}
                onLinkDevice={onLinkDevice}
                onUnlinkDevice={onUnlinkDevice}
                onUpdateDevice={onUpdateDevice}
                onOrderSoundBox={onOrderSoundBox}
                onViewDelivery={onViewDelivery}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-0 h-full">
            <GooglePayHeader />
            <AnalyticsSection transactions={transactions} />
          </TabsContent>

          <TabsContent value="transactions" className="mt-0 h-full">
            <GooglePayHeader />
            <TransactionsTab transactions={transactions} />
          </TabsContent>

          <TabsContent value="profile" className="mt-0 h-full">
            <GooglePayHeader />
            <ProfileTab merchantProfile={merchantProfile} />
          </TabsContent>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-transparent">
            <TabsTrigger 
              value="dashboard" 
              className="flex flex-col space-y-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-[#4285F4]"
            >
              <Home className="w-4 h-4" />
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="flex flex-col space-y-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-[#4285F4]"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Analytics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions"
              className="flex flex-col space-y-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-[#4285F4]"
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-xs">Transactions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="profile"
              className="flex flex-col space-y-1 py-2 data-[state=active]:bg-blue-50 data-[state=active]:text-[#4285F4]"
            >
              <User className="w-4 h-4" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}