import React from 'react';
import { Recommendation } from '../types';
import { AlertTriangle, Lightbulb, Info, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../constants';

interface ExpertRecommendationsProps {
  recommendations: Recommendation[];
  loading: boolean;
  petBreed?: string;
}

const ExpertRecommendations: React.FC<ExpertRecommendationsProps> = ({ recommendations, loading, petBreed }) => {
  if (loading) {
    return (
      <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 animate-pulse">
        <div className="h-6 w-48 bg-orange-200 rounded mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-orange-100 rounded"></div>
          <div className="h-4 w-3/4 bg-orange-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <Info className="w-5 h-5 text-orange-500" />
        健康建議與產品推薦
      </h3>
      <AnimatePresence>
        {recommendations.map((rec, index) => {
          const hasProducts = rec.content.includes('推薦產品：');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-4 rounded-xl border ${
                rec.type === 'warning'
                  ? 'bg-red-50 border-red-100 text-red-800'
                  : 'bg-white border-orange-100 text-gray-800 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                {rec.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                ) : (
                  <Lightbulb className="w-5 h-5 mt-0.5 flex-shrink-0 text-orange-500" />
                )}
                <div className="flex-1">
                  <h4 className={`font-bold text-sm mb-1 ${rec.type === 'warning' ? 'text-red-900' : 'text-orange-600'}`}>
                    {rec.title}
                  </h4>
                  <p className="text-sm leading-relaxed opacity-90 whitespace-pre-line">{rec.content}</p>
                  
                  {hasProducts && (
                    <div className="mt-4 space-y-3">
                      {PRODUCTS.filter(p => rec.content.includes(p.name)).map(product => {
                        const isDalmatian = petBreed === '大麥町 (Dalmatian)';
                        const isGreenMussel = product.name === '德國 100%天然綠唇貽貝精華粉';
                        const shouldShowRecommended = product.isRecommended && !(isDalmatian && isGreenMussel);

                        return (
                          <div key={product.name} className="flex gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 items-center relative overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover bg-white" referrerPolicy="no-referrer" />
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-800">{product.name}</p>
                              <p className="text-[10px] text-gray-500 line-clamp-1">{product.description}</p>
                              <button className="mt-1 flex items-center gap-1 text-[10px] font-bold text-white bg-orange-500 px-2 py-1 rounded-full">
                                <ShoppingCart className="w-3 h-3" /> 立即購買
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <p className="text-[10px] text-gray-400 mt-2 italic">
        * 以上建議由 AI 專家系統生成，僅供參考。
      </p>
    </div>
  );
};

export default ExpertRecommendations;
