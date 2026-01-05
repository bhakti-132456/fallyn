import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  block = false,
  disabled,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0.0,0.1,1)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed tracking-wide whitespace-nowrap";
  
  const variants = {
    primary: "bg-accent text-white shadow-lg shadow-blue-900/20 hover:bg-blue-600 active:scale-[0.98]",
    secondary: "bg-transparent text-primary border border-white/10 hover:bg-white/5 active:scale-[0.98]",
    ghost: "bg-transparent text-secondary hover:text-white hover:bg-white/5 active:scale-[0.98]",
    danger: "bg-red-900/20 text-red-400 border border-red-900/50 hover:bg-red-900/40"
  };

  const sizes = {
    sm: "h-9 text-xs px-3 rounded-md", // >= 36px
    md: "h-12 text-sm px-6 rounded-lg", // >= 48px (Touch target safe)
    lg: "h-14 text-base px-8 rounded-xl", // >= 56px
  };

  return (
    <button 
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${block ? 'w-full' : ''} 
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="opacity-80">Processing</span>
        </span>
      ) : children}
    </button>
  );
};