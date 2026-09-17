import React from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

const variantClasses: Record<ButtonVariant, string> = {
  default:
    'bg-gold text-void hover:bg-goldhover shadow-[0_4px_14px_rgba(212,160,23,0.3)] hover:shadow-[0_8px_24px_rgba(212,160,23,0.45)] hover:-translate-y-0.5',
  outline: 'border border-warmgray text-offwhite bg-transparent hover:border-gold hover:text-gold',
  ghost: 'text-offwhite hover:bg-charcoal/70 hover:text-gold',
  secondary: 'bg-charcoal text-offwhite border border-graphite hover:border-gold/50',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
  link: 'text-gold underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  default: 'h-10 px-5 py-2',
  sm: 'h-8 px-3 text-xs',
  lg: 'h-12 px-8 text-base',
  icon: 'h-10 w-10',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ' +
  'transition-all duration-200 ease-out cursor-pointer select-none ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-50'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  className = '',
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
}
