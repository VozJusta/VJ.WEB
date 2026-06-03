import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { OtpInput } from "./index";
import type { OtpInputProps } from "./otp-input.types";

// OtpInput é controlado (value + onChange). O wrapper encapsula o estado para
// que as stories só precisem configurar as props visuais.
type ControlledProps = Omit<OtpInputProps, "value" | "onChange">;

function ControlledOtp(props: ControlledProps) {
  const [value, setValue] = useState("");
  return <OtpInput {...props} value={value} onChange={setValue} />;
}

const meta = {
  title: "UI/OtpInput",
  component: ControlledOtp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: "number",
      description: "Quantidade de dígitos",
    },
    error: {
      control: "text",
      description: "Mensagem de erro exibida abaixo dos campos",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita todos os campos",
    },
    autoFocus: {
      control: "boolean",
      description: "Foca o primeiro campo ao montar",
    },
  },
} satisfies Meta<typeof ControlledOtp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { length: 6, autoFocus: false },
};

export const WithError: Story = {
  args: { length: 6, autoFocus: false, error: "Código inválido" },
};

export const Disabled: Story = {
  args: { length: 6, autoFocus: false, disabled: true },
};

export const FourDigits: Story = {
  args: { length: 4, autoFocus: false },
};
