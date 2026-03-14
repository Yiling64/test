import { useState } from 'react';
import { PHARMACIST_MEDICATIONS } from './data/medicationData';
import { Search, Info, AlertTriangle, Activity, Zap, Package } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const medications = Object.entries(PHARMACIST_MEDICATIONS);
  
  const filteredMedications = medications.filter(([name, data]) => 
    name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">藥物資料庫</h1>
          <p className="text-stone-600">專業藥師端資訊查詢系統</p>
        </header>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜尋藥物名稱、商品名或分類..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-6">
          {filteredMedications.map(([name, med]) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-md border border-stone-100 overflow-hidden"
            >
              <div className="bg-emerald-600 p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{name}</h2>
                    <p className="text-emerald-100 font-medium">{med.brandName}</p>
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {med.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-y-6">
                {/* 專業分類 & 適應症 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-emerald-700 font-bold">
                    <Info className="w-5 h-5" />
                    <h3>專業分類 & 適應症</h3>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <p className="text-sm font-bold text-stone-700 mb-1">{med.professionalCategory}</p>
                    <p className="text-stone-600 text-sm leading-relaxed">{med.indications}</p>
                  </div>
                </section>

                {/* 劑型 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-blue-700 font-bold">
                    <Package className="w-5 h-5" />
                    <h3>劑型</h3>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <ul className="list-disc list-inside text-stone-600 text-sm space-y-1">
                      {med.dosageForms.map((form, i) => (
                        <li key={i}>{form}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* 物種劑量 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-indigo-700 font-bold">
                    <Zap className="w-5 h-5" />
                    <h3>物種劑量</h3>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                    <div className="grid grid-cols-1 gap-y-3">
                      {Object.entries(med.dosageBySpecies).map(([species, dosage]) => (
                        <div key={species} className="flex flex-col">
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{species}</span>
                          <span className="text-stone-700 text-sm">{dosage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 動力學參數 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-purple-700 font-bold">
                    <Activity className="w-5 h-5" />
                    <h3>動力學參數 (PK)</h3>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-stone-400 border-bottom border-stone-200">
                          <th className="pb-2 font-medium">物種</th>
                          <th className="pb-2 font-medium">T1/2</th>
                          <th className="pb-2 font-medium">Vd</th>
                          <th className="pb-2 font-medium">蛋白質結合率</th>
                        </tr>
                      </thead>
                      <tbody className="text-stone-700">
                        {Object.entries(med.pkParameters).map(([species, params]) => (
                          <tr key={species} className="border-t border-stone-100">
                            <td className="py-2 font-bold">{species}</td>
                            <td className="py-2">{params['T1/2'] || '-'}</td>
                            <td className="py-2">{params['Vd'] || '-'}</td>
                            <td className="py-2">{params['proteinBinding'] || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 警示 & 交互作用 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-amber-700 font-bold">
                    <AlertTriangle className="w-5 h-5" />
                    <h3>臨床注意事項</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                      <h4 className="text-xs font-bold text-amber-800 uppercase mb-1">禁忌 / 警告</h4>
                      <p className="text-amber-900 text-sm leading-relaxed">{med.clinicalNotes.warnings}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                      <h4 className="text-xs font-bold text-orange-800 uppercase mb-1">交互作用</h4>
                      <p className="text-orange-900 text-sm leading-relaxed">{med.clinicalNotes.interactions}</p>
                    </div>
                  </div>
                </section>

                {/* 保存方式 */}
                <section className="w-full">
                  <div className="flex items-center gap-x-2 mb-2 text-stone-700 font-bold">
                    <Package className="w-5 h-5" />
                    <h3>保存方式</h3>
                  </div>
                  <div className="bg-stone-100 p-4 rounded-xl border border-stone-200">
                    <p className="text-stone-700 text-sm">{med.storage}</p>
                  </div>
                </section>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
