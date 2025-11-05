import { Client, InsertClient } from "@shared/schema";

export async function getClients(): Promise<Client[]> {
  const response = await fetch("/api/clients");
  if (!response.ok) throw new Error("Failed to fetch clients");
  return response.json();
}

export async function createClient(data: InsertClient): Promise<Client> {
  const response = await fetch("/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create client");
  return response.json();
}

export async function updateClient(id: string, data: Partial<InsertClient>): Promise<Client> {
  const response = await fetch(`/api/clients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update client");
  return response.json();
}

export async function deleteClient(id: string): Promise<void> {
  const response = await fetch(`/api/clients/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete client");
}
