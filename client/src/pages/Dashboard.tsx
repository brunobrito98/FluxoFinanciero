import { useState } from "react";
import MetricCard from "@/components/MetricCard";
import RevenueChart from "@/components/RevenueChart";
import ClientTable from "@/components/ClientTable";
import ClientFormDialog from "@/components/ClientFormDialog";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, TrendingUp, Plus } from "lucide-react";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);

  // todo: remove mock functionality
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
    {
      id: '4',
      name: 'Ana Oliveira',
      plan: 'Premium',
      monthlyValue: 'R$ 299,00',
      renewalDate: '2025-11-25',
    },
  ];

  // todo: remove mock functionality
  const mockRevenueData = [
    { month: 'Nov', value: 1346 },
    { month: 'Dez', value: 1496 },
    { month: 'Jan', value: 1496 },
    { month: 'Fev', value: 1496 },
    { month: 'Mar', value: 1496 },
    { month: 'Abr', value: 1496 },
    { month: 'Mai', value: 1496 },
    { month: 'Jun', value: 1496 },
    { month: 'Jul', value: 1496 },
    { month: 'Ago', value: 1496 },
    { month: 'Set', value: 1496 },
    { month: 'Out', value: 1496 },
  ];

  // todo: remove mock functionality
  const totalMRR = mockClients.reduce((sum, client) => {
    const value = parseFloat(client.monthlyValue.replace(/[^\d,]/g, '').replace(',', '.'));
    return sum + value;
  }, 0);

  const totalARR = totalMRR * 12;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="text-page-title">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do seu faturamento e clientes
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} data-testid="button-add-client">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Receita Mensal (MRR)"
          value={`R$ ${totalMRR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          trend="Baseado em clientes ativos"
          testId="metric-mrr"
        />
        <MetricCard
          title="Receita Anual (ARR)"
          value={`R$ ${totalARR.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          trend="Projeção anual"
          testId="metric-arr"
        />
        <MetricCard
          title="Clientes Ativos"
          value={mockClients.length.toString()}
          icon={Users}
          trend={`${mockClients.length} planos ativos`}
          testId="metric-clients"
        />
      </div>

      <RevenueChart data={mockRevenueData} />

      <ClientTable
        clients={mockClients}
        onEdit={(client) => console.log('Editar cliente:', client)}
        onDelete={(id) => console.log('Deletar cliente:', id)}
      />

      <ClientFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={(data) => {
          console.log('Novo cliente:', data);
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
