import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={`border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${props.className || ''}`}
    />
  )
}