export interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    rating: {
      score: number;
      totalReviews: number;
    };
    yearsOfExperience: number;
    specialization: string;
    description: string;
    tags: string[];
  };
  onViewDetails?: (lawyerId: string) => void;
}
