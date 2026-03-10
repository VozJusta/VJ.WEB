export type LawyerSpecialization = 
  | "Direito do Consumidor"
  | "Direito Trabalhista"
  | "Direito Civil"
  | "Direito de Família"
  | "Direito Imobiliário"
  | "Direito Criminal";

export type LawyerRating = {
  score: number;
  totalReviews: number;
};

export type Lawyer = {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  rating: LawyerRating;
  yearsOfExperience: number;
  specialization: LawyerSpecialization;
  description: string;
  tags: string[];
};

export type LawyerSortOption = "availability" | "rating" | "proximity";
