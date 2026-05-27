import { getProperty } from '@/lib/actions/properties'
import Link from 'next/link'
import {
  PROPERTY_TYPE_LABELS, PROPERTY_STATUS_LABELS, PROPERTY_STATUS_COLORS,
  TAX_REGIME_LABELS, OWNERSHIP_TYPE_LABELS
} from '@/lib/types'
import { archiveProperty } from '@/lib/actions/properties'

const fmt = (n: number | null) =>
  n != null ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n) : null

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const property = await getProperty(id)

  const totalAcquisition =
    (property.purchase_price ?? 0) +
    (property.notary_fees ?? 0) +
    (property.agency_fees ?? 0) +
    (property.initial_works_cost ?? 0)

  const plusValue = property.estimated_value && totalAcquisition > 0
    ? property.estimated_value - totalAcquisition
    : null

  return (
    <div className="px-8 py-8">
      {/* Titre + actions */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl font-bold text-white">{property.name}</h1>
            <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${PROPERTY_STATUS_COLORS[property.status]}`}>
              {PROPERTY_STATUS_LABELS[property.status]}
            </span>
          </div>
          <p className="text-sm text-gray-500">{property.address}, {property.city} {property.postal_code}</p>
        </div>
        <Link
          href={`/properties/${id}/edit`}
          className="text-sm border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Modifier
        </Link>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Type" value={PROPERTY_TYPE_LABELS[property.type]} />
        <StatCard label="Surface" value={property.surface ? `${property.surface} m²` : '—'} />
        <StatCard label="Pièces" value={property.rooms_count ? `${property.rooms_count} pièce${property.rooms_count > 1 ? 's' : ''}` : '—'} />
        <StatCard label="Régime fiscal" value={TAX_REGIME_LABELS[property.tax_regime]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Caractéristiques */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Caractéristiques</h2>
          <dl className="space-y-2.5">
            <Row label="Type" value={PROPERTY_TYPE_LABELS[property.type]} />
            <Row label="Surface" value={property.surface ? `${property.surface} m²` : null} />
            <Row label="Pièces" value={property.rooms_count?.toString() ?? null} />
            <Row label="Chambres" value={property.bedrooms_count?.toString() ?? null} />
            <Row label="Étage" value={property.floor?.toString() ?? null} />
            <Row label="Ascenseur" value={property.has_elevator ? 'Oui' : 'Non'} />
            <Row label="Meublé" value={property.is_furnished ? 'Oui' : 'Non'} />
            <Row label="Mode de détention" value={OWNERSHIP_TYPE_LABELS[property.ownership_type]} />
          </dl>
        </div>

        {/* Patrimoine */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Patrimoine</h2>
          <dl className="space-y-2.5">
            <Row label="Date d'acquisition" value={fmtDate(property.purchase_date)} />
            <Row label="Prix d'achat" value={fmt(property.purchase_price)} />
            <Row label="Frais de notaire" value={fmt(property.notary_fees)} />
            <Row label="Frais d'agence" value={fmt(property.agency_fees)} />
            <Row label="Travaux initiaux" value={fmt(property.initial_works_cost)} />
            {totalAcquisition > 0 && (
              <Row label="Coût total acquisition" value={fmt(totalAcquisition)} highlight />
            )}
            <Row label="Valeur estimée" value={fmt(property.estimated_value)} />
            {plusValue !== null && (
              <Row
                label="Plus-value latente"
                value={`${plusValue >= 0 ? '+' : ''}${fmt(plusValue)}`}
                highlight
                positive={plusValue >= 0}
              />
            )}
          </dl>
        </div>

        {/* Charges */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Charges annuelles</h2>
          <dl className="space-y-2.5">
            <Row label="Taxe foncière" value={fmt(property.property_tax)} />
            <Row
              label="Charges copropriété"
              value={property.condo_charges
                ? `${fmt(property.condo_charges * 12)} / an (${fmt(property.condo_charges)} / mois)`
                : null}
            />
          </dl>
        </div>

        {/* Notes */}
        {property.notes && (
          <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-white mb-3">Notes</h2>
            <p className="text-sm text-gray-400 whitespace-pre-wrap">{property.notes}</p>
          </div>
        )}
      </div>

      {/* Zone danger */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <form action={async () => { 'use server'; await archiveProperty(id) }}>
          <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
            Archiver ce bien
          </button>
        </form>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#13131a] border border-white/8 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

function Row({ label, value, highlight, positive }: {
  label: string; value: string | null; highlight?: boolean; positive?: boolean
}) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`font-medium ${highlight ? (positive ? 'text-emerald-400' : 'text-[#C9A84C]') : 'text-white'}`}>
        {value}
      </dd>
    </div>
  )
}
