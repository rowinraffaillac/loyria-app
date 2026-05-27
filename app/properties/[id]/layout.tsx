import { getProperty } from '@/lib/actions/properties'
import AppShell from '@/components/layout/AppShell'

export default async function PropertyLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const property = await getProperty(id)

  return <AppShell property={property}>{children}</AppShell>
}
