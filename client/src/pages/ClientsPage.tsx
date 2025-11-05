import ClientTable from "@/components/ClientTable";
import ClientFormDialog from "@/components/ClientFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useClientManagement } from "@/hooks/useClientManagement";

export default function ClientsPage() {
  const {
    isLoading,
    dialogOpen,
    setDialogOpen,
    editingClient,
    tableClients,
    dialogDefaultValues,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleCloseDialog,
  } = useClientManagement();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold" data-testid="text-page-title">
            Gerenciar Clientes
          </h1>
          <p className="text-muted-foreground">
            Cadastre e gerencie todos os seus clientes
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} data-testid="button-add-client">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <ClientTable
        clients={tableClients}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ClientFormDialog
        open={dialogOpen}
        onOpenChange={handleCloseDialog}
        onSubmit={handleSubmit}
        defaultValues={dialogDefaultValues}
        title={editingClient ? "Editar Cliente" : "Adicionar Cliente"}
      />
    </div>
  );
}
