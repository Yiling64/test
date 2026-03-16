export const BREED_DISEASES: Record<string, string[]> = {
  "大麥町 (Dalmatian)": ["鼓勵多喝水，並注意泌尿系統保健。"],
  "哈士奇 (Husky)": ["需注意關節活動度，並定期檢查眼部健康。"],
  "黃金獵犬 (Golden Retriever)": ["建議維持理想體重以減輕關節負擔，並注意皮膚乾燥問題。"],
  "拉不拉多 (Labrador)": ["需嚴格控制食量，避免過度負擔。"],
  "波斯貓 (Persian)": ["建議定期追蹤腎臟健康，並維持呼吸道順暢。"],
  "布偶貓 (Ragdoll)": ["建議定期進行心血管系統檢查。"],
};

export function getBreedDiseases(breed: string): string[] {
  return BREED_DISEASES[breed] || [];
}
