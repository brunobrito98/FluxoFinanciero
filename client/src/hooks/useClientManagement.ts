import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getClients, createClient, updateClient, deleteClient } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { formatCurrency, parseCurrencyInput } from "@/lib/calculations";
import { format } from "date-fns";
import type { ClientData } from "@/components/ClientTable";

export function useClientManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientData | null>(null);
  const { toast } = useToast();

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['/api/clients'],
    queryFn: getClients,
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      setDialogOpen(false);
      toast({
        title: "Cliente criado",
        description: "O cliente foi adicionado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o cliente.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      setEditingClient(null);
      setDialogOpen(false);
      toast({
        title: "Cliente atualizado",
        description: "As informações foram atualizadas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o cliente.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/clients'] });
      toast({
        title: "Cliente removido",
        description: "O cliente foi removido com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível remover o cliente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: any) => {
    const clientData = {
      name: data.name,
      plan: data.plan,
      monthlyValue: parseCurrencyInput(data.monthlyValue),
      renewalDate: format(data.renewalDate, 'yyyy-MM-dd'),
    };

    if (editingClient) {
      updateMutation.mutate({ id: editingClient.id, data: clientData });
    } else {
      createMutation.mutate(clientData);
    }
  };

  const handleEdit = (client: ClientData) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja remover este cliente?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingClient(null);
  };

  const tableClients: ClientData[] = clients.map(client => ({
    id: client.id,
    name: client.name,
    plan: client.plan,
    monthlyValue: formatCurrency(parseFloat(client.monthlyValue)),
    renewalDate: client.renewalDate,
  }));

  const dialogDefaultValues = editingClient ? {
    name: editingClient.name,
    plan: editingClient.plan,
    monthlyValue: editingClient.monthlyValue,
    renewalDate: new Date(editingClient.renewalDate),
  } : undefined;

  return {
    clients,
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
  };
}
