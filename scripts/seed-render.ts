/**
 * Script para adicionar dados de teste no backend do Render via API HTTP
 */

const RENDER_API_URL = "https://fluxofinanciero.onrender.com";

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
  },
  {
    name: "Consultoria Empresarial",
    plan: "Enterprise",
    monthlyValue: "699.90",
    renewalDate: "2026-04-01"
  },
  {
    name: "Designer Freelancer",
    plan: "Basic",
    monthlyValue: "79.90",
    renewalDate: "2025-12-31"
  }
];

async function seedRender() {
  console.log("🌱 Iniciando seed de dados no Render...");
  console.log(`🌐 API URL: ${RENDER_API_URL}\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const client of testClients) {
    try {
      const response = await fetch(`${RENDER_API_URL}/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client)
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }
      
      const created = await response.json();
      console.log(`✅ Cliente criado: ${created.name} (${created.plan}) - R$ ${created.monthlyValue}/mês`);
      successCount++;
      
      // Pequeno delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`❌ Erro ao criar ${client.name}:`, error instanceof Error ? error.message : error);
      errorCount++;
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 Resumo do Seed:");
  console.log(`   ✅ Sucessos: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`   📈 Total: ${testClients.length}`);
  console.log("=".repeat(60));
  
  if (successCount > 0) {
    console.log("\n🎉 Seed concluído! Verifique em:");
    console.log(`   ${RENDER_API_URL}/api/clients`);
  }
  
  process.exit(errorCount > 0 ? 1 : 0);
}

// Executar seed
seedRender().catch(error => {
  console.error("\n💥 Erro fatal:", error);
  process.exit(1);
});
