import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: React.ReactNode
  className?: string
}

const baseStyles = 'px-3 py-2 font-medium transition'

const variants = {
  primary: 'bg-slate-800 text-white hover:bg-slate-700',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100'
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}