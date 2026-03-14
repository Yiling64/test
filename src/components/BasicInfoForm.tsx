import React from 'react';
import { Pet, Species, Gender, Neutered } from '../types';
import { DOG_BREEDS, CAT_BREEDS } from '../constants';
import { Search } from 'lucide-react';

interface BasicInfoFormProps {
  pet: Pet;
  onChange: (updates: Partial<Pet>) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ pet, onChange }) => {
  const breeds = pet.species === 'dog' ? DOG_BREEDS : CAT_BREEDS;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative group">
          <div className="w-24 h-24 bg-orange-50 rounded-[32px] border-2 border-orange-100 flex items-center justify-center text-4xl overflow-hidden shadow-inner">
            {pet.photoUrl ? (
              <img src={pet.photoUrl} alt="Pet" className="w-full h-full object-cover" />
            ) : (
              pet.species === 'dog' ? '🐶' : '🐱'
            )}
          </div>
          <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-[32px]">
            <span className="text-white text-xs font-bold">更換照片</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">點擊上傳毛孩照片</p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">寵物名字 *</label>
        <input
          type="text"
          value={pet.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
          placeholder="輸入寶貝的名字"
        />
      </div>

      {/* Species */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">物種 *</label>
        <div className="flex gap-3">
          {(['dog', 'cat'] as Species[]).map((s) => (
            <button
              key={s}
              onClick={() => onChange({ species: s, breed: '' })}
              className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold transition-all ${
                pet.species === s
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'
              }`}
            >
              {s === 'dog' ? '犬' : '貓'}
            </button>
          ))}
        </div>
      </div>

      {/* Breed */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">品種 *</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={pet.breed}
            onChange={(e) => onChange({ breed: e.target.value })}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 outline-none appearance-none bg-white"
          >
            <option value="">選擇品種</option>
            {breeds.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Gender & Neutered */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">性別 *</label>
          <div className="flex gap-2">
            {(['male', 'female'] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => onChange({ gender: g })}
                className={`flex-1 py-2 rounded-lg border font-medium transition-all ${
                  pet.gender === g
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                {g === 'male' ? '公' : '母'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">結紮狀況 *</label>
          <div className="flex gap-2">
            {(['yes', 'no'] as Neutered[]).map((n) => (
              <button
                key={n}
                onClick={() => onChange({ neutered: n })}
                className={`flex-1 py-2 rounded-lg border font-medium transition-all ${
                  pet.neutered === n
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-500 border-gray-200'
                }`}
              >
                {n === 'yes' ? '是' : '否'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Age */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-gray-700">年齡 *</label>
          {pet.ageYears !== null && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
              {pet.ageYears < 1 ? '幼年期' : pet.ageYears < 3 ? '青年期' : pet.ageYears < 7 ? '壯年期' : '老年期'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={pet.ageYears ?? ''}
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                const val = e.target.value === '' ? null : Math.max(0, parseInt(e.target.value) || 0);
                onChange({ ageYears: val });
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 placeholder:text-gray-300"
            />
            <span className="text-sm font-medium text-gray-500">歲</span>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="number"
              min="0"
              max="11"
              value={pet.ageMonths ?? ''}
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}
              onChange={(e) => {
                const val = e.target.value === '' ? null : Math.max(0, Math.min(11, parseInt(e.target.value) || 0));
                onChange({ ageMonths: val });
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 placeholder:text-gray-300"
            />
            <span className="text-sm font-medium text-gray-500">個月</span>
          </div>
        </div>
      </div>

      {/* Weight */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-bold text-gray-700">體重 (kg) *</label>
        </div>
        <input
          type="number"
          min="0"
          step="0.1"
          value={pet.weight ?? ''}
          placeholder="0"
          onWheel={(e) => e.currentTarget.blur()}
          onChange={(e) => {
            const val = e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value) || 0);
            onChange({ weight: val });
          }}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 placeholder:text-gray-300 mb-3"
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={pet.recentWeightChange}
            onChange={(e) => onChange({ recentWeightChange: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-sm text-gray-600">近期體重劇烈變動</span>
        </label>
      </div>
    </div>
  );
};

export default BasicInfoForm;
