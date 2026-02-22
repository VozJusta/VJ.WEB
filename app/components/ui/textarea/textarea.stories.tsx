import type { Meta, StoryObj } from '@storybook/nextjs';
import { Textarea } from './index';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below textarea',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    id: 'with-label',
    label: 'Message',
    placeholder: 'Type your message here...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'with-helper',
    label: 'Description',
    placeholder: 'Describe your project...',
    helperText: 'Provide a detailed description of your project',
    rows: 5,
  },
};

export const WithError: Story = {
  args: {
    id: 'with-error',
    label: 'Message',
    placeholder: 'Type your message...',
    error: 'Message is required',
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit this',
    disabled: true,
    rows: 4,
  },
};

export const WithCharCount: Story = {
  args: {
    id: 'with-char-count',
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    showCharCount: true,
    maxLength: 200,
    rows: 6,
  },
};

export const Large: Story = {
  args: {
    id: 'large',
    label: 'Long Content',
    placeholder: 'Write a long message...',
    rows: 10,
  },
};

export const WithValue: Story = {
  args: {
    id: 'with-value',
    label: 'Pre-filled Content',
    value: 'This is some pre-filled content that can be edited.',
    rows: 4,
  },
};
