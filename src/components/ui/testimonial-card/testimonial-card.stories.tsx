import type { Meta, StoryObj } from "@storybook/nextjs";
import { TestimonialCard } from "./index";

const meta = {
  title: "UI/TestimonialCard",
  component: TestimonialCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    quote: {
      control: "text",
      description: "The testimonial quote",
    },
    authorName: {
      control: "text",
      description: "Name of the person giving testimonial",
    },
    authorRole: {
      control: "text",
      description: "Role or title of the author",
    },
    authorInitials: {
      control: "text",
      description: "Custom initials (auto-generated if not provided)",
    },
    authorAvatar: {
      control: "text",
      description: "Avatar image URL",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInitials: Story = {
  args: {
    quote:
      "O VozJusta me deu segurança jurídica e clareza nos contratos. Antes eu assinava sem entender nada.",
    authorName: "João P.",
    authorRole: "MICROEMPREENDEDOR (MEI)",
  },
};

export const WithAvatar: Story = {
  args: {
    quote:
      "Como advogado, recomendo o VozJusta para meus clientes MEI. É uma ferramenta essencial para proteção jurídica.",
    authorName: "Dr. Carlos Silva",
    authorRole: "ADVOGADO ESPECIALISTA",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
};

export const WithCustomInitials: Story = {
  args: {
    quote:
      "Finalmente consigo entender meus contratos sem precisar pagar caro por consultas jurídicas.",
    authorName: "Maria Santos",
    authorRole: "PRESTADORA DE SERVIÇOS",
    authorInitials: "MS",
  },
};

export const ShortQuote: Story = {
  args: {
    quote: "Simplesmente incrível!",
    authorName: "Ana Costa",
    authorRole: "EMPREENDEDORA",
  },
};

export const LongQuote: Story = {
  args: {
    quote:
      "O VozJusta transformou completamente a forma como lido com documentos jurídicos no meu negócio. Antes, eu tinha medo de assinar qualquer contrato sem entender os termos técnicos. Agora, com a tradução clara e objetiva, eu consigo tomar decisões informadas e me proteger juridicamente. Recomendo para todos os empreendedores!",
    authorName: "Pedro Oliveira",
    authorRole: "CEO DE STARTUP",
  },
};

export const MultipleTestimonials: Story = {
  args: {
    quote: "O VozJusta me deu segurança jurídica e clareza nos contratos.",
    authorName: "João P.",
    authorRole: "MICROEMPREENDEDOR (MEI)",
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
      <TestimonialCard
        quote="O VozJusta me deu segurança jurídica e clareza nos contratos."
        authorName="João P."
        authorRole="MICROEMPREENDEDOR (MEI)"
      />
      <TestimonialCard
        quote="Como advogado, recomendo o VozJusta para meus clientes MEI."
        authorName="Dr. Carlos Silva"
        authorRole="ADVOGADO ESPECIALISTA"
        authorAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
      />
      <TestimonialCard
        quote="Finalmente consigo entender meus contratos sem precisar pagar caro."
        authorName="Maria Santos"
        authorRole="PRESTADORA DE SERVIÇOS"
      />
      <TestimonialCard
        quote="Uma ferramenta essencial para qualquer empreendedor."
        authorName="Ana Costa"
        authorRole="EMPREENDEDORA"
        authorAvatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
      />
    </div>
  ),
};
