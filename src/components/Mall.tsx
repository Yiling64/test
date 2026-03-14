import React, { useState, useEffect, useMemo } from 'react';
import { Pet, Recommendation } from '../types';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../constants';
import { ShoppingCart, Star, UserCircle, ChevronDown } from 'lucide-react';

interface MallProps {
  pets: Pet[];
  activePetId: string | null;
  onSwitchPet: (id: string) => void;
}

const Mall: React.FC<MallProps> = ({ pets, activePetId, onSwitchPet }) => {
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const [isPetSelectorOpen, setIsPetSelectorOpen] = useState(false);

  const activePet = pets.find(p => p.id === activePetId);

  // Dynamic recommendation logic
  const recommendedProductIds = useMemo(() => {
    if (!activePet) return new Set<string>();
    const ids = new Set<string>();
    
    // 1. Dental (Max 1)
    const hasDentalIssues = activePet.healthIssues.some(h => h.part === 'mouth' && (h.diseases.includes('牙結石') || h.diseases.includes('口臭')));
    if (hasDentalIssues) {
      const dentalProduct = PRODUCTS.find(p => p.category === 'teeth');
      if (dentalProduct) ids.add(dentalProduct.id);
    }

    // 2. GI / Probiotics (Max 1) - Only if taking antibiotics
    const isTakingAntibiotics = activePet.medications.some(m => m.category === 'antibiotics');
    if (isTakingAntibiotics) {
      const giProduct = PRODUCTS.find(p => p.category === 'gi');
      if (giProduct) ids.add(giProduct.id);
    }

    // 3. Joint (Max 1)
    const largeBreeds = ['哈士奇 (Husky)', '大麥町 (Dalmatian)', '阿拉斯加 (Alaskan Malamute)', '黃金獵犬 (Golden Retriever)', '拉不拉多 (Labrador)'];
    const isLargeBreed = activePet.species === 'dog' && largeBreeds.includes(activePet.breed);
    const isOld = activePet.ageYears !== null && activePet.ageYears >= 7;
    if (isLargeBreed || isOld) {
      const isDalmatian = activePet.breed === '大麥町 (Dalmatian)';
      const jointProduct = PRODUCTS.find(p => {
        if (p.category !== 'joint') return false;
        if (isDalmatian && p.name === '德國 100%天然綠唇貽貝精華粉') return false;
        return true;
      });
      if (jointProduct) ids.add(jointProduct.id);
    }

    // 4. Skin (Max 1)
    const hasSkinIssues = activePet.healthIssues.some(h => h.part === 'skin');
    if (hasSkinIssues) {
      const skinProduct = PRODUCTS.find(p => p.category === 'skin');
      if (skinProduct) ids.add(skinProduct.id);
    }

    // 5. Nursing / Otitis Externa (Max 2)
    const hasOtitis = activePet.healthIssues.some(h => h.part === 'ears' && h.diseases.includes('外耳炎'));
    if (hasOtitis) {
      const cottonBall = PRODUCTS.find(p => p.name === '滅菌棉球');
      const earCleanser = PRODUCTS.find(p => p.name === 'ZYMOX 三酵合一潔耳液(寵物用)');
      if (cottonBall) ids.add(cottonBall.id);
      if (earCleanser) ids.add(earCleanser.id);
    }

    return ids;
  }, [activePet]);

  const displayProducts = useMemo(() => {
    let filtered = activeCategory === 'all' 
      ? [...PRODUCTS] 
      : PRODUCTS.filter(p => p.category === activeCategory);

    // Sort: Recommended first
    return filtered.sort((a, b) => {
      const aRec = recommendedProductIds.has(a.id) ? 1 : 0;
      const bRec = recommendedProductIds.has(b.id) ? 1 : 0;
      return bRec - aRec;
    });
  }, [activeCategory, recommendedProductIds]);

  return (
    <div className="space-y-6">
      {/* Pet Identity Switcher */}
      <div className="relative">
        <button 
          onClick={() => setIsPetSelectorOpen(!isPetSelectorOpen)}
          className="w-full bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3 hover:bg-orange-50 transition-all"
        >
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
            {activePet ? (
              activePet.photoUrl ? (
                <img src={activePet.photoUrl} alt={activePet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                activePet.species === 'dog' ? '🐶' : '🐱'
              )
            ) : <UserCircle className="w-6 h-6 text-orange-400" />}
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">目前購物身分</p>
            <p className="font-black text-gray-800">{activePet?.name || '請選擇毛孩'}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isPetSelectorOpen ? 'rotate-180' : ''}`} />
        </button>

        {isPetSelectorOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-30 overflow-hidden">
            {pets.length === 0 ? (
              <p className="p-4 text-sm text-gray-400 text-center italic">尚未新增毛孩</p>
            ) : (
              <div className="max-height-[200px] overflow-y-auto">
                {pets.map(pet => (
                  <button
                    key={pet.id}
                    onClick={() => { onSwitchPet(pet.id); setIsPetSelectorOpen(false); }}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-orange-50 transition-all border-b border-gray-50 last:border-0 ${
                      activePetId === pet.id ? 'bg-orange-50/50' : ''
                    }`}
                  >
                    <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-lg overflow-hidden">
                      {pet.photoUrl ? (
                        <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        pet.species === 'dog' ? '🐶' : '🐱'
                      )}
                    </div>
                    <span className={`font-bold text-sm ${activePetId === pet.id ? 'text-orange-500' : 'text-gray-700'}`}>
                      {pet.name}
                    </span>
                    {activePetId === pet.id && <div className="ml-auto w-2 h-2 rounded-full bg-orange-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-gray-800">寵物商城</h2>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {PRODUCT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-4">
        {displayProducts.map(product => {
          const isRecommended = recommendedProductIds.has(product.id);

          return (
            <div key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 items-center relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-24 h-24 rounded-xl object-cover bg-gray-50" 
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm mb-1">{product.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-black text-sm">$ 999</span>
                  <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mall;
