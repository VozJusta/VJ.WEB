import type { Meta, StoryObj } from "@storybook/nextjs";
import { FaqItem } from "./index";

const meta = {
  title: "UI/FaqItem",
  component: FaqItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    question: {
      control: "text",
      description: "The question text",
    },
    answer: {
      control: "text",
      description: "The answer text",
    },
    defaultOpen: {
      control: "boolean",
      description: "Whether the item is open by default",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof FaqItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    question: "What is your return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund.",
    defaultOpen: false,
  },
};

export const Open: Story = {
  args: {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery.",
    defaultOpen: true,
  },
};

export const ShortContent: Story = {
  args: {
    question: "Do you offer gift wrapping?",
    answer: "Yes, we do!",
    defaultOpen: false,
  },
};

export const LongContent: Story = {
  args: {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also accept PayPal, Apple Pay, Google Pay, and bank transfers for larger orders. For enterprise customers, we can arrange invoice-based billing with net-30 payment terms.",
    defaultOpen: false,
  },
};

export const MultipleItems: Story = {
  args: {
    question: "Example question",
    answer: "Example answer",
  },
  render: () => (
    <div className="w-full max-w-3xl space-y-4">
      <FaqItem
        question="What is your return policy?"
        answer="You can return any item within 30 days of purchase for a full refund."
        defaultOpen={false}
      />
      <FaqItem
        question="How long does shipping take?"
        answer="Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery."
        defaultOpen={false}
      />
      <FaqItem
        question="Do you offer international shipping?"
        answer="Yes, we ship to over 100 countries worldwide. International shipping rates vary by destination."
        defaultOpen={false}
      />
      <FaqItem
        question="What payment methods do you accept?"
        answer="We accept all major credit cards, PayPal, Apple Pay, and Google Pay."
        defaultOpen={false}
      />
    </div>
  ),
};
