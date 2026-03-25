import type { PersonalityType } from '@/src/types/simulator.types';

export interface PersonalityOptionProps {
  id: PersonalityType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  selected: boolean;
  onSelect: (id: PersonalityType) => void;
}
