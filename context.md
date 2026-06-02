# VJ.WEB — Guia de Contexto do Projeto

> Leia este documento antes de abrir qualquer arquivo. Ele responde "por onde começo?" sem ambiguidade.

---

## O que é o VozJusta

VozJusta é uma plataforma de acesso à justiça que conecta **cidadãos** a **advogados**. O cidadão relata um problema jurídico (texto ou voz), a IA analisa o caso, gera um relatório e conecta o cidadão a advogados especializados. Há também um simulador de audiência com IA em tempo real via WebSocket.

Existem dois papéis distintos, cada um com seu próprio dashboard e fluxo:

| Papel | Rota base | Finalidade |
|---|---|---|
| `citizen` | `/dashboard` | Relatar casos, acompanhar processos, conversar com advogado |
| `lawyer` | `/advogado` | Receber e aceitar/recusar solicitações de cidadãos |

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js (App Router) | 16.1.6 | Framework principal, SSR/CSR, roteamento |
| React | 19.2.3 | UI |
| TypeScript | ^5 | Tipagem estática em todo o projeto |
| Tailwind CSS | v4 | Estilização — **sem `tailwind.config.js`**, tudo via `@theme inline` no CSS |
| Zustand | ^5 | Estado global (auth, chat, notifications) |
| Zod | ^4 | Validação de formulários |
| i18next + react-i18next | ^26 / ^17 | Internacionalização (pt-BR, en, es) |
| Socket.io-client | ^4 | WebSocket do simulador de audiência |
| MUI Icons | ^7 | Ícones (somente `@mui/icons-material`) |
| CVA (class-variance-authority) | ^0.7 | Variantes de componentes UI |
| Recharts | ^3 | Gráficos no dashboard do advogado |
| Resend | ^6 | Envio de e-mails (server-side) |
| Storybook | ^10 | Documentação de componentes UI |
| pnpm | — | Gerenciador de pacotes |

> **MUI:** Somente os ícones são usados. Não há componentes MUI na UI — tudo é construído na mão com Tailwind.

---

## Estrutura de Diretórios

```
src/
├── app/                        # Next.js App Router — apenas páginas e layouts
│   ├── (private)/              # Grupo de rota: dashboard do cidadão (auth obrigatória)
│   │   ├── layout.tsx          # Layout do dashboard: Sidebar + DashboardHeader
│   │   └── dashboard/...       # Páginas do cidadão
│   ├── (advogado)/             # Grupo de rota: dashboard do advogado (auth obrigatória)
│   │   ├── layout.tsx
│   │   └── advogado/...
│   ├── auth/                   # Callbacks OAuth e conclusão de cadastro Google
│   ├── onBoarding/             # Fluxo de cadastro (cidadão e advogado)
│   ├── verificacao/            # Verificação de e-mail (OTP)
│   ├── login/page.tsx
│   ├── layout.tsx              # Root layout — providers globais
│   └── globals.css             # CSS variables de tema + Tailwind v4
│
├── features/                   # Lógica de UI por domínio — aqui fica a complexidade
│   ├── auth/                   # login, citizen-signup, lawyer-signup, verification, etc.
│   ├── dashboard/              # cases, documents, lawyers, notifications, profile, settings
│   ├── lawyer-dashboard/       # requests (solicitações do advogado)
│   ├── landing-page/           # Seções da landing (hero, features, pricing, faq, cta...)
│   ├── simulator/              # Simulador de audiência (config, sessão, feedback)
│   └── advogado/               # Perfil do advogado
│
├── components/
│   ├── ui/                     # Design system — componentes puros, sem lógica de negócio
│   │   └── [nome-do-componente]/
│   │       ├── index.tsx       # Componente
│   │       ├── [nome].types.ts # Props/tipos
│   │       ├── [nome].styles.ts# CVA variants
│   │       └── [nome].stories.tsx # Storybook (se tiver)
│   ├── layout/                 # Header, Footer, Sidebar, DashboardHeader
│   ├── modals/                 # Modais globais (logout, role-selection)
│   └── auth/                   # protected-route.tsx
│
├── hooks/                      # Custom hooks — cada um corresponde a um serviço/domínio
├── services/                   # Chamadas de API organizadas por domínio
├── store/                      # Zustand stores (auth, chat, notifications)
├── contexts/                   # React contexts (AuthContext)
├── lib/                        # Utilitários: api.ts, api-client.ts, auth.ts, utils.ts, etc.
├── providers/                  # Wrappers de providers (I18nProvider, ThemeProvider)
├── types/                      # Tipos TypeScript por domínio
├── proxys/                     # proxy.ts — versão simplificada do middleware (não usado em prod)
└── middleware.ts               # Proteção de rotas e redirecionamentos
```

---

## Padrões Fundamentais

### 1. Pages são thin — features são fat

As páginas em `app/` são intencionalmente vazias: apenas importam e renderizam a feature correspondente.

```tsx
// app/(private)/dashboard/casos/novo/page.tsx
import { NewCaseFeature } from "@/features/dashboard/cases/new-case-feature";

export default function Page() {
  return <NewCaseFeature />;
}
```

**Nunca coloque lógica de negócio ou estado diretamente numa `page.tsx`.** A lógica vive na feature.

---

### 2. Anatomia de uma Feature

Cada feature em `src/features/` é uma pasta autossuficiente:

```
features/auth/login/
├── index.tsx          # Componente de entrada (exportado para a page)
├── login-form.tsx     # Lógica do formulário + estado local
├── login-hero.tsx     # Lado visual/marketing (sem lógica)
├── login.schema.ts    # Schema Zod da validação
└── constants.ts       # Dados estáticos (se necessário)
```

O `index.tsx` monta o layout (hero + form, ou seção + lista) e usa `<Suspense>` onde necessário. O form file é `"use client"` e gerencia estado local com `useState`.

---

### 3. Anatomia de um Componente UI

Todos os componentes em `src/components/ui/` seguem o mesmo padrão de 4 arquivos:

```
components/ui/button/
├── index.tsx          # forwardRef + lógica de renderização
├── button.types.ts    # ButtonProps extends VariantProps<typeof buttonVariants>
├── button.styles.ts   # CVA com todas as variantes (variant, size, fullWidth)
└── button.stories.tsx # Stories do Storybook
```

Variantes são declaradas com `cva()` de `class-variance-authority` no arquivo `.styles.ts`. O componente combina as classes com `cn()` (wrapper de `clsx` + `tailwind-merge`).

```ts
// Sempre use cn() para combinar classes
import { cn } from "@/lib/utils";

const classes = cn(buttonVariants({ variant, size }), className);
```

---

### 4. Camada de API

Há dois clientes HTTP:

| Arquivo | Uso |
|---|---|
| `src/lib/api.ts` — `fetchAPI<T>()` | Requisições **sem auth** (ex: signup, login inicial) |
| `src/lib/api-client.ts` — `apiFetch()` | Requisições **com auth** — injeta Bearer token + intercepta 401 e faz refresh automático |

O `apiFetch` implementa um **queue de retry** para múltiplas requisições paralelas que chegam com 401 simultaneamente — todas ficam em fila enquanto o refresh acontece uma única vez.

**Nunca use `fetch()` diretamente nas features ou services.** Use `apiFetch` para endpoints autenticados e `fetchAPI` para endpoints públicos.

Os endpoints são centralizados em `src/lib/api.ts`:

```ts
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    AUTH: { AUTHENTICATE: '/auth/authenticate', ... },
    SIGNUP: { CITIZEN: '/citizen', ... },
  },
} as const;
```

---

### 5. Camada de Serviços

Cada arquivo em `src/services/` é um objeto singleton com métodos assíncronos. Eles são o único lugar onde `apiFetch` é chamado.

```ts
// Padrão de um service
export const dashboardService = {
  async getCitizenReports(page = 1, pageSize = 10): Promise<GetReportsResponse> {
    const response = await apiFetch(`/dashboard/citizens/me/reports?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Falha ao buscar relatórios');
    return response.json();
  },
};
```

Os **tipos de request/response** de cada serviço vivem em `src/types/`.

**Nunca lance erros genéricos.** Use `AuthServiceError` para o domínio de auth — ela carrega `statusCode` e `originalError` para rastreamento.

---

### 6. Hooks de Dados

Cada hook em `src/hooks/` encapsula o ciclo completo de uma chamada: loading, error, dados e refetch.

```ts
// Padrão canônico de um hook de dados
export function useDashboardCitizen() {
  const [reports, setReports] = useState<ReportCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getCitizenReports(page, 10);
      setReports(data.user?.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchReports(1); }, [fetchReports]);

  return { reports, isLoading, error, fetchReports };
}
```

---

### 7. State Management com Zustand

Três stores em `src/store/`:

| Store | Persistência | Propósito |
|---|---|---|
| `auth.store.ts` | `localStorage` (`auth-store`) | Usuário autenticado, role, tokens |
| `chat.store.ts` | `localStorage` (`chat`) | Conversa ativa com IA (conversationId, caseId, mensagens) |
| `notifications.store.ts` | — | Notificações em tempo real |

Todos usam `devtools` + `persist` middleware. O `AuthStore` é o mais crítico: ele tem `setTokens()` que decodifica o JWT e popula `user` automaticamente.

**Para acessar o usuário em componentes**, use o hook `useAuth` de `src/hooks/useAuth.ts` (que é um wrapper do store) ou o contexto `useAuth` de `src/contexts/auth-context.tsx` (que expõe um objeto `User` normalizado).

---

### 8. Autenticação

O fluxo completo:

```
Login com credenciais:
  POST /auth/authenticate
    → recebe securityToken
  POST /auth/send/email (envia OTP)
    → redireciona para /verificacao/email
  POST /auth/validate/email (valida OTP)
    → recebe access_token + refresh_token
    → authStorage.setTokens() + store.setTokens()
    → redireciona para /dashboard ou /advogado

Login com Google OAuth:
  GET /auth/google?state=role|callbackUrl
    → redirect para /auth/callback?authData=...
    → GoogleAuthHandler processa o authData
    → se registerCompleted=false → /auth/complete/citizen|lawyer
    → se registerCompleted=true → /dashboard|/advogado
```

**Tokens são armazenados em dois lugares simultaneamente:**
- `localStorage` — para o `apiFetch` (acesso rápido client-side)
- Cookie `access_token` — para o `middleware.ts` (verificação server-side no Edge)

**`authStorage`** em `src/lib/auth.ts` é a única abstração autorizada para ler/gravar tokens. Nunca acesse `localStorage` diretamente para tokens.

**Proteção de rotas** é feita em `src/middleware.ts`. Rotas protegidas: `/dashboard/**` e `/advogado/**`. Rotas de auth (`/login`, `/onBoarding/**`) redirecionam para o dashboard se já autenticado.

---

### 9. Tema (Dark/Light)

O projeto usa dark mode como padrão via CSS variables em `globals.css`. O tema é controlado por `next-themes` com `attribute="class"`.

**Tokens semânticos disponíveis** (use-os em vez de cores hardcoded):

```css
--background, --foreground, --foreground-muted
--surface, --surface-elevated, --surface-hover
--border-subtle, --border-subtle-hover, --border-default
--text-secondary, --text-muted
--primary (#2585F4), --primary-foreground
--status-analysis (amber), --status-concluded (green), --status-pending (blue)
```

**Tailwind v4:** Não há `tailwind.config.js`. Os tokens são mapeados via `@theme inline` no `globals.css`:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-surface: var(--surface);
  ...
}
```

Isso significa que `bg-primary`, `text-surface`, etc. funcionam diretamente. Para CSS variables não mapeadas, use a sintaxe `bg-[var(--border-subtle)]`.

**Regra:** Nunca use `bg-white/X` para overlays. Use `bg-[var(--overlay-sm/md/lg)]` ou as classes semânticas.

---

### 10. Internacionalização

Configurada em `src/lib/i18n.ts`. Suporta `pt-BR`, `en` e `es`. As traduções ficam em `public/locales/[lang]/common.json`.

A detecção de idioma usa `localStorage` com a chave `vj_language`. O provider `I18nProvider` em `src/providers/` aguarda a inicialização antes de renderizar filhos.

```tsx
// Uso padrão em componentes
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <p>{t('landing.hero.title')}</p>;
```

---

### 11. Validação de Formulários

Todos os formulários usam **Zod** para validação. O schema fica no arquivo `.schema.ts` da feature.

```ts
// features/auth/login/login.schema.ts
export const loginSchema = z.object({
  email: z.string().min(1).email().max(100),
  password: z.string().min(1),
});
export type LoginFormData = z.infer<typeof loginSchema>;
```

No componente, use `.parse()` e trate `ZodError` separadamente dos erros de API:

```ts
try {
  const data = loginSchema.parse(formState);
  await authService.authenticate(data);
} catch (error) {
  if (error instanceof ZodError) {
    // mapeia error.issues para erros de campo
  }
  if (error instanceof AuthServiceError) {
    // exibe toast com error.message
  }
}
```

---

### 12. Toast (Notificações de UI)

Use o hook `useToast()` de `src/components/ui/toast/toast-provider.tsx`:

```tsx
const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Operação realizada.",
  variant: "success", // "success" | "error" | "warning" | "info"
});
```

O `ToastProvider` está no root layout — não precisa ser adicionado em nenhum outro lugar.

---

### 13. WebSocket (Simulador)

O simulador usa Socket.io conectado ao namespace `/simulation`. O hook `useSimulation` em `src/hooks/useSimulation.ts` gerencia todo o ciclo:

```
start(personality) → REST POST /simulation/start → WebSocket connect
  socket.emit('simulation:start', { simulationId })
  socket.on('simulation:started') → status = InProgress
  socket.on('simulation:warning') → countdown visível
  socket.on('simulation:end') → aguarda simulation:report
  socket.on('simulation:report') → navega para /feedback
```

O token JWT é enviado na autenticação do socket via `auth: { token }` (sem prefixo `Bearer`).

---

## Rotas Completas

### Públicas

| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/login` | Login com credenciais ou Google |
| `/onBoarding/perfil` | Escolha de papel (cidadão ou advogado) |
| `/onBoarding/cidadao` | Cadastro do cidadão |
| `/onBoarding/advogado` | Cadastro do advogado |
| `/verificacao/email` | Verificação OTP pós-login/signup |
| `/esqueci-minha-senha` | Solicitar reset de senha |
| `/redefinir-senha` | Definir nova senha |
| `/auth/callback` | Callback do OAuth Google |
| `/auth/complete/citizen` | Completar cadastro (Google → cidadão) |
| `/auth/complete/lawyer` | Completar cadastro (Google → advogado) |
| `/contato`, `/nosso-time`, `/privacidade`, `/termos`, `/suporte` | Páginas institucionais |

### Dashboard Cidadão (`/dashboard/**`)

| Rota | Feature |
|---|---|
| `/dashboard` | Home com casos recentes e ações rápidas |
| `/dashboard/casos` | Lista de casos |
| `/dashboard/casos/novo` | Relatar novo caso (categoria + história + voz) |
| `/dashboard/casos/[id]` | Detalhe do caso |
| `/dashboard/casos/[id]/chat` | Chat com IA |
| `/dashboard/casos/[id]/analise` | Análise completa gerada pela IA |
| `/dashboard/advogados` | Lista de advogados |
| `/dashboard/advogados/[id]` | Perfil do advogado |
| `/dashboard/advogados/[id]/enviar` | Enviar dossiê ao advogado |
| `/dashboard/documentos` | Documentos recentes |
| `/dashboard/simulador` | Configurar simulador de audiência |
| `/dashboard/simulador/sessao` | Sessão do simulador (WebSocket) |
| `/dashboard/simulador/feedback` | Feedback pós-simulação |
| `/dashboard/notificacoes` | Central de notificações |
| `/dashboard/perfil` | Perfil do cidadão |
| `/dashboard/configuracoes` | Configurações |

### Dashboard Advogado (`/advogado/**`)

| Rota | Feature |
|---|---|
| `/advogado` | Home com analytics e estatísticas |
| `/advogado/solicitacoes` | Lista de solicitações de casos |
| `/advogado/solicitacoes/[id]` | Detalhe da solicitação |
| `/advogado/notificacoes` | Notificações |
| `/advogado/perfil` | Perfil do advogado |
| `/advogado/configuracoes` | Configurações |

---

## Variáveis de Ambiente

```env
NEXT_PUBLIC_API_URL=https://api.vozjusta.com.br   # URL base da API — obrigatória
```

---

## Como Começar uma Nova Feature

1. **Crie a página** em `src/app/` — apenas importe e renderize a feature
2. **Crie a pasta** em `src/features/[domínio]/[nome-da-feature]/`
3. **Adicione os arquivos**: `index.tsx`, `[nome]-form.tsx` (se tiver form), `[nome].schema.ts` (se tiver validação)
4. **Crie o service** em `src/services/[nome].service.ts` (se precisar de nova rota de API)
5. **Crie o hook** em `src/hooks/use[Nome].ts` (se precisar de estado de dados)
6. **Adicione os tipos** em `src/types/[domínio].types.ts`
7. **Use componentes UI existentes** — antes de criar, verifique `src/components/ui/`

## Como Criar um Novo Componente UI

1. Crie a pasta `src/components/ui/[nome-kebab]/`
2. Defina os tipos em `[nome].types.ts` (estenda `VariantProps` se tiver variantes)
3. Defina as variantes com `cva()` em `[nome].styles.ts`
4. Implemente o componente em `index.tsx` com `forwardRef` se necessário
5. Adicione stories em `[nome].stories.tsx`

---

## Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
|---|---|---|
| Arquivos de componentes | `kebab-case` | `case-card/index.tsx` |
| Componentes React | `PascalCase` | `CaseCard` |
| Hooks | `camelCase` com prefixo `use` | `useCaseDetail` |
| Stores Zustand | `camelCase` com sufixo `Store` | `useAuthStore` |
| Services | `camelCase` com sufixo `Service` | `dashboardService` |
| Tipos/Interfaces | `PascalCase` com sufixo descritivo | `AuthState`, `CaseCard` |
| Features | `PascalCase` com sufixo `Feature` | `NewCaseFeature` |
| Schemas Zod | `camelCase` com sufixo `Schema` | `loginSchema` |
| Rotas | `kebab-case` em português | `/esqueci-minha-senha` |
| Variáveis de ambiente | `SCREAMING_SNAKE_CASE` | `NEXT_PUBLIC_API_URL` |

---

## Pontos de Atenção

- **`"use client"`** — necessário em todo componente que usa hooks, eventos ou estado. Layouts de grupos de rota como `(private)/layout.tsx` são client components por usarem `useRouter` e `useEffect`.
- **Tokens duplicados** — o access token fica tanto em `localStorage` quanto em cookie. O middleware lê o cookie; o `apiFetch` lê o `localStorage`. Ambos devem estar em sincronia — use sempre `authStorage.setTokens()`.
- **Role routing** — o middleware e os layouts verificam o role (`citizen`/`lawyer`). Um advogado que cair em `/dashboard` é redirecionado para `/advogado` e vice-versa.
- **FormData e Content-Type** — o `apiFetch` detecta `FormData` automaticamente e não define `Content-Type`, deixando o browser setar o boundary correto para multipart.
- **Google OAuth state** — o parâmetro `state` enviado ao backend tem o formato `role|callbackUrl`. O backend devolve o mesmo state no callback para que o frontend saiba qual role foi selecionado.
- **Socket.io** — o simulador conecta ao namespace `/simulation`. O token vai em `auth.token` (sem `Bearer`). Ao reconectar, o evento `simulation:resumed` é emitido pelo servidor para evitar duplicatas.
