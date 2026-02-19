export interface TeamMemberProps {
  /**
   * Nome completo do membro
   */
  name: string;
  /**
   * Cargo ou função
   */
  role: string;
  /**
   * Descrição ou bio curta
   */
  description: string;
  /**
   * URL da imagem do perfil
   */
  image?: string;
  /**
   * Iniciais para fallback quando não há imagem
   */
  initials?: string;
  /**
   * Classes CSS customizadas
   */
  className?: string;
  /**
   * Estilos inline customizados
   */
  style?: React.CSSProperties;
}
