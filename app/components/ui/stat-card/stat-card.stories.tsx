import type { Meta, StoryObj } from "@storybook/nextjs";
import { StatCard } from "./index";

const meta = {
  title: "UI/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "The statistic value",
    },
    label: {
      control: "text",
      description: "The statistic label",
    },
    valueColor: {
      control: "text",
      description: "Tailwind color class for the value",
    },
    labelColor: {
      control: "text",
      description: "Tailwind color class for the label",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    animationDelay: {
      control: "number",
      description: "Animation delay in milliseconds",
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "10h",
    label: "Poupadas por semana",
  },
};

export const Percentage: Story = {
  args: {
    value: "100%",
    label: "Taxa de sucesso",
    valueColor: "text-green-500",
  },
};

export const Growth: Story = {
  args: {
    value: "+40%",
    label: "Crescimento mensal",
    valueColor: "text-blue-400",
  },
};

export const ZeroState: Story = {
  args: {
    value: "Zero",
    label: "Bugs reportados",
    valueColor: "text-purple-500",
  },
};

export const LargeNumber: Story = {
  args: {
    value: "10,000+",
    label: "Usuários ativos",
    valueColor: "text-cyan-500",
  },
};

export const CustomColors: Story = {
  args: {
    value: "99.9%",
    label: "Uptime garantido",
    valueColor: "text-yellow-400",
    labelColor: "text-gray-300",
  },
};

export const WithDelay: Story = {
  args: {
    value: "24/7",
    label: "Suporte disponível",
    valueColor: "text-red-500",
    animationDelay: 300,
  },
};

export const MultipleCards: Story = {
  args: {
    value: "10h",
    label: "Poupadas por semana",
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        value="10h"
        label="Poupadas por semana"
        valueColor="text-blue-500"
        animationDelay={0}
      />
      <StatCard
        value="100%"
        label="Taxa de sucesso"
        valueColor="text-green-500"
        animationDelay={100}
      />
      <StatCard
        value="+40%"
        label="Crescimento mensal"
        valueColor="text-purple-500"
        animationDelay={200}
      />
    </div>
  ),
};
