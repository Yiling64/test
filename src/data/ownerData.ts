import { OwnerMedicationRule } from '../types';

export const OWNER_MEDICATIONS: Record<string, OwnerMedicationRule> = {
  "Enrofloxacin (Baytril)": {
    brandName: "Baytril (拜有利)",
    indications: "治療細菌感染（如皮膚、呼吸道、泌尿道感染）。",
    usage: "請遵照獸醫師指示的劑量與次數，通常每日一次或兩次。可與食物併服，但避免與乳製品同時服用。",
    precautions: "1. 幼犬幼貓禁用（可能影響骨骼發育）。2. 貓隻不可過量，否則有失明風險。3. 若出現嘔吐、腹瀉或食慾不振請聯繫獸醫。",
    storage: "室溫乾燥保存，避光。"
  },
  "Carprofen (Rimadyl)": {
    brandName: "Rimadyl (力美得)",
    indications: "緩解關節炎疼痛、發炎，或手術後止痛。",
    usage: "每日一次或兩次，建議隨餐服用以減少胃部不適。",
    precautions: "1. 嚴禁與類固醇或其他消炎藥同時使用。2. 若發現黑便、嘔吐或黃疸，請立即停藥並就醫。3. 確保寵物有充足飲水。",
    storage: "室溫保存，遠離孩童與寵物。"
  },
  "Maropitant (Cerenia)": {
    brandName: "Cerenia (止吐寧)",
    indications: "預防與治療嘔吐，預防暈車。",
    usage: "預防暈車應在出發前 2 小時服用，並搭配少量食物。急性止吐則遵醫囑。",
    precautions: "1. 16 週齡以下幼犬慎用。2. 服藥後可能會有流口水或嗜睡現象。3. 若嘔吐持續未改善請回診。",
    storage: "室溫保存。"
  },
  "Pimobendan (Vetmedin)": {
    brandName: "Vetmedin (維心)",
    indications: "治療心臟衰竭，增強心肌收縮力。",
    usage: "每日兩次，建議在飯前一小時空腹服用效果最佳。",
    precautions: "1. 需長期服用，不可擅自停藥。2. 觀察寵物呼吸頻率與活動力。3. 定期回診追蹤心臟狀況。",
    storage: "室溫保存。"
  }
};
