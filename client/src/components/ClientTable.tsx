import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface ClientData {
  id: string;
  name: string;
  plan: string;
  monthlyValue: string;
  renewalDate: string;
}

interface ClientTableProps {
  clients: ClientData[];
  onEdit?: (client: ClientData) => void;
  onDelete?: (id: string) => void;
}

export default function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  const [sortField, setSortField] = useState<keyof ClientData>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof ClientData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];
    
    if (sortField === 'monthlyValue') {
      aVal = parseFloat(a.monthlyValue.replace(/[^\d,]/g, '').replace(',', '.'));
      bVal = parseFloat(b.monthlyValue.replace(/[^\d,]/g, '').replace(',', '.'));
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <Card data-testid="table-clients">
      <CardHeader>
        <CardTitle>Clientes Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th 
                  className="text-left py-3 px-4 text-sm font-medium cursor-pointer hover-elevate"
                  onClick={() => handleSort('name')}
                  data-testid="header-name"
                >
                  Nome
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium cursor-pointer hover-elevate"
                  onClick={() => handleSort('plan')}
                  data-testid="header-plan"
                >
                  Plano
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium cursor-pointer hover-elevate"
                  onClick={() => handleSort('monthlyValue')}
                  data-testid="header-value"
                >
                  Valor Mensal
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium cursor-pointer hover-elevate"
                  onClick={() => handleSort('renewalDate')}
                  data-testid="header-renewal"
                >
                  Próxima Renovação
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedClients.map((client, idx) => (
                <tr 
                  key={client.id} 
                  className={idx % 2 === 0 ? 'bg-muted/30' : ''}
                  data-testid={`row-client-${client.id}`}
                >
                  <td className="py-3 px-4 text-sm" data-testid={`text-name-${client.id}`}>
                    {client.name}
                  </td>
                  <td className="py-3 px-4 text-sm" data-testid={`text-plan-${client.id}`}>
                    {client.plan}
                  </td>
                  <td className="py-3 px-4 text-sm font-mono" data-testid={`text-value-${client.id}`}>
                    {client.monthlyValue}
                  </td>
                  <td className="py-3 px-4 text-sm" data-testid={`text-renewal-${client.id}`}>
                    {format(new Date(client.renewalDate), "dd/MM/yyyy", { locale: ptBR })}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEdit?.(client)}
                        data-testid={`button-edit-${client.id}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete?.(client.id)}
                        data-testid={`button-delete-${client.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {clients.length === 0 && (
            <div className="text-center py-12 text-muted-foreground" data-testid="text-empty-state">
              Nenhum cliente cadastrado ainda
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
