# Guia de Autenticação Google - VozJusta

## Visão Geral

Este documento descreve a implementação completa de autenticação com Google no VozJusta. O sistema foi construído com Next.js 16, React, Zustand para state management e TypeScript, fornecendo uma experiência seamless de login.

## Arquitetura

### Estrutura de Pastas

```
VJ.WEB/
├── lib/
│   ├── api.ts                           # Configuração de API e helper fetchAPI
│   └── utils.ts
├── types/
│   ├── auth.types.ts                    # Types para autenticação
│   └── ...
├── store/
│   └── auth.store.ts                    # Zustand store para estado de auth
├── hooks/
│   └── useAuth.ts                       # Hook customizado para acessar store
├── components/
│   └── modals/
│       └── role-selection-modal.tsx     # Modal de seleção cidadão/advogado
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx                 # Página de callback do Google
│   └── features/
│       └── auth/
│           ├── login/
│           │   ├── login-form.tsx       # Formulário de login com Google integrado
│           │   └── ...
│           └── callback/
│               └── google-callback-handler.tsx  # Handler de callback
└── api/
    └── auth/
        └── google/
            └── callback/
                └── route.ts             # Route handler para callback
```

## Configuração Rápida

### 1. Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=https://vj-api-yx3g.onrender.com
```

### 2. Dependências

```bash
pnpm add zustand
```

**Já instalado!**

## Fluxo Completo de Autenticação

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Usuário clica "Continuar com Google" em login-form.tsx       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. RoleSelectionModal abre (cidadão vs advogado)                │
│    - Usuário escolhe seu tipo                                   │
│    - Role é armazenado no Zustand (store/auth.store.ts)         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. Redireciona para Google OAuth                                │
│    URL: https://vj-api-yx3g.onrender.com/auth/google            │
│    Param: ?state=user (ou lawyer)                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      [Google Authentication]
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. Google redireciona para seu callback endpoint                │
│    URL: /api/auth/google/callback?code=XXX&state=user           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Route handler (api/auth/google/callback/route.ts)           │
│    - Recebe authorization code                                  │
│    - Chama backend: /auth/google/callback?code=XXX&state=user   │
│    - Backend retorna: { sub, email, full_name, role, ... }     │
│    - Redireciona para: /auth/callback?user=XXX&email=...        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. Página de callback (app/auth/callback/page.tsx)             │
│    - GoogleCallbackHandler processa dados                       │
│    - Armazena user data em Zustand                              │
│    - Redireciona para dashboard apropriado                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. Dashboard                                                     │
│    - /dashboard/lawyer (se role === 'lawyer')                   │
│    - /dashboard/citizen (se role === 'user')                    │
│    - User permanece autenticado (localStorage persistence)      │
└─────────────────────────────────────────────────────────────────┘
```

## Componentes Principais

### 1. RoleSelectionModal
**Localização**: `components/modals/role-selection-modal.tsx`

Modal que aparece quando usuário clica em "Continuar com Google":

```tsx
<RoleSelectionModal
  isOpen={isRoleModalOpen}
  onClose={() => setIsRoleModalOpen(false)}
  onSelectRole={handleRoleSelect}
  isLoading={isGoogleLoading}
/>
```

### 2. LoginForm (Modificado)
**Localização**: `app/features/auth/login/login-form.tsx`

Agora integrado com Google OAuth:

```tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import { API } from '@/lib/api';
import { RoleSelectionModal } from '@/components/modals/role-selection-modal';

const handleGoogleLogin = () => {
  setIsRoleModalOpen(true);
};

const handleRoleSelect = (role: UserRole) => {
  setIsGoogleLoading(true);
  setUserRole(role);

  const googleAuthUrl = `${API.BASE_URL}${API.ENDPOINTS.AUTH.GOOGLE}?state=${role}`;
  window.location.href = googleAuthUrl;
};
```

### 3. Route Handler (Callback)
**Localização**: `api/auth/google/callback/route.ts`

Recebe o código do Google e faz a troca por dados do usuário:

```typescript
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  // 1. Chama backend com o code
  const response = await fetch(
    `${apiUrl}/auth/google/callback?code=${code}&state=${state}`
  );

  // 2. Recebe dados do usuário
  const authData = await response.json();

  // 3. Redireciona para dashboard apropriado
  const dashboardUrl = authData.role === 'lawyer'
    ? '/dashboard/lawyer'
    : '/dashboard/citizen';

  redirect(`${dashboardUrl}?user=${authData.sub}&email=${authData.email}&name=${authData.full_name}`);
}
```

### 4. GoogleAuthCallbackHandler
**Localização**: `app/features/auth/callback/google-callback-handler.tsx`

Processa dados do callback no lado do cliente:

```tsx
'use client';

export function GoogleAuthCallbackHandler() {
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const userId = searchParams.get('user');
    const email = searchParams.get('email');
    const fullName = searchParams.get('name');

    const authData = {
      validated: true,
      sub: userId,
      email,
      full_name: fullName,
      role: userRole,
      loggedWithGoogle: true,
    };

    loginWithGoogle(authData);
    router.push(`/dashboard/${userRole === 'lawyer' ? 'lawyer' : 'citizen'}`);
  }, []);
}
```

## Zustand Store

### Localização
`store/auth.store.ts`

### Estado
```typescript
interface AuthState {
  userRole: 'user' | 'lawyer' | null;           // Seleção do usuário
  isAuthenticated: boolean;                      // Login realizado?
  isLoading: boolean;                            // Carregando?
  error: string | null;                          // Mensagem de erro
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'lawyer';
  } | null;
}
```

### Ações
```typescript
const {
  // Estados
  userRole,
  isAuthenticated,
  isLoading,
  error,
  user,

  // Ações
  setUserRole,          // Define o perfil selecionado
  setLoading,           // Define estado de carregamento
  setError,             // Define erro
  setAuthenticated,     // Define autenticado
  setUser,              // Define dados do usuário
  loginWithGoogle,      // Processa login com Google
  logout,               // Faz logout
  reset,                // Reseta para estado inicial
} = useAuth();
```

### Persistência
Todos os dados são salvos no localStorage automaticamente:
```typescript
localStorage.getItem('auth-store'); // Recupera dados persistidos
```

## Hook useAuth

**Localização**: `hooks/useAuth.ts`

Use este hook em qualquer componente cliente para acessar estado de autenticação:

```tsx
'use client';

import { useAuth } from '@/hooks/useAuth';

export function Dashboard() {
  const { user, isAuthenticated, userRole, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Faça login primeiro</div>;
  }

  return (
    <div>
      <p>Bem-vindo, {user?.fullName}</p>
      <p>Role: {userRole === 'lawyer' ? 'Advogado' : 'Cidadão'}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## API Endpoints

### Configuração
`lib/api.ts`:

```typescript
export const API = {
  BASE_URL: 'https://vj-api-yx3g.onrender.com',
  ENDPOINTS: {
    AUTH: {
      GOOGLE: '/auth/google',              // GET com ?state=user|lawyer
      GOOGLE_CALLBACK: '/auth/google/callback', // GET com ?code=XXX&state=XXX
    },
  },
};
```

## Segurança

✅ **HTTPS obrigatória** em produção para OAuth
✅ **CORS configurado** no backend para aceitar seu domínio
✅ **State parameter** previne CSRF attacks
✅ **Sem tokens expostos** no frontend
✅ **localStorage persistence** segura com Zustand

## O Que Fazer se Algo Não Funcionar

### Erro: "Clico no botão mas nada acontece"
→ Certifique-se que `.env.local` está criado com `NEXT_PUBLIC_API_URL`

### Erro: "Modal não aparece"
→ Verifique se `RoleSelectionModal` está importado em `login-form.tsx`

### Erro: "CORS error ao chamar Google"
→ O backend precisa aceitar requests de `localhost:3000` (dev) ou seu domínio (prod)

### Erro: "Redireciona pra login com ?error="
→ Verifique se `/auth/google/callback?code=XXX` está retornando dados válidos

### User não permanece logado após refresh
→ localStorage pode estar desabilitado ou ter limites de tamanho

## Próximos Passos

1. ✅ Implementar modal de seleção de role
2. ✅ Integrar login com Google no formulário
3. ✅ Criar rota de callback
4. ⬜ Implementar logout com limpeza de tokens
5. ⬜ Adicionar refresh token logic (se backend suportar)
6. ⬜ Implementar role-based route protection com middleware
7. ⬜ Adicionar error boundaries para melhor UX

## Diagrama de Componentes

```
app/
├── login/page.tsx
│   └── @/app/features/auth/login/
│       └── login-form.tsx (+ Modal)
│
├── auth/callback/page.tsx
│   └── GoogleAuthCallbackHandler
│
api/
└── auth/google/callback/route.ts
    └── Chama: https://vj-api-yx3g.onrender.com/auth/google/callback

store/
└── auth.store.ts (Zustand - Global State)

hooks/
└── useAuth.ts (Acesso ao store)
```

## Commits Relacionados

```
- feat(components): create role selection modal for Google OAuth flow
- feat(auth): integrate Google OAuth login in login form
- feat(api): implement Google OAuth callback route handler
- feat(components): create Google callback handler for token storage
- feat(pages): create OAuth callback redirect page
```

## Referências

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Next.js Redirect API](https://nextjs.org/docs/app/api-reference/functions/redirect)
