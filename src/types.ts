export type Species = 'dog' | 'cat';
export type Gender = 'male' | 'female';
export type Neutered = 'yes' | 'no';
export type LifeStage = 'puppy_kitten' | 'young_adult' | 'adult' | 'senior';
export type WeightStatus = 'underweight' | 'ideal' | 'overweight';

export interface HealthIssue {
  part: string;
  diseases: string[];
  description: string;
}

export interface Medication {
  category: string;
  name: string;
}

export interface Pet {
  id: string;
  displayId: string;
  name: string;
  species: Species;
  breed: string;
  gender: Gender;
  neutered: Neutered;
  ageYears: number | null;
  ageMonths: number | null;
  weight: number | null;
  recentWeightChange: boolean;
  allergens: string[];
  healthIssues: HealthIssue[];
  medications: Medication[];
  photoUrl?: string;
}

export interface Recommendation {
  type: 'warning' | 'suggestion';
  title: string;
  content: string;
}

export interface PharmacistMedication {
  brandName: string;
  professionalCategory: string;
  category: string;
  indications: string;
  dosageForms: string[];
  speciesDosage: {
    [species: string]: string;
  };
  pkParameters: {
    [species: string]: {
      [param: string]: string;
    };
  };
  clinicalNotes: {
    contraindications: string;
    interactions: string;
  };
  storage: string;
}

export interface OwnerMedicationRule {
  category: string;
  color: string;
  indications: string;
  reminders: string[];
}
