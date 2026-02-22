# 🎯 VozJusta - Frontend Web

<div align="center">
 
  <p align="center">
    <strong>Democratizando o Acesso à Justiça através da Tecnologia</strong>
  </p>

  <p align="center">
    Plataforma web para conexão entre cidadãos e advogados, com diagnóstico jurídico assistido por IA
  </p>

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)

</div>

---

## 📋 Sobre o Projeto

O **VozJusta** é uma plataforma de democratização jurídica que elimina as barreiras de acesso à justiça no Brasil. Este repositório contém o frontend web da aplicação, desenvolvido com Next.js 16 e focado em proporcionar uma experiência intuitiva tanto para cidadãos quanto para advogados.

### 🎯 Problema Resolvido

- **Juridiquês como Barreira**: Linguagem jurídica arcaica que impede o cidadão comum de entender seus direitos
- **Desinformação e Medo**: Incapacidade de diagnosticar se uma situação constitui um direito ferido
- **Custo da Incerteza**: Tempo e dinheiro perdidos buscando especialistas errados
- **Anacronismo Tecnológico**: Sistema jurídico preso em lógicas do século passado

### 💡 Nossa Solução

1. **Entrevista com IA**: Cidadão relata seu problema em linguagem natural, IA traduz para termos jurídicos
2. **Diagnóstico Inteligente**: Sistema identifica o tipo de causa e viabilidade jurídica
3. **Match com Especialistas**: Conexão direta com advogados especialistas na área específica
4. **Simulador de Audiência**: Treino prático para perder o medo do tribunal

---

## ✨ Funcionalidades Principais

### Para Cidadãos

- ✅ Cadastro com verificação dupla (e-mail + SMS)
- ✅ Entrevista guiada por IA para diagnóstico jurídico
- ✅ Visualização de advogados especialistas
- ✅ Envio de dossiê técnico para advogados
- ✅ Contato direto via WhatsApp/Telefone
- ✅ Simulador de audiência (Modo Júri)
- ✅ Armazenamento seguro de documentos

### Para Advogados

- ✅ Painel de leads qualificados
- ✅ Visualização de dossiês técnicos pré-analisados
- ✅ Sistema de match baseado em especialização
- ✅ Perfil profissional com selo de verificação
- ✅ Análise de tendências jurídicas (Plano Master)
- ✅ Contato direto com clientes potenciais

---

## 🛠️ Stack Tecnológica

### Core

- **[Next.js 16.1.6](https://nextjs.org/)** - Framework React com SSR/SSG
- **[React 19](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### Estilização

- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[PostCSS](https://postcss.org/)** - Processador de CSS

### Gerenciamento de Estado

- **[React Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono (planejado)
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado global (planejado)

### UI/UX

- **[Material-UI Icons](https://mui.com/material-ui/material-icons/)** - Biblioteca de ícones
- **Custom Components** - Sistema de design próprio

### Validação

- **[Zod](https://zod.dev/)** (planejado) - Validação de schemas TypeScript

### Ferramentas de Desenvolvimento

- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** (recomendado) - Formatação de código
- **[Storybook](https://storybook.js.org/)** - Documentação de componentes

---

## 📦 Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (gerenciador de pacotes recomendado)
- **Git** para controle de versão

```bash
# Verificar versões instaladas
node --version
pnpm --version
git --version
```

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/vozjusta-frontend.git
cd vozjusta-frontend
```

### 2. Instale as Dependências

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Autenticação
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret

# OpenRouter (IA)
OPENROUTER_API_KEY=your-openrouter-key

# Resend (E-mails)
RESEND_API_KEY=your-resend-key

# Azure Storage (Documentos)
AZURE_STORAGE_CONNECTION_STRING=your-azure-connection

# Configurações de Ambiente
NEXT_PUBLIC_ENVIRONMENT=development
```

### 4. Execute o Projeto

```bash
# Modo desenvolvimento
pnpm dev

# Modo produção
pnpm build
pnpm start
```

A aplicação estará disponível em: **http://localhost:3000**

---

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev                 # Inicia servidor de desenvolvimento

# Build
pnpm build              # Gera build de produção
pnpm start              # Inicia servidor de produção

# Linting
pnpm lint               # Executa ESLint

# Storybook
pnpm storybook          # Inicia Storybook (documentação de componentes)
pnpm build-storybook    # Gera build do Storybook
```

---

## 📁 Estrutura de Pastas

```
VJ.WEB/
├── app/                              # App Router (Next.js 16)
│   ├── layout.tsx                    # Layout global da aplicação
│   ├── page.tsx                      # Página inicial (Landing Page)
│   ├── globals.css                   # Estilos globais
│   ├── not-found.tsx                 # Página 404
│   │
│   ├── api/                          # API Routes (Server-side)
│   │   └── contact/
│   │       └── route.ts              # Endpoint de contato
│   │
│   ├── components/                   # Componentes React
│   │   ├── layout/                   # Componentes de layout
│   │   │   ├── header/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── header.types.ts
│   │   │   │   ├── header.navigation.ts
│   │   │   │   └── mobile-menu.tsx
│   │   │   └── footer/
│   │   │       ├── index.tsx
│   │   │       ├── footer.types.ts
│   │   │       └── footer.navigation.ts
│   │   │
│   │   └── ui/                       # Componentes de UI reutilizáveis
│   │       ├── badge/
│   │       ├── button/
│   │       ├── input/
│   │       ├── textarea/
│   │       ├── toast/
│   │       ├── feature-card/
│   │       ├── faq-item/
│   │       ├── plan-card/
│   │       ├── stat-card/
│   │       ├── team-member-card/
│   │       ├── testimonial-card/
│   │       └── gradient-divider/
│   │
│   ├── features/                     # Features/Módulos da aplicação
│   │   └── landing-page/
│   │       ├── index.tsx
│   │       └── sections/
│   │           ├── hero-section/
│   │           ├── feature-section/
│   │           ├── pricing-section/
│   │           ├── faq-section/
│   │           ├── cta-section/
│   │           ├── privacy-section/
│   │           └── simulator-section/
│   │
│   ├── contato/                      # Página de contato
│   │   ├── page.tsx
│   │   └── contact.schema.ts
│   │
│   ├── nosso-time/                   # Página sobre o time
│   │   ├── page.tsx
│   │   └── team.data.ts
│   │
│   └── lib/                          # Utilitários e helpers
│       └── utils.ts
│
├── public/                           # Arquivos estáticos
│   ├── logo/
│   └── illustrations/
│
├── services/                         # Serviços externos
│   └── email.service.ts
│
├── .storybook/                       # Configuração do Storybook
│   ├── main.ts
│   └── preview.ts
│
├── eslint.config.mjs                 # Configuração ESLint
├── next.config.ts                    # Configuração Next.js
├── tailwind.config.ts                # Configuração TailwindCSS
├── tsconfig.json                     # Configuração TypeScript
├── postcss.config.mjs                # Configuração PostCSS
└── package.json                      # Dependências e scripts
```

---

## 🎨 Sistema de Design

### Componentes UI

Todos os componentes seguem uma estrutura padronizada:

```
component-name/
├── index.tsx              # Componente principal
├── component.types.ts     # Tipagens TypeScript
├── component.styles.ts    # Estilos/variantes (se aplicável)
└── component.stories.tsx  # Storybook stories
```

#### Padrão de Exportação

```typescript
// component.types.ts
export interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

// index.tsx
export function Component({ variant = 'primary', size = 'md', children }: ComponentProps) {
  return (
    <div className={`component-${variant} component-${size}`}>
      {children}
    </div>
  )
}
```

### Convenções de Estilo

- **Utility-First**: Priorizar classes do TailwindCSS
- **Responsive**: Mobile-first (sm, md, lg, xl breakpoints)
- **Dark Mode**: Suporte via classes `dark:` (planejado)
- **Acessibilidade**: Seguir WCAG 2.1 AA

---

## 🧩 Componentes Principais

### Layout Components

#### Header

Navegação principal com suporte a menu mobile responsivo.

```tsx
import { Header } from "@/components/layout/header";

<Header />;
```

#### Footer

Rodapé com navegação, links sociais e informações institucionais.

```tsx
import { Footer } from "@/components/layout/footer";

<Footer />;
```

### UI Components

#### Button

Botão reutilizável com múltiplas variantes.

```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary" size="lg">
  Clique aqui
</Button>;
```

#### Input

Campo de entrada de texto com validação.

```tsx
import { Input } from "@/components/ui/input";

<Input
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  error="E-mail inválido"
/>;
```

#### Toast

Sistema de notificações temporárias.

```tsx
import { useToast } from "@/components/ui/toast/toast-provider";

const { toast } = useToast();

toast({
  title: "Sucesso!",
  description: "Operação realizada com sucesso",
  variant: "success",
});
```

---

## 🎭 Storybook

Visualize e teste todos os componentes isoladamente:

```bash
pnpm storybook
```

Acesse: **http://localhost:6006**

### Componentes Documentados

- ✅ Badge
- ✅ Button
- ✅ Input
- ✅ Textarea
- ✅ Feature Card
- ✅ FAQ Item
- ✅ Plan Card
- ✅ Stat Card
- ✅ Team Member Card
- ✅ Testimonial Card
- ✅ Toast
- ✅ Gradient Divider
- ✅ Header
- ✅ Footer

---

## 🔐 Autenticação e Segurança

### Fluxo de Autenticação

1. Cadastro com e-mail e telefone
2. Verificação dupla (2FA) via e-mail e SMS
3. JWT armazenado em HttpOnly cookies
4. Refresh token para sessões longas

### Medidas de Segurança

- Validação de entrada com Zod
- Sanitização de dados
- HTTPS obrigatório em produção
- CORS configurado para backend específico
- Rate limiting no backend

---

## 📱 Responsividade

O projeto segue a abordagem **Mobile-First**:

| Breakpoint | Largura | Dispositivo          |
| ---------- | ------- | -------------------- |
| `xs`       | 0-639px | Smartphones          |
| `sm`       | 640px+  | Tablets grandes      |
| `md`       | 768px+  | Tablets paisagem     |
| `lg`       | 1024px+ | Desktops             |
| `xl`       | 1280px+ | Desktops grandes     |
| `2xl`      | 1536px+ | Monitores ultra-wide |

---

## 🚀 Deploy

### Azure App Service

O projeto está configurado para deploy na Azure via CI/CD:

```bash
# Build de produção
pnpm build

# O build gera a pasta .next/ pronta para deploy
```

### Variáveis de Ambiente (Produção)

Configure as seguintes variáveis no Azure App Service:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_ENVIRONMENT=production`
- Todas as keys de API necessárias

### Pipeline CI/CD

O deploy automático é acionado via:

- Push na branch `develop`.
- Pull Request aprovado.

---

## 🧪 Testes (Planejado)

```bash
# Testes unitários (Jest + React Testing Library)
pnpm test

# Testes E2E (Playwright)
pnpm test:e2e

# Cobertura de testes
pnpm test:coverage
```

---

## 📊 Performance

### Otimizações Implementadas

- ✅ Next.js Image optimization
- ✅ Code splitting automático
- ✅ Tree shaking com Webpack 5
- ✅ Compressão de assets (gzip/brotli)
- ✅ Lazy loading de componentes
- ✅ Server Components (React 19)

### Métricas Alvo

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Lighthouse Score**: > 90

---

## 🤝 Contribuindo

### Padrões de Commit

Seguimos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: adiciona simulador de audiência
fix: corrige validação de e-mail
docs: atualiza README com instruções de deploy
style: formata código com prettier
refactor: reorganiza estrutura de pastas
test: adiciona testes para button component
chore: atualiza dependências
```

### Fluxo de Trabalho

1. Crie uma branch a partir de `main`:

   ```bash
   git checkout -b feat/nome-da-feature
   ```

2. Desenvolva e commite suas mudanças:

   ```bash
   git add .
   git commit -m "feat: descrição da feature"
   ```

3. Envie para o repositório:

   ```bash
   git push origin feat/nome-da-feature
   ```

4. Abra um Pull Request

### Code Review

Antes de submeter PR, certifique-se de:

- ✅ Código está formatado (ESLint)
- ✅ Componentes têm tipos TypeScript
- ✅ Stories do Storybook criadas (se aplicável)
- ✅ Build passa sem erros (`pnpm build`)

---

## 📝 Roadmap

### Fase 1 - MVP (Q1 2026) ✅

- [x] Landing page institucional
- [x] Sistema de componentes base
- [x] Formulário de contato
- [x] Integração com Storybook

### Fase 2 - Autenticação (Q2 2026)

- [ ] Sistema de cadastro e login
- [ ] Verificação 2FA (e-mail + SMS)
- [ ] Painel do cidadão
- [ ] Painel do advogado

### Fase 3 - IA e Diagnóstico (Q3 2026)

- [ ] Entrevista guiada por IA
- [ ] Geração de dossiê técnico
- [ ] Sistema de match cidadão-advogado
- [ ] Chat em tempo real

### Fase 4 - Simulador (Q4 2026)

- [ ] Simulador de audiência (Modo Júri)
- [ ] Análise de jurisprudências
- [ ] Geração de petição inicial
- [ ] Painel analytics para advogados

---

## 👥 Equipe

### Desenvolvedor Frontend

**Pedro Sales**

- GitHub: [@Pedro Sales](https://github.com/xsalles)
- E-mail: xs.salles@gmail.com

### Instituição

**SENAI Suíço Brasileiro**

- Curso: Técnico em Desenolvimento de Sistemas
- Orientador: [@Lucas Correa](https://github.com/lucascorreaa)
- Ano: 2026

---

## 📄 Licença

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) para o SENAI Suíço Brasileiro.

**Todos os direitos reservados © 2026 VozJusta**

---

## 🙏 Agradecimentos

- SENAI Suíço Brasileiro pela infraestrutura e orientação
- Comunidade Next.js pela documentação excepcional
- Todos os contribuidores open-source das bibliotecas utilizadas

---

<div align="center">
  <p>Desenvolvido com ❤️ para democratizar o acesso à justiça no Brasil</p>
  
  **[Website](#) • [Documentação](#) • [Storybook](#)**
</div>
