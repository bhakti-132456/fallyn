import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { ArrowRight, Lock } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-10">
           <h1 className="text-3xl font-semibold tracking-widest text-primary mb-2">FALLYN</h1>
           <p className="text-secondary text-sm">Silence over noise.</p>
        </div>

        <Card className="p-8 backdrop-blur-xl bg-surface/80">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-secondary block">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@fallyn.co"
                className="w-full bg-canvas/50 border border-white/10 rounded-lg px-4 py-3 text-primary placeholder-white/20 focus:outline-none focus:border-accent transition-colors"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-secondary block">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-canvas/50 border border-white/10 rounded-lg px-4 py-3 text-primary placeholder-white/20 focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="pt-4">
              <Button block size="lg" isLoading={loading} className="group">
                <span>Sign In</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-center text-xs text-secondary/50 pt-4">
              <Lock size={12} className="inline mr-1" />
              Secured by FALLYN ID
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};