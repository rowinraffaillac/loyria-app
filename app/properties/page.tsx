import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getProperties } from '@/lib/actions/properties'
import PropertyCard from '@/components/properties/PropertyCard'

export default async function PropertiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const properties = await getProperties()

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <header className="border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 28 28">
            <rect width="28" height="28" rx="4" fill="#1a2744"/>
            <rect x="5" y="5" width="3" height="12" fill="#C9A84C"/>
            <rect x="5" y="14" width="10" height="3" fill="#C9A84C"/>
            <rect x="20" y="9" width="3" height="14" fill="#C9A84C"/>
            <rect x="13" y="9" width="10" height="3" fill="#C9A84C"/>
          </svg>
          <span className="font-bold tracking-wide">
            <span className="text-[#C9A84C]">L</span>OYRIA
          </span>
        </div>
        <form action="/auth/signout" method="post">
          <button className="text-sm text-gray-500 hover:text-white transition-colors">
            Déconnexion
          </button>
        </form>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Titre + CTA */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Mes biens</h1>
            <p className="text-gray-500 text-sm mt-1">
              {properties.length === 0
                ? 'Aucun bien ajouté pour l\'instant'
                : `${properties.length} bien${properties.length > 1 ? 's' : ''}`}
            </p>
          </div>
          <Link
            href="/properties/new"
            className="bg-[#C9A84C] hover:bg-[#b8963e] text-[#0a0a0f] font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Ajouter un bien
          </Link>
        </div>

        {/* Liste */}
        {properties.length === 0 ? (
          <div className="bg-[#13131a] border border-white/8 rounded-xl p-12 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-lg font-semibold text-white mb-2">Ajoutez votre premier bien</h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
              Centralisez la gestion de vos appartements, maisons et locaux dans un seul endroit.
            </p>
            <Link
              href="/properties/new"
              className="inline-block bg-[#C9A84C] hover:bg-[#b8963e] text-[#0a0a0f] font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Ajouter un bien
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
