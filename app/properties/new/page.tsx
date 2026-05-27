import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PropertyForm from '@/components/properties/PropertyForm'

export default async function NewPropertyPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-white/8 px-6 py-4 flex items-center gap-4">
        <Link href="/properties" className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Mes biens
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-sm text-white">Nouveau bien</span>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-8">Ajouter un bien</h1>
        <PropertyForm />
      </div>
    </div>
  )
}
