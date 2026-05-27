'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <svg width="36" height="36" viewBox="0 0 28 28">
              <rect width="28" height="28" rx="4" fill="#1a2744"/>
              <rect x="5" y="5" width="3" height="12" fill="#C9A84C"/>
              <rect x="5" y="14" width="10" height="3" fill="#C9A84C"/>
              <rect x="20" y="9" width="3" height="14" fill="#C9A84C"/>
              <rect x="13" y="9" width="10" height="3" fill="#C9A84C"/>
            </svg>
            <span className="text-2xl font-bold text-white tracking-wide">
              <span className="text-[#C9A84C]">L</span>OYRIA
            </span>
          </div>
          <h1 className="text-xl font-semibold text-white">Connexion</h1>
          <p className="text-gray-400 text-sm mt-1">Accédez à votre espace bailleur</p>
        </div>

        <form onSubmit={handleLogin} className="bg-[#13131a] border border-white/10 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6366f1] transition-colors"
              placeholder="vous@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6366f1] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6366f1] hover:bg-[#5558e0] disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <p className="text-center text-sm text-gray-500">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-[#6366f1] hover:underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
