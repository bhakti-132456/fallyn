import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { PriceDisplay } from './PriceDisplay';
import { CreditCard, History, Package, User, LogOut, ChevronRight, CheckCircle } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'bids' | 'won'>('bids');

  // Mock Data
  const activeBids = [
    { id: 1, name: 'Sony WH-1000XM5', price: 28942.00, status: 'Winning', endsIn: '12m' },
    { id: 2, name: 'MacBook Pro 16"', price: 345000.00, status: 'Outbid', endsIn: '45m' },
  ];

  const wonItems = [
    { id: 101, name: 'Leica Q3', price: 510000.00, date: 'Oct 24, 2024', image: 'https://images.unsplash.com/photo-1554593444-1188d6c755c9?q=80&w=200&auto=format&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-surface border border-white/10 flex items-center justify-center text-accent">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Alex Chen</h1>
              <p className="text-secondary text-sm">Member since 2023</p>
            </div>
          </div>
          <button onClick={onLogout} className="text-secondary hover:text-red-400 transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        {/* Wallet Card */}
        <Card className="p-6 bg-gradient-to-br from-surface to-surface/50 border-white/10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary mb-1">Total Balance</p>
              <h2 className="text-4xl font-semibold text-white tracking-tight">₹12,40,000.00</h2>
            </div>
            <div className="bg-emerald-500/10 p-2 rounded-full">
              <CreditCard className="text-emerald-500" size={24} />
            </div>
          </div>
          <div className="flex gap-3">
            <Button size="sm" className="flex-1">Deposit</Button>
            <Button size="sm" variant="secondary" className="flex-1">Withdraw</Button>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/5 pb-2">
          <button 
            onClick={() => setActiveTab('bids')}
            className={`text-sm font-medium pb-2 transition-colors relative ${activeTab === 'bids' ? 'text-white' : 'text-secondary hover:text-white'}`}
          >
            Active Bids
            {activeTab === 'bids' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('won')}
            className={`text-sm font-medium pb-2 transition-colors relative ${activeTab === 'won' ? 'text-white' : 'text-secondary hover:text-white'}`}
          >
            Collection
            {activeTab === 'won' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 animate-slide-up">
          {activeTab === 'bids' && (
            <>
              {activeBids.map(bid => (
                <Card key={bid.id} className="p-4 flex items-center justify-between group cursor-pointer hover:border-white/20 transition-colors">
                  <div>
                    <h3 className="font-medium text-white">{bid.name}</h3>
                    <p className="text-xs text-secondary mt-1">Ends in {bid.endsIn}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-white">₹{bid.price.toLocaleString('en-IN')}</p>
                    <p className={`text-xs mt-1 ${bid.status === 'Winning' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {bid.status}
                    </p>
                  </div>
                </Card>
              ))}
              {activeBids.length === 0 && <p className="text-secondary text-center py-8">No active bids.</p>}
            </>
          )}

          {activeTab === 'won' && (
            <>
               {wonItems.map(item => (
                <Card key={item.id} className="p-4 flex items-center gap-4 group cursor-pointer hover:border-white/20 transition-colors">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded bg-black/50 object-cover" />
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-xs text-secondary mt-1">Secured on {item.date}</p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-500">
                    <CheckCircle size={16} />
                    <span className="text-xs font-medium uppercase tracking-wider">Owned</span>
                  </div>
                </Card>
               ))}
            </>
          )}
        </div>

      </div>
    </div>
  );
};