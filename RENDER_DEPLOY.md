# Deploy no Render - Guia de Configuração

Este guia ajudará você a fazer deploy do seu backend no Render.

## 📋 Pré-requisitos

1. Conta no [Render](https://render.com)
2. Repositório Git (GitHub, GitLab, ou Bitbucket)

## 🚀 Passos para Deploy

### 1. Preparar o Repositório

Certifique-se de que seu código está em um repositório Git e faça push:

```bash
git add .
git commit -m "Preparar para deploy no Render"
git push
```

### 2. Criar Web Service no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório Git
4. Configure o serviço:
   - **Name**: Nome do seu serviço
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 3. Configurar Variáveis de Ambiente

No painel do Render, adicione as seguintes variáveis de ambiente:

- `NODE_ENV`: `production`
- `PORT`: `5000` (geralmente o Render define isso automaticamente)

#### ⚠️ Importante: Banco de Dados

Atualmente, seu projeto usa **armazenamento em memória** (MemStorage), que **NÃO persiste dados** após reinicializações.

Para usar um banco de dados real no Render:

1. **Criar PostgreSQL Database no Render**:
   - No dashboard, clique em "New +" → "PostgreSQL"
   - Nomeie seu banco de dados
   - Após criação, copie a "Internal Database URL"

2. **Adicionar variável de ambiente**:
   - Adicione `DATABASE_URL` com o valor da URL do banco

3. **Atualizar o código para usar PostgreSQL**:
   - Você precisará implementar uma classe de storage que usa o Drizzle ORM
   - Substitua `MemStorage` por uma implementação que conecta ao PostgreSQL
   - Seu schema já está definido em `shared/schema.ts`

### 4. Deploy Automático

O Render fará deploy automaticamente quando você:
- Fazer push para o branch principal
- Ou clicar em "Manual Deploy" no dashboard

## 🔧 Arquivo render.yaml

O arquivo `render.yaml` já foi criado na raiz do projeto. Você pode usar isso para:
- Deploy via "Infrastructure as Code"
- Versionamento da configuração

Para usar o `render.yaml`:
1. No Render Dashboard, vá em "Blueprints"
2. Conecte seu repositório
3. O Render detectará automaticamente o arquivo `render.yaml`

## 📝 Notas Importantes

1. **Build Time**: O primeiro deploy pode demorar alguns minutos
2. **Free Tier**: Services gratuitos "dormem" após 15 minutos de inatividade
3. **Logs**: Acesse os logs em tempo real no dashboard do Render
4. **Health Checks**: O Render verifica automaticamente se seu serviço está ativo

## 🗄️ Migração de Dados

Se você já tem dados em produção e quer migrar:

```bash
# Executar migrations com Drizzle
npm run db:push
```

Certifique-se de que `DATABASE_URL` está configurado.

## 🆘 Problemas Comuns

### Erro de Build
- Verifique se todas as dependências estão em `dependencies` (não em `devDependencies`)
- Confirme que o Node version está correto (.nvmrc)

### Aplicação não inicia
- Verifique os logs no dashboard do Render
- Confirme que a porta está configurada corretamente
- Verifique variáveis de ambiente

### Dados não persistem
- Você está usando MemStorage (armazenamento em memória)
- Implemente conexão com PostgreSQL para persistência real

## 📚 Recursos

- [Documentação Render](https://render.com/docs)
- [Render Node Deploy Guide](https://render.com/docs/deploy-node-express-app)
