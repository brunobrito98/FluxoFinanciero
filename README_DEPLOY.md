# 🚀 Projeto Preparado para Deploy no Render

## 🔥 ATUALIZAÇÃO IMPORTANTE

**Se você teve erro de conexão (ECONNREFUSED), o problema foi corrigido!**
📄 Veja os detalhes em: `RENDER_DEPLOY_ATUALIZADO.md`

## ✅ O que foi feito

Seu projeto backend foi completamente preparado para deploy no Render com as seguintes melhorias:

### 1. **Banco de Dados PostgreSQL**
- ✅ Substituído armazenamento em memória por PostgreSQL real
- ✅ Criado `server/db.ts` com conexão ao banco usando driver `pg` (compatível com Render)
- ✅ Atualizado `server/storage.ts` para usar `DatabaseStorage`
- ✅ Schema do banco aplicado com sucesso
- ✅ **CORRIGIDO**: Agora usa driver PostgreSQL padrão, compatível com qualquer PostgreSQL

### 2. **Arquivos de Configuração do Render**
- ✅ `render.yaml` - Configuração Infrastructure as Code
- ✅ `.nvmrc` - Especifica versão do Node.js (20)
- ✅ `.env.example` - Template para variáveis de ambiente

### 3. **Documentação**
- ✅ `RENDER_DEPLOY.md` - Guia completo de deploy
- ✅ `.gitignore` atualizado para não versionar arquivos `.env`

## 📦 Estrutura Atual

```
seu-projeto/
├── server/
│   ├── db.ts              # ✨ NOVO - Conexão PostgreSQL
│   ├── storage.ts         # ✨ ATUALIZADO - Usa banco real
│   ├── routes.ts          # API routes
│   └── index.ts           # Entry point
├── shared/
│   └── schema.ts          # Schema Drizzle (tabela clients)
├── render.yaml            # ✨ NOVO - Config Render
├── .nvmrc                 # ✨ NOVO - Node version
├── .env.example           # ✨ NOVO - Template env vars
├── RENDER_DEPLOY.md       # ✨ NOVO - Guia de deploy
└── package.json           # Scripts já configurados
```

## 🎯 Próximos Passos

### Opção A: Deploy Rápido (Via Dashboard)

1. **Commit e Push**
   ```bash
   git add .
   git commit -m "Preparar para deploy no Render"
   git push
   ```

2. **Criar PostgreSQL no Render**
   - Acesse https://dashboard.render.com
   - Clique em "New +" → "PostgreSQL"
   - Nomeie seu banco (ex: `postgres-db`)
   - Copie a "Internal Database URL"

3. **Criar Web Service**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório
   - Configure:
     - **Build Command**: `npm install && npm run build && npm run db:push`
     - **Start Command**: `npm start`

4. **Adicionar Variáveis de Ambiente**
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Cole a URL do PostgreSQL que você criou

5. **Deploy!**
   - Clique em "Create Web Service"
   - Aguarde o build (2-5 minutos)

### Opção B: Deploy com Blueprint (render.yaml)

1. **Commit e Push**
   ```bash
   git add .
   git commit -m "Preparar para deploy no Render com blueprint"
   git push
   ```

2. **No Render Dashboard**
   - Vá em "Blueprints"
   - Clique em "New Blueprint Instance"
   - Conecte seu repositório
   - Render detectará automaticamente o `render.yaml`
   - Clique em "Apply"

O Render criará automaticamente:
- ✅ PostgreSQL Database
- ✅ Web Service
- ✅ Variáveis de ambiente configuradas

## 🔍 Verificar Deploy

Após o deploy, teste sua API:

```bash
# Listar clientes
curl https://seu-app.onrender.com/api/clients

# Criar cliente
curl -X POST https://seu-app.onrender.com/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Cliente",
    "plan": "Premium",
    "monthlyValue": "99.90",
    "renewalDate": "2025-12-31"
  }'
```

## ⚠️ Notas Importantes

### Free Tier do Render
- Services gratuitos "dormem" após 15min de inatividade
- Primeira requisição após dormir pode demorar 30-60s
- Para evitar isso, considere upgrade para plano pago

### Banco de Dados
- **Desenvolvimento (Replit)**: Usa DATABASE_URL do Replit
- **Produção (Render)**: Usará DATABASE_URL do Render
- Dados são independentes em cada ambiente

### Scripts Disponíveis
- `npm run dev` - Desenvolvimento local
- `npm run build` - Build para produção
- `npm start` - Inicia servidor de produção
- `npm run db:push` - Aplica schema ao banco

## 📚 Recursos Úteis

- [Render Dashboard](https://dashboard.render.com)
- [Render Docs - Node.js](https://render.com/docs/deploy-node-express-app)
- [Render Docs - PostgreSQL](https://render.com/docs/databases)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)

## 🆘 Problemas Comuns

### "DATABASE_URL must be set"
- Certifique-se de adicionar a variável `DATABASE_URL` no Render
- Copie a "Internal Database URL" do PostgreSQL que você criou

### Build falha
- Verifique os logs no dashboard do Render
- Confirme que todas as dependências estão instaladas
- Tente `npm install` localmente primeiro

### Tabelas não criadas
- Verifique se `npm run db:push` está no build command
- Execute manualmente no shell do Render se necessário

---

**🎉 Seu projeto está pronto para produção!**

Qualquer dúvida, consulte o arquivo `RENDER_DEPLOY.md` para mais detalhes.
