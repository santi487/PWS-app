export type Category = 
  | 'Sociaal' | 'Optimistisch' 
  | 'Assertief' | 'Energiek' 
  | 'Bedachtzaam' | 'Gestructureerd' 
  | 'Expressief' 
  | 'Actief' | 'Doorzetter' 
  | 'Rustig' | 'Reflectief' 
  | 'Analytisch' | 'Gefocust' 
  | 'Enthousiast' 
  | 'Zorgzaam' | 'Creatief' 
  | 'Rustzoeker' 
  | 'Nieuwsgierig' | 'Cultureel' 
  | 'Natuurminner' 
  | 'Spontaan' | 'Vrijheidslievend'
  | 'Introvert'; // Added for Messi logic accommodation

export interface AnswerChoice {
  id: string;
  label: string;
  categories: Category[];
}

export interface Question {
  id: number;
  text: string;
  choices: AnswerChoice[];
}

export interface FootballerProfile {
  name: string;
  traits: [Category, Category]; // Primary pair defined in PDF
  rationale: string;
  description: string; // The "Rationale" column from PDF essentially acts as description
  imageUrl?: string;
}

export interface UserFeedback {
  rating: number; // 1-5
  comment: string;
}
