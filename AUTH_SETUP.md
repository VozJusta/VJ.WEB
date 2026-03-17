# Guia de Autenticação Google - VozJusta

## Visão Geral

Este documento descreve a implementação completa de autenticação com Google no VozJusta. O sistema foi construído com Next.js 16, React, Zustand para state management e TypeScript, fornecendo uma experiência seamless de login.

## Mudança Principal

**State Parameter**: `citizen` (antes: `user`)

Quando o usuário seleciona "Sou Cidadão", o state enviado para Google é **`citizen`** e não `user`.
Quando seleciona "Sou Advogado", o state é **`lawyer`**.

## Arquitetura

### Estrutura de Pastas

```
VJ.WEB/
├── lib/
│   ├── api.ts                           # Configuração de API
│   └── utils.ts
├── types/
│   ├── auth.types.ts                    # Types para autenticação
│   └── ...
├── store/
│   └── auth.store.ts                    # Zustand store
├── hooks/
│   └── useAuth.ts                       # Hook de autenticação
├── components/
│   └── modals/
│       └── role-selection-modal.tsx     # Modal de seleção
├── app/
│   ├── auth/callback/page.tsx           # Página de callback
│   └── features/auth/login/login-form.tsx  # Formulário de login
└── api/
    └── auth/google/callback/route.ts    # Route handler
```

## Fluxo de Autenticação

```
1. Clica "Continuar com Google"
   ↓
2. RoleSelectionModal abre
   - Cidadão → state: "citizen"
   - Advogado → state: "lawyer"
   ↓
3. Redireciona para Google
   URL: /auth/google?state=citizen (ou lawyer)
   ↓
4. Google autentica
   ↓
5. Callback: /api/auth/google/callback?code=XXX&state=citizen
   ↓
6. Backend retorna dados do usuário
   ↓
7. Route handler redireciona direto para Dashboard
   URL: /dashboard/citizen?authData=base64encodeddata
   ↓
8. GoogleAuthHandler processa dados automaticamente
   - Decodifica authData
   - Armazena no Zustand
   ↓
9. User já autenticado no Dashboard
```

## UserRole Type

```typescript
export type UserRole = 'citizen' | 'lawyer';
```

## Commits Realizados

```
- refactor(types): change user role from 'user' to 'citizen'
- refactor(components): update role selection modal to use 'citizen'
- refactor(auth): update callback handler default role
- docs(auth): update documentation to use 'citizen'
```

## Status

✅ Fluxo completamente refatorado:
- Sem página de callback separada (`/auth/callback`)
- Redirecionamento direto para Dashboard após Google OAuth
- GoogleAuthHandler processa dados automaticamente
- User vê Dashboard imediatamente após login

✅ Alteração aplicada em:
- api/auth/google/callback/route.ts - Redireciona direto para dashboard
- app/features/auth/google-auth-handler.tsx - Processa dados no dashboard
- app/(private)/layout.tsx - Integra GoogleAuthHandler
- Páginas de callback deletadas (não necessárias)
- Documentação atualizada
