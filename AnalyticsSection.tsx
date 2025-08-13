import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon, IndianRupee, CreditCard, Smartphone, Wallet, TrendingUp } from 'lucide-react';
import { Transaction } from '../App';

interface AnalyticsSectionProps {
  transactions: Transaction[];
}

export function AnalyticsSection({ transactions }: AnalyticsSectionProps) {
  const [timeRange, setTimeRange] = useState('today');
  const [chartType, setChartType] = useState('bar');

  // Calculate analytics data
  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransactions = transactions.filter(t => t.status === 'completed').length;
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  // Mock data for different time ranges
  const getChartData = () => {
    switch (timeRange) {
      case 'today':
        return [
          { time: '9 AM', amount: 1250, transactions: 3 },
          { time: '10 AM', amount: 2100, transactions: 5 },
          { time: '11 AM', amount: 1850, transactions: 4 },
          { time: '12 PM', amount: 3200, transactions: 8 },
          { time: '1 PM', amount: 2800, transactions: 6 },
          { time: '2 PM', amount: 1950, transactions: 4 },
          { time: '3 PM', amount: 2650, transactions: 7 },
        ];
      case 'week':
        return [
          { time: 'Mon', amount: 15000, transactions: 28 },
          { time: 'Tue', amount: 18500, transactions: 35 },
          { time: 'Wed', amount: 22000, transactions: 42 },
          { time: 'Thu', amount: 19500, transactions: 38 },
          { time: 'Fri', amount: 25000, transactions: 45 },
          { time: 'Sat', amount: 28000, transactions: 52 },
          { time: 'Sun', amount: 16000, transactions: 30 },
        ];
      case 'month':
        return [
          { time: 'Week 1', amount: 85000, transactions: 165 },
          { time: 'Week 2', amount: 92000, transactions: 180 },
          { time: 'Week 3', amount: 88000, transactions: 172 },
          { time: 'Week 4', amount: 95000, transactions: 185 },
        ];
      default:
        return [];
    }
  };

  // Payment method distribution
  const paymentMethodData = [
    { name: 'UPI', value: 45, color: '#4285F4' },
    { name: 'Cards', value: 35, color: '#34A853' },
    { name: 'Wallet', value: 20, color: '#FBBC04' },
  ];

  const chartData = getChartData();

  return (
    <div className="px-4 space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between mt-[6px] mr-[0px] mb-[21px] ml-[0px]">
        <h2 className="text-xl text-gray-900">Earnings Analytics</h2>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <div className="flex items-center space-x-1 mt-1">
                <IndianRupee className="w-4 h-4 text-gray-600" />
                <span className="text-xl font-medium text-gray-900">
                  {totalRevenue.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpIcon className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+12.5%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-xl font-medium text-gray-900 mt-1">{totalTransactions}</p>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpIcon className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+8.2%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Transaction</p>
              <div className="flex items-center space-x-1 mt-1">
                <IndianRupee className="w-4 h-4 text-gray-600" />
                <span className="text-xl font-medium text-gray-900">
                  {Math.round(averageTransaction).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <ArrowUpIcon className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-600">+5.1%</span>
              </div>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <div className="flex items-center space-x-1 mt-1">
                <IndianRupee className="w-4 h-4 text-gray-600" />
                <span className="text-xl font-medium text-gray-900">
                  {pendingAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-orange-600">2 transactions</span>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">Revenue Trend</h3>
          <div className="flex space-x-2">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="h-8 px-3"
            >
              Bar
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3"
            >
              Line
            </Button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'amount' ? `₹${value.toLocaleString('en-IN')}` : value,
                    name === 'amount' ? 'Revenue' : 'Transactions'
                  ]}
                />
                <Bar dataKey="amount" fill="#4285F4" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#4285F4" 
                  strokeWidth={3}
                  dot={{ fill: '#4285F4', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Payment Methods */}
      <Card className="p-4">
        <h3 className="font-medium text-gray-900 mb-4">Payment Methods</h3>
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
            {paymentMethodData.map((method) => (
              <div key={method.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: method.color }}
                  />
                  <span className="text-sm text-gray-600">{method.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{method.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}