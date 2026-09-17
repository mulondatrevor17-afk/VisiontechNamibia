import React from 'react'

interface PackageCardProps {
  tier: string
  price: string
  highlighted?: boolean
  features?: string[]
}

export const PackageCard: React.FC<PackageCardProps> = ({ tier, price, highlighted = false, features = [] }) => {
  return (
    <div className={`p-8 rounded-xl ${highlighted ? 'border-2 border-[#D4A017] bg-[#111111]' : 'border border-[#252321] bg-[#1A1A1A]'} shadow-sm` }>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-[#F5F5F0]">{tier}</h4>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-[#D4A017]">{price}</div>
          <div className="text-xs text-[#8A8A8A]">/month</div>
        </div>
      </div>
      <ul className="mb-6 space-y-2 text-sm text-[#8A8A8A]">
        {features.length > 0 ? features.map((f, i) => <li key={i}>• {f}</li>) : <li className="text-[#8A8A8A]">Contact us for details</li>}
      </ul>
      <button className={`w-full ${highlighted ? 'bg-[#D4A017] text-[#0A0A0A]' : 'bg-transparent text-[#F5F5F0] border border-[#252321]' } py-3 rounded-md font-semibold`}>Get Started</button>
    </div>
  )
}

export default PackageCard
