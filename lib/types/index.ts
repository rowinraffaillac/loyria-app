export type PropertyType =
  | 'appartement' | 'maison' | 'studio' | 'immeuble'
  | 'parking' | 'garage' | 'local_commercial' | 'autre'

export type PropertyStatus =
  | 'loue' | 'vacant' | 'en_travaux' | 'en_recherche' | 'vendu' | 'archive'

export type TaxRegime = 'micro_foncier' | 'reel' | 'lmnp' | 'sci' | 'autre'

export type OwnershipType = 'nom_propre' | 'sci' | 'indivision' | 'societe'

export interface Property {
  id: string
  owner_id: string
  organization_id: string | null
  name: string
  address: string
  city: string
  postal_code: string
  country: string
  type: PropertyType
  surface: number | null
  rooms_count: number | null
  bedrooms_count: number | null
  floor: number | null
  has_elevator: boolean
  is_furnished: boolean
  status: PropertyStatus
  purchase_date: string | null
  purchase_price: number | null
  notary_fees: number | null
  agency_fees: number | null
  initial_works_cost: number | null
  estimated_value: number | null
  tax_regime: TaxRegime
  ownership_type: OwnershipType
  property_tax: number | null
  condo_charges: number | null
  notes: string | null
  photos: string[]
  created_at: string
  updated_at: string
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  appartement: 'Appartement',
  maison: 'Maison',
  studio: 'Studio',
  immeuble: 'Immeuble',
  parking: 'Parking',
  garage: 'Garage',
  local_commercial: 'Local commercial',
  autre: 'Autre',
}

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  loue: 'Loué',
  vacant: 'Vacant',
  en_travaux: 'En travaux',
  en_recherche: 'En recherche',
  vendu: 'Vendu',
  archive: 'Archivé',
}

export const PROPERTY_STATUS_COLORS: Record<PropertyStatus, string> = {
  loue: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  vacant: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  en_travaux: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  en_recherche: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  vendu: 'bg-gray-500/15 text-gray-400 border-gray-500/20',
  archive: 'bg-gray-500/10 text-gray-500 border-gray-500/10',
}

export const TAX_REGIME_LABELS: Record<TaxRegime, string> = {
  micro_foncier: 'Micro-foncier',
  reel: 'Réel',
  lmnp: 'LMNP',
  sci: 'SCI',
  autre: 'Autre',
}

export const OWNERSHIP_TYPE_LABELS: Record<OwnershipType, string> = {
  nom_propre: 'Nom propre',
  sci: 'SCI',
  indivision: 'Indivision',
  societe: 'Société',
}

// ─── Locataires ────────────────────────────────────────────

export type TenantStatus = 'actif' | 'sorti' | 'candidat' | 'archive'

export interface Tenant {
  id: string
  owner_id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  previous_address: string | null
  profession: string | null
  employer: string | null
  declared_income: number | null
  deposit_amount: number | null
  insurance_company: string | null
  insurance_policy_number: string | null
  insurance_expiry_date: string | null
  status: TenantStatus
  notes: string | null
  created_at: string
  updated_at: string
}

// ─── Baux ──────────────────────────────────────────────────

export type LeaseType =
  | 'location_nue' | 'location_meublee' | 'bail_etudiant'
  | 'bail_mobilite' | 'colocation' | 'bail_commercial'

export type LeaseStatus =
  | 'brouillon' | 'actif' | 'en_attente_signature'
  | 'resilie' | 'expire' | 'archive'

export type ReferenceIndex = 'irl' | 'icc' | 'ilat'

export interface Lease {
  id: string
  property_id: string
  owner_id: string
  type: LeaseType
  start_date: string
  duration_months: number | null
  end_date: string | null
  auto_renewal: boolean
  rent_amount: number
  charges_amount: number
  total_rent: number
  deposit_amount: number | null
  payment_day: number
  index_clause: boolean
  reference_index: ReferenceIndex
  last_revision_date: string | null
  next_revision_date: string | null
  status: LeaseStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export const LEASE_TYPE_LABELS: Record<LeaseType, string> = {
  location_nue: 'Location nue',
  location_meublee: 'Location meublée',
  bail_etudiant: 'Bail étudiant',
  bail_mobilite: 'Bail mobilité',
  colocation: 'Colocation',
  bail_commercial: 'Bail commercial',
}

export const LEASE_STATUS_LABELS: Record<LeaseStatus, string> = {
  brouillon: 'Brouillon',
  actif: 'Actif',
  en_attente_signature: 'En attente de signature',
  resilie: 'Résilié',
  expire: 'Expiré',
  archive: 'Archivé',
}

export const REFERENCE_INDEX_LABELS: Record<ReferenceIndex, string> = {
  irl: 'IRL (Indice de Référence des Loyers)',
  icc: 'ICC (Indice du Coût de la Construction)',
  ilat: 'ILAT (Indice des Loyers des Activités Tertiaires)',
}
