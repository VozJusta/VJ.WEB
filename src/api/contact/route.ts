import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/app/contato/contact.schema";
import { EmailService } from "@/services/email.service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados inválidos",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = result.data;

    await EmailService.sendContactNotification({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso!",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[API Contact] Erro ao processar solicitação:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    return NextResponse.json(
      {
        success: false,
        message: "Erro interno ao processar sua solicitação. Tente novamente.",
        error:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 },
    );
  }
}
