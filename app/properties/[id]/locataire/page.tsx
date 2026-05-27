import Link from 'next/link'
import { getActiveLease } from '@/lib/actions/tenants'
import { terminateLease } from '@/lib/actions/tenants'
import { LEASE_TYPE_LABELS, REFERENCE_INDEX_LABELS } from '@/lib/types'

const fmt = (n: number | null) =>
  n != null ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n) : null

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : null

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - new Date().getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default async function LocatairePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: propertyId } = await params
  const { lease, tenant } = await getActiveLease(propertyId)

  if (!lease || !tenant) {
    return (
      <div className="px-8 py-8">
        <h1 className="text-xl font-bold text-white mb-2">Locataire</h1>
        <p className="text-sm text-gray-500 mb-8">Aucun locataire actif sur ce bien.</p>
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-10 text-center max-w-sm">
          <div className="text-3xl mb-3">👤</div>
          <h2 className="text-base font-semibold text-white mb-2">Ajouter un locataire</h2>
          <p className="text-sm text-gray-500 mb-5">
            Créez le dossier locataire et le bail en une seule étape.
          </p>
          <Link
            href={`/properties/${propertyId}/locataire/new`}
            className="inline-block bg-[#C9A84C] hover:bg-[#b8963e] text-[#0a0a0f] font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Ajouter un locataire
          </Link>
        </div>
      </div>
    )
  }

  const insuranceDays = daysUntil(tenant.insurance_expiry_date)
  const leaseDays = daysUntil(lease.end_date)
  const revisionDays = daysUntil(lease.next_revision_date)

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">
            {tenant.first_name} {tenant.last_name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Locataire actif</p>
        </div>
        <Link
          href={`/properties/${propertyId}/locataire/edit`}
          className="text-sm border border-white/10 hover:border-white/20 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          Modifier
        </Link>
      </div>

      {/* Alertes */}
      {(insuranceDays !== null && insuranceDays <= 60) && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 text-sm text-amber-400">
          {insuranceDays <= 0
            ? 'Assurance habitation expirée — demander le renouvellement'
            : `Assurance habitation expire dans ${insuranceDays} jour${insuranceDays > 1 ? 's' : ''}`}
        </div>
      )}
      {(revisionDays !== null && revisionDays <= 30 && revisionDays > 0) && (
        <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3 text-sm text-blue-400">
          Révision de loyer prévue dans {revisionDays} jour{revisionDays > 1 ? 's' : ''}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Infos locataire */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Informations</h2>
          <dl className="space-y-2.5">
            <Row label="Email" value={tenant.email} />
            <Row label="Téléphone" value={tenant.phone} />
            <Row label="Profession" value={tenant.profession} />
            <Row label="Revenus déclarés" value={fmt(tenant.declared_income) ? `${fmt(tenant.declared_income)} / mois` : null} />
            <Row label="Dépôt de garantie" value={fmt(tenant.deposit_amount)} />
          </dl>
        </div>

        {/* Assurance */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Assurance habitation</h2>
          <dl className="space-y-2.5">
            <Row label="Compagnie" value={tenant.insurance_company} />
            <Row label="Numéro de police" value={tenant.insurance_policy_number} />
            <Row
              label="Expiration"
              value={fmtDate(tenant.insurance_expiry_date)}
              warning={insuranceDays !== null && insuranceDays <= 60}
            />
          </dl>
          {!tenant.insurance_company && (
            <p className="text-xs text-amber-500/70 mt-3">Assurance non renseignée</p>
          )}
        </div>

        {/* Bail */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Bail</h2>
          <dl className="space-y-2.5">
            <Row label="Type" value={LEASE_TYPE_LABELS[lease.type]} />
            <Row label="Entrée" value={fmtDate(lease.start_date)} />
            <Row label="Fin prévue" value={fmtDate(lease.end_date)} />
            {leaseDays !== null && leaseDays > 0 && (
              <Row label="Reste" value={`${leaseDays} jour${leaseDays > 1 ? 's' : ''}`} />
            )}
            <Row label="Renouvellement auto" value={lease.auto_renewal ? 'Oui' : 'Non'} />
          </dl>
        </div>

        {/* Loyer */}
        <div className="bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Loyer</h2>
          <dl className="space-y-2.5">
            <Row label="Loyer HC" value={fmt(lease.rent_amount) ? `${fmt(lease.rent_amount)} / mois` : null} />
            <Row label="Charges" value={lease.charges_amount > 0 ? `${fmt(lease.charges_amount)} / mois` : '0 €'} />
            <Row
              label="Total CC"
              value={`${fmt(lease.total_rent)} / mois`}
              highlight
            />
            <Row label="Dépôt de garantie" value={fmt(lease.deposit_amount)} />
            <Row label="Jour d'exigibilité" value={`Le ${lease.payment_day} du mois`} />
            <Row label="Indexation" value={lease.index_clause ? REFERENCE_INDEX_LABELS[lease.reference_index] : 'Non'} />
            <Row label="Prochaine révision" value={fmtDate(lease.next_revision_date)} warning={revisionDays !== null && revisionDays <= 30} />
          </dl>
        </div>
      </div>

      {/* Notes */}
      {tenant.notes && (
        <div className="mt-6 bg-[#13131a] border border-white/8 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-white mb-3">Notes</h2>
          <p className="text-sm text-gray-400 whitespace-pre-wrap">{tenant.notes}</p>
        </div>
      )}

      {/* Clôturer le bail */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <form action={async () => {
          'use server'
          await terminateLease(lease.id, tenant.id, propertyId)
        }}>
          <button
            type="submit"
            className="text-xs text-gray-600 hover:text-red-400 transition-colors"
            onClick={(e) => {
              if (!confirm('Clôturer le bail ? Le locataire passera en statut "sorti" et le bien redeviendra vacant.')) {
                e.preventDefault()
              }
            }}
          >
            Clôturer le bail
          </button>
        </form>
      </div>
    </div>
  )
}

function Row({ label, value, highlight, warning }: {
  label: string; value: string | null; highlight?: boolean; warning?: boolean
}) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-gray-500">{label}</dt>
      <dd className={`font-medium ${highlight ? 'text-[#C9A84C]' : warning ? 'text-amber-400' : 'text-white'}`}>
        {value}
      </dd>
    </div>
  )
}
