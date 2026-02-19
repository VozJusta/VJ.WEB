export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label do input
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
   * Ícone à esquerda
   */
  leftIcon?: React.ReactNode;
  /**
   * Ícone à direita
   */
  rightIcon?: React.ReactNode;
  /**
   * Container adicional className
   */
  containerClassName?: string;
}
