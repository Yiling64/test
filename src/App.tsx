import { useState, useEffect } from 'react';
import { Pet, Recommendation } from './types';
import { UserCircle, ShoppingBag, Plus, Save, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PetProfile from './components/PetProfile';
import BasicInfoForm from './components/BasicInfoForm';
import HealthStatusForm from './components/HealthStatusForm';
import ExpertRecommendations from './components/ExpertRecommendations';
import Mall from './components/Mall';
import PharmacistView from './components/PharmacistView';
import { GoogleGenAI } from "@google/genai";

import { getBreedDiseases } from './breedDiseases';

const INITIAL_PET: Pet = {
  id: '1',
  displayId: 'KID-2026-001',
  name: '',
  species: 'dog',
  breed: '',
  gender: 'female',
  neutered: 'no',
  ageYears: null,
  ageMonths: null,
  weight: null,
  recentWeightChange: false,
  allergens: ['無'],
  healthIssues: [],
  medications: [],
  healthCheckRecords: [],
};

export default function App() {
  const [role, setRole] = useState<'owner' | 'pharmacist'>('owner');
  const [view, setView] = useState<'profile' | 'mall' | 'form' | 'health-form'>('profile');
  const [pets, setPets] = useState<Pet[]>([]);
  const [activePetId, setActivePetId] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const activePet = pets.find(p => p.id === activePetId) || null;

  const handleSavePet = () => {
    if (!editingPet) return;
    
    if (pets.find(p => p.id === editingPet.id)) {
      setPets(pets.map(p => p.id === editingPet.id ? editingPet : p));
    } else {
      setPets([...pets, editingPet]);
      setActivePetId(editingPet.id);
    }
    setEditingPet(null);
    setView('profile');
  };

  const generateRecommendations = async (pet: Pet) => {
    if (!pet.name || !pet.breed) return;
    setIsGenerating(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const breedDiseases = getBreedDiseases(pet.breed);
      const promptText = `你是一位專業的寵物健康顧問。請根據以下毛孩資料提供 2-3 個具體的健康建議。
      毛孩資料：
      - 名字：${pet.name}
      - 品種：${pet.breed} (品種好發疾病：${breedDiseases.join(', ')})
      - 年齡：${pet.ageYears}歲${pet.ageMonths}個月
      - 體重：${pet.weight}kg
      - 過敏原：${pet.allergens.join(', ')}
      - 健康問題：${pet.healthIssues.map(h => h.part + ': ' + h.diseases.join(', ')).join('; ')}
      - 目前用藥：${pet.medications.map(m => m.name).join(', ')}

      請以 JSON 格式回傳，格式如下：
      [
        { "type": "warning" | "suggestion", "title": "標題", "content": "具體內容" }
      ]
      
      特別注意：
      1. 如果品種好發疾病包含「尿酸代謝問題」，請務必提醒，並建議低嘌呤飲食。
      2. 如果有「關節」問題或屬於大型犬，請建議補充關節營養品。
      3. 如果正在服用「抗生素」，請建議補充益生菌。
      4. 如果有「口腔」或「口臭」問題，請建議潔牙產品。
      5. 如果有「皮膚」問題，請建議 Omega-3 補充。
      6. 如果有「外耳炎」，請建議潔耳液與棉球。
      
      在 content 中，如果推薦了產品，請務必包含「推薦產品：[產品名稱]」字樣。`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-latest",
        contents: [{ parts: [{ text: promptText }] }],
      });

      const text = response.text || '';
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        setRecommendations(JSON.parse(jsonMatch[0]));
      }
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      // Fallback recommendations if AI fails
      const fallback: Recommendation[] = [];
      if (pet.breed === '大麥町 (Dalmatian)') {
        fallback.push({
          type: 'warning',
          title: '品種特定健康提醒',
          content: '大麥町犬天生代謝尿酸能力較差，容易產生尿路結石。建議選擇低嘌呤飲食，並確保充足飲水。'
        });
      }
      setRecommendations(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (activePet && view === 'profile') {
      generateRecommendations(activePet);
    }
  }, [activePetId, view, activePet]);

  if (role === 'pharmacist') {
    return (
      <div className="relative">
        <PharmacistView pets={pets} />
        <button 
          onClick={() => setRole('owner')}
          className="fixed top-4 right-4 z-[60] bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-slate-200 flex items-center gap-2 text-slate-600 font-bold hover:text-[#008d36] transition-all"
        >
          <User className="w-5 h-5" />
          切換至飼主端
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24 font-sans text-stone-900">
      {/* Role Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setRole('pharmacist')}
          className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-orange-100 flex items-center gap-2 text-stone-500 font-bold hover:text-orange-600 transition-all"
        >
          <ShieldCheck className="w-5 h-5" />
          切換至藥師端
        </button>
      </div>

      <main className="max-w-2xl mx-auto p-4 pt-8">
        {/* Brand Header */}
        <div className="flex items-center gap-4 mb-10">
          <img 
            src="https://i.ibb.co/DfgdV857/S-230916150.jpg" 
            alt="寵健康" 
            className="w-16 h-16 rounded-2xl object-cover shadow-md border-2 border-white"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-3xl font-black text-stone-900 tracking-tighter">寵健康</h1>
            <p className="text-orange-600 font-bold text-sm">寵物健康與生活管理專家</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {activePet ? (
                <>
                  <PetProfile 
                    pet={activePet} 
                    onEdit={() => {
                      setEditingPet(activePet);
                      setView('form');
                    }} 
                    onUpdatePet={(updates) => {
                      setPets(pets.map(p => p.id === activePet.id ? { ...p, ...updates } : p));
                    }}
                  />
                  <ExpertRecommendations 
                    recommendations={recommendations} 
                    loading={isGenerating}
                  />
                </>
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-10 h-10 text-stone-300" />
                  </div>
                  <h2 className="text-xl font-black text-stone-400">尚未建立毛孩檔案</h2>
                  <button 
                    onClick={() => {
                      setEditingPet({ ...INITIAL_PET, id: Date.now().toString() });
                      setView('form');
                    }}
                    className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
                  >
                    立即建立
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {view === 'mall' && (
            <motion.div
              key="mall"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Mall 
                pets={pets} 
                activePetId={activePetId} 
                onSwitchPet={setActivePetId} 
              />
            </motion.div>
          )}

          {(view === 'form' || view === 'health-form') && editingPet && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100"
            >
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => {
                    if (view === 'health-form') setView('form');
                    else setView('profile');
                  }}
                  className="p-2 hover:bg-stone-50 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-black">
                  {view === 'form' ? '基本資料設定' : '健康狀況設定'}
                </h2>
                <div className="w-10" />
              </div>

              {view === 'form' ? (
                <BasicInfoForm 
                  pet={editingPet} 
                  onChange={(updates) => setEditingPet({ ...editingPet, ...updates })} 
                />
              ) : (
                <HealthStatusForm 
                  pet={editingPet} 
                  onChange={(updates) => setEditingPet({ ...editingPet, ...updates })} 
                />
              )}

              <div className="mt-10 flex gap-3">
                {view === 'form' ? (
                  <button 
                    onClick={() => setView('health-form')}
                    className="flex-1 bg-stone-900 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                  >
                    下一步：健康狀況
                  </button>
                ) : (
                  <button 
                    onClick={handleSavePet}
                    className="flex-1 bg-orange-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    儲存檔案
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      {view !== 'form' && view !== 'health-form' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md bg-white/80 backdrop-blur-xl border border-white/20 rounded-[32px] shadow-2xl p-2 flex items-center justify-around z-40">
          <button 
            onClick={() => setView('profile')}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl transition-all ${
              view === 'profile' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-stone-400'
            }`}
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">健康檔案</span>
          </button>
          
          <button 
            onClick={() => {
              setEditingPet({ ...INITIAL_PET, id: Date.now().toString() });
              setView('form');
            }}
            className="w-14 h-14 bg-stone-900 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          >
            <Plus className="w-8 h-8" />
          </button>

          <button 
            onClick={() => setView('mall')}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-2xl transition-all ${
              view === 'mall' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'text-stone-400'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">毛孩商城</span>
          </button>
        </nav>
      )}
    </div>
  );
}
