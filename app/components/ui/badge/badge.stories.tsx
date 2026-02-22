import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./index";
import { BadgeVariant } from "./badge.types";
import { CheckCircleOutline } from "@mui/icons-material";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text content of the badge",
    },
    variant: {
      control: "select",
      options: ["blue", "green", "red"] as BadgeVariant[],
      description: "The color variant of the badge",
    },
    icon: {
      control: false,
      description: "Optional icon element",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    ariaLabel: {
      control: "text",
      description: "Accessibility label",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    text: "Blue Badge",
    variant: "blue",
  },
};

export const Green: Story = {
  args: {
    text: "Green Badge",
    variant: "green",
  },
};

export const Red: Story = {
  args: {
    text: "Red Badge",
    variant: "red",
  },
};

export const WithIcon: Story = {
  args: {
    text: "With Icon",
    variant: "blue",
    icon: <CheckCircleOutline sx={{ fontSize: 16 }} />,
  },
};

export const WithCustomLabel: Story = {
  args: {
    text: "Custom",
    variant: "green",
    ariaLabel: "Custom accessibility label",
  },
};
