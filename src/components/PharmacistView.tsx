import React, { useState } from 'react';
import { Pet, PharmacistMedication } from '../types';
import { PHARMACIST_MEDICATIONS } from '../data/medicationData';
import { Search, Pill, Activity, AlertTriangle, ChevronRight, ClipboardList, ChevronLeft, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PharmacistViewProps {
  pets: Pet[];
}

const PharmacistView: React.FC<PharmacistViewProps> = ({ pets }) => {
  const [activeTab, setActiveTab] = useState<'pets' | 'drugs'>('pets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [selectedMedInfo, setSelectedMedInfo] = useState<{ name: string; info: PharmacistMedication } | null>(null);

  const filteredPets = searchTerm.trim() ? pets.filter(pet => 
    pet.displayId.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const filteredDrugs = Object.entries(PHARMACIST_MEDICATIONS).filter(([name, info]) => 
    name.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
    info.brandName.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    info.professionalCategory.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const getMedInfo = (name: string): PharmacistMedication | undefined => {
    const key = Object.keys(PHARMACIST_MEDICATIONS).find(k => 
      name.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(name.toLowerCase())
    );
    return key ? PHARMACIST_MEDICATIONS[key] : undefined;
  };

  const renderBulletPoints = (text: string) => {
    const points = text.split(/。/).filter(p => p.trim());
    return (
      <ul className="list-disc list-inside space-y-1">
        {points.map((point, i) => (
          <li key={i} className="text-sm leading-relaxed">{point.trim()}。</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="https://static.104.com.tw/b_profile/cust_picture/6000/12803476000/logo.jpg?v=20260119163313" 
              alt="Logo" 
              className="w-12 h-12 rounded-xl object-cover shadow-sm border border-slate-100"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">寵物健康資訊與藥事照護輔助系統</h1>
            <p className="text-slate-500 text-sm">專業寵物用藥資訊與健康紀錄管理系統</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
          <button 
            onClick={() => { setActiveTab('pets'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'pets' ? 'bg-white text-[#008d36] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            寵物健康紀錄
          </button>
          <button 
            onClick={() => { setActiveTab('drugs'); setSearchTerm(''); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'drugs' ? 'bg-white text-[#008d36] shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            藥物查詢平台
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text"
          placeholder={activeTab === 'pets' ? "搜尋毛孩ID..." : "搜尋藥物名稱、商品名或分類..."}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#008d36]/20 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

        {/* Content */}
        {activeTab === 'pets' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPets.map(pet => (
              <motion.div 
                key={pet.id}
                layoutId={pet.id}
                onClick={() => setSelectedPet(pet)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl overflow-hidden">
                      {pet.photoUrl ? (
                        <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                      ) : (
                        pet.species === 'dog' ? '🐶' : '🐱'
                      )}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800">{pet.name}</h3>
                      <p className="text-xs text-slate-500">毛孩 ID: {pet.displayId} • {pet.breed}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#008d36] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            {!searchTerm ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <p className="font-bold">請輸入藥物名稱、商品名或分類進行搜尋</p>
                <p className="text-xs mt-1">例如：Enrofloxacin, Baytril, 抗生素...</p>
              </div>
            ) : filteredDrugs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDrugs.map(([name, info]) => (
                  <motion.div 
                    key={name}
                    onClick={() => setSelectedMedInfo({ name, info })}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#008d36]">
                          <Pill className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-800">{name}</h3>
                          <p className="text-xs text-slate-500">{info.brandName}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#008d36] transition-colors" />
                    </div>
                    <div className="mt-2">
                      <span className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-full font-bold">
                        {info.professionalCategory}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="font-bold">找不到與 "{searchTerm}" 相關的藥物</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pet Detail Page */}
      <AnimatePresence>
        {selectedPet && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-slate-50 flex flex-col overflow-y-auto"
          >
            <div className="bg-emerald-50 text-emerald-900 px-6 py-8 border-b border-emerald-100">
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="mb-6 flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> 返回列表
                </button>
                
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-emerald-100 rounded-[32px] flex items-center justify-center text-4xl overflow-hidden border-2 border-emerald-200 shadow-sm">
                    {selectedPet.photoUrl ? (
                      <img src={selectedPet.photoUrl} alt={selectedPet.name} className="w-full h-full object-cover" />
                    ) : (
                      selectedPet.species === 'dog' ? '🐶' : '🐱'
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black mb-1">{selectedPet.name} 健康紀錄</h2>
                    <p className="text-sm font-bold text-emerald-700/80">毛孩 ID: {selectedPet.displayId} • {selectedPet.breed} • {selectedPet.ageYears}歲{selectedPet.ageMonths}個月</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Basic Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">體重</p>
                    <p className="text-lg font-black text-slate-700">{selectedPet.weight} kg</p>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">結紮</p>
                    <p className="text-lg font-black text-slate-700">{selectedPet.neutered === 'yes' ? '已結紮' : '未結紮'}</p>
                  </div>
                  <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">過敏原</p>
                    <p className="text-lg font-black text-slate-700 truncate">{selectedPet.allergens.join(', ') || '無'}</p>
                  </div>
                </div>

                {/* Health Issues */}
                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-rose-500" /> 健康狀況
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedPet.healthIssues.length > 0 ? (
                      selectedPet.healthIssues.map(issue => (
                        <div key={issue.part} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <p className="text-xs font-black text-[#008d36] mb-2 uppercase tracking-widest">{issue.part}</p>
                          <p className="text-sm font-bold text-slate-800 mb-2">{issue.diseases.join(', ')}</p>
                          {issue.description && <p className="text-xs text-slate-500 italic leading-relaxed">"{issue.description}"</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-400 italic py-4">無異常紀錄</p>
                    )}
                  </div>
                </section>

                {/* Medications */}
                <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-[#008d36]" /> 目前用藥 (點擊查看藥典)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedPet.medications.length > 0 ? (
                      selectedPet.medications.map(med => {
                        const info = getMedInfo(med.name);
                        return (
                          <button 
                            key={med.category}
                            onClick={() => info && setSelectedMedInfo({ name: med.name, info })}
                            disabled={!info}
                            className={`flex items-center justify-between p-6 rounded-2xl border transition-all text-left ${
                              info 
                                ? 'bg-white border-[#008d36]/10 hover:border-[#008d36] hover:shadow-md' 
                                : 'bg-slate-50 border-slate-100 opacity-60'
                            }`}
                          >
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{med.category}</p>
                              <p className="text-lg font-black text-slate-800">{med.name}</p>
                            </div>
                            {info ? (
                              <div className="flex items-center gap-2 text-[#008d36]">
                                <span className="text-xs font-bold uppercase tracking-widest">查看藥典</span>
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">無詳細資訊</span>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-sm text-slate-400 italic py-4">目前無用藥紀錄</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Medication Detail Full Page */}
      <AnimatePresence>
        {selectedMedInfo && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[100] bg-emerald-50 flex flex-col overflow-y-auto"
          >
            {/* Header / Title Block */}
            <div className="bg-white border-b border-emerald-100 px-6 py-8 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <button 
                  onClick={() => setSelectedMedInfo(null)}
                  className="mb-6 flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> 返回查詢
                </button>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                        <Pill className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">{selectedMedInfo.info.category}</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2">{selectedMedInfo.name}</h2>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-bold text-slate-500">商品名: {selectedMedInfo.info.brandName}</p>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <p className="text-sm font-bold text-emerald-600">{selectedMedInfo.info.professionalCategory}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">資料更新</p>
                      <p className="text-xs font-bold text-slate-700">2026.03.14</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              <div className="max-w-4xl mx-auto flex flex-col gap-6">
                
                {/* Indications */}
                <section className="bg-white p-8 rounded-[32px] border border-emerald-100/50 shadow-sm w-full">
                  <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" /> 適應症
                  </h3>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    {selectedMedInfo.info.indications}
                  </p>
                </section>

                {/* Dosage Forms */}
                <section className="bg-white p-8 rounded-[32px] border border-emerald-100/50 shadow-sm w-full">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-emerald-600" /> 劑型與規格
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedMedInfo.info.dosageForms.map((form, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-50">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-sm font-bold text-slate-700">{form}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Species Dosage */}
                <section className="bg-white p-8 rounded-[32px] border border-emerald-100/50 shadow-sm w-full">
                  <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Pill className="w-5 h-5 text-emerald-600" /> 物種劑量
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(selectedMedInfo.info.speciesDosage).map(([species, dosage]) => (
                      <div key={species} className="flex items-center gap-1.5">
                        <p className="w-12 text-sm font-black text-emerald-600 uppercase tracking-widest flex-shrink-0">{species}</p>
                        <span className="text-emerald-200 font-light">|</span>
                        <div className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <p className="text-sm font-bold text-slate-800">{dosage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* PK Parameters */}
                <section className="bg-white p-8 rounded-[32px] border border-emerald-100/50 shadow-sm w-full">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-emerald-600" /> 動力學參數 (Pharmacokinetics)
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(selectedMedInfo.info.pkParameters).map(([species, params]) => (
                      <div key={species} className="flex items-start gap-1.5">
                        <p className="w-12 text-sm font-black text-emerald-600 uppercase tracking-widest flex-shrink-0 mt-4">{species}</p>
                        <span className="text-emerald-200 font-light mt-4">|</span>
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Object.entries(params).map(([key, val]) => (
                            <div key={key} className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <p className="text-[10px] text-slate-500 font-bold mb-0.5 uppercase tracking-wider">{key}</p>
                              <p className="text-sm font-black text-slate-900">{val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Clinical Notes: Contraindications */}
                <div className="bg-white p-8 rounded-[32px] border border-rose-100 shadow-sm w-full">
                  <h4 className="text-sm font-black text-rose-600 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> 禁忌 / 警告
                  </h4>
                  <div className="text-slate-600">
                    {renderBulletPoints(selectedMedInfo.info.clinicalNotes.contraindications)}
                  </div>
                </div>

                {/* Clinical Notes: Interactions */}
                <div className="bg-white p-8 rounded-[32px] border border-amber-100 shadow-sm w-full">
                  <h4 className="text-sm font-black text-amber-600 mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" /> 藥物交互作用
                  </h4>
                  <div className="text-slate-600">
                    {renderBulletPoints(selectedMedInfo.info.clinicalNotes.interactions)}
                  </div>
                </div>

                {/* Storage */}
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm w-full">
                  <h4 className="text-sm font-black text-slate-600 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" /> 保存方式
                  </h4>
                  <div className="text-slate-600">
                    {renderBulletPoints(selectedMedInfo.info.storage)}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PharmacistView;
