import React from 'react';
import { Card } from './Card';
import { MOCK_PRODUCTS } from '../services/mockData';
import { BarChart3, Users, Package } from 'lucide-react';

export const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas pt-24 pb-20 px-6">
       <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h1 className="text-xl font-semibold tracking-widest uppercase">FALLYN Admin</h1>
              <span className="text-xs bg-red-900/20 text-red-400 px-2 py-1 rounded border border-red-900/50">Demo Mode</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="bg-accent/10 p-3 rounded-lg text-accent"><BarChart3 size={24} /></div>
                      <div>
                          <p className="text-xs uppercase text-secondary tracking-wider">Revenue</p>
                          <p className="text-2xl font-mono text-white">₹42.89L</p>
                      </div>
                  </div>
              </Card>
              <Card className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/10 p-3 rounded-lg text-emerald-500"><Users size={24} /></div>
                      <div>
                          <p className="text-xs uppercase text-secondary tracking-wider">Active Users</p>
                          <p className="text-2xl font-mono text-white">1,204</p>
                      </div>
                  </div>
              </Card>
              <Card className="p-6">
                  <div className="flex items-center gap-4">
                      <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500"><Package size={24} /></div>
                      <div>
                          <p className="text-xs uppercase text-secondary tracking-wider">Inventory</p>
                          <p className="text-2xl font-mono text-white">{MOCK_PRODUCTS.length}</p>
                      </div>
                  </div>
              </Card>
          </div>

          {/* Table */}
          <div className="bg-surface rounded-xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                  <h3 className="text-sm font-semibold">Live Inventory</h3>
              </div>
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                      <thead className="bg-white/5 text-secondary text-xs uppercase tracking-wider">
                          <tr>
                              <th className="px-6 py-3 font-medium">Product</th>
                              <th className="px-6 py-3 font-medium">Category</th>
                              <th className="px-6 py-3 font-medium text-right">Start Price</th>
                              <th className="px-6 py-3 font-medium text-right">Reserve</th>
                              <th className="px-6 py-3 font-medium">Status</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                          {MOCK_PRODUCTS.map(p => (
                              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-medium text-white">{p.name}</td>
                                  <td className="px-6 py-4 text-secondary">{p.category}</td>
                                  <td className="px-6 py-4 text-right font-mono">₹{p.startPrice.toLocaleString('en-IN')}</td>
                                  <td className="px-6 py-4 text-right font-mono text-secondary">₹{p.reservePrice.toLocaleString('en-IN')}</td>
                                  <td className="px-6 py-4">
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-400 border border-emerald-900/50">
                                          {p.status}
                                      </span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

       </div>
    </div>
  );
};