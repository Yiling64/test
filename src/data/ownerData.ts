import { OwnerMedicationRule } from '../types';

export const OWNER_MEDICATION_RULES: Record<string, OwnerMedicationRule> = {
  "Enrofloxacin (Baytril)": {
    category: "antibiotics",
    color: "blue",
    brandName: "Baytril (拜有利)",
    indications: "治療細菌感染（如皮膚、呼吸道、泌尿道感染）。",
    usage: "請遵照獸醫師指示的劑量與次數，通常每日一次或兩次。可與食物併服，但避免與乳製品同時服用。",
    precautions: "1. 幼犬幼貓禁用（可能影響骨骼發育）。2. 貓隻不可過量，否則有失明風險。3. 若出現嘔吐、腹瀉或食慾不振請聯繫獸醫。",
    storage: "室溫乾燥保存，避光。",
    reminders: ["幼犬幼貓禁用", "貓隻不可過量", "避免與乳製品同時服用"]
  },
  "Prednisolone": {
    category: "steroids",
    color: "purple",
    brandName: "Prednisolone (類固醇)",
    indications: "抗發炎、免疫抑制、過敏反應。",
    usage: "嚴格遵守醫囑，不可自行停藥（需逐漸減量）。建議與食物併服以減少胃部不適。",
    precautions: "1. 長期使用可能導致多渴、多尿、食慾增加。2. 可能增加感染風險。3. 糖尿病患犬貓需慎用。",
    storage: "室溫保存。",
    reminders: ["不可自行停藥", "建議與食物併服", "長期使用注意多渴多尿"]
  },
  "Furosemide (Lasix)": {
    category: "diuretics",
    color: "cyan",
    brandName: "Lasix (利尿劑)",
    indications: "心臟病引起的水腫、肺積水。",
    usage: "通常每日一至兩次。確保毛孩有充足的飲水來源。",
    precautions: "1. 可能導致脫水或電解質不平衡。2. 若出現極度虛弱、昏倒請立即就醫。",
    storage: "室溫保存。",
    reminders: ["確保充足飲水", "注意脫水徵兆"]
  },
  "Clavulox (Synulox)": {
    category: "antibiotics",
    color: "blue",
    brandName: "Clavulox (速諾)",
    indications: "廣效性抗生素，常用於皮膚、口腔、泌尿道感染。",
    usage: "每日兩次，建議餐後服用。務必完成整個療程，不可擅自停藥。",
    precautions: "1. 少數個體可能出現嘔吐或腹瀉。2. 對青黴素類過敏者禁用。",
    storage: "室溫保存，鋁箔包裝拆封後請儘速使用。",
    reminders: ["務必完成療程", "建議餐後服用", "青黴素過敏禁用"]
  }
};
