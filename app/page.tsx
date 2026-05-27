import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div style={{ background: 'var(--navy)', color: 'var(--cream)', minHeight: '100vh' }}>

      {/* ── NAV ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <svg height={28} width={21} viewBox="0 0 60 80" aria-hidden="true">
              <path d="M8,8 L24,8 L24,52 L52,52 L52,68 L8,68 Z" fill="#D8C28A" />
              <path d="M52,8 L52,40 L40,40 L40,24 L20,24 L20,8 Z" fill="#D8C28A" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 600, fontSize: 17, letterSpacing: '0.12em', color: 'var(--cream)' }}>
              LOYRIA
            </span>
          </div>

          <div style={{ display: 'flex', gap: 32 }}>
            {['Fonctionnalités', 'Tarifs', 'Sécurité', 'Contact'].map(l => (
              <a key={l} href={l === 'Fonctionnalités' ? '#features' : l === 'Tarifs' ? '#pricing' : '#'}
                style={{ color: 'var(--cream-2)', fontSize: 13.5, fontWeight: 400, letterSpacing: '0.01em', transition: 'color 0.18s', textDecoration: 'none' }}>
                {l}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Link href="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 13.5, fontWeight: 500, padding: '9px 16px',
              borderRadius: 'var(--r-md)', border: '1px solid transparent',
              background: 'transparent', color: 'var(--cream-2)', textDecoration: 'none',
              transition: 'all 0.18s ease',
            }}>
              Se connecter
            </Link>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(180deg, var(--champagne-3) 0%, var(--champagne) 50%, var(--champagne-2) 100%)',
              color: 'var(--navy)', border: '1px solid var(--champagne-2)',
              boxShadow: 'var(--shadow-cta)', fontWeight: 600, fontSize: 13.5,
              padding: '9px 16px', borderRadius: 'var(--r-md)', textDecoration: 'none',
            }}>
              Commencer gratuitement
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </nav>
      </div>

      {/* ── HERO ── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Champagne glow */}
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 600,
          background: 'radial-gradient(ellipse, rgba(216,194,138,0.10) 0%, transparent 65%)',
          filter: 'blur(40px)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 2 }}>
          <section style={{ textAlign: 'center', padding: '60px 0 90px' }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px 5px 6px',
              background: 'rgba(216,194,138,0.08)',
              border: '1px solid rgba(216,194,138,0.25)',
              borderRadius: 999, fontSize: 12.5, color: 'var(--cream-2)',
              marginBottom: 28, letterSpacing: '0.01em',
            }}>
              <span style={{
                background: 'var(--champagne)', color: 'var(--navy)', fontWeight: 600,
                padding: '2px 9px', borderRadius: 999, fontSize: 10.5, letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
              }}>Nouveau</span>
              Vue patrimoine multi-biens
            </div>

            <h1 style={{
              fontFamily: 'var(--font-sora), sans-serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              lineHeight: 1.07, letterSpacing: '-0.03em', fontWeight: 600,
              margin: '0 auto 24px', maxWidth: 900,
            }}>
              La gestion locative claire<br />
              pour <span style={{ color: 'var(--champagne)' }}>bailleurs exigeants.</span>
            </h1>

            <p style={{
              fontSize: 18, color: 'var(--cream-2)', maxWidth: 640,
              margin: '0 auto 38px', lineHeight: 1.6,
            }}>
              Centralisez vos biens, loyers, documents et échéances dans un cockpit simple, sécurisé et pensé pour votre patrimoine.
            </p>

            {/* CTA */}
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginBottom: 80 }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(180deg, var(--champagne-3) 0%, var(--champagne) 50%, var(--champagne-2) 100%)',
                color: 'var(--navy)', border: '1px solid var(--champagne-2)',
                boxShadow: 'var(--shadow-cta)', fontWeight: 600, fontSize: 14.5,
                padding: '12px 22px', borderRadius: 12, textDecoration: 'none',
              }}>
                Commencer gratuitement
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/login" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14.5, fontWeight: 500, padding: '11px 22px', borderRadius: 12,
                border: '1px solid rgba(247,243,234,0.18)', background: 'transparent',
                color: 'var(--cream)', textDecoration: 'none',
              }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Voir la démo
              </Link>
            </div>

            {/* App mockup */}
            <div style={{
              position: 'relative', maxWidth: 1080, margin: '0 auto',
              borderRadius: 16, background: 'var(--ivory)',
              border: '1px solid rgba(216,194,138,0.20)', overflow: 'hidden',
              boxShadow: '0 60px 100px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(216,194,138,0.10), 0 30px 60px -20px rgba(216,194,138,0.20)',
            }}>
              {/* Browser bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '11px 14px', borderBottom: '1px solid var(--bd-light)',
                background: 'var(--white)',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e2877c' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#e6c267' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#84b89d' }} />
                <span style={{ marginLeft: 16, fontFamily: 'var(--font-mono), monospace', fontSize: 11.5, color: 'var(--ink-3)' }}>
                  app.loyria.fr / tableau-de-bord
                </span>
              </div>
              {/* App content */}
              <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', height: 440 }}>
                {/* Sidebar */}
                <div style={{ background: 'var(--navy)', padding: '22px 14px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: 'var(--champagne)' }}>
                    <svg height={22} width={16} viewBox="0 0 60 80"><path d="M8,8 L24,8 L24,52 L52,52 L52,68 L8,68 Z" fill="#D8C28A"/><path d="M52,8 L52,40 L40,40 L40,24 L20,24 L20,8 Z" fill="#D8C28A"/></svg>
                    <span style={{ fontFamily: 'var(--font-sora), sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em' }}>LOYRIA</span>
                  </div>
                  {[
                    { label: 'Tableau de bord', active: true },
                    { label: 'Patrimoine', active: false },
                    { label: 'Locataires', active: false },
                    { label: 'Finances', active: false },
                    { label: 'Échéances', active: false },
                    { label: 'Documents', active: false },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 8, fontSize: 12.5,
                      background: item.active ? 'rgba(216,194,138,0.12)' : 'transparent',
                      color: item.active ? 'var(--champagne)' : 'rgba(247,243,234,0.50)',
                      boxShadow: item.active ? 'inset 2px 0 0 var(--champagne)' : 'none',
                    }}>
                      <div style={{ width: 13, height: 13, borderRadius: 3, background: 'currentColor', opacity: 0.6, flexShrink: 0 }} />
                      {item.label}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--ivory)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                    <div style={{ background: 'var(--navy)', border: 'none', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'rgba(247,243,234,0.50)', fontWeight: 600 }}>Loyers à recevoir · mai 2026</div>
                      <div style={{ fontFamily: 'var(--font-sora), sans-serif', fontSize: 22, fontWeight: 600, color: 'var(--champagne)', letterSpacing: '-0.02em' }}>12 450 €</div>
                      <div style={{ fontSize: 11.5, color: 'rgba(247,243,234,0.40)' }}>3 paiements en attente · 1 en retard</div>
                    </div>
                    {[
                      { label: 'Taux d\'occupation', value: '94 %', sub: '12 mois glissants' },
                      { label: 'Rendement net', value: '4,8 %', sub: '5 biens · 280 m²' },
                    ].map(t => (
                      <div key={t.label} style={{ background: 'var(--white)', border: '1px solid var(--bd-light-2)', borderRadius: 12, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{ fontSize: 10, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: 'var(--ink-3)', fontWeight: 600 }}>{t.label}</div>
                        <div style={{ fontFamily: 'var(--font-sora), sans-serif', fontSize: 22, fontWeight: 600, color: 'var(--navy)', letterSpacing: '-0.02em' }}>{t.value}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{t.sub}</div>
                      </div>
                    ))}
                  </div>
                  {/* Chart */}
                  <div style={{ background: 'var(--white)', border: '1px solid var(--bd-light-2)', borderRadius: 12, padding: 16, flex: 1, display: 'flex', alignItems: 'flex-end', gap: 10, minHeight: 0 }}>
                    {[55, 70, 60, 85, 75, 92, 80, 88, 95, 82, 90, 72].map((h, i) => (
                      <div key={i} style={{
                        flex: 1, borderRadius: '4px 4px 0 0', minHeight: 8,
                        height: `${h}%`,
                        background: 'linear-gradient(180deg, var(--champagne) 0%, var(--ivory-3) 100%)',
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginTop: 70, fontFamily: 'var(--font-sora), sans-serif',
              fontSize: 14, color: 'var(--cream-3)', letterSpacing: '0.04em',
            }}>
              <span style={{ width: 36, height: 1, background: 'var(--champagne)', display: 'block' }} />
              Gestion locative <span style={{ color: 'var(--champagne)', fontWeight: 500, margin: '0 4px' }}>claire</span>, patrimoine <span style={{ color: 'var(--champagne)', fontWeight: 500, margin: '0 4px' }}>maîtrisé</span>.
            </div>

          </section>
        </div>
      </div>

      {/* ── FEATURES (ivory) ── */}
      <section id="features" style={{ padding: '90px 0', background: 'var(--ivory)', color: 'var(--ink)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'var(--petrol)', fontWeight: 600, marginBottom: 16 }}>
              Ce que Loyria fait pour vous
            </div>
            <h2 style={{ fontFamily: 'var(--font-sora), sans-serif', fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.025em', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.15 }}>
              Tout votre patrimoine, sous contrôle.
            </h2>
            <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 16 }}>
              Quatre piliers qui couvrent l'intégralité du cycle de vie d'un bien locatif. Pensés pour les bailleurs qui gèrent eux-mêmes.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { icon: '🏢', title: 'Multi-biens', desc: 'Pilotez 2 à 50 biens depuis un cockpit unique. Vue consolidée du patrimoine ou détaillée par bien.' },
              { icon: '💶', title: 'Suivi des loyers', desc: 'Encaissements, retards et relances locataires. Quittances générées automatiquement, prêtes à l\'envoi.' },
              { icon: '📁', title: 'Documents centralisés', desc: 'Baux, états des lieux, DPE, assurances, factures de travaux — classés, recherchables, archivés.' },
              { icon: '🔔', title: 'Alertes d\'échéances', desc: 'Révision IRL, renouvellement PNO, fin de bail, DPE expirant — vous savez exactement ce qui arrive.' },
            ].map(f => (
              <div key={f.title} style={{
                background: 'var(--white)', border: '1px solid var(--bd-light-2)',
                borderRadius: 'var(--r-xl)', padding: '26px 22px',
                boxShadow: 'var(--shadow-1)', transition: 'all 0.25s ease',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--ivory)', color: 'var(--petrol)',
                  display: 'grid', placeItems: 'center',
                  marginBottom: 18, border: '1px solid var(--bd-light)',
                  fontSize: 20,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: 16.5, fontWeight: 600, fontFamily: 'var(--font-sora), sans-serif' }}>
                  {f.title}
                </h3>
                <p style={{ margin: 0, color: 'var(--ink-2)', fontSize: 13.5, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (navy) ── */}
      <section id="pricing" style={{ padding: '90px 0', background: 'var(--navy)', color: 'var(--cream)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: 'var(--champagne)', fontWeight: 600, marginBottom: 16 }}>
              Tarifs simples
            </div>
            <h2 style={{ fontFamily: 'var(--font-sora), sans-serif', fontSize: 'clamp(28px, 3.6vw, 42px)', letterSpacing: '-0.025em', fontWeight: 600, margin: '0 0 16px', lineHeight: 1.15 }}>
              Investissez malin, gérez mieux.
            </h2>
            <p style={{ margin: 0, color: 'var(--cream-2)', fontSize: 16 }}>
              Trois plans pensés pour grandir avec votre patrimoine. Aucune carte bancaire requise pour démarrer.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 1000, margin: '0 auto' }}>
            {[
              {
                name: 'Essentiel', tagline: 'Pour démarrer en douceur', price: '0 €',
                features: ['1 bien immobilier', 'Suivi des loyers', 'Documents centralisés (1 Go)', 'Génération de quittances'],
                dim: ['Vue patrimoine multi-biens', 'Export fiscal'],
                cta: 'Commencer', featured: false,
              },
              {
                name: 'Patrimoine', tagline: 'Pour les bailleurs autonomes', price: '12 €',
                features: ['Jusqu\'à 10 biens', 'Tout du plan Essentiel', 'Vue patrimoine consolidée', 'Échéances et alertes intelligentes', 'Récap fiscal annuel', '3 collaborateurs par bien'],
                dim: [],
                cta: 'Choisir Patrimoine', featured: true,
              },
              {
                name: 'Cabinet', tagline: 'Pour les portefeuilles étendus', price: '29 €',
                features: ['Biens illimités', 'Tout du plan Patrimoine', 'Collaborateurs illimités', 'SCI multi-associés', 'Export comptable avancé', 'Support dédié'],
                dim: [],
                cta: 'Choisir Cabinet', featured: false,
              },
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.featured
                  ? 'linear-gradient(180deg, var(--navy-2) 0%, var(--petrol) 100%)'
                  : 'var(--navy-2)',
                border: plan.featured ? '1.5px solid var(--champagne)' : '1px solid var(--bd-dark)',
                borderRadius: 'var(--r-2xl)', padding: '32px 28px',
                display: 'flex', flexDirection: 'column',
                position: 'relative', color: 'var(--cream)',
                transform: plan.featured ? 'scale(1.02)' : 'none',
                boxShadow: plan.featured ? '0 20px 60px -20px rgba(216,194,138,0.25)' : 'none',
              }}>
                {plan.featured && (
                  <div style={{
                    position: 'absolute', top: -12, right: 24,
                    background: 'var(--champagne)', color: 'var(--navy)',
                    fontSize: 10.5, fontWeight: 600, letterSpacing: '0.10em',
                    textTransform: 'uppercase' as const, padding: '4px 12px',
                    borderRadius: 999, boxShadow: '0 4px 14px rgba(216,194,138,0.40)',
                  }}>
                    Le plus populaire
                  </div>
                )}
                <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 600, fontFamily: 'var(--font-sora), sans-serif' }}>{plan.name}</h3>
                <div style={{ color: 'var(--cream-3)', fontSize: 13, marginBottom: 24 }}>{plan.tagline}</div>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 6,
                  marginBottom: 24, paddingBottom: 22, borderBottom: '1px solid var(--bd-dark)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-sora), sans-serif', fontSize: 44, fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: plan.featured ? 'var(--champagne)' : 'var(--cream)',
                  }}>{plan.price}</span>
                  <span style={{ color: 'var(--cream-3)', fontSize: 13 }}>/ mois</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--cream-2)' }}>
                      <span style={{ color: 'var(--champagne)', flexShrink: 0, marginTop: 1 }}>✓</span> {f}
                    </li>
                  ))}
                  {plan.dim.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: 'var(--cream-4)' }}>
                      <span style={{ flexShrink: 0, marginTop: 1 }}>✕</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', padding: '12px 0', borderRadius: 12,
                  fontWeight: 600, fontSize: 14.5, textDecoration: 'none',
                  ...(plan.featured ? {
                    background: 'linear-gradient(180deg, var(--champagne-3) 0%, var(--champagne) 50%, var(--champagne-2) 100%)',
                    color: 'var(--navy)', border: '1px solid var(--champagne-2)',
                    boxShadow: 'var(--shadow-cta)',
                  } : {
                    background: 'transparent', color: 'var(--cream)',
                    border: '1px solid var(--bd-dark-hi)',
                  }),
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--bd-dark)', color: 'var(--cream-3)', fontSize: 13 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--cream)' }}>
              <svg height={22} width={16} viewBox="0 0 60 80"><path d="M8,8 L24,8 L24,52 L52,52 L52,68 L8,68 Z" fill="#D8C28A"/><path d="M52,8 L52,40 L40,40 L40,24 L20,24 L20,8 Z" fill="#D8C28A"/></svg>
              <span style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 600, fontSize: 14, letterSpacing: '0.12em' }}>LOYRIA</span>
            </div>
            <span style={{ fontFamily: 'var(--font-sora), sans-serif', color: 'var(--champagne)', fontStyle: 'italic', fontSize: 13.5 }}>
              Gestion locative claire, patrimoine maîtrisé.
            </span>
          </div>
          <div style={{ borderTop: '1px solid var(--bd-dark)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--cream-4)', flexWrap: 'wrap', gap: 12 }}>
            <span>© 2026 Loyria · Tous droits réservés</span>
            <div style={{ display: 'flex', gap: 22 }}>
              {['Mentions légales', 'CGU', 'Confidentialité', 'Sécurité'].map(l => (
                <a key={l} href="#" style={{ color: 'var(--cream-4)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
