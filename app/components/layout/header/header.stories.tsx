import type { Meta, StoryObj } from '@storybook/nextjs';
import Header from './index';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-32 px-8">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Página de Exemplo</h1>
          <p className="text-xl">O header está fixo no topo</p>
        </div>
      </div>
    </div>
  ),
};

export const WithScrollContent: Story = {
  render: () => (
    <div className="bg-slate-900">
      <Header />
      <div className="pt-32 px-8">
        <div className="text-white text-center space-y-8">
          <h1 className="text-4xl font-bold">Role para baixo</h1>
          <p className="text-xl">O header permanece fixo durante a rolagem</p>
        </div>
        <div className="h-screen"></div>
        <div className="text-white text-center space-y-8">
          <h2 className="text-3xl font-bold">Seção 2</h2>
          <p>O header ainda está visível</p>
        </div>
        <div className="h-screen"></div>
        <div className="text-white text-center space-y-8 pb-32">
          <h2 className="text-3xl font-bold">Seção 3</h2>
          <p>Continue rolando</p>
        </div>
      </div>
    </div>
  ),
};

export const Isolated: Story = {
  render: () => (
    <div className="bg-slate-900 p-8">
      <Header />
    </div>
  ),
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-32 px-4">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Visualização Mobile</h1>
          <p className="text-sm">Clique no menu para ver a navegação</p>
        </div>
      </div>
    </div>
  ),
};
