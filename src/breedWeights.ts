export interface StandardWeight {
  min: number;
  max: number;
}

export const BREED_WEIGHTS: Record<string, { male: StandardWeight; female: StandardWeight }> = {
  "大麥町 (Dalmatian)": {
    male: { min: 20, max: 32 },
    female: { min: 18, max: 24 }
  },
  "哈士奇 (Husky)": {
    male: { min: 20, max: 27 },
    female: { min: 16, max: 23 }
  },
  "黃金獵犬 (Golden Retriever)": {
    male: { min: 30, max: 34 },
    female: { min: 25, max: 32 }
  },
  "拉不拉多 (Labrador)": {
    male: { min: 29, max: 36 },
    female: { min: 25, max: 32 }
  },
  "貴賓犬 (Poodle)": {
    male: { min: 20, max: 32 },
    female: { min: 20, max: 27 }
  },
  "柴犬 (Shiba Inu)": {
    male: { min: 9, max: 11 },
    female: { min: 7, max: 9 }
  },
  "柯基 (Corgi)": {
    male: { min: 10, max: 14 },
    female: { min: 10, max: 13 }
  },
  "法國鬥牛犬 (French Bulldog)": {
    male: { min: 9, max: 13 },
    female: { min: 8, max: 12 }
  },
  "波斯貓 (Persian)": {
    male: { min: 4, max: 6 },
    female: { min: 3, max: 5 }
  },
  "布偶貓 (Ragdoll)": {
    male: { min: 6, max: 9 },
    female: { min: 4, max: 7 }
  }
};

export function getStandardWeight(breed: string, gender: 'male' | 'female'): StandardWeight | null {
  return BREED_WEIGHTS[breed]?.[gender] || null;
}
