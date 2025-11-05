import ClientTable from '../ClientTable';

export default function ClientTableExample() {
  const mockClients = [
    {
      id: '1',
      name: 'João Silva',
      plan: 'Premium',
      monthlyValue: 'R$ 299,00',
      renewalDate: '2025-12-15',
    },
    {
      id: '2',
      name: 'Maria Santos',
      plan: 'Básico',
      monthlyValue: 'R$ 149,00',
      renewalDate: '2025-11-20',
    },
    {
      id: '3',
      name: 'Pedro Costa',
      plan: 'Enterprise',
      monthlyValue: 'R$ 599,00',
      renewalDate: '2025-12-01',
    },
  ];

  return (
    <div className="p-6">
      <ClientTable
        clients={mockClients}
        onEdit={(client) => console.log('Editar:', client)}
        onDelete={(id) => console.log('Deletar:', id)}
      />
    </div>
  );
}
