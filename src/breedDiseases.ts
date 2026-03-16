export const BREED_DISEASES: Record<string, string[]> = {
  "大麥町 (Dalmatian)": ["尿酸代謝問題", "尿路結石"],
  "哈士奇 (Husky)": ["關節發育不良", "眼部疾病"],
  "黃金獵犬 (Golden Retriever)": ["關節發育不良", "心臟病", "皮膚過敏"],
  "拉不拉多 (Labrador)": ["關節發育不良", "肥胖傾向"],
  "貴賓犬 (Poodle)": ["膝蓋骨脫臼", "眼部疾病"],
  "柴犬 (Shiba Inu)": ["皮膚過敏", "青光眼"],
  "柯基 (Corgi)": ["椎間盤疾病", "肥胖傾向"],
  "法國鬥牛犬 (French Bulldog)": ["呼吸道症候群", "皮膚褶皺感染", "脊椎問題"],
  "波斯貓 (Persian)": ["多囊性腎病", "呼吸道問題"],
  "曼赤肯 (Munchkin)": ["脊椎問題", "關節炎"],
  "布偶貓 (Ragdoll)": ["肥厚性心肌病"],
};

export function getBreedDiseases(breed: string): string[] {
  return BREED_DISEASES[breed] || [];
}
