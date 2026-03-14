export const DOG_BREEDS = [
  '米克斯 (Mixed Breed)',
  '哈士奇 (Husky)',
  '大麥町 (Dalmatian)',
  '阿拉斯加 (Alaskan Malamute)',
  '柴犬 (Shiba Inu)',
  '黃金獵犬 (Golden Retriever)',
  '拉不拉多 (Labrador)',
  '貴賓犬 (Poodle)',
  '法斗 (French Bulldog)',
  '柯基 (Corgi)',
];

export const CAT_BREEDS = [
  '米克斯 (Mixed Breed)',
  '布偶貓 (Ragdoll)',
  '緬因貓 (Maine Coon)',
  '孟加拉貓 (Bengal)',
  '英國短毛貓 (British Shorthair)',
  '美國短毛貓 (American Shorthair)',
  '波斯貓 (Persian)',
  '暹羅貓 (Siamese)',
  '蘇格蘭折耳貓 (Scottish Fold)',
];

export const ALLERGENS = [
  '無',
  '牛肉',
  '羊肉',
  '豬肉',
  '雞肉',
  '玉米',
  '乳製品',
  '大豆',
  '蛋',
  '小麥',
  '魚肉',
];

export const MEDICATION_CATEGORIES = [
  {
    id: 'itch',
    label: '止癢與免疫調節類藥物',
    examples: 'Apoquel, Cytopoint',
  },
  {
    id: 'nsaids',
    label: '消炎止痛藥 (如 NSAIDs)',
    examples: 'Rimadyl, Metacam',
  },
  {
    id: 'neuro',
    label: '抗癲癇與神經系統類藥物',
    examples: 'Phenobarbital, Keppra',
  },
  {
    id: 'antihistamine',
    label: '抗組織胺與精神用藥',
    examples: 'Benadryl, Prozac',
  },
  {
    id: 'antibiotics',
    label: '抗生素與抗真菌藥',
    examples: 'Amoxicillin, Clavamox',
  },
  {
    id: 'gi',
    label: '腸胃用藥',
    examples: 'Famotidine, Cerenia',
  },
  {
    id: 'chronic',
    label: '慢性病藥物',
    examples: 'Insulin, Methimazole',
  },
];

export const BODY_PARTS = [
  { id: 'eyes', label: '眼部', diseases: ['結膜炎', '白內障', '青光眼'] },
  { id: 'ears', label: '耳部', diseases: ['外耳炎', '耳疥蟲'] },
  { id: 'mouth', label: '口腔', diseases: ['口臭', '牙結石'] },
  { id: 'joints', label: '關節', diseases: ['退化性關節炎', '跛行'] },
  { id: 'chest', label: '慢性病', diseases: [ '腎病', '糖尿病', '胰臟炎', '心臟病', '咳嗽'] },
  { id: 'abdomen', label: '腸胃道', diseases: ['脹氣', '嘔吐', '腹瀉'] },
  { id: 'skin', label: '皮膚與毛髮', diseases: ['皮膚乾燥', '感染', '搔癢', '脫毛', '毛色黯淡'] },
  { id: 'parasites_ext', label: '體表寄生蟲', diseases: ['壁蝨', '跳蚤'] },
  { id: 'parasites_int', label: '體內寄生蟲', diseases: ['絛蟲', '心絲蟲'] },
];

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: '全部' },
  { id: 'deworm', label: '驅蟲藥' },
  { id: 'joint', label: '骨關節保養' },
  { id: 'teeth', label: '牙齒保養' },
  { id: 'skin', label: '皮膚保養' },
  { id: 'gi', label: '腸胃保養' },
  { id: 'nursing', label: '護理用品' },
];

export const PRODUCTS = [
  {
    id: 'p1',
    category: 'joint',
    name: '三得利 毛孩 固力伸 (Glucosamine Plus)',
    description: '含有葡萄糖胺、軟骨素、槲皮素，專為高齡或關節負擔重的毛孩設計。',
    image: 'https://wellness.suntory.com.tw/img/goods/862_1.jpg', // Placeholder for the user provided image
    isRecommended: false,
  },
  {
    id: 'p2',
    category: 'joint',
    name: '餵個肉肉乾 (關節保健) 藍莓羅勒牛腱肉',
    description: '使用龜鹿雙寶、藍莓、羅勒等漢方食材，美味與關節保養兼具。',
    image: 'https://gcp-www.super-landing.com/uploads/ckeditor/pictures/Page-18963/595259/content_Pa915.jpg', // Placeholder for the user provided image
    isRecommended: false,
  },
  {
    id: 'p7',
    category: 'joint',
    name: '德國 100%天然綠唇貽貝精華粉',
    description: '100% 天然綠唇貽貝精華，富含葡萄糖胺與軟骨素，強效保護關節健康。',
    image: 'https://tierlieb.com.tw/wp-content/uploads/2023/04/977-ab884.jpg',
    isRecommended: false,
  },
  {
    id: 'p3',
    category: 'gi',
    name: '腸胃專科益生菌',
    description: '維持腸道菌叢平衡，幫助消化，改善軟便與脹氣。',
    image: 'https://shop.petpark.com.tw/media/catalog/product/p/r/production_099849.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=560&width=560&canvas=560:560',
    isRecommended: false,
  },
  {
    id: 'p4',
    category: 'deworm',
    name: '蚤不到®全效',
    description: '能完整控制跳蚤的所有階段 並影響壁蝨吸血與繁殖能力。',
    image: 'https://frontlineplus.com.tw/sites/default/files/2023-09/FLP%20for%20Dog_Group_480x480xv2.jpg',
    isRecommended: false,
  },
  {
    id: 'p5',
    category: 'teeth',
    name: 'C.E.T.®雙酵素牙膏-雞肉口味',
    description: '雙酵素配方，有效減少牙菌斑與牙結石，免刷牙也可使用。',
    image: 'https://img.91app.com/webapi/imagesV3/Original/SalePage/6426698/0/639004391919530000?v=1',
    isRecommended: false,
  },
  {
    id: 'p6',
    category: 'skin',
    name: 'Omega 3, 6 & 9鱈魚肝油(500ml)－狗狗專用',
    description: '富含 Omega-3，改善皮膚乾燥、搔癢與毛色黯淡。',
    image: 'https://shoplineimg.com/57516e91e37ec63251000004/63804b1ef1db92001fb230b7/800x.webp?source_format=png',
    isRecommended: false,
  },
  {
    id: 'p8',
    category: 'nursing',
    name: '滅菌棉球',
    description: '醫療級滅菌棉球，適用於傷口清潔、耳道護理等。',
    image: 'https://picture.smartweb.tw/4046/prod/title_199980.jpg?1555',
    isRecommended: false,
  },
  {
    id: 'p9',
    category: 'nursing',
    name: 'ZYMOX 三酵合一潔耳液(寵物用)',
    description: '專利三酵合一配方，溫和清潔耳道，維持耳道健康環境。',
    image: 'https://www.biotene.club/wp-content/uploads/2021/08/ZYMOX-01a.jpg',
    isRecommended: false,
  },
];

export const CHRONIC_DISEASES = [
  '腎病', '糖尿病', '心臟病', '高血壓', '胰臟炎', '退化性關節炎', '甲狀腺機能亢進', '肝臟病'
];
