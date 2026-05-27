'use client'

import { useActionState } from 'react'
import type { LeaseType, ReferenceIndex, Tenant, Lease } from '@/lib/types'
import { LEASE_TYPE_LABELS, REFERENCE_INDEX_LABELS } from '@/lib/types'
import { createTenantWithLease, updateTenant } from '@/lib/actions/tenants'

interface TenantLeaseFormProps {
  propertyId: string
  tenant?: Tenant
  lease?: Lease
}

const LEASE_TYPES: { value: LeaseType; label: string; duration: number }[] = [
  { value: 'location_nue', label: 'Location nue', duration: 36 },
  { value: 'location_meublee', label: 'Location meublée', duration: 12 },
  { value: 'bail_etudiant', label: 'Bail étudiant', duration: 9 },
  { value: 'bail_mobilite', label: 'Bail mobilité', duration: 10 },
  { value: 'colocation', label: 'Colocation', duration: 12 },
]

const REFERENCE_INDEXES: { value: ReferenceIndex; label: string }[] = [
  { value: 'irl', label: 'IRL' },
  { value: 'icc', label: 'ICC' },
  { value: 'ilat', label: 'ILAT' },
]

export default function TenantLeaseForm({ propertyId, tenant, lease }: TenantLeaseFormProps) {
  const isEdit = !!tenant
  const action = isEdit ? updateTenant : createTenantWithLease
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction} className="space-y-10 max-w-2xl">
      <input type="hidden" name="property_id" value={propertyId} />
      {tenant && <input type="hidden" name="id" value={tenant.id} />}

      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Informations locataire */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Locataire
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Prénom <span className="text-red-400">*</span></label>
              <input name="first_name" defaultValue={tenant?.first_name ?? ''} required placeholder="Marie" className={inp} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Nom <span className="text-red-400">*</span></label>
              <input name="last_name" defaultValue={tenant?.last_name ?? ''} required placeholder="Dupont" className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Email</label>
              <input name="email" type="email" defaultValue={tenant?.email ?? ''} placeholder="marie@exemple.com" className={inp} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Téléphone</label>
              <input name="phone" defaultValue={tenant?.phone ?? ''} placeholder="06 12 34 56 78" className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Profession</label>
              <input name="profession" defaultValue={tenant?.profession ?? ''} placeholder="Ingénieure" className={inp} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Revenus mensuels nets (€)</label>
              <input name="declared_income" type="number" min="0" defaultValue={tenant?.declared_income ?? ''} placeholder="2 800" className={inp} />
            </div>
          </div>
        </div>
      </section>

      {/* Assurance habitation */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Assurance habitation
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Compagnie</label>
              <input name="insurance_company" defaultValue={tenant?.insurance_company ?? ''} placeholder="Maif" className={inp} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Numéro de police</label>
              <input name="insurance_policy_number" defaultValue={tenant?.insurance_policy_number ?? ''} placeholder="123456789" className={inp} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Date d'expiration</label>
              <input name="insurance_expiry_date" type="date" defaultValue={tenant?.insurance_expiry_date ?? ''} className={inp} />
            </div>
          </div>
        </div>
      </section>

      {/* Bail — uniquement à la création */}
      {!isEdit && (
        <section>
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Bail
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Type de bail</label>
                <select name="lease_type" defaultValue="location_nue" className={inp}>
                  {LEASE_TYPES.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Date d'entrée <span className="text-red-400">*</span></label>
                <input name="start_date" type="date" required className={inp} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Durée (mois)</label>
                <input name="duration_months" type="number" min="1" defaultValue="36" placeholder="36" className={inp} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Jour d'exigibilité</label>
                <input name="payment_day" type="number" min="1" max="31" defaultValue="1" className={inp} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Loyer HC (€) <span className="text-red-400">*</span></label>
                <input name="rent_amount" type="number" min="0" required placeholder="650" className={inp} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Charges (€)</label>
                <input name="charges_amount" type="number" min="0" defaultValue="0" placeholder="50" className={inp} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Dépôt de garantie (€)</label>
                <input name="deposit_amount" type="number" min="0" placeholder="1 300" className={inp} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="index_clause" defaultChecked className="w-4 h-4 accent-[#C9A84C]" />
                  <span className="text-sm text-gray-400">Clause d'indexation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="auto_renewal" defaultChecked className="w-4 h-4 accent-[#C9A84C]" />
                  <span className="text-sm text-gray-400">Renouvellement automatique</span>
                </label>
              </div>
              <div className="w-48">
                <label className="block text-sm text-gray-400 mb-1.5">Indice de référence</label>
                <select name="reference_index" defaultValue="irl" className={inp}>
                  {REFERENCE_INDEXES.map(i => (
                    <option key={i.value} value={i.value}>{i.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Notes sur le bail</label>
              <textarea name="lease_notes" rows={3} className={`${inp} resize-none`} placeholder="Observations particulières..." />
            </div>
          </div>
        </section>
      )}

      {/* Notes locataire */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Notes</h2>
        <textarea
          name="tenant_notes"
          defaultValue={tenant?.notes ?? ''}
          rows={3}
          className={`${inp} resize-none`}
          placeholder="Notes internes sur ce locataire..."
        />
      </section>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0a0a0f] font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          {pending
            ? 'Enregistrement...'
            : isEdit ? 'Enregistrer les modifications' : 'Enregistrer le locataire et le bail'}
        </button>
        <a
          href={`/properties/${propertyId}/locataire`}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          Annuler
        </a>
      </div>
    </form>
  )
}

const inp = 'w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors'
