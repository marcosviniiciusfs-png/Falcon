

# Plano: Corrigir Campo de Interesse/Tipo no CRM

## Diagnóstico

O envio para o CRM está funcionando (status 200, webhook processado). O problema é que o campo `tipo` pode não ser o nome correto que o Convex CRM usa internamente para "interesse". O CRM aceita o payload mas pode ignorar ou mapear incorretamente o campo.

## Solução

Adicionar o campo `interesse` ao payload (além de manter `tipo`), e incluir log do payload completo na Edge Function para facilitar debug futuro.

### 1. Atualizar o payload no `Simulator.tsx`

Adicionar o campo `interesse` com o mesmo valor de `propertyType`:

```typescript
const payloadCRM = {
  nome: formData.fullName,
  nome_completo: formData.fullName,
  telefone: formData.whatsapp,
  whatsapp: formData.whatsapp,
  tipo: formData.propertyType,
  interesse: formData.propertyType,  // NOVO - campo alternativo
  valor_do_credito: formData.creditAmount,
  valor_de_entrada: ...,
  cidade: formData.city,
  parcela_ideal: formData.monthlyPayment,
  data_entrada: new Date().toISOString().split('T')[0],
};
```

### 2. Atualizar a Edge Function

- Adicionar `interesse` à interface `LeadData`
- Logar o payload completo para debug

### Arquivos Afetados

| Arquivo | Mudança |
|---------|---------|
| `src/components/Simulator.tsx` | Adicionar campo `interesse` ao payload CRM |
| `supabase/functions/send-to-crm/index.ts` | Adicionar `interesse` à interface + log completo do payload |

Após implementar, podemos testar e verificar nos logs se o campo está chegando corretamente ao CRM.

