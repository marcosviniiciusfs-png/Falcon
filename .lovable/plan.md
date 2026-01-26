
# Plano: Corrigir Erro de DNS na Edge Function

## Problema Identificado

O erro **`net::ERR_NAME_NOT_RESOLVED`** indica que o navegador não consegue resolver o domínio `43ecbb0e-055a-404a-920e-866debe2c8d3.supabase.co`. 

**Por que isso acontece:**
O ID `43ecbb0e-055a-404a-920e-866debe2c8d3` é o **ID do projeto Lovable**, não um ID de projeto Supabase real. Em projetos Lovable Cloud:
- O backend Supabase é gerenciado internamente pela Lovable
- O provisionamento completo (Database, Users, Storage, Edge Functions) é **sob demanda** - só acontece quando você pede funcionalidades que precisam disso
- Como o usuário confirmou que só vê "permissões/sem recursos" na aba Cloud, **o backend ainda não foi totalmente provisionado**
- Por isso, a URL `.supabase.co` simplesmente não existe ainda

## Solução Proposta

Há **duas opções** para resolver:

---

### Opção A: Provisionar o Backend Lovable Cloud (Recomendada)

Forçar o provisionamento completo do backend pedindo para criar um recurso de database. Depois disso, as Edge Functions passarão a funcionar.

**Passos:**
1. Pedir ao Lovable para "criar uma tabela de teste no database" (ex: `leads`)
2. Isso vai disparar o provisionamento completo do Supabase
3. Após provisionado, as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` serão injetadas automaticamente
4. Atualizar o código para usar o cliente Supabase novamente (`supabase.functions.invoke`)

**Vantagens:**
- Solução definitiva
- Edge Function funciona com toda a segurança
- Token do CRM fica protegido no servidor

---

### Opção B: Fallback Temporário para Webhook Direto

Enquanto o backend não está provisionado, enviar dados diretamente para o webhook do Convex CRM a partir do frontend.

**Mudanças no código:**

```typescript
// src/components/Simulator.tsx - handleFinish
const response = await fetch(
  'https://app.convexcrm.com.br/api/webhooks/integrations/59fbcefca35e40b8a1a11a8005239d50',
  {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer SEU_TOKEN_AQUI' // Token exposto no frontend
    },
    body: JSON.stringify(payload),
  }
);
```

**Desvantagens:**
- O token do CRM ficaria exposto no código frontend (menos seguro)
- Qualquer pessoa poderia ver o token no código-fonte

---

## Recomendação

**Opção A** é a recomendada. Basta enviar uma mensagem pedindo:

> "Crie uma tabela chamada `leads` no database com os campos: nome (text), whatsapp (text), tipo (text), valor_credito (text), cidade (text), criado_em (timestamp)"

Isso vai:
1. Provisionar completamente o backend Lovable Cloud
2. Ativar as Edge Functions
3. Fazer a URL `.supabase.co` funcionar corretamente

Após o provisionamento, podemos ajustar o código para usar a forma correta de chamar a Edge Function.

---

## Arquivos que Serão Afetados (após provisionar)

| Arquivo | Mudança |
|---------|---------|
| `src/components/Simulator.tsx` | Voltar a usar `supabase.functions.invoke()` |
| `src/integrations/supabase/client.ts` | Remover fallbacks de string vazia |

---

## Fluxo Final Esperado

```text
+----------------+     +---------------------------+     +-------------+
| Simulator      | --> | Edge Function             | --> | Convex CRM  |
| (Frontend)     |     | send-to-crm               |     | Webhook     |
+----------------+     +---------------------------+     +-------------+
       |                        |                              |
       | supabase.functions     | POST + Bearer Token          |
       | .invoke()              | (CONVEX_CRM_TOKEN seguro)    |
       v                        v                              v
   Dados do form         Processa + Envia              Cria lead no CRM
```

---

## Próximo Passo Imediato

Aprovar este plano e, na próxima mensagem, pedir para **"criar uma tabela leads no database"** para disparar o provisionamento completo do Lovable Cloud.
