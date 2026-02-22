import type { Meta, StoryObj } from "@storybook/nextjs";
import { FeatureCard } from "./index";
import {
  FeatureCardVariant,
  FeatureCardAlignment,
  FeatureCardSize,
} from "./feature-card.types";
import { AttachMoney } from "@mui/icons-material";

const meta = {
  title: "UI/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The card title",
    },
    description: {
      control: "text",
      description: "The card description",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "elevated",
        "flat",
        "outlined",
        "gradient",
      ] as FeatureCardVariant[],
      description: "The visual style variant",
    },
    alignment: {
      control: "select",
      options: ["start", "center", "end"] as FeatureCardAlignment[],
      description: "Content alignment",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"] as FeatureCardSize[],
      description: "The size of the card",
    },
    animated: {
      control: "boolean",
      description: "Whether to animate on hover",
    },
    icon: {
      control: false,
      description: "Icon element to display",
    },
    href: {
      control: "text",
      description: "Link URL",
    },
    external: {
      control: "boolean",
      description: "Whether link opens in new tab",
    },
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const iconSvg = <AttachMoney sx={{ fontSize: 24 }} />;

export const Default: Story = {
  args: {
    icon: iconSvg,
    title: "Default Card",
    description: "This is a default feature card with a simple design.",
  },
};

export const Elevated: Story = {
  args: {
    icon: iconSvg,
    title: "Elevated Card",
    description: "This card has an elevated appearance with shadow.",
    variant: "elevated",
  },
};

export const Flat: Story = {
  args: {
    icon: iconSvg,
    title: "Flat Card",
    description: "This card has a flat design with minimal styling.",
    variant: "flat",
  },
};

export const Outlined: Story = {
  args: {
    icon: iconSvg,
    title: "Outlined Card",
    description: "This card has an outlined border.",
    variant: "outlined",
  },
};

export const Gradient: Story = {
  args: {
    icon: iconSvg,
    title: "Gradient Card",
    description: "This card features a gradient background.",
    variant: "gradient",
  },
};

export const CenterAligned: Story = {
  args: {
    icon: iconSvg,
    title: "Center Aligned",
    description: "Content is center aligned.",
    alignment: "center",
  },
};

export const EndAligned: Story = {
  args: {
    icon: iconSvg,
    title: "End Aligned",
    description: "Content is end aligned.",
    alignment: "end",
  },
};

export const Small: Story = {
  args: {
    icon: iconSvg,
    title: "Small Card",
    description: "This is a small sized card.",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    icon: iconSvg,
    title: "Medium Card",
    description: "This is a medium sized card.",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    icon: iconSvg,
    title: "Large Card",
    description: "This is a large sized card with more content space.",
    size: "lg",
  },
};

export const Animated: Story = {
  args: {
    icon: iconSvg,
    title: "Animated Card",
    description: "Hover over this card to see the animation.",
    animated: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    title: "No Icon Card",
    description: "This card does not have an icon.",
  },
};

export const AsLink: Story = {
  args: {
    icon: iconSvg,
    title: "Clickable Card",
    description: "This card is a link.",
    href: "#",
  },
};

export const ExternalLink: Story = {
  args: {
    icon: iconSvg,
    title: "External Link",
    description: "This card opens in a new tab.",
    href: "https://example.com",
    external: true,
  },
};
