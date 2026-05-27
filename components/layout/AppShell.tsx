'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Property } from '@/lib/types'

const NAV_ITEMS = [
  { href: '', label: 'Vue générale', icon: '◈' },
  { href: '/locataire', label: 'Locataire', icon: '◉' },
  { href: '/finances', label: 'Finances', icon: '◈', soon: true },
  { href: '/travaux', label: 'Travaux', icon: '◈', soon: true },
  { href: '/documents', label: 'Documents', icon: '◈', soon: true },
  { href: '/acces', label: 'Accès', icon: '◈', soon: true },
]

interface AppShellProps {
  property: Property
  children: React.ReactNode
}

export default function AppShell({ property, children }: AppShellProps) {
  const pathname = usePathname()
  const base = `/properties/${property.id}`

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-[#0d0d15] border-r border-white/8 flex flex-col">
        {/* Logo + retour */}
        <div className="px-4 py-5 border-b border-white/8">
          <Link href="/properties" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4">
            <span>←</span>
            <span>Mes biens</span>
          </Link>
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 28 28" className="shrink-0">
              <rect width="28" height="28" rx="4" fill="#1a2744"/>
              <rect x="5" y="5" width="3" height="12" fill="#C9A84C"/>
              <rect x="5" y="14" width="10" height="3" fill="#C9A84C"/>
              <rect x="20" y="9" width="3" height="14" fill="#C9A84C"/>
              <rect x="13" y="9" width="10" height="3" fill="#C9A84C"/>
            </svg>
            <span className="text-sm font-bold tracking-wide text-white">
              <span className="text-[#C9A84C]">L</span>OYRIA
            </span>
          </div>
        </div>

        {/* Nom du bien */}
        <div className="px-4 py-3 border-b border-white/8">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bien actif</p>
          <p className="text-sm font-medium text-white truncate">{property.name}</p>
          <p className="text-xs text-gray-500 truncate">{property.city}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {NAV_ITEMS.map(item => {
            const href = `${base}${item.href}`
            const isActive = item.href === ''
              ? pathname === base
              : pathname.startsWith(href)

            return (
              <Link
                key={item.href}
                href={item.soon ? '#' : href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${isActive
                    ? 'bg-[#C9A84C]/10 text-[#C9A84C]'
                    : item.soon
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>{item.label}</span>
                {item.soon && (
                  <span className="text-[10px] bg-white/5 text-gray-600 px-1.5 py-0.5 rounded">
                    bientôt
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Déconnexion */}
        <div className="px-2 py-3 border-t border-white/8">
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <span>⎋</span>
              <span>Déconnexion</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
