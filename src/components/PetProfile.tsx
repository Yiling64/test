import React, { useState } from 'react';
import { Pet, OwnerMedicationRule, HealthCheckRecord } from '../types';
import { BODY_PARTS, MEDICATION_CATEGORIES } from '../constants';
import { OWNER_MEDICATION_RULES } from '../data/medicationData';
import { AlertCircle, ChevronDown, ChevronUp, Clipboard, Calendar, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getBreedDiseases } from '../breedDiseases';
import { getStandardWeight } from '../breedWeights';

interface PetProfileProps {
  pet: Pet;
  onEdit: () => void;
  onUpdatePet: (updates: Partial<Pet>) => void;
}

const PetProfile: React.FC<PetProfileProps> = ({ pet, onEdit, onUpdatePet }) => {
  const [expandedMed, setExpandedMed] = useState<string | null>(null);
  const [showHealthRecords, setShowHealthRecords] = useState(false);
  const [newRecordDate, setNewRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [newRecordPhoto, setNewRecordPhoto] = useState('');
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
    
    const standard = getStandardWeight(pet.breed, pet.gender);
    if (!standard) return null;

    const range = `${standard.min} - ${standard.max} kg`;
    let status: string;
    let statusColor: string;

    if (pet.weight < standard.min) { status = '過輕'; statusColor = 'text-red-500'; }
    else if (pet.weight > standard.max) { status = '過重'; statusColor = 'text-red-500'; }
    else { status = '適中'; statusColor = 'text-orange-600'; }

    return { range, status, statusColor };
  };

  const handleAddHealthRecord = () => {
    if (!newRecordDate || !newRecordPhoto) return;
    const newRecord: HealthCheckRecord = {
      id: Date.now().toString(),
      date: newRecordDate,
      photoUrl: newRecordPhoto
    };
    onUpdatePet({
      healthCheckRecords: [...(pet.healthCheckRecords || []), newRecord]
    });
    setNewRecordPhoto('');
  };

  const breedDiseases = getBreedDiseases(pet.breed);

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
      {breedDiseases.length > 0 && (
        <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 space-y-2">
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1 h-1 bg-blue-400 rounded-full"></span> 品種性疾病提示 / Breed-Specific Alert
          </h3>
          <div className="text-xs text-blue-700 leading-relaxed">
            {breedDiseases.map((disease, i) => (
              <p key={i}>• {disease}</p>
            ))}
          </div>
        </div>
      )}

      {/* Health Check Entry Button */}
      <div className="mt-6">
        <button 
          onClick={() => setShowHealthRecords(true)}
          className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
        >
          <Clipboard className="w-5 h-5" />
          健檢紀錄入口
        </button>
      </div>

      {/* Health Records Modal */}
      <AnimatePresence>
        {showHealthRecords && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHealthRecords(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-xl font-black">健檢紀錄</h3>
                <button onClick={() => setShowHealthRecords(false)} className="p-2 hover:bg-stone-50 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Add New Record */}
                <div className="bg-stone-50 p-4 rounded-2xl space-y-4">
                  <h4 className="text-sm font-black text-stone-500 uppercase tracking-widest">新增紀錄</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                      <Calendar className="w-5 h-5 text-stone-400" />
                      <input 
                        type="date" 
                        value={newRecordDate}
                        onChange={(e) => setNewRecordDate(e.target.value)}
                        className="bg-transparent outline-none text-sm font-bold w-full"
                      />
                    </div>
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-stone-200">
                      <ImageIcon className="w-5 h-5 text-stone-400" />
                      <input 
                        type="text" 
                        placeholder="貼上健檢照片網址..."
                        value={newRecordPhoto}
                        onChange={(e) => setNewRecordPhoto(e.target.value)}
                        className="bg-transparent outline-none text-sm font-bold w-full"
                      />
                    </div>
                    <button 
                      onClick={handleAddHealthRecord}
                      className="w-full bg-orange-500 text-white py-3 rounded-xl font-black shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all"
                    >
                      新增紀錄
                    </button>
                  </div>
                </div>

                {/* List Records */}
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-stone-500 uppercase tracking-widest">歷史紀錄</h4>
                  {pet.healthCheckRecords?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {pet.healthCheckRecords.map(record => (
                        <div key={record.id} className="bg-white border border-stone-100 rounded-2xl overflow-hidden shadow-sm">
                          <img src={record.photoUrl} alt={record.date} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                          <div className="p-3 bg-stone-50 flex justify-between items-center">
                            <span className="text-sm font-black text-stone-700">{record.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-10 text-stone-400 font-bold italic">尚無紀錄</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer / Date */}
      <div className="mt-12 pt-4 border-t border-gray-100 text-[10px] text-gray-300 flex justify-between italic">
        <span>PET HEALTH RESUME v1.0</span>
        <span>最後更新日期: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default PetProfile;
