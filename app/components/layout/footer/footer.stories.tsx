import type { Meta, StoryObj } from '@storybook/nextjs';
import Footer from './index';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithScrollableContent: Story = {
  render: () => (
    <div>
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Página de Exemplo</h1>
          <p className="text-xl">Role para baixo para ver o footer</p>
        </div>
      </div>
      <Footer />
    </div>
  ),
};

export const Isolated: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
};
