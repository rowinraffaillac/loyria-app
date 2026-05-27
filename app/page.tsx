import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <nav className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <rect width="28" height="28" rx="4" fill="#1a2744"/>
            <rect x="5" y="5" width="3" height="12" fill="#C9A84C"/>
            <rect x="5" y="14" width="10" height="3" fill="#C9A84C"/>
            <rect x="20" y="9" width="3" height="14" fill="#C9A84C"/>
            <rect x="13" y="9" width="10" height="3" fill="#C9A84C"/>
          </svg>
          <span className="text-lg font-bold tracking-wide">
            <span className="text-[#C9A84C]">L</span>OYRIA
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Connexion
          </Link>
          <Link href="/register" className="bg-[#6366f1] hover:bg-[#5558e0] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Votre patrimoine locatif,
          <br />
          <span className="text-[#6366f1]">enfin ordonné</span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Gérez vos propriétés, suivez vos loyers et gardez vos documents au même endroit.
          Simple, propre, pensé pour les bailleurs sérieux.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="bg-[#6366f1] hover:bg-[#5558e0] text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors">
            Commencer gratuitement
          </Link>
          <Link href="/login" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors">
            Se connecter
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-20 text-left">
          {[
            { icon: '🏠', title: 'Multi-propriétés', desc: 'Gérez tous vos biens depuis un seul tableau de bord' },
            { icon: '💶', title: 'Suivi des loyers', desc: 'Visualisez les paiements et détectez les impayés instantanément' },
            { icon: '📄', title: 'Documents centralisés', desc: 'Contrats, quittances et diagnostics toujours à portée' },
          ].map(f => (
            <div key={f.title} className="bg-[#13131a] border border-white/10 rounded-xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
