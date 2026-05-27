import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Dashboard redirects to /properties — kept for backwards compat

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  redirect('/properties')

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect width="28" height="28" rx="4" fill="#1a2744"/>
            <rect x="5" y="5" width="3" height="12" fill="#C9A84C"/>
            <rect x="5" y="14" width="10" height="3" fill="#C9A84C"/>
            <rect x="20" y="9" width="3" height="14" fill="#C9A84C"/>
            <rect x="13" y="9" width="10" height="3" fill="#C9A84C"/>
          </svg>
          <span className="text-lg font-bold text-white tracking-wide">
            <span className="text-[#C9A84C]">L</span>OYRIA
          </span>
        </div>
        <form action="/auth/signout" method="post">
          <button className="text-sm text-gray-400 hover:text-white transition-colors">
            Déconnexion
          </button>
        </form>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
          <p className="text-gray-400 mt-1">Bienvenue, {user?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Propriétés', value: '0', color: 'text-[#6366f1]' },
            { label: 'Locataires actifs', value: '0', color: 'text-[#10b981]' },
            { label: 'Loyers ce mois', value: '0 €', color: 'text-white' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#13131a] border border-white/10 rounded-xl p-5">
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 font-mono ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#13131a] border border-white/10 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">🏠</div>
          <h2 className="text-lg font-semibold text-white mb-2">Ajoutez votre première propriété</h2>
          <p className="text-gray-400 text-sm mb-5">
            Commencez par ajouter un bien pour suivre vos locataires et vos loyers.
          </p>
          <button className="bg-[#6366f1] hover:bg-[#5558e0] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
            Ajouter une propriété
          </button>
        </div>
      </main>
    </div>
  )
}
