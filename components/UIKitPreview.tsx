import React, { useState } from 'react';
import { Button } from './Button';
import { Card } from './Card';
import { PriceDisplay } from './PriceDisplay';
import { Countdown } from './Countdown';
import { Modal } from './Modal';
import { ImageGenerator } from './ImageGenerator';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const UIKitPreview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoPrice, setDemoPrice] = useState(2499.00);

  const simulatePriceDrop = () => {
    setDemoPrice(prev => Math.max(0, prev - (Math.random() * 50 + 10)));
  };

  return (
    <div className="min-h-screen bg-canvas text-primary pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 max-w-md mx-auto space-y-12">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">FALLYN UI Kit</h1>
          <p className="text-secondary text-sm">Component verification.</p>
        </div>

        {/* Typography */}
        <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary mb-4 border-b border-white/10 pb-2">Typography</h2>
            <div>
                <h1 className="text-4xl font-semibold tracking-tight">Heading 1</h1>
                <h2 className="text-2xl font-semibold tracking-tight">Heading 2</h2>
                <h3 className="text-xl font-semibold">Heading 3</h3>
                <p className="text-base text-secondary mt-2">Body text (Inter Regular). Use premium stock photography (dark, moody, realistic).</p>
                <p className="text-xs text-secondary mt-1">CAPTION / LABEL</p>
                <p className="font-mono text-sm text-accent mt-2">Mono / Numbers / Code</p>
            </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary mb-4 border-b border-white/10 pb-2">Buttons</h2>
            <div className="space-y-3">
                <Button block>Primary Action</Button>
                <Button variant="secondary" block>Secondary Action</Button>
                <Button variant="ghost" block>Ghost Action</Button>
                <div className="flex gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="sm" variant="secondary">Small</Button>
                </div>
                <Button isLoading block>Loading State</Button>
            </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary mb-4 border-b border-white/10 pb-2">Cards & Surfaces</h2>
            
            <Card className="p-6" hover>
                <h3 className="font-semibold mb-2">Standard Card</h3>
                <p className="text-sm text-secondary">Surface color #14171C. Border white/5. Rounded 14px.</p>
            </Card>

            <div className="bg-[url('https://picsum.photos/600/400?grayscale')] bg-cover rounded-xl p-6 h-48 flex items-end">
                 <Card glass className="p-4 w-full backdrop-blur-md">
                    <h3 className="font-semibold text-sm">Glass Card</h3>
                    <p className="text-xs text-white/70">Overlay on imagery.</p>
                 </Card>
            </div>
        </section>

        {/* Data Display */}
        <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary mb-4 border-b border-white/10 pb-2">Data Display</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="text-xs text-secondary mb-2 block">Price Component (Click to Drop)</label>
                    <div onClick={simulatePriceDrop} className="cursor-pointer active:scale-95 transition-transform inline-block">
                        <PriceDisplay price={demoPrice} size="xl" />
                    </div>
                </div>

                <div>
                    <label className="text-xs text-secondary mb-2 block">Countdown Timer</label>
                    <Countdown targetDate={new Date(Date.now() + 10000000)} />
                </div>
            </div>
        </section>

        {/* Interactive */}
        <section className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-secondary mb-4 border-b border-white/10 pb-2">Interactive</h2>
            <Button onClick={() => setIsModalOpen(true)} variant="secondary" block>Open Modal</Button>
        </section>

      </div>

      <Footer />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Confirm Purchase"
      >
        <div className="text-center">
            <div className="mb-6">
                <PriceDisplay price={demoPrice} size="lg" className="justify-center mb-2" />
                <p className="text-sm text-secondary">You are about to lock this price.</p>
            </div>
            <div className="space-y-3">
                <Button block onClick={() => setIsModalOpen(false)}>Confirm Payment</Button>
                <Button variant="ghost" block onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
        </div>
      </Modal>

    </div>
  );
};