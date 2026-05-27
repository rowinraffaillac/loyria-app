'use client'

import { useActionState } from 'react'
import type { Property, PropertyType, PropertyStatus, TaxRegime, OwnershipType } from '@/lib/types'
import { createProperty, updateProperty } from '@/lib/actions/properties'

interface PropertyFormProps {
  property?: Property
}

const TYPES: { value: PropertyType; label: string }[] = [
  { value: 'appartement', label: 'Appartement' },
  { value: 'maison', label: 'Maison' },
  { value: 'studio', label: 'Studio' },
  { value: 'immeuble', label: 'Immeuble' },
  { value: 'parking', label: 'Parking' },
  { value: 'garage', label: 'Garage' },
  { value: 'local_commercial', label: 'Local commercial' },
  { value: 'autre', label: 'Autre' },
]

const STATUSES: { value: PropertyStatus; label: string }[] = [
  { value: 'vacant', label: 'Vacant' },
  { value: 'loue', label: 'Loué' },
  { value: 'en_travaux', label: 'En travaux' },
  { value: 'en_recherche', label: 'En recherche de locataire' },
  { value: 'vendu', label: 'Vendu' },
]

const TAX_REGIMES: { value: TaxRegime; label: string }[] = [
  { value: 'micro_foncier', label: 'Micro-foncier' },
  { value: 'reel', label: 'Réel' },
  { value: 'lmnp', label: 'LMNP' },
  { value: 'sci', label: 'SCI' },
  { value: 'autre', label: 'Autre' },
]

const OWNERSHIP_TYPES: { value: OwnershipType; label: string }[] = [
  { value: 'nom_propre', label: 'Nom propre' },
  { value: 'sci', label: 'SCI' },
  { value: 'indivision', label: 'Indivision' },
  { value: 'societe', label: 'Société' },
]

export default function PropertyForm({ property }: PropertyFormProps) {
  const action = property ? updateProperty : createProperty
  const [state, formAction, pending] = useActionState(action, null)

  const p = property

  return (
    <form action={formAction} className="space-y-8 max-w-2xl">
      {p && <input type="hidden" name="id" value={p.id} />}

      {state?.error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Informations générales */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Informations générales
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Nom du bien <span className="text-red-400">*</span></label>
            <input
              name="name"
              defaultValue={p?.name ?? ''}
              required
              placeholder="ex: Appartement Lyon Part-Dieu"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Adresse <span className="text-red-400">*</span></label>
            <input
              name="address"
              defaultValue={p?.address ?? ''}
              required
              placeholder="ex: 12 rue de la République"
              className={inputCls}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Ville <span className="text-red-400">*</span></label>
              <input
                name="city"
                defaultValue={p?.city ?? ''}
                required
                placeholder="Lyon"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Code postal <span className="text-red-400">*</span></label>
              <input
                name="postal_code"
                defaultValue={p?.postal_code ?? ''}
                required
                placeholder="69001"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Type</label>
              <select name="type" defaultValue={p?.type ?? 'appartement'} className={inputCls}>
                {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Statut</label>
              <select name="status" defaultValue={p?.status ?? 'vacant'} className={inputCls}>
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Caractéristiques
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Surface (m²)</label>
              <input
                name="surface"
                type="number"
                step="0.01"
                min="0"
                defaultValue={p?.surface ?? ''}
                placeholder="58"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Pièces</label>
              <input
                name="rooms_count"
                type="number"
                min="0"
                defaultValue={p?.rooms_count ?? ''}
                placeholder="3"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Chambres</label>
              <input
                name="bedrooms_count"
                type="number"
                min="0"
                defaultValue={p?.bedrooms_count ?? ''}
                placeholder="2"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Étage</label>
              <input
                name="floor"
                type="number"
                min="0"
                defaultValue={p?.floor ?? ''}
                placeholder="2"
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="has_elevator"
                defaultChecked={p?.has_elevator ?? false}
                className="w-4 h-4 accent-[#C9A84C]"
              />
              <span className="text-sm text-gray-400">Ascenseur</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="is_furnished"
                defaultChecked={p?.is_furnished ?? false}
                className="w-4 h-4 accent-[#C9A84C]"
              />
              <span className="text-sm text-gray-400">Meublé</span>
            </label>
          </div>
        </div>
      </section>

      {/* Informations patrimoniales */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
          Informations patrimoniales
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Date d'acquisition</label>
              <input
                name="purchase_date"
                type="date"
                defaultValue={p?.purchase_date ?? ''}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Prix d'achat (€)</label>
              <input
                name="purchase_price"
                type="number"
                min="0"
                defaultValue={p?.purchase_price ?? ''}
                placeholder="150 000"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Frais de notaire (€)</label>
              <input name="notary_fees" type="number" min="0" defaultValue={p?.notary_fees ?? ''} placeholder="10 000" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Frais d'agence (€)</label>
              <input name="agency_fees" type="number" min="0" defaultValue={p?.agency_fees ?? ''} placeholder="5 000" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Travaux initiaux (€)</label>
              <input name="initial_works_cost" type="number" min="0" defaultValue={p?.initial_works_cost ?? ''} placeholder="15 000" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Valeur estimée actuelle (€)</label>
              <input name="estimated_value" type="number" min="0" defaultValue={p?.estimated_value ?? ''} placeholder="180 000" className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Taxe foncière annuelle (€)</label>
              <input name="property_tax" type="number" min="0" defaultValue={p?.property_tax ?? ''} placeholder="800" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Charges copropriété / mois (€)</label>
              <input name="condo_charges" type="number" min="0" defaultValue={p?.condo_charges ?? ''} placeholder="120" className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Régime fiscal</label>
              <select name="tax_regime" defaultValue={p?.tax_regime ?? 'micro_foncier'} className={inputCls}>
                {TAX_REGIMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Mode de détention</label>
              <select name="ownership_type" defaultValue={p?.ownership_type ?? 'nom_propre'} className={inputCls}>
                {OWNERSHIP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Notes</h2>
        <textarea
          name="notes"
          defaultValue={p?.notes ?? ''}
          rows={4}
          placeholder="Notes internes sur ce bien..."
          className={`${inputCls} resize-none`}
        />
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-[#C9A84C] hover:bg-[#b8963e] disabled:opacity-50 text-[#0a0a0f] font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          {pending ? 'Enregistrement...' : p ? 'Enregistrer les modifications' : 'Créer le bien'}
        </button>
        <a href={p ? `/properties/${p.id}` : '/properties'} className="text-sm text-gray-500 hover:text-white transition-colors">
          Annuler
        </a>
      </div>
    </form>
  )
}

const inputCls = 'w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#C9A84C]/50 transition-colors'
