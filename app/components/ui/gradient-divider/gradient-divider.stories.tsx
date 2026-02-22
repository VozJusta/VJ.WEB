import type { Meta, StoryObj } from '@storybook/nextjs';
import { GradientDivider } from './index';
import { GradientDirection } from './gradient-divider.types';

const meta = {
  title: 'UI/GradientDivider',
  component: GradientDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['to-right', 'to-left', 'to-top', 'to-bottom'] as GradientDirection[],
      description: 'Direction of the gradient',
    },
    height: {
      control: 'text',
      description: 'Tailwind height class',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    stops: {
      control: 'object',
      description: 'Array of gradient stops',
    },
  },
} satisfies Meta<typeof GradientDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: 'to-right',
  },
};

export const ToLeft: Story = {
  args: {
    direction: 'to-left',
  },
};

export const ToTop: Story = {
  args: {
    direction: 'to-top',
    height: 'h-32',
  },
};

export const ToBottom: Story = {
  args: {
    direction: 'to-bottom',
    height: 'h-32',
  },
};

export const Thick: Story = {
  args: {
    direction: 'to-right',
    height: 'h-1',
  },
};

export const VeryThick: Story = {
  args: {
    direction: 'to-right',
    height: 'h-2',
  },
};

export const Thin: Story = {
  args: {
    direction: 'to-right',
    height: 'h-px',
  },
};

export const CustomStops: Story = {
  args: {
    direction: 'to-right',
    stops: [
      { position: 0, color: '#3b82f6', opacity: 0 },
      { position: 50, color: '#8b5cf6', opacity: 1 },
      { position: 100, color: '#ec4899', opacity: 0 },
    ],
  },
};

export const MultipleGradients: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white mb-4">To Right</h3>
        <GradientDivider direction="to-right" />
      </div>
      <div>
        <h3 className="text-white mb-4">To Left</h3>
        <GradientDivider direction="to-left" />
      </div>
      <div>
        <h3 className="text-white mb-4">Thick</h3>
        <GradientDivider direction="to-right" height="h-1" />
      </div>
      <div>
        <h3 className="text-white mb-4">Very Thick</h3>
        <GradientDivider direction="to-right" height="h-2" />
      </div>
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="max-w-2xl">
      <div className="text-white space-y-4 mb-8">
        <h2 className="text-2xl font-bold">Seção 1</h2>
        <p>Este é um conteúdo de exemplo antes do divisor gradiente.</p>
      </div>
      <GradientDivider direction="to-right" height="h-px" className="my-8" />
      <div className="text-white space-y-4">
        <h2 className="text-2xl font-bold">Seção 2</h2>
        <p>Este é um conteúdo de exemplo depois do divisor gradiente.</p>
      </div>
    </div>
  ),
};
