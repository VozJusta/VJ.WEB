export type PersonalityType = 
  | 'calm' 
  | 'aggressive' 
  | 'impartial' 
  | 'empathetic' 
  | 'pragmatic' 
  | 'researcher';

export interface Personality {
  id: PersonalityType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface SimulatorConfig {
  judgeName: string;
  personality: PersonalityType;
}
