import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './index';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text for the input',
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
      description: 'Helper text to display below input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'The input type',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display on the left',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display on the right',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    id: 'with-label',
    label: 'Full Name',
    placeholder: 'John Doe',
  },
};

export const WithHelperText: Story = {
  args: {
    id: 'with-helper',
    label: 'Email',
    placeholder: 'john@example.com',
    helperText: 'We will never share your email',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    id: 'with-error',
    label: 'Email',
    placeholder: 'john@example.com',
    error: 'Please enter a valid email address',
    type: 'email',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Disabled Input',
    placeholder: 'Cannot edit this',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    id: 'with-left-icon',
    label: 'Search',
    placeholder: 'Search...',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
};

export const WithRightIcon: Story = {
  args: {
    id: 'with-right-icon',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    rightIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
};

export const Email: Story = {
  args: {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  args: {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
  },
};

export const Number: Story = {
  args: {
    id: 'number',
    label: 'Age',
    type: 'number',
    placeholder: '25',
  },
};
