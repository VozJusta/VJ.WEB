export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label do textarea
   */
  label?: string;
  /**
   * Mensagem de erro
   */
  error?: string;
  /**
   * Texto de ajuda
   */
  helperText?: string;
  /**
   * Container adicional className
   */
  containerClassName?: string;
  /**
   * Mostra contador de caracteres
   */
  showCharCount?: boolean;
}
