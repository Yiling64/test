import { PharmacistMedication, OwnerMedicationRule } from '../types';

export const PHARMACIST_MEDICATIONS: Record<string, PharmacistMedication> = {
  "Enrofloxacin": {
    "category": "抗生素與抗真菌藥",
    "brandName": "Baytril",
    "professionalCategory": "Fluoroquinolone 抗生素",
    "indications": "用於治療敏感菌株引起的各種細菌感染。",
    "dosageForms": [
      "口服膜衣錠：22.7 mg, 68 mg, 136 mg",
      "口服牛肉風味咀嚼錠：22.7 mg, 68 mg, 136 mg",
      "注射液劑：22.7 mg/mL, 100 mg/mL (僅限大動物使用)"
    ],
    "speciesDosage": {
      "犬": "5-20 mg/kg 口服，每日一次或分兩次服用。",
      "貓": "5 mg/kg 口服，每日一次時服用。",
      "馬": "5-7.5 mg/kg 口服或 5 mg/kg 靜脈輸注，每日一次。"
    },
    "pkParameters": {
      "犬": { "T1/2": "4-5 小時", "Vd": "3-4 L/kg", "蛋白質結合率": "27%" },
      "貓": { "T1/2": "6 小時", "Vd": "12-20 L/kg", "蛋白質結合率": "40%" },
      "馬": { "T1/2": "5-10 小時", "Vd": "1.25 L/kg", "蛋白質結合率": "81.8%" }
    },
    "clinicalNotes": {
      "contraindications": "對 Fluoroquinolones 過敏者禁用。幼年動物因影響軟骨發育不建議使用：小型犬 <8 個月、大型犬 <12 個月、巨型犬 <18 個月、幼貓 <12 個月。貓隻不可超過推薦劑量以防失明風險。懷孕分類 C，不建議用於懷孕或哺乳期動物。牛肉風味錠風味源自豬肉，豬肉過敏或進行食物過敏試驗的犬隻應避免使用。",
      "interactions": "與制酸劑、Sucralfate，或含有鈣、鐵、鋅、鋁的食物與補給品（如乳製品）併用會產生螯合作用導致 Enrofloxacin 失活。與 Cyclosporine 併用時，Fluoroquinolones 可能會加劇腎毒性並降低 Cyclosporine 的代謝。與 Glyburide 併用可能導致嚴重的低血糖。會使 Theophylline 的血中濃度增加 30%-50%。亦會增加 Warfarin 的血中濃度。"
    },
    "storage": "錠劑室溫保存並避光。注射液室溫保存，冷藏可能導致結晶沉澱。配製的口服懸浮液需冷藏並在用前搖勻。"
  },
  "Marbofloxacin": {
    "category": "抗生素與抗真菌藥",
    "brandName": "Zeniquin",
    "professionalCategory": "Fluoroquinolone 抗生素",
    "indications": "用於對本藥敏感菌株引起的感染。",
    "dosageForms": ["口服膜衣錠：25 mg, 50 mg, 100 mg, 200 mg"],
    "speciesDosage": {
      "犬": "2.75-5.5 mg/kg 口服，每日一次。",
      "貓": "2.75-5.5 mg/kg 口服，每日一次。",
      "馬": "2 mg/kg 口服，每 24 小時一次 (仿單外使用)。",
      "球蟒": "10 mg/kg 口服，至少每 48 小時一次。"
    },
    "pkParameters": {
      "犬": { "T1/2": "9-12 小時", "Vd": "1.2-1.9 L/kg", "蛋白質結合率": "低" },
      "貓": { "T1/2": "13 小時", "Vd": "1.01 L/kg", "蛋白質結合率": "低" },
      "馬": { "T1/2": "7 小時", "Vd": "1.6 L/kg", "蛋白質結合率": "低" }
    },
    "clinicalNotes": {
      "contraindications": "過敏者禁用。禁止用於經濟動物。幼年動物不建議使用，因其對發育中的軟骨有影響。繁殖或泌乳動物的安全性尚未確定。",
      "interactions": "與制酸劑、Sucralfate，或含有鈣、鐵、鋅、鋁的食物與補給品（如乳製品）併用會產生螯合作用導致 Marbofloxacin 失活。與 Cyclosporine 併用時，Fluoroquinolones 可能會加劇腎毒性並降低 Cyclosporine 的代謝。與 Glyburide 併用可能導致嚴重的低血糖。使 Theophylline 的血中濃度增加 30%-50%。亦會增加 Warfarin 的血中濃度。"
    },
    "storage": "錠劑室溫保存並避光。配製的口服懸浮液需冷藏並在用前搖勻。"
  },
  "Pradofloxacin": {
    "category": "抗生素與抗真菌藥",
    "brandName": "Veraflox",
    "professionalCategory": "Fluoroquinolone 抗生素",
    "indications": "治療貓的細菌性感染。",
    "dosageForms": ["香草風味口服懸浮液：25 mg/mL"],
    "speciesDosage": {
      "貓": "7.5 mg/kg 口服，每 24 小時一次。",
      "犬": "3-4.5 mg/kg 口服，每 24 小時一次 (美國未核准)。"
    },
    "pkParameters": {
      "犬": { "T1/2": "~7 小時", "Vd": ">2 L/kg", "蛋白質結合率": "35%" },
      "貓": { "T1/2": "5-10 小時", "Vd": "4.5 L/kg", "蛋白質結合率": "30%" }
    },
    "clinicalNotes": {
      "contraindications": "過敏者禁用。懷孕分級 X，基於大鼠與兔子的生殖研究具母體與胎兒毒性。12 個月以下幼貓禁用（軟骨發育風險）。禁止用於經濟動物。在美國未核准用於犬隻，因可能引起骨髓抑制。",
      "interactions": "與制酸劑、Sucralfate，或含有鈣、鐵、鋅、鋁的食物與補給品（如乳製品）併用會產生螯合作用導致 Pradofloxacin 失活。與 Cyclosporine 併用時，Fluoroquinolones 可能會加劇腎毒性並降低 Cyclosporine 的代謝。與 Glyburide 併用可能導致嚴重的低血糖。使 Theophylline 的血中濃度增加 30%-50%。亦會增加 Warfarin 的血中濃度。"
    },
    "storage": "懸浮液室溫保存 (30°C 以下)。開封 60 天後需丟棄。"
  },
  "Carprofen": {
    "category": "消炎止痛藥 (如 NSAIDs)",
    "brandName": "Rimadyl",
    "professionalCategory": "NSAID 消炎止痛藥",
    "indications": "緩解骨關節炎疼痛與發炎，以及犬隻術後鎮痛。",
    "dosageForms": ["口服膠囊：25, 75, 100 mg", "牛肉風味咀嚼錠：25, 75, 100 mg", "注射液：50 mg/mL"],
    "speciesDosage": {
      "犬": "4.4 mg/kg 口服，每 24 小時一次，或 2.2 mg/kg 每 12 小時一次。",
      "貓": "4 mg 單次皮下或靜脈注射 (歐洲標示)。",
      "馬": "0.7 mg/kg 口服或靜脈注射，每日一次。"
    },
    "pkParameters": {
      "犬": { "T1/2": "8 小時", "Vd": "0.12-0.22 L/kg", "蛋白質結合率": "99%" },
      "貓": { "T1/2": "20 小時", "蛋白質結合率": "高" },
      "馬": { "T1/2": "22 小時", "Vd": "0.08-0.32 L/kg", "蛋白質結合率": "高" }
    },
    "clinicalNotes": {
      "contraindications": "具抗血小板作用，凝血障礙動物禁用。肝、腎功能不全犬隻慎用，曾有致命性肝細胞壞死的罕見報告。貓隻因具腎毒性風險應慎用。牛肉過敏犬隻禁用咀嚼錠。",
      "interactions": "與皮質類固醇（如 Prednisone, Dexamethasone）併用會顯著增加胃腸道毒性風險。許多獸醫藥理學家認為併用是絕對禁忌，藥物轉換需至少 1 週清洗期。會顯著增加 Digoxin 的血中濃度。與肝酵素誘導藥物（如 Phenobarbital, Rifampin）併用會增加 Carprofen 代謝物產生的肝毒性風險。會降低 Furosemide 的利尿效果。與高度蛋白結合藥物（如 Cefovecin, 口服抗凝血藥, Sulfonamides）併用可能產生競爭置換。與 Methotrexate 併用會顯著增加其血中濃度。"
    },
    "storage": "錠劑受控室溫 (30°C 以下) 保存。未開封注射液需冷藏 (2-8°C)。開封後可室溫保存最多 28 天。"
  },
  "Deracoxib": {
    "category": "消炎止痛藥 (如 NSAIDs)",
    "brandName": "Deramaxx",
    "professionalCategory": "NSAID 消炎止痛藥",
    "indications": "控制犬隻術後疼痛與骨關節炎發炎。",
    "dosageForms": ["牛肉風味咀嚼錠：12, 25, 50, 75, 100 mg"],
    "speciesDosage": {
      "犬": "術後疼痛 3-4 mg/kg 口服，每日一次 (最長 7 天)。骨關節炎 1-2 mg/kg。"
    },
    "pkParameters": {
      "犬": { "T1/2": "3 小時 (標示劑量) 至 19 小時 (高劑量)", "Vd": "1.5 L/kg", "蛋白質結合率": "90%" }
    },
    "clinicalNotes": {
      "contraindications": "凝血障礙、肝腎功能不全者禁用。不建議用於貓（可能形成毒性代謝物）。牛肉過敏犬隻禁用咀嚼錠。",
      "interactions": "與皮質類固醇（如 Prednisone, Dexamethasone）併用會顯著增加胃腸道毒性風險。藥物轉換需至少 1 週清洗期。會顯著增加 Digoxin 的血中濃度。會降低 Furosemide 的利尿效果。可能與其他高度蛋白結合藥物產生競爭置換。與 Methotrexate 併用會顯著增加其血中濃度。"
    },
    "storage": "儲存於 15-30°C 之間。"
  },
  "Firocoxib": {
    "category": "消炎止痛藥 (如 NSAIDs)",
    "brandName": "Previcox, Equioxx",
    "professionalCategory": "NSAID 消炎止痛藥",
    "indications": "犬骨關節炎與術後疼痛。馬匹骨關節炎。",
    "dosageForms": ["犬用咀嚼錠：57 mg, 227 mg", "馬用口服膏劑：8.2 mg/g", "馬用注射液：20 mg/mL"],
    "speciesDosage": {
      "犬": "5 mg/kg 口服，每日一次。",
      "馬": "0.1 mg/kg 口服，每日一次，最長 14 天。"
    },
    "pkParameters": {
      "犬": { "T1/2": "6-8 小時", "Vd": "3 L/kg", "蛋白質結合率": "96%" },
      "馬": { "T1/2": "30-40 小時", "Vd": "1.7-2.3 L/kg", "蛋白質結合率": "98%" }
    },
    "clinicalNotes": {
      "contraindications": "凝血障礙、胃腸糜爛、肝腎或心肌功能不全者禁用。脫水或服用利尿劑動物慎用。",
      "interactions": "與皮質類固醇併用會顯著增加胃腸道毒性風險。需 1 週清洗期。顯著增加 Digoxin 的血中濃度。與肝酵素誘導藥物（如 Phenobarbital, Rifampin）併用會增加 Firocoxib 代謝物產生的肝毒性風險。會降低 Furosemide 的利尿效果。與高度蛋白結合藥物（如 Cefovecin, 口服抗凝血藥, Sulfonamides）併用可能產生競爭置換。與 Methotrexate 併用會顯著增加其血中濃度。"
    },
    "storage": "錠劑與膏劑室溫保存。注射液受控室溫 (20-25°C) 保存。"
  },
  "Robenacoxib": {
    "category": "消炎止痛藥 (如 NSAIDs)",
    "brandName": "Onsior",
    "professionalCategory": "NSAID 消炎止痛藥",
    "indications": "緩解貓狗術後疼痛與發炎。",
    "dosageForms": ["酵母風味錠：6 mg", "注射液：20 mg/mL"],
    "speciesDosage": {
      "貓": "口服 1 mg/kg 每 24 小時一次。皮下 2 mg/kg 每日一次 (最長 3 天)。",
      "犬": "1 mg/kg 口服，每 24 小時一次。"
    },
    "pkParameters": {
      "犬": { "T1/2": "1.2-1.7 小時", "Vd": "0.24 L/kg", "蛋白質結合率": "99%" },
      "貓": { "T1/2": "1.7 小時", "Vd": "0.19 L/kg", "蛋白質結合率": "99%" }
    },
    "clinicalNotes": {
      "contraindications": "凝血障礙、胃腸糜爛、肝腎心功能不全禁用。脫水、服用利尿劑動物需嚴密監控。",
      "interactions": "與皮質類固醇併用會顯著增加胃腸道毒性風險。需 1 週清洗期。顯著增加 Digoxin 的血中濃度。與肝酵素誘導藥物併用增加肝毒性風險。降低 Furosemide 的利尿效果。與高度蛋白結合藥物併用可能競爭置換。顯著增加 Methotrexate 的血中濃度。與腎毒性藥物（如 Aminoglycosides, Amphotericin B）併用可能增加腎毒性。"
    },
    "storage": "錠劑室溫保存。注射液冷藏 (2-8°C)，開封後 28 天丟棄。"
  },
  "Mirtazapine": {
    "category": "抗組織胺與精神用藥",
    "brandName": "Mirataz",
    "professionalCategory": "食慾刺激劑 (經皮吸收)",
    "indications": "管理貓的體重減輕。",
    "dosageForms": ["經皮軟膏：20 mg/g"],
    "speciesDosage": { "貓": "塗抹 1.5 英吋條狀於耳內皮膚，每日一次，持續 14 天。" },
    "pkParameters": { "貓": { "T1/2": "11.2 小時", "Vd": "13.7 L/kg", "蛋白質結合率": "85%" } },
    "clinicalNotes": {
      "contraindications": "14 天內曾使用 MAOIs 者禁用。低血壓、肝腎疾病患者慎用。施藥者必須戴手套。",
      "interactions": "Cimetidine, Erythromycin, Fluvoxamine, Ketoconazole 可能增加 Mirtazapine 的血中濃度。Cyproheptadine 會拮抗其效應。與 Diazepam 或其他 Benzodiazepines 併用具協同鎮靜作用。與 MAO 抑制劑（如 Selegiline, Amitraz, Linezolid）併用會增加血清素症候群風險（禁忌）。與 Tramadol 併用增加血清素症候群風險。可能增加 Warfarin 的 INR 值。"
    },
    "storage": "儲存於 25°C 以下。開封 30 天後需丟棄。"
  },
  "Imepitoin": {
    "category": "抗組織胺與精神用藥",
    "brandName": "Pexion",
    "professionalCategory": "抗癲癇/抗焦慮藥",
    "indications": "治療犬隻對噪音的厭惡與恐懼。",
    "dosageForms": ["口服錠：100, 400 mg"],
    "speciesDosage": { "犬": "30 mg/kg 口服，每 12 小時一次，預期事件前 2 天開始。" },
    "pkParameters": { "犬": { "T1/2": "1.5-2 小時", "Vd": "0.6-1.6 L/kg", "蛋白質結合率": "60-70%" } },
    "clinicalNotes": {
      "contraindications": "嚴重肝腎功能不全禁用。不可突然停藥。體重小於 5 kg 犬隻慎用。",
      "interactions": "Flumazenil 可能逆轉 Imepitoin 的藥效。"
    },
    "storage": "儲存於 30°C 以下。"
  },
  "Capromorelin": {
    "category": "抗組織胺與精神用藥",
    "brandName": "Entyce, Elura",
    "professionalCategory": "Ghrelin 受體致效劑",
    "indications": "刺激食慾與管理體重。",
    "dosageForms": ["犬用 30 mg/mL 口服液", "貓用 20 mg/mL 口服液"],
    "speciesDosage": { "犬": "3 mg/kg 口服，每日一次。", "貓": "1-3 mg/kg 口服，每日一次。" },
    "pkParameters": { "犬": { "T1/2": "0.83 小時", "Vd": "2 L/kg", "蛋白質結合率": "51%" }, "貓": { "T1/2": "1.1 小時" } },
    "clinicalNotes": {
      "contraindications": "過敏者禁用。肝腎功能不全者慎用。",
      "interactions": "與 CYP3A4 抑制劑（如 Ketoconazole, Fluconazole, Itraconazole, Voriconazole, Cimetidine, Macrolides, Amiodarone, Diltiazem）併用可能會增加 Capromorelin 的血中濃度。與 CYP3A4 誘導劑（如 Phenobarbital, Rifampin）併用可能會降低其血中濃度。"
    },
    "storage": "儲存於 30°C 以下。"
  },
  "Estriol": {
    "category": "慢性病藥物",
    "brandName": "Incurin",
    "professionalCategory": "雌激素",
    "indications": "治療犬隻尿道括約肌功能不全引起的尿失禁。",
    "dosageForms": ["口服錠：1 mg"],
    "speciesDosage": { "犬": "起始 2 mg 每日一次，根據效果逐步減量至最低有效劑量。" },
    "pkParameters": { "犬": { "T1/2": "8-12 小時", "蛋白質結合率": "95%" } },
    "clinicalNotes": {
      "contraindications": "禁止用於貓。不可與其他雌激素併用。",
      "interactions": "與 CYP3A4 抑制劑（如唑類抗真菌藥, Cimetidine, Macrolides）併用會抑制 P-醣蛋白轉運蛋白，導致 Estriol 蓄積。與 CYP3A4 誘導劑（如 Phenobarbital, Rifampin）併用會增加其代謝。與皮質類固醇併用時，Estriol 可能抑制類固醇代謝或產生競爭置換，需調整劑量。可能與其他高度蛋白結合藥物競爭置換。會降低 Warfarin 的效力。"
    },
    "storage": "儲存於 25°C 以下。"
  },
  "Phenylpropanolamine": {
    "category": "慢性病藥物",
    "brandName": "Proin",
    "professionalCategory": "交感神經擬似劑",
    "indications": "治療犬隻尿道括約肌功能不全引起的尿失禁。",
    "dosageForms": ["肝臟風味咀嚼錠：25, 50, 75 mg"],
    "speciesDosage": { "犬": "2 mg/kg 口服，每 8-24 小時一次。" },
    "pkParameters": { "犬": { "T1/2": "3.5 小時" } },
    "clinicalNotes": {
      "contraindications": "青光眼、糖尿病、高血壓或心血管疾病動物慎用。泌尿道感染犬隻慎用。",
      "interactions": "可能增強 Aspirin 的抗血小板效應。與 MAO 抑制劑（如 Amitraz, Selegiline）併用會增強其升壓效果。與 NSAIDs 或三環抗憂鬱藥併用也可能增加其升壓效果。"
    },
    "storage": "受控室溫 (20-25°C) 保存。"
  },
  "Trilostane": {
    "category": "慢性病藥物",
    "brandName": "Vetoryl",
    "professionalCategory": "腎上腺皮質抑制劑",
    "indications": "治療犬隻庫欣氏症。",
    "dosageForms": ["口服膠囊：5, 10, 30, 60 mg"],
    "speciesDosage": { "犬": "2.2-6.7 mg/kg 口服，每日一次。" },
    "pkParameters": { "犬": { "T1/2": "8 小時" } },
    "clinicalNotes": {
      "contraindications": "懷孕分級 X，會導致流產。原發性肝病或腎功能不全禁用。",
      "interactions": "與 ACE 抑制劑、鉀鹽（如溴化鉀, 氯化鉀, 檸檬酸鉀, 葡萄糖酸鉀）或保鉀利尿劑併用會增加高血鉀風險。與 Ketoconazole 或 Mitotane 併用會進一步抑制皮質醇產生，可能導致腎上腺功能不全。"
    },
    "storage": "受控室溫 (25°C) 保存。"
  },
  "Pergolide Mesylate": {
    "category": "慢性病藥物",
    "brandName": "Prascend",
    "professionalCategory": "多巴胺受體致效劑",
    "indications": "治療馬匹腦下垂體中間部功能障礙 (PPID)。",
    "dosageForms": ["口服刻痕錠：1 mg"],
    "speciesDosage": { "馬": "2-4 mcg/kg 口服，每 24 小時一次。" },
    "pkParameters": { "馬": { "T1/2": "5.86 小時", "Vd": "3.08 L/kg", "蛋白質結合率": "90%" } },
    "clinicalNotes": {
      "contraindications": "對麥角衍生物過敏之馬匹禁用。",
      "interactions": "多巴胺拮抗劑（如 Domperidone, Metoclopramide, Phenothiazines）會拮抗 Pergolide 的藥效。可能與高度蛋白結合藥物（如 Carprofen, Doxycycline, Furosemide, Ketoconazole）產生競爭置換。"
    },
    "storage": "儲存於 25°C 以下。"
  },
  "Oclacitinib": {
    "category": "慢性病藥物",
    "brandName": "Apoquel",
    "professionalCategory": "JAK 抑制劑",
    "indications": "控制犬隻異位性皮膚炎引起的搔癢。",
    "dosageForms": ["口服膜衣錠：3.6, 5.4, 16 mg"],
    "speciesDosage": { "犬": "0.4-0.6 mg/kg 口服，前 14 天每日兩次，之後每日一次。" },
    "pkParameters": { "犬": { "T1/2": "4 小時", "Vd": "0.942 L/kg", "蛋白質結合率": "66.3-69.7%" } },
    "clinicalNotes": {
      "contraindications": "未滿 12 個月齡、嚴重感染或具腫瘤病史犬隻禁用。懷孕分級 X。",
      "interactions": "尚未正式評估與糖皮質激素、Cyclosporine 或其他全身性免疫抑制劑併用的安全性，併用可能增加免疫抑制風險。但在臨床研究中，與抗寄生蟲藥、抗生素或消炎藥併用未觀察到交互作用。"
    },
    "storage": "受控室溫 (20-25°C) 保存。"
  },
  "Maropitant": {
    "category": "腸胃用藥",
    "brandName": "Cerenia",
    "professionalCategory": "NK1 受體拮抗劑",
    "indications": "預防與治療嘔吐，預防暈車。",
    "dosageForms": ["口服刻痕錠：16, 24, 60, 160 mg", "注射液：10 mg/mL"],
    "speciesDosage": { "犬": "急性嘔吐 2 mg/kg 口服。預防暈車 8 mg/kg 口服。" },
    "pkParameters": { "犬": { "T1/2": "1-5.5 小時", "蛋白質結合率": "99.5%" }, "貓": { "T1/2": "9 小時" } },
    "clinicalNotes": {
      "contraindications": "16 週齡以下幼犬禁用。心血管疾病動物慎用。",
      "interactions": "肝微粒體酵素誘導藥物（如 Phenobarbital, Rifampin）可能會降低其血中濃度。酵素抑制藥物（如唑類抗真菌藥, Macrolides, Metronidazole, Omeprazole）可能會增加其血中濃度。可能與其他高度蛋白結合藥物（如 Carprofen, Cefovecin, Doxycycline, Furosemide, Ketoconazole）產生競爭置換。"
    },
    "storage": "錠劑室溫保存。注射液穿刺後需冷藏。需於 90 天內使用。"
  },
  "Cisapride": {
    "category": "腸胃用藥",
    "brandName": "Compounded",
    "professionalCategory": "胃腸促動力藥",
    "indications": "促進胃腸動力，治療便秘或胃排空遲緩。",
    "dosageForms": ["口服懸浮液：10 mg/mL", "注射液：3 mg/mL"],
    "speciesDosage": { "犬": "0.5-1 mg/kg 口服或靜脈注射，每 8 小時一次。" },
    "pkParameters": { "犬/貓/馬": { "T1/2": "8-10 小時", "蛋白質結合率": "97.5%" } },
    "clinicalNotes": {
      "contraindications": "胃腸道阻塞、穿孔或出血患者禁用。懷孕分級 C。",
      "interactions": "與 CYP3A4 誘導劑併用會降低其血中濃度。與 CYP3A4 抑制劑併用可能提高其血中濃度（雖然此現象在動物身上尚未被深入研究）。可能與其他高度蛋白結合藥物產生競爭置換。"
    },
    "storage": "冷藏保存。"
  },
  "Potassium Bromide": {
    "category": "抗癲癇與神經系統類藥物",
    "brandName": "KBroVet-CA1",
    "professionalCategory": "抗癲癇藥 (鹵化物)",
    "indications": "作為輔助藥物控制犬隻癲癇發作。",
    "dosageForms": ["口服咀嚼錠：250, 500 mg", "口服液：250 mg/mL"],
    "speciesDosage": { "犬": "負荷量 400-600 mg/kg 分天服用。維持量 30-35 mg/kg 每日一次。" },
    "pkParameters": { "犬": { "T1/2": "16-46 天", "Vd": "0.2-0.4 L/kg" }, "貓": { "T1/2": "10 天" } },
    "clinicalNotes": {
      "contraindications": "血中濃度 >2.5 mg/mL 可能產生溴中毒。溶液有沉澱結晶不可使用。負荷期間需監控高血鉀風險。",
      "interactions": "與 Benzodiazepines 或 Opioids 併用會增加鎮靜與呼吸抑制的風險。飲食中氯離子的波動會顯著影響藥效：氯攝取過多會降低溴的血中濃度，增加癲癇發作風險。攝取過少則增加溴的濃度與中毒風險。利尿劑會增加其排泄並降低血中濃度。會降低癲癇閾值的藥物（如甲基黃嘌呤類, 吩噻嗪類, Xylazine）可能導致突破性癲癇。與保鉀利尿劑併用可能產生高血鉀風險。"
    },
    "storage": "防潮容器室溫或冷藏保存。"
  },
  "Pimobendan": {
    "category": "慢性病藥物",
    "brandName": "Vetmedin",
    "professionalCategory": "正性肌力藥",
    "indications": "治療瓣膜疾病或擴張性心肌病引起的鬱血性心衰竭。",
    "dosageForms": ["牛肉風味刻痕錠：1.25, 2.5, 5, 10 mg"],
    "speciesDosage": { "犬": "0.25-0.3 mg/kg 口服，每 8-12 小時一次。" },
    "pkParameters": { "犬": { "T1/2": "0.5-2 小時", "Vd": "2.6 L/kg", "蛋白質結合率": ">90%" }, "貓": { "T1/2": "1.3 小時" } },
    "clinicalNotes": {
      "contraindications": "肥厚性心肌病、主動脈狹窄禁用。未滿 6 個月犬隻安全性未定。",
      "interactions": "可能與高度蛋白結合藥物產生競爭置換. 與其他磷酸二酯酶抑制劑（如 Pentoxifylline, Sildenafil, Theophylline）併用可能會產生效應增強或競爭。與氫離子幫浦抑制劑（如 Esomeprazole, Omeprazole, Pantoprazole）併用會提高胃部 pH 值，進而降低本藥的吸收與口服生物利用率。"
    },
    "storage": "室溫保存。"
  },
  "Clenbuterol": {
    "category": "慢性病藥物",
    "brandName": "Ventipulmin",
    "professionalCategory": "Beta-2 腎上腺素受體致效劑",
    "indications": "處理馬匹呼吸道阻塞疾病。",
    "dosageForms": ["口服液：72.5 mcg/mL"],
    "speciesDosage": { "馬": "氣道阻塞 0.8 mcg/kg 口服，每 12 小時一次。" },
    "pkParameters": { "馬": { "T1/2": "10-13 小時", "Vd": "1.6 L/kg", "蛋白質結合率": "97%" } },
    "clinicalNotes": {
      "contraindications": "禁止用於供食用動物。具心臟病之馬匹慎用。",
      "interactions": "Beta 阻斷劑（如 Atenolol, Metoprolol, Propranolol）會拮抗其藥效。與 Digoxin 併用會增加心律不整的風險。可能與高度蛋白結合藥物產生競爭置換。與其他支氣管擴張劑（如 Albuterol, Terbutaline）併用可能會增加其相關副作用。"
    },
    "storage": "儲存於 25°C 以下。"
  }
};

export const OWNER_MEDICATION_RULES: Record<string, OwnerMedicationRule> = {
  "Enrofloxacin": {
    category: "抗生素與抗真菌藥",
    color: "#f97316",
    indications: "細菌性感染",
    reminders: [
      "避免與含鈣、鐵、鎂、鋁的食物 or 藥物同時服用，建議間隔至少 2 小時。",
      "幼年動物（如 8-18 個月以下的犬隻）不建議使用，可能影響骨骼發育。",
      "貓咪使用不可超過建議劑量，否則有失明風險。"
    ]
  },
  "Marbofloxacin": {
    category: "抗生素與抗真菌藥",
    color: "#f97316",
    indications: "細菌性感染",
    reminders: [
      "避免與含鈣、鋁、鎂、鐵的產品（如制酸劑）同時服用。",
      "不建議用於發育中的幼年動物。"
    ]
  },
  "Pradofloxacin": {
    category: "抗生素與抗真菌藥",
    color: "#f97316",
    indications: "細菌性感染",
    reminders: [
      "不可用於 12 個月以下的幼貓。",
      "應避開含鈣、鐵、鎂、鋁的產品同時服用。",
      "懷孕 or 哺乳期動物禁用。"
    ]
  },
  "Carprofen": {
    category: "消炎止痛藥 (如 NSAIDs)",
    color: "#ea580c",
    indications: "止痛、關節炎、消炎",
    reminders: [
      "絕對不可與類固醇（如 Prednisone）同時服用，會增加嚴重的腸胃道風險。",
      "不可用於有凝血功能障礙的動物。",
      "可能會降低利尿劑的效果。"
    ]
  },
  "Deracoxib": {
    category: "消炎止痛藥 (如 NSAIDs)",
    color: "#ea580c",
    indications: "術後疼痛、關節炎",
    reminders: [
      "不可與類造醇同時使用。",
      "不建議用於貓，可能產生蓄積毒性。",
      "肝腎功能不全的動物應避免使用。"
    ]
  },
  "Firocoxib": {
    category: "消炎止痛藥 (如 NSAIDs)",
    color: "#ea580c",
    indications: "消炎止痛",
    reminders: [
      "不可與類固醇或其他消炎止痛藥同時服用。",
      "有腸胃潰瘍、肝腎 or 心血管問題的動物禁用。"
    ]
  },
  "Robenacoxib": {
    category: "消炎止痛藥 (如 NSAIDs)",
    color: "#ea580c",
    indications: "術後疼痛、關節炎",
    reminders: [
      "不可與類固醇同時使用。",
      "脫水、血壓低 or 服用利尿劑中的動物需加強監控。"
    ]
  },
  "Mirtazapine": {
    category: "抗組織胺與精神用藥",
    color: "#fb923c",
    indications: "體重管理/增進食慾",
    reminders: [
      "施藥時請戴手套，並輪換塗抹於貓咪左右耳內側。",
      "不可與 MAO 抑制劑藥物（如 Selegiline）同時服用。"
    ]
  },
  "Imepitoin": {
    category: "抗組織胺與精神用藥",
    color: "#fb923c",
    indications: "噪音恐懼、癲癇",
    reminders: [
      "用於噪音恐懼時，應於預期事件前 2 天開始服用。",
      "不可突然停藥，應諮詢獸醫後逐步減量。"
    ]
  },
  "Capromorelin": {
    category: "抗組織胺與精神用藥",
    color: "#fb923c",
    indications: "增進食慾",
    reminders: [
      "肝腎功能不全的動物需謹慎使用。",
      "可能與特定抗黴菌藥物產生交互作用。"
    ]
  },
  "Estriol": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "犬隻尿失禁",
    reminders: [
      "不可用於貓。",
      "不可與其他雌激素藥物同時服用。",
      "會降低抗凝血藥物（Warfarin）的效果。"
    ]
  },
  "Phenylpropanolamine": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "犬隻尿失禁",
    reminders: [
      "有青光眼、糖尿病、高血壓 or 心血管疾病的動物須慎用。",
      "不可用於對肝臟風味過敏的狗狗。"
    ]
  },
  "Trilostane": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "庫欣氏症",
    reminders: [
      "懷孕動物禁用，可能導致流產。",
      "若出現嘔吐、食慾不振等反應，應立即聯繫獸醫。",
      "與部分利尿劑合用可能增加血鉀過高風險。"
    ]
  },
  "Pergolide Mesylate": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "內分泌代謝異常",
    reminders: [
      "對麥角衍生物（Ergot）過敏的馬匹禁用。",
      "與高蛋白質結合藥物（如 Furosemide）與可能產生競爭作用。"
    ]
  },
  "Oclacitinib": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "過敏性皮炎",
    reminders: [
      "不可用於 12 個月以下 or 有嚴重感染、腫瘤的狗狗。",
      "懷孕、哺乳 or 預備配種的犬隻禁用。"
    ]
  },
  "Maropitant": {
    category: "腸胃用藥",
    color: "#f97316",
    indications: "急性嘔吐、預防暈車",
    reminders: [
      "預防暈車：服藥前 3 小時禁食，服藥後 2 小時方可旅行。",
      "16 週齡以下的專犬禁用。"
    ]
  },
  "Cisapride": {
    category: "腸胃用藥",
    color: "#f97316",
    indications: "便秘、巨結腸症",
    reminders: [
      "若有腸胃道阻塞、出血 or 穿孔的情況，絕對不可使用。"
    ]
  },
  "Potassium Bromide": {
    category: "抗癲癇與神經系統類藥物",
    color: "#fb923c",
    indications: "癲癇管理",
    reminders: [
      "應隨餐服用。",
      "飲食中的鹽分波動會影響藥效，請保持飲食穩定。",
      "避免與含鉀補品 or 利尿劑合用，以防高血鉀。"
    ]
  },
  "Pimobendan": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "充血性心衰竭",
    reminders: [
      "僅用於確診心衰竭的犬隻。",
      "部分胃藥可能會降低此藥的吸收效果。"
    ]
  },
  "Clenbuterol": {
    category: "慢性病藥物",
    color: "#fdba74",
    indications: "支氣管擴張(馬)",
    reminders: [
      "心臟病馬匹慎用，可能引起心跳過快。",
      "不可與特定的高血壓藥物（乙型阻斷劑）合用。"
    ]
  }
};
