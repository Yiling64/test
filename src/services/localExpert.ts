import { Pet, Recommendation } from '../types';
import { PRODUCTS } from '../constants';

export function getLocalRecommendations(pet: Pet): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Scenario A: Dalmatian Uric Acid Stones
  if (pet.breed === '大麥町 (Dalmatian)') {
    recommendations.push({
      type: 'warning',
      title: '大麥町尿酸結石基因缺陷警示',
      content: '大麥町犬具有代謝尿酸的基因缺陷，容易形成尿酸結石。建議避開高蛋白類、內臟類、魚類等高嘌呤產品。',
    });
  }

  // Large Young/Adult Dogs Joint Protection
  const largeBreeds = ['哈士奇 (Husky)', '大麥町 (Dalmatian)', '阿拉斯加 (Alaskan Malamute)', '黃金獵犬 (Golden Retriever)', '拉不拉多 (Labrador)'];
  if (pet.species === 'dog' && largeBreeds.includes(pet.breed)) {
    if (pet.ageYears !== null && pet.ageYears >= 2 && pet.ageYears <= 7) {
      const jointProducts = PRODUCTS.filter(p => p.category === 'joint').map(p => p.name);
      recommendations.push({
        type: 'suggestion',
        title: '健康建議：關節保健',
        content: `您的愛犬屬於大型青壯年犬，建議補充軟骨素、葡萄糖胺。推薦產品：\n${jointProducts.map((name, i) => `${i + 1}. ${name}`).join('\n')}`,
      });
    }
  }

  // Scenario B: Enrofloxacin Interaction
  const hasEnrofloxacin = pet.medications.some(m => m.name.toLowerCase().includes('enrofloxacin'));
  if (hasEnrofloxacin) {
    recommendations.push({
      type: 'warning',
      title: '藥物交互作用警示 (Enrofloxacin)',
      content: '不要將此藥物與含有特定礦物質（例如：鈣、鐵、鎂、鋁）的其他藥物或維他命同時給藥。含有鋁、鈣、鎂的口服產品可能會與 Enrofloxacin 結合，進而阻礙它在口服時的吸收。如果一定要服用這些含有礦物質的產品（包含某些胃藥、綜合維他命、或是含鐵的補血劑），兩者的給藥時間必須至少間隔 2 小時。',
    });
  }

  // Chronic Disease Warning
  const chronicDiseases = ['腎病', '糖尿病', '心臟病', '高血壓', '胰臟炎', '退化性關節炎', '甲狀腺機能亢進', '肝臟病'];
  const hasChronic = pet.healthIssues.some(h => h.diseases.some(d => chronicDiseases.includes(d)));
  if (hasChronic) {
    recommendations.push({
      type: 'warning',
      title: '慢性病用藥警示',
      content: '偵測到慢性病史。請注意：所有保健食品與藥物調整，請務必先諮詢您的主治獸醫師才能服用。',
    });
  }

  // Probiotics recommendation (Only if taking antibiotics)
  const isTakingAntibiotics = pet.medications.some(m => m.category === 'antibiotics');
  if (isTakingAntibiotics) {
    const giProduct = PRODUCTS.find(p => p.category === 'gi')?.name;
    recommendations.push({
      type: 'suggestion',
      title: '健康建議：腸道保護',
      content: `偵測到正在服用抗生素，抗生素可能會破壞腸道菌叢平衡。建議補充益生菌以維持腸胃健康。推薦產品：${giProduct}`,
    });
  }

  // Otitis Externa recommendation
  const hasOtitis = pet.healthIssues.some(h => h.part === 'ears' && h.diseases.includes('外耳炎'));
  if (hasOtitis) {
    const earProducts = PRODUCTS.filter(p => p.name === '滅菌棉球' || p.name === 'ZYMOX 三酵合一潔耳液(寵物用)').map(p => p.name);
    recommendations.push({
      type: 'suggestion',
      title: '健康建議：耳道護理',
      content: `偵測到外耳炎狀況，建議定期清潔耳道並保持乾燥。推薦產品：\n${earProducts.join('\n')}`,
    });
  }

  return recommendations;
}
