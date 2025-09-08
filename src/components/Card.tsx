import React from 'react'

interface CardProps {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow hover:shadow-md transition">
      {children}
    </div>
  )
}

export default Card