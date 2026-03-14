import React, { useState } from 'react';
import { Pet, OwnerMedicationRule } from '../types';
import { BODY_PARTS, MEDICATION_CATEGORIES } from '../constants';
import { OWNER_MEDICATION_RULES } from '../data/medicationData';
import { Edit2, Info, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PetProfileProps {
  pet: Pet;
  onEdit: () => void;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet, onEdit }) => {
  const [expandedMed, setExpandedMed] = useState<string | null>(null);
  const hasMeds = pet.medications.length > 0;
  const hasIssues = pet.healthIssues.length > 0;

  const getMedicationRule = (name: string): OwnerMedicationRule | undefined => {
    // Try exact match or partial match
    const key = Object.keys(OWNER_MEDICATION_RULES).find(k => 
      name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())
    );
    return key ? OWNER_MEDICATION_RULES[key] : undefined;
  };

  const getWeightInfo = () => {
    if (pet.weight === null) return null;
    
    let range = '';
    let status = '';
    let statusColor = 'text-gray-500';

    if (pet.species === 'dog' && pet.gender === 'female') {
      if (pet.breed === '哈士奇 (Husky)') {
        range = '16 - 23 kg';
        if (pet.weight < 16) { status = '過輕'; statusColor = 'text-red-500'; }
        else if (pet.weight > 23) { status = '過重'; statusColor = 'text-red-500'; }
        else { status = '適中'; statusColor = 'text-orange-600'; }
      } else if (pet.breed === '大麥町 (Dalmatian)') {
        range = '24 - 29 kg';
        if (pet.weight < 24) { status = '過輕'; statusColor = 'text-red-500'; }
        else if (pet.weight > 29) { status = '過重'; statusColor = 'text-red-500'; }
        else { status = '適中'; statusColor = 'text-orange-600'; }
      }
    }

    return { range, status, statusColor };
  };

  const weightInfo = getWeightInfo();

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 font-sans text-gray-800 max-w-2xl mx-auto">
      {/* Header / Resume Title */}
      <div className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-end">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-center text-3xl overflow-hidden shadow-sm">
            {pet.photoUrl ? (
              <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
            ) : (
              pet.species === 'dog' ? '🐶' : '🐱'
            )}
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">{pet.name || '未命名'}</h1>
            <p className="text-sm font-bold text-gray-500 mt-1">
              {pet.displayId && <span className="mr-2 text-orange-600">[毛孩 ID: {pet.displayId}]</span>}
              {pet.species === 'dog' ? '犬' : '貓'} / {pet.breed || '未填寫品種'}
            </p>
          </div>
        </div>
        <button 
          onClick={onEdit}
          className="text-xs font-bold text-orange-500 hover:underline mb-1"
        >
          編輯資料
        </button>
      </div>

      {/* Basic Info Section */}
      <div className="mb-6">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">基本資料 / Basic Information</h2>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center"><span className="font-bold mr-1">名字:</span><span>{pet.name || '未命名'}</span></div>
          <div className="flex items-center"><span className="font-bold mr-1">性別:</span><span>{pet.gender === 'male' ? '公' : '母'}</span></div>
          <div className="flex items-center"><span className="font-bold mr-1">結紮:</span><span>{pet.neutered === 'yes' ? '已結紮' : '未結紮'}</span></div>
          <div className="flex items-center"><span className="font-bold mr-1">年齡:</span><span>{pet.ageYears ?? 0} 歲 {pet.ageMonths ?? 0} 個月</span></div>
          <div className="flex flex-col col-span-2">
            <div className="flex items-center">
              <span className="font-bold mr-1">體重:</span> 
              <span>
                {pet.weight ?? 0}kg
                {weightInfo?.status && (
                  <span className={`ml-0.5 font-black ${weightInfo.statusColor}`}>[{weightInfo.status}]</span>
                )}
              </span>
            </div>
            {weightInfo?.range && (
              <div className="text-[10px] text-gray-400 mt-0.5">
                (標準體重區間: {weightInfo.range})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Health Status Section */}
      <div className="mb-6">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">健康狀況 / Health Status</h2>
        {hasIssues ? (
          <div className="space-y-3">
            {pet.healthIssues.map(issue => (
              <div key={issue.part} className="text-sm">
                <span className="font-bold text-orange-600">[{BODY_PARTS.find(p => p.id === issue.part)?.label}]</span>
                <span className="ml-2">{issue.diseases.join(', ')}</span>
                {issue.description && <p className="text-xs text-gray-500 mt-1 ml-4 italic">- {issue.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-orange-600 font-bold">目前健康狀況良好，無異常紀錄。</p>
        )}
      </div>

      {/* Medications Section */}
      <div className="mb-6">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1 mb-3">用藥紀錄 / Medications</h2>
        {hasMeds ? (
          <div className="space-y-2">
            {pet.medications.map((med, index) => {
              const rule = med.name ? getMedicationRule(med.name) : undefined;
              const isExpanded = med.name && expandedMed === `${med.name}-${index}`;
              
              return (
                <div key={`${med.name}-${index}`} className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className={`w-full flex items-center justify-between p-3 transition-colors text-left ${med.name ? 'hover:bg-slate-50 cursor-pointer' : ''}`}
                    onClick={() => med.name && setExpandedMed(isExpanded ? null : `${med.name}-${index}`)}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-gray-500">{MEDICATION_CATEGORIES.find(c => c.id === med.category)?.label}:</span>
                      <span className="text-orange-600 font-black">{med.name || '未填寫'}</span>
                      {rule && (
                        <span 
                          className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-bold"
                          style={{ backgroundColor: rule.color }}
                        >
                          {rule.indications}
                        </span>
                      )}
                    </div>
                    {med.name && (isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />)}
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && rule && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3">
                          {rule.reminders.length > 0 && (
                            <div className="p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderColor: rule.color }}>
                              <p className="text-[10px] font-bold text-gray-400 mb-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> 用藥提醒
                              </p>
                              <ul className="space-y-1">
                                {rule.reminders.map((reminder, i) => (
                                  <li key={i} className="text-xs text-gray-600 leading-relaxed">• {reminder}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-400">目前無長期服用藥物記錄。</p>
        )}
      </div>

      {/* Special Reminders Section */}
      {pet.breed === '大麥町 (Dalmatian)' && (
        <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 space-y-2">
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span> 品種性疾病提示 / Breed-Specific Alert
          </h3>
          <p className="text-xs text-blue-700 leading-relaxed">
            • 大麥町犬天生代謝尿酸能力差，建議選擇低嘌呤飲食。
          </p>
        </div>
      )}

      {/* Footer / Date */}
      <div className="mt-12 pt-4 border-t border-gray-100 text-[10px] text-gray-300 flex justify-between italic">
        <span>PET HEALTH RESUME v1.0</span>
        <span>最後更新日期: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PetProfile;
