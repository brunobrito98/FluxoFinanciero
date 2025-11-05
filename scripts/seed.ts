import { db } from "../server/db";
import { clients } from "../shared/schema";

const testClients = [
  {
    name: "Empresa Tech Solutions",
    plan: "Enterprise",
    monthlyValue: "499.90",
    renewalDate: "2026-01-15"
  },
  {
    name: "Startup Inovadora",
    plan: "Professional",
    monthlyValue: "199.90",
    renewalDate: "2025-12-20"
  },
  {
    name: "Consultoria Digital",
    plan: "Premium",
    monthlyValue: "299.90",
    renewalDate: "2026-02-10"
  },
  {
    name: "Agência Criativa",
    plan: "Basic",
    monthlyValue: "99.90",
    renewalDate: "2025-11-30"
  },
  {
    name: "E-commerce Plus",
    plan: "Professional",
    monthlyValue: "199.90",
    renewalDate: "2026-03-05"
  },
  {
    name: "Marketing Digital Pro",
    plan: "Enterprise",
    monthlyValue: "599.90",
    renewalDate: "2026-01-25"
  },
  {
    name: "Software House",
    plan: "Premium",
    monthlyValue: "349.90",
    renewalDate: "2025-12-15"
  },
  {
    name: "Desenvolvimento Web",
    plan: "Basic",
    monthlyValue: "149.90",
    renewalDate: "2026-02-28"
  }
];

async function seed() {
  try {
    console.log("🌱 Iniciando seed de dados de teste...");
    
    // Inserir clientes de teste
    for (const client of testClients) {
      const [inserted] = await db
        .insert(clients)
        .values(client)
        .returning();
      
      console.log(`✅ Cliente criado: ${inserted.name} (${inserted.plan})`);
    }
    
    console.log("\n🎉 Seed concluído com sucesso!");
    console.log(`📊 Total de clientes adicionados: ${testClients.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
}

seed();
