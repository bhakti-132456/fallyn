import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Card } from './Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-md z-10 animate-scale-in">
        <Card glass className="shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h3 className="text-lg font-semibold text-primary tracking-wide">{title}</h3>
            <button 
              onClick={onClose}
              className="text-secondary hover:text-white transition-colors p-1 rounded-full hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};