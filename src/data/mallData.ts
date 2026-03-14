import { MallProduct } from '../types';

export const MALL_PRODUCTS: MallProduct[] = [
  {
    id: "p1",
    name: "全能貓 (Broadline) 貓用外用滴劑",
    category: "寄生蟲預防",
    price: 850,
    description: "全面預防跳蚤、壁蝨、心絲蟲及多種體內寄生蟲。",
    image: "https://picsum.photos/seed/broadline/300/300",
    stock: 50
  },
  {
    id: "p2",
    name: "一錠除 (Bravecto) 犬用咀嚼錠",
    category: "寄生蟲預防",
    price: 1200,
    description: "長效 3 個月預防跳蚤與壁蝨，適口性佳。",
    image: "https://picsum.photos/seed/bravecto/300/300",
    stock: 30
  },
  {
    id: "p3",
    name: "處方飼料 - 腎臟配方 (k/d)",
    category: "處方糧食",
    price: 1800,
    description: "專為腎臟病犬貓設計，低磷低蛋白配方。",
    image: "https://picsum.photos/seed/kd-food/300/300",
    stock: 20
  },
  {
    id: "p4",
    name: "寵物專用益生菌",
    category: "營養保健",
    price: 600,
    description: "維持腸道健康，改善便秘與腹瀉。",
    image: "https://picsum.photos/seed/probiotics/300/300",
    stock: 100
  },
  {
    id: "p5",
    name: "關節保健膠囊 (Dasuquin)",
    category: "營養保健",
    price: 1500,
    description: "含有葡萄糖胺與軟骨素，保護老年犬貓關節。",
    image: "https://picsum.photos/seed/joint/300/300",
    stock: 15
  }
];
