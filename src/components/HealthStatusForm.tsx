import React, { useState } from 'react';
import { Pet, HealthIssue, Medication } from '../types';
import { ALLERGENS, MEDICATION_CATEGORIES, BODY_PARTS } from '../constants';
import { OWNER_MEDICATION_RULES, PHARMACIST_MEDICATIONS } from '../data/medicationData';
import { X, Plus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HealthStatusFormProps {
  pet: Pet;
  onChange: (updates: Partial<Pet>) => void;
}

const HealthStatusForm: React.FC<HealthStatusFormProps> = ({ pet, onChange }) => {
  const [activePart, setActivePart] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<string | null>(null);

  const medicationNames = Object.keys(PHARMACIST_MEDICATIONS);

  const toggleAllergen = (allergen: string) => {
    if (allergen === '無') {
      onChange({ allergens: ['無'] });
      return;
    }
    let newAllergens = [...pet.allergens];
    if (newAllergens.includes('無')) {
      newAllergens = [];
    }
    
    if (newAllergens.includes(allergen)) {
      newAllergens = newAllergens.filter(a => a !== allergen);
    } else {
      newAllergens.push(allergen);
    }
    
    if (newAllergens.length === 0) {
      newAllergens = ['無'];
    }
    
    onChange({ allergens: newAllergens });
  };

  const handlePartClick = (partId: string) => {
    setActivePart(partId);
  };

  const addHealthIssue = (partId: string, disease: string) => {
    const existing = pet.healthIssues.find(h => h.part === partId);
    let newIssues: HealthIssue[];
    if (existing) {
      if (existing.diseases.includes(disease)) return;
      newIssues = pet.healthIssues.map(h => 
        h.part === partId ? { ...h, diseases: [...h.diseases, disease] } : h
      );
    } else {
      newIssues = [...pet.healthIssues, { part: partId, diseases: [disease], description: '' }];
    }
    onChange({ healthIssues: newIssues });
  };

  const removeHealthIssue = (partId: string, disease: string) => {
    const newIssues = pet.healthIssues.map(h => {
      if (h.part === partId) {
        return { ...h, diseases: h.diseases.filter(d => d !== disease) };
      }
      return h;
    }).filter(h => h.diseases.length > 0);
    onChange({ healthIssues: newIssues });
  };

  const updateMedication = (category: string, name: string) => {
    let finalCategory = category;
    
    // Auto-categorization logic
    if (name.trim().length >= 3) {
      const ruleKey = Object.keys(OWNER_MEDICATION_RULES).find(k => 
        name.toLowerCase().includes(k.toLowerCase())
      );
      if (ruleKey) {
        const rule = OWNER_MEDICATION_RULES[ruleKey];
        const correctCategory = MEDICATION_CATEGORIES.find(c => c.label === rule.category);
        if (correctCategory && correctCategory.id !== category) {
          finalCategory = correctCategory.id;
        }
      }
    }

    const existing = pet.medications.find(m => m.category === finalCategory);
    let newMeds: Medication[];
    
    // If we changed category, we should remove the old one if it was just a placeholder
    const otherMeds = pet.medications.filter(m => m.category !== category && m.category !== finalCategory);
    
    if (existing) {
      newMeds = [...otherMeds, { ...existing, name }];
    } else {
      newMeds = [...otherMeds, { category: finalCategory, name }];
    }
    
    onChange({ medications: newMeds });
  };

  const removeMedication = (category: string) => {
    onChange({ medications: pet.medications.filter(m => m.category !== category) });
  };

  const activePartData = BODY_PARTS.find(p => p.id === activePart);

  return (
    <div className="space-y-8">
      {/* Allergens */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">過敏原 *</label>
        <div className="flex flex-wrap gap-2">
          {ALLERGENS.map((a) => (
            <button
              key={a}
              onClick={() => toggleAllergen(a)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                pet.allergens.includes(a)
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-orange-200'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Health Status */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-sm font-bold text-gray-700">健康狀況 *</label>
          <button 
            onClick={() => onChange({ healthIssues: [] })}
            className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 transition-colors"
          >
            全部健康
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {BODY_PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => handlePartClick(part.id)}
              className={`py-3 px-4 rounded-xl border-2 font-bold transition-all text-sm ${
                pet.healthIssues.some(h => h.part === part.id)
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : activePart === part.id
                    ? 'border-orange-300 bg-orange-50 text-orange-500'
                    : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
              }`}
            >
              {part.label}
            </button>
          ))}
        </div>

        {/* Selected Issues Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {pet.healthIssues.map(issue => (
            <div key={issue.part} className="flex flex-wrap gap-1">
              {issue.diseases.map(d => (
                <span key={d} className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-bold">
                  {BODY_PARTS.find(p => p.id === issue.part)?.label}: {d}
                  <button onClick={() => removeHealthIssue(issue.part, d)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Part Selection Modal/Popup */}
        <AnimatePresence>
          {activePart && activePartData && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-gray-800">{activePartData.label} 狀況</h4>
                <button onClick={() => setActivePart(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {activePartData.diseases.map(d => (
                  <button
                    key={d}
                    onClick={() => addHealthIssue(activePart, d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      pet.healthIssues.find(h => h.part === activePart)?.diseases.includes(d)
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    {d}
                  </button>
                ))}
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold border border-dashed border-gray-300 text-gray-400 flex items-center gap-1">
                  <Plus className="w-3 h-3" /> 自定義
                </button>
              </div>
              <textarea
                placeholder="補充描述狀況..."
                value={pet.healthIssues.find(h => h.part === activePart)?.description || ''}
                onChange={(e) => {
                  const newIssues = pet.healthIssues.map(h => 
                    h.part === activePart ? { ...h, description: e.target.value } : h
                  );
                  onChange({ healthIssues: newIssues });
                }}
                className="w-full p-3 text-sm rounded-xl border border-gray-200 outline-none focus:border-orange-300 bg-white"
                rows={2}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Medications */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">正在使用藥物 *</label>
        <div className="space-y-3">
          <button
            onClick={() => onChange({ medications: [] })}
            className={`w-full py-3 rounded-xl border-2 font-bold transition-all ${
              pet.medications.length === 0
                ? 'border-orange-500 bg-orange-50 text-orange-600'
                : 'border-gray-100 bg-gray-50 text-gray-400'
            }`}
          >
            目前無用藥
          </button>
          
          {MEDICATION_CATEGORIES.map(cat => {
            const isSelected = pet.medications.some(m => m.category === cat.id);
            return (
              <div 
                key={cat.id} 
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected ? 'border-orange-200 bg-orange-50/30 shadow-sm' : 'border-gray-100 bg-white'
                }`}
                onClick={() => {
                  if (isSelected) {
                    removeMedication(cat.id);
                  } else {
                    updateMedication(cat.id, '');
                  }
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold ${isSelected ? 'text-orange-600' : 'text-gray-700'}`}>
                    {cat.label}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-200'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mb-2">常見舉例：{cat.examples}</p>
                {isSelected && (
                  <div onClick={(e) => e.stopPropagation()} className="relative">
                    <input
                      type="text"
                      placeholder="輸入實際藥品名稱..."
                      autoFocus
                      value={pet.medications.find(m => m.category === cat.id)?.name || ''}
                      onChange={(e) => {
                        updateMedication(cat.id, e.target.value);
                        setShowSuggestions(cat.id);
                      }}
                      onFocus={() => setShowSuggestions(cat.id)}
                      onBlur={() => setTimeout(() => setShowSuggestions(null), 200)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-orange-200 outline-none focus:border-orange-400 bg-white"
                    />
                    <AnimatePresence>
                      {showSuggestions === cat.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 right-0 top-full mt-1 bg-white border border-orange-100 rounded-xl shadow-xl z-50 max-h-40 overflow-y-auto"
                        >
                          {medicationNames
                            .filter(name => {
                              const currentVal = pet.medications.find(m => m.category === cat.id)?.name || '';
                              return currentVal && name.toLowerCase().startsWith(currentVal.toLowerCase()) && name !== currentVal;
                            })
                            .map(name => (
                              <button
                                key={name}
                                onClick={() => {
                                  updateMedication(cat.id, name);
                                  setShowSuggestions(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 font-bold text-stone-700 transition-colors"
                              >
                                {name}
                              </button>
                            ))
                          }
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning for chronic diseases */}
      {pet.healthIssues.some(h => h.diseases.some(d => ['腎病', '糖尿病', '心臟病', '高血壓', '胰臟炎', '退化性關節炎', '甲狀腺機能亢進', '肝臟病'].includes(d))) && (
        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 font-medium">
            偵測到慢性病史。請注意：所有保健食品與藥物調整，請務必先諮詢您的主治獸醫師。
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthStatusForm;
