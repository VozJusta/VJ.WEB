import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './index';
import { BadgeVariant } from './badge.types';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content of the badge',
    },
    variant: {
      control: 'select',
      options: ['blue', 'green', 'red'] as BadgeVariant[],
      description: 'The color variant of the badge',
    },
    icon: {
      control: false,
      description: 'Optional icon element',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessibility label',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    text: 'Blue Badge',
    variant: 'blue',
  },
};

export const Green: Story = {
  args: {
    text: 'Green Badge',
    variant: 'green',
  },
};

export const Red: Story = {
  args: {
    text: 'Red Badge',
    variant: 'red',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'With Icon',
    variant: 'blue',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
};

export const WithCustomLabel: Story = {
  args: {
    text: 'Custom',
    variant: 'green',
    ariaLabel: 'Custom accessibility label',
  },
};
