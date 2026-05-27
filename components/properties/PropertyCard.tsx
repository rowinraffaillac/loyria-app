import Link from 'next/link'
import type { Property } from '@/lib/types'
import { PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS, PROPERTY_STATUS_COLORS } from '@/lib/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="block group">
      <div className="bg-[#13131a] border border-white/8 rounded-xl p-5 hover:border-[#C9A84C]/30 hover:bg-[#13131a]/80 transition-all duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-sm truncate group-hover:text-[#C9A84C] transition-colors">
              {property.name}
            </h3>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {property.address}, {property.city}
            </p>
          </div>
          <span className={`ml-3 shrink-0 text-[10px] font-medium px-2 py-1 rounded-full border ${PROPERTY_STATUS_COLORS[property.status]}`}>
            {PROPERTY_STATUS_LABELS[property.status]}
          </span>
        </div>

        {/* Infos */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="bg-white/5 px-2 py-0.5 rounded">
            {PROPERTY_TYPE_LABELS[property.type]}
          </span>
          {property.surface && (
            <span>{property.surface} m²</span>
          )}
          {property.rooms_count && (
            <span>{property.rooms_count} pièce{property.rooms_count > 1 ? 's' : ''}</span>
          )}
          {property.is_furnished && (
            <span className="text-[#C9A84C]/70">Meublé</span>
          )}
        </div>

        {/* Footer patrimoine */}
        {property.purchase_price && (
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-600">
            <span>Acquisition</span>
            <span className="text-gray-400">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.purchase_price)}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
