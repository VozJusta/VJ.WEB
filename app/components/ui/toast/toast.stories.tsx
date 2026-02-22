import type { Meta, StoryObj } from "@storybook/nextjs";
import { Toast } from "./index";
import { ToastVariant } from "./toast.types";

const meta = {
  title: "UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for the toast",
    },
    title: {
      control: "text",
      description: "Toast title",
    },
    description: {
      control: "text",
      description: "Optional description text",
    },
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info"] as ToastVariant[],
      description: "Visual style variant",
    },
    duration: {
      control: "number",
      description: "Duration in milliseconds (0 for no auto-dismiss)",
    },
    onClose: {
      action: "closed",
      description: "Callback when toast is closed",
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    id: "success-toast",
    title: "Sucesso!",
    description: "Sua operação foi concluída com sucesso.",
    variant: "success",
    duration: 0,
    onClose: () => {},
  },
};

export const Error: Story = {
  args: {
    id: "error-toast",
    title: "Erro",
    description: "Algo deu errado. Por favor, tente novamente.",
    variant: "error",
    duration: 0,
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    id: "warning-toast",
    title: "Atenção",
    description: "Esta ação pode ter consequências importantes.",
    variant: "warning",
    duration: 0,
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    id: "info-toast",
    title: "Informação",
    description: "Você tem uma nova atualização disponível.",
    variant: "info",
    duration: 0,
    onClose: () => {},
  },
};

export const WithoutDescription: Story = {
  args: {
    id: "no-desc-toast",
    title: "Notificação simples",
    variant: "success",
    duration: 0,
    onClose: () => {},
  },
};

export const LongDescription: Story = {
  args: {
    id: "long-desc-toast",
    title: "Atualização importante",
    description:
      "Detectamos uma atualização de segurança crítica para o seu sistema. Recomendamos que você instale as atualizações o mais rápido possível para manter seu sistema protegido.",
    variant: "warning",
    duration: 0,
    onClose: () => {},
  },
};

export const AutoDismiss: Story = {
  args: {
    id: "auto-dismiss-toast",
    title: "Mensagem temporária",
    description: "Esta mensagem desaparecerá automaticamente em 5 segundos.",
    variant: "info",
    duration: 5000,
    onClose: () => console.log("Toast dismissed"),
  },
};

export const MultipleToasts: Story = {
  args: {
    id: "toast-1",
    title: "Sucesso!",
    variant: "success",
    onClose: () => {},
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Toast
        id="toast-1"
        title="Sucesso!"
        description="Arquivo salvo com sucesso."
        variant="success"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="toast-2"
        title="Atenção"
        description="Alterações não salvas."
        variant="warning"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="toast-3"
        title="Erro"
        description="Falha ao conectar com o servidor."
        variant="error"
        duration={0}
        onClose={() => {}}
      />
      <Toast
        id="toast-4"
        title="Nova mensagem"
        description="Você recebeu uma nova mensagem."
        variant="info"
        duration={0}
        onClose={() => {}}
      />
    </div>
  ),
};
