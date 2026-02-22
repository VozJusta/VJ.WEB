import type { Meta, StoryObj } from '@storybook/nextjs';
import { PlanCard } from './index';
import { PlanCardVariant } from './plan-card.types';

const meta = {
  title: 'UI/PlanCard',
  component: PlanCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Plan name',
    },
    description: {
      control: 'text',
      description: 'Plan description',
    },
    price: {
      control: 'text',
      description: 'Plan price',
    },
    ctaText: {
      control: 'text',
      description: 'Call-to-action button text',
    },
    ctaHref: {
      control: 'text',
      description: 'Call-to-action link URL',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'] as PlanCardVariant[],
      description: 'Visual style variant',
    },
    recommended: {
      control: 'boolean',
      description: 'Whether this plan is recommended',
    },
    recommendedText: {
      control: 'text',
      description: 'Recommended badge text',
    },
    features: {
      control: 'object',
      description: 'Array of plan features',
    },
  },
} satisfies Meta<typeof PlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicFeatures = [
  { id: '1', text: '5 projetos inclusos' },
  { id: '2', text: 'Suporte por email' },
  { id: '3', text: '2GB de armazenamento' },
  { id: '4', text: 'Atualizações mensais' },
];

const proFeatures = [
  { id: '1', text: 'Projetos ilimitados' },
  { id: '2', text: 'Suporte prioritário 24/7' },
  { id: '3', text: '100GB de armazenamento' },
  { id: '4', text: 'Atualizações semanais' },
  { id: '5', text: 'API access' },
  { id: '6', text: 'Análise avançada' },
];

const enterpriseFeatures = [
  { id: '1', text: 'Tudo do plano Pro' },
  { id: '2', text: 'Suporte dedicado' },
  { id: '3', text: 'Armazenamento ilimitado' },
  { id: '4', text: 'SLA garantido' },
  { id: '5', text: 'Onboarding personalizado' },
  { id: '6', text: 'Treinamento da equipe' },
  { id: '7', text: 'Integração customizada' },
];

export const BasicDark: Story = {
  args: {
    name: 'Básico',
    description: 'Ideal para começar',
    price: 'R$ 29/mês',
    features: basicFeatures,
    ctaText: 'Começar agora',
    ctaHref: '#',
    variant: 'dark',
  },
};

export const BasicLight: Story = {
  args: {
    name: 'Básico',
    description: 'Ideal para começar',
    price: 'R$ 29/mês',
    features: basicFeatures,
    ctaText: 'Começar agora',
    ctaHref: '#',
    variant: 'light',
  },
};

export const ProDark: Story = {
  args: {
    name: 'Profissional',
    description: 'Para equipes em crescimento',
    price: 'R$ 99/mês',
    features: proFeatures,
    ctaText: 'Começar teste grátis',
    ctaHref: '#',
    variant: 'dark',
  },
};

export const ProLight: Story = {
  args: {
    name: 'Profissional',
    description: 'Para equipes em crescimento',
    price: 'R$ 99/mês',
    features: proFeatures,
    ctaText: 'Começar teste grátis',
    ctaHref: '#',
    variant: 'light',
  },
};

export const RecommendedDark: Story = {
  args: {
    name: 'Profissional',
    description: 'Para equipes em crescimento',
    price: 'R$ 99/mês',
    features: proFeatures,
    ctaText: 'Começar teste grátis',
    ctaHref: '#',
    variant: 'dark',
    recommended: true,
  },
};

export const RecommendedLight: Story = {
  args: {
    name: 'Profissional',
    description: 'Para equipes em crescimento',
    price: 'R$ 99/mês',
    features: proFeatures,
    ctaText: 'Começar teste grátis',
    ctaHref: '#',
    variant: 'light',
    recommended: true,
  },
};

export const EnterpriseDark: Story = {
  args: {
    name: 'Enterprise',
    description: 'Soluções personalizadas',
    price: 'Sob consulta',
    features: enterpriseFeatures,
    ctaText: 'Falar com vendas',
    ctaHref: '#',
    variant: 'dark',
  },
};

export const EnterpriseLight: Story = {
  args: {
    name: 'Enterprise',
    description: 'Soluções personalizadas',
    price: 'Sob consulta',
    features: enterpriseFeatures,
    ctaText: 'Falar com vendas',
    ctaHref: '#',
    variant: 'light',
  },
};

export const CustomBadge: Story = {
  args: {
    name: 'Premium',
    description: 'Melhor custo-benefício',
    price: 'R$ 149/mês',
    features: proFeatures,
    ctaText: 'Assinar agora',
    ctaHref: '#',
    variant: 'dark',
    recommended: true,
    recommendedText: 'MAIS POPULAR',
  },
};
