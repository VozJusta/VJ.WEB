import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY não está definida no ambiente");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class EmailService {
  static async sendContactNotification(params: SendContactEmailParams) {
    const { name, email, subject, message } = params;

    if (!process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      throw new Error(
        "Variáveis RESEND_FROM_EMAIL e RESEND_TO_EMAIL devem estar definidas",
      );
    }

    const emailHtml = this.getContactEmailTemplate({
      name,
      email,
      subject,
      message,
    });

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Nova Notificação de Contato: ${subject}`,
      html: emailHtml,
    });

    if (error) {
      throw new Error(`Erro ao enviar email: ${error.message}`);
    }

    return data;
  }

  private static getContactEmailTemplate(params: SendContactEmailParams) {
    const { name, email, subject, message } = params;

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <title>Nova Notificação de Contato</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A0E14;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0A0E14;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        

        <!-- Card Principal -->
        <table role="presentation" style="width: 100%; max-width: 480px; border: 1px solid #123359; border-collapse: separate; border-spacing: 0; background-color: #0F151D; border-radius: 8px; box-shadow: 0 0 10px 0 rgba(25, 120, 229, 0.2); -webkit-box-shadow: 0 0 10px 0 rgba(25, 120, 229, 0.2); mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          
          <!-- Conteúdo -->
          <tr>
            <td style="padding: 48px;">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #FFFFFF; line-height: 1.3;">
                Nova Notificação de Contato
              </h1>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td style="height: 1px; background-color: #112845; padding: 0;"></td>
                </tr>
              </table>

              <!-- NOME -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #1765BD;">
                      NOME
                    </p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; line-height: 1.5;">
                      ${name}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- E-MAIL -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #1765BD;">
                      E-MAIL
                    </p>
                    <p style="margin: 0; font-size: 18px; color: #ffffff; line-height: 1.5; font-weight: 400;">
                      ${email}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- ASSUNTO -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #1765BD;">
                      ASSUNTO
                    </p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; line-height: 1.5;">
                      ${subject}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- MENSAGEM COMPLETA -->
              <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 0; background-color: #101927; border-radius: 8px; border: 1px solid #112339;">
                <tr>
                  <td style="padding: 24px; border-radius: 8px;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #1765BD;">
                      MENSAGEM COMPLETA
                    </p>
                    <p style="margin: 0; font-size: 18px; font-weight: 400; color: #9ca3af; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word; font-style: italic;">
${message}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();
  }
}
