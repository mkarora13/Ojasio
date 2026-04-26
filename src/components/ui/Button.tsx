import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-bold tracking-widest uppercase transition-all duration-300 ease-in-out';
  
  const variants = {
    primary: 'bg-green-deep text-white hover:bg-gold shadow-md hover:shadow-lg rounded-xl',
    secondary: 'bg-transparent border border-green-deep text-green-deep hover:bg-green-deep hover:text-white rounded-xl',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#128C7E] shadow-md hover:shadow-lg rounded-xl',
  };
  
  const sizes = {
    sm: 'text-[10px] px-6 py-2 rounded-full', // useful for nav
    md: 'text-xs px-6 py-3',
    lg: 'text-xs md:text-sm px-8 py-4',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
