import type { Meta, StoryObj } from '@storybook/nextjs';
import { TeamMemberCard } from './index';

const meta = {
  title: 'UI/TeamMemberCard',
  component: TeamMemberCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Team member name',
    },
    role: {
      control: 'text',
      description: 'Team member role',
    },
    description: {
      control: 'text',
      description: 'Team member description',
    },
    image: {
      control: 'text',
      description: 'Image URL',
    },
    initials: {
      control: 'text',
      description: 'Custom initials (auto-generated if not provided)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof TeamMemberCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    name: 'João Silva',
    role: 'CEO & Fundador',
    description: 'Especialista em transformação digital com 15 anos de experiência.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
};

export const WithoutImage: Story = {
  args: {
    name: 'Maria Santos',
    role: 'CTO',
    description: 'Líder técnica apaixonada por inovação e tecnologia.',
  },
};

export const WithCustomInitials: Story = {
  args: {
    name: 'Pedro Oliveira',
    role: 'Head de Design',
    description: 'Designer criativo focado em experiência do usuário.',
    initials: 'PO',
  },
};

export const ShortDescription: Story = {
  args: {
    name: 'Ana Costa',
    role: 'Desenvolvedora',
    description: 'Full-stack developer.',
  },
};

export const LongDescription: Story = {
  args: {
    name: 'Carlos Mendes',
    role: 'Product Manager',
    description: 'Product Manager experiente com histórico de lançamentos bem-sucedidos em startups e empresas de tecnologia. Focado em criar produtos que realmente resolvem problemas dos usuários.',
  },
};

export const LeadershipTeam: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <TeamMemberCard
        name="João Silva"
        role="CEO & Fundador"
        description="Especialista em transformação digital com 15 anos de experiência."
        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
      />
      <TeamMemberCard
        name="Maria Santos"
        role="CTO"
        description="Líder técnica apaixonada por inovação e tecnologia."
        image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
      />
      <TeamMemberCard
        name="Pedro Oliveira"
        role="Head de Design"
        description="Designer criativo focado em experiência do usuário."
        image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
      />
    </div>
  ),
};

export const WithFallbackAvatars: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <TeamMemberCard
        name="Ana Costa"
        role="Desenvolvedora Frontend"
        description="Especialista em React e Next.js."
      />
      <TeamMemberCard
        name="Carlos Mendes"
        role="Desenvolvedor Backend"
        description="Expert em Node.js e arquitetura de sistemas."
      />
      <TeamMemberCard
        name="Beatriz Lima"
        role="UX Researcher"
        description="Focada em pesquisa e testes de usabilidade."
      />
    </div>
  ),
};
