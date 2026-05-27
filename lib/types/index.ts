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
