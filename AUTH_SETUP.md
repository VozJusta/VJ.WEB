# Guia de Autenticação - VozJusta

## Visão Geral

Este documento descreve a infraestrutura de autenticação integrada ao frontend da VozJusta. O sistema fornece state management, types, hooks e utilities para integração com os formulários de login existentes. Construído com Next.js 16, Zustand para state management e TypeScript.

## Arquitetura

### Estrutura de Pastas

```
VJ.WEB/
├── lib/
│   ├── api.ts                    # Configuração de API e helper fetchAPI
│   └── utils.ts
├── types/
│   ├── auth.types.ts             # Tipos para autenticação
│   └── ...
├── store/
│   └── auth.store.ts             # Zustand store para estado de auth
├── hooks/
│   └── useAuth.ts                # Hook customizado para acessar store
└── app/
    └── features/
        └── auth/
            └── login/
                ├── login-form.tsx        # Formulário de login existente
                └── ...
```

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=https://vj-api-yx3g.onrender.com
```

**Importante**: `NEXT_PUBLIC_` permite que a variável seja acessível no cliente.

### 2. Dependências Instaladas

- `zustand@5.0.12` - State management com persistência

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
  // Estados
  userRole,              // 'user' | 'lawyer' | null
  isAuthenticated,       // boolean
  isLoading,            // boolean
  error,                // string | null
  user,                 // User data or null

  // Ações
  setUserRole,          // (role: UserRole) => void
  setLoading,           // (loading: boolean) => void
  setError,             // (error: string | null) => void
  setAuthenticated,     // (authenticated: boolean) => void
  setUser,              // (user: User | null) => void
  loginWithGoogle,      // (response: GoogleAuthResponse) => void
  logout,               // () => void
  reset,                // () => void
} = useAuth();
```

### Persistência

O store usa middleware `persist` do Zustand para salvar dados no localStorage:

```typescript
persist(
  (set) => ({ ... }),
  {
    name: 'auth-store',  // Chave no localStorage
    version: 1,
  }
)
```

**Benefício**: Dados persistem entre refreshes de página.

## Hook useAuth

**Localização**: `hooks/useAuth.ts`

**Uso em Componentes Cliente**:

```tsx
'use client';

import { useAuth } from '@/hooks/useAuth';

export function Dashboard() {
  const {
    user,
    isAuthenticated,
    userRole,
    logout,
    loginWithGoogle,
  } = useAuth();

  if (!isAuthenticated) {
    return <div>Faça login primeiro</div>;
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

## Types

**Localização**: `types/auth.types.ts`

```typescript
export type UserRole = 'user' | 'lawyer';

export interface GoogleAuthResponse {
  validated: boolean;
  sub: string;
  role: UserRole;
  email: string;
  full_name: string;
  loggedWithGoogle: boolean;
}

export interface AuthState {
  userRole: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: UserRole;
  } | null;
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

// Usar em Server Actions, Route Handlers ou client-side
const response = await fetchAPI<SomeType>(
  '/endpoint',
  { method: 'POST', body: JSON.stringify({...}) }
);
```

## Integração com Formulário de Login

O arquivo `app/features/auth/login/login-form.tsx` contém um botão Google. Para integrar com o Zustand store:

```tsx
'use client';

import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const { setLoading, loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Sua lógica de Google login aqui
      const response = await fetch('...'); // Google auth response
      loginWithGoogle(response);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login com Google
    </button>
  );
}
```

## Next.js 16 Features Utilizados

✅ **App Router** - Rotas em `app/` folder
✅ **TypeScript** - Type-safe em todo o código
✅ **Client Components** - `'use client'` para hooks de estado

## Security Considerations

1. **Não exponha API keys** no código frontend
2. **CORS** - Certifique-se que backend aceita requests do seu domínio
3. **HTTPS obrigatória** para OAuth em produção
4. **localStorage** - Dados sensíveis devem estar criptografados
5. **Validar resposta da API** antes de armazenar

## Próximos Passos

1. Integrar `loginWithGoogle` no botão de login com Google existente
2. Implementar logout com limpeza de tokens
3. Implementar refresh token logic
4. Adicionar role-based route protection (middleware)
5. Implementar error boundaries para melhor UX

## Troubleshooting

### "NEXT_PUBLIC_API_URL is not defined"
→ Certifique-se que criou `.env.local` com a variável

### User não permanece logado após refresh
→ Verifique se localStorage está habilitado e a store está persistindo

### Hook useAuth retorna erro
→ Certifique-se de usar `'use client'` no componente

## Referências

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
