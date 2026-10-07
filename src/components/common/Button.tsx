import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'brand' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: any;
}

const variantStyles = {
  primary: 'bg-foreground text-background hover:bg-foreground/90 shadow-soft',
  brand: 'bg-brand text-brand-foreground hover:bg-brand/90 shadow-soft',
  outline: 'border border-border bg-surface/60 text-foreground hover:bg-surface-2 hover:border-foreground/20',
  ghost: 'text-foreground hover:bg-surface-2',
};

const sizeStyles = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[15px] py-3.5',
};

export const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  arrow = true,
  className = '',
  children,
  disabled,
  type = 'button',
  ...rest
}) => {
  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...rest}
    >
      {content}
    </button>
  );
};
