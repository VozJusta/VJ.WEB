# 🔍 Diagnóstico do Erro 500 - Cadastro de Cidadão

## ❌ Problema Identificado

O endpoint `/citizen` da API está retornando **500 Internal Server Error** independente dos dados enviados.

## ✅ Frontend ESTÁ CORRETO

Todos os testes confirmam que o código frontend está implementado corretamente:

### Dados Enviados (Formato Correto):
```json
{
  "fullName": "Pedro Sales",
  "cpf": "123.456.789-00",
  "phone": "11 99999-9999",
  "email": "pedro@gmail.com",
  "password": "@Za12345678"
}
```

### Código Implementado:
- ✅ **authService.signupCitizen()** - Chamada HTTP correta
- ✅ **citizenSignupSchema** - Validação Zod funcionando
- ✅ **Error handling** - Try/catch com mensagens user-friendly
- ✅ **Formatação** - Phone convertido para formato API (11 99999-9999)
- ✅ **Types** - TypeScript types matching API contract

## 🧪 Testes Realizados

| Teste | CPF | Telefone | Senha | Resultado |
|-------|-----|----------|-------|-----------|
| 1 | `123.456.789-00` | `11 99999-9999` | `@Za12345678` | ❌ 500 |
| 2 | `12345678900` | `11999999999` | `@Za12345678` | ❌ 500 |
| 3 | `529.982.247-25` (válido) | `11 99999-9999` | `@Za12345678` | ❌ 500 |
| 4 | `529.982.247-25` | `21987654321` | `@Za12345678` | ❌ 500 |
| 5 | (snake_case test) | - | - | ✅ 400 (validação OK!) |
| 6 | Qualquer | Qualquer | `Senha123` | ✅ 400 (validação OK!) |

**Conclusão**: A validação da API funciona (retorna 400 quando dados incorretos), mas algo **no processamento interno falha** (erro 500).

## 🎯 Possíveis Causas no Backend

1. **Banco de Dados Offline/Não Configurado** (mais provável)
   - Conexão com PostgreSQL/MongoDB falhando
   - Credenciais incorretas
   - Firewall bloqueando

2. **Serviço de Hash de Senha**
   - bcrypt/argon2 não instalado ou erro ao processar

3. **Envio de Email de Verificação**
   - Serviço de email (SendGrid, Resend, etc) falhando
   - Credentials não configuradas

4. **Validação Interna**
   - CPF validator com bug
   - Algum campo sendo validado incorretamente

5. **Código do Backend**
   - Try/catch genérico escondendo o erro real
   - Falta de logs adequados

## 🔧 O Que Fazer Agora

### 1. Verificar Logs do Backend (URGENTE)

Acesse o **Render.com Dashboard** → Sua API → Logs

Procure por mensagens como:
```
Error: connect ECONNREFUSED
Error: Database connection failed
Error: Cannot hash password
Error: Email service error
ValidationError: ...
```

### 2. Verificar Variáveis de Ambiente

Confirme que estas variáveis estão configuradas no Render:
```env
DATABASE_URL=...
JWT_SECRET=...
EMAIL_API_KEY=...
```

### 3. Testar Diretamente no Backend

Se você tem acesso ao código do backend, adicione logs:

```javascript
// No controller do /citizen
app.post('/citizen', async (req, res) => {
  try {
    console.log('📥 Request body:', req.body);

    // Valida dados
    console.log('✓ Validation passed');

    // Salva no banco
    console.log('✓ Saving to database...');
    const user = await User.create(req.body);
    console.log('✓ User created:', user.id);

    return res.status(201).json(user);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
```

### 4. Testar Endpoint com cURL

Você pode continuar testando:

```bash
curl -X POST https://vj-api-yx3g.onrender.com/citizen \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "cpf": "529.982.247-25",
    "phone": "11 99999-9999",
    "email": "unique.email@test.com",
    "password": "@Za12345678"
  }'
```

## 📊 Status da Implementação

### Frontend ✅ COMPLETO
- [x] Formulário de cadastro
- [x] Validação com Zod
- [x] Integração com API
- [x] Error handling
- [x] Toast notifications
- [x] Redirect após sucesso
- [x] Formatação de dados
- [x] TypeScript types

### Backend ❌ COM PROBLEMA
- [ ] Endpoint /citizen retornando 500
- [ ] Logs necessários para debug
- [ ] Verificação de ambiente

## 🚀 Próximos Passos

1. **Imediato**: Verificar logs do backend no Render
2. **Seguir**: Compartilhar logs com time de backend
3. **Quando corrigido**: Testar cadastro end-to-end
4. **Opcional**: Implementar cadastro de advogado (mesma estrutura)

---

**Data do Diagnóstico**: 2026-03-20
**API URL**: https://vj-api-yx3g.onrender.com
**Endpoint**: POST /citizen
**Status**: ❌ 500 Internal Server Error (backend issue)
