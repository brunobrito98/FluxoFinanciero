import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertClientSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/clients", async (_req, res) => {
    const clients = await storage.getAllClients();
    res.json(clients);
  });

  app.post("/api/clients", async (req, res) => {
    try {
      const validated = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validated);
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: "Invalid client data" });
    }
  });

  app.patch("/api/clients/:id", async (req, res) => {
    const { id } = req.params;
    const client = await storage.updateClient(id, req.body);
    if (!client) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json(client);
  });

  app.delete("/api/clients/:id", async (req, res) => {
    const { id } = req.params;
    const success = await storage.deleteClient(id);
    if (!success) {
      res.status(404).json({ error: "Client not found" });
      return;
    }
    res.json({ success: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
