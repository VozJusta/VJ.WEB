import { ReactNode } from "react";

/**
 * Props do TestimonialCard Component
 * Card de depoimento/feedback de cliente
 */
export interface TestimonialCardProps {
  /**
   * Texto do depoimento (quote)
   * @example "O VozJusta traduziu o juridiquês..."
   */
  quote: string;

  /**
   * Nome do autor do depoimento
   * @example "João P."
   */
  authorName: string;

  /**
   * Cargo/função do autor
   * @example "MICROEMPREENDEDOR (MEI)"
   */
  authorRole: string;

  /**
   * Iniciais para o avatar
   * @example "JP"
   * @optional - Se não fornecido, extrai das primeiras letras do nome
   */
  authorInitials?: string;

  /**
   * URL da imagem do avatar
   * @optional - Se não fornecido, usa iniciais
   */
  authorAvatar?: string;

  /**
   * Classes CSS adicionais
   * @optional
   */
  className?: string;
}
