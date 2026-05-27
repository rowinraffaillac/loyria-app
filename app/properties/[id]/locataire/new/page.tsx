import TenantLeaseForm from '@/components/tenants/TenantLeaseForm'

export default async function NewTenantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: propertyId } = await params

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">Ajouter un locataire</h1>
        <p className="text-sm text-gray-500 mt-1">Le bail sera créé en même temps que le dossier locataire.</p>
      </div>
      <TenantLeaseForm propertyId={propertyId} />
    </div>
  )
}
