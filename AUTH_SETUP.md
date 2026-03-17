# Guia de Autenticação Google - VozJusta

## Visão Geral

Este documento descreve o fluxo completo de autenticação com Google implementado no frontend da VozJusta. O sistema foi construído com arquitetura escalável usando Next.js 16, React Server Components, Zustand para state management e TypeScript.

## Arquitetura

### Estrutura de Pastas

```
VJ.WEB/
├── lib/
│   ├── api.ts                    # Configuração de API e helper
│   └── utils.ts
├── types/
│   ├── auth.types.ts             # Tipos de autenticação
│   └── ...
├── store/
│   └── auth.store.ts             # Zustand store para autenticação
├── hooks/
│   └── useAuth.ts                # Hook customizado para acessar auth
├── app/
│   ├── auth/
│   │   ├── page.tsx              # Página principal de auth
│   │   └── callback/
│   │       └── page.tsx          # Página de callback do Google
│   └── features/
│       └── auth/
│           ├── index.tsx         # AuthFeature component
│           ├── role-selection/
│           │   └── index.tsx     # Componente de seleção (cidadão/advogado)
│           ├── google/
│           │   └── google-auth-button.tsx  # Botão de login Google
│           └── callback/
│               └── google-callback-handler.tsx  # Handler de callback
└── api/
    └── auth/
        └── google/
            └── callback/
                └── route.ts      # Route handler para callback
```

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=https://vj-api-yx3g.onrender.com
```

**Importante**: `NEXT_PUBLIC_` permite que a variável seja acessível no cliente. Nunca exponha tokens secretos com este prefixo.

### 2. Dependências Instaladas

- `zustand` - State management library
- Todas as outras dependências já estavam no projeto

Instalar com:
```bash
pnpm add zustand
```

## Fluxo de Autenticação

### 1. Seleção de Perfil

O usuário chega em `/auth` e vê dois botões:
- **Sou Cidadão** → `state: "user"`
- **Sou Advogado** → `state: "lawyer"`

**Componente**: `RoleSelection` em `app/features/auth/role-selection/index.tsx`

```tsx
// Uso da seleção de role
const { setUserRole } = useAuth();
handleRoleSelect('user'); // ou 'lawyer'
```

### 2. Login com Google

Após selecionar o perfil, o usuário clica em "Continuar com Google".

**Fluxo**:

```
1. GoogleAuthButton lê userRole do Zustand
2. Monta URL: https://vj-api-yx3g.onrender.com/auth/google?state=user
3. Redireciona para API do Google
4. User faz login no Google
5. Google redireciona para /api/auth/google/callback?code=XXX&state=user
```

**Componente**: `GoogleAuthButton` em `app/features/auth/google/google-auth-button.tsx`

```tsx
const handleGoogleAuth = () => {
  const googleAuthUrl = `${API.BASE_URL}${API.ENDPOINTS.AUTH.GOOGLE}?state=${userRole}`;
  window.location.href = googleAuthUrl;
};
```

### 3. Callback do Google (Servidor)

**Rota**: `api/auth/google/callback/route.ts`

Esta rota:
1. Recebe o `code` do Google
2. Faz requisição para `https://vj-api-yx3g.onrender.com/auth/google/callback?code=XXX&state=user`
3. Recebe resposta com dados do usuário:
   ```json
   {
     "validated": true,
     "sub": "47ff0575-8976-4316-877d-936a2b1d478c",
     "role": "user",
     "email": "user@example.com",
     "full_name": "John Doe",
     "loggedWithGoogle": true
   }
   ```
4. Redireciona para `/auth/callback?user={sub}` com dados na URL

### 4. Callback do Google (Cliente)

**Componente**: `GoogleCallbackHandler` em `app/features/auth/callback/google-callback-handler.tsx`

Esta página:
1. Lê o `user` ID dos query params
2. Armazena os dados no Zustand store
3. Redireciona para dashboard apropriado:
   - Se `role === "lawyer"` → `/dashboard/lawyer`
   - Se `role === "user"` → `/dashboard/citizen`

## Zustand Store (State Management)

### Localização

`store/auth.store.ts`

### Estado

```typescript
interface AuthState {
  userRole: 'user' | 'lawyer' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'lawyer';
  } | null;
}
```

### Ações Disponíveis

```typescript
const {
  userRole,           // Role selecionada (user/lawyer)
  isAuthenticated,    // User está logado?
  isLoading,          // Carregando?
  error,             // Mensagem de erro
  user,              // Dados do usuário logado

  // Ações
  setUserRole,       // Define role selecionado
  setLoading,        // Define estado de carregamento
  setError,          // Define erro
  loginWithGoogle,   // Faz login com resposta do Google
  logout,            // Faz logout
  reset,             // Reseta para estado inicial
} = useAuth();
```

### Persistência

O store usa `persist` middleware do Zustand para salvar dados no localStorage:

```typescript
persist(
  (set) => ({ ... }),
  {
    name: 'auth-store',  // Chave no localStorage
    version: 1,
  }
)
```

**Benefício**: User permanece logado mesmo depois de fechar o browser.

## Hook useAuth

**Localização**: `hooks/useAuth.ts`

**Uso em Componentes Cliente**:

```tsx
'use client';

import { useAuth } from '@/hooks/useAuth';

export function MyComponent() {
  const { user, isAuthenticated, userRole, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Não autenticado</div>;
  }

  return (
    <div>
      <p>Bem-vindo, {user?.fullName}</p>
      <p>Role: {userRole}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Helper

**Localização**: `lib/api.ts`

### Configuração

```typescript
export const API = {
  BASE_URL: 'https://vj-api-yx3g.onrender.com',
  ENDPOINTS: {
    AUTH: {
      GOOGLE: '/auth/google',
      GOOGLE_CALLBACK: '/auth/google/callback',
    },
  },
};
```

### fetchAPI Helper

```typescript
import { fetchAPI } from '@/lib/api';

// Usar em Server Actions ou Route Handlers
const response = await fetchAPI<SomeType>(
  '/endpoint',
  { method: 'POST', body: JSON.stringify({...}) }
);
```

## Páginas Criadas

### `/app/auth`
- Página principal de autenticação
- Renderiza `AuthFeature`
- Fluxo: Seleção de role → Google Login

### `/app/auth/callback`
- Página de callback do Google
- Processa resposta e armazena no Zustand
- Redireciona para dashboard apropriado

## Next.js 16 Features Utilizadas

✅ **App Router** - Rotas em `app/` folder
✅ **React Server Components** - Componentes server por padrão
✅ **Route Handlers** - API routes em `api/` folder
✅ **Metadata API** - SEO em páginas
✅ **Suspense** - Loading states com fallback
✅ **Client Components** - `'use client'` onde necessário

## Security Considerations

1. **Não exponha API keys** no código frontend
2. **CORS** - Certifique-se que backend aceita requests do seu domínio
3. **HTTPS obrigatória** para OAuth
4. **Validar state** no callback para prevenir CSRF
5. **localStorage** - Dados sensíveis devem ser criptografados

## Fluxo Completo (Diagrama)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. /auth - Tela de seleção de perfil                        │
│                                                              │
│   [Sou Cidadão]  [Sou Advogado]                             │
│        ↓                  ↓                                  │
│   setUserRole('user')  setUserRole('lawyer')               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. GoogleAuthButton - Continuar com Google                 │
│                                                              │
│   Monta URL: /auth/google?state=user|lawyer                │
│   window.location.href = URL                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    [Google OAuth Flow]
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. /api/auth/google/callback (Route Handler)               │
│                                                              │
│   Recebe: ?code=XXX&state=user                             │
│   Chama: /auth/google/callback na API backend              │
│   Resposta: { sub, role, email, ... }                      │
│   Redireciona: /auth/callback?user={sub}                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. /auth/callback - GoogleCallbackHandler (Client)         │
│                                                              │
│   Lê: ?user={sub}                                           │
│   Chama: /api/auth/user/{sub} (opcional)                   │
│   Armazena: loginWithGoogle(userData)                       │
│   Redireciona: /dashboard/{lawyer|citizen}                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. Dashboard - User está logado e autenticado               │
│                                                              │
│   useAuth() retorna { user, isAuthenticated: true, ... }   │
└─────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### "NEXT_PUBLIC_API_URL is not defined"
→ Certifique-se que criou `.env.local` com a variável

### User não permanece logado após refresh
→ localStorage pode estar desabilitado ou a store não está persistindo corretamente

### Erro 401 no callback
→ Verifique se o `code` do Google é válido e não expirou (tem tempo limitado)

### CORS error
→ Certifique-se que backend permite requests de seu domínio

### User não é redirecionado para dashboard
→ Verifique se `/dashboard/lawyer` ou `/dashboard/citizen` existem

## Próximos Passos

1. Implementar `/api/auth/user/:id` para recuperar dados completos do usuário
2. Adicionar refresh token logic para manter sessão ativa
3. Implementar logout com limpeza de tokens (se houver)
4. Adicionar role-based route protection (middleware)
5. Implementar error boundaries para melhor UX

## Referências

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
