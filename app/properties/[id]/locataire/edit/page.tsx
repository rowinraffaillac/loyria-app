import { redirect } from 'next/navigation'
import { getActiveLease } from '@/lib/actions/tenants'
import TenantLeaseForm from '@/components/tenants/TenantLeaseForm'

export default async function EditTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: propertyId } = await params
  const { lease, tenant } = await getActiveLease(propertyId)

  if (!tenant || !lease) redirect(`/properties/${propertyId}/locataire`)

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Modifier le locataire</h1>
        <p className="text-sm text-gray-500 mt-1">{tenant.first_name} {tenant.last_name}</p>
      </div>
      <TenantLeaseForm propertyId={propertyId} tenant={tenant} lease={lease} />
    </div>
  )
}
