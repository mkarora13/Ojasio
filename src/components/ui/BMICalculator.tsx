import React, { useState } from 'react';
import { Calculator, ArrowRight, User, Target } from 'lucide-react';
import { motion } from 'motion/react';

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      
      if (heightInMeters > 0 && weightInKg > 0) {
        const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
        setBmi(Math.round(calculatedBmi * 10) / 10);
      }
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-700', bg: 'bg-blue-500/10' };
    if (bmi >= 18.5 && bmi < 24.9) return { label: 'Normal weight', color: 'text-green-700', bg: 'bg-green-500/10' };
    if (bmi >= 25 && bmi < 29.9) return { label: 'Overweight', color: 'text-yellow-800', bg: 'bg-yellow-500/10' };
    return { label: 'Obesity', color: 'text-red-700', bg: 'bg-red-500/10' };
  };

  const getNutritionAdvice = (bmi: number) => {
    if (bmi < 18.5) return "Focus on nutrient-dense foods like nuts, avocados, and lean proteins to promote healthy weight gain. Consider a structured weight gain meal plan.";
    if (bmi >= 18.5 && bmi < 24.9) return "Great job! Maintain your current wellness with a balanced diet rich in whole foods, fiber, and adequate hydration.";
    if (bmi >= 25 && bmi < 29.9) return "Small, consistent changes in portion sizes and choosing whole grains over refined carbs can make a significant difference. A personalized weight management plan can help.";
    return "Prioritize a balanced, sustainable anti-inflammatory diet and consult with a clinical nutritionist to safely manage your weight and health markers.";
  };

  return (
    <div className="bg-white rounded-3xl p-8 xl:p-12 shadow-xl border border-[#1A2F2B]/10 max-w-2xl mx-auto my-12 w-full">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#EAC881]/20 text-[#1A2F2B] mb-4">
          <Calculator size={32} />
        </div>
        <h2 className="font-display text-3xl font-bold text-[#1A2F2B] mb-2 tracking-tight">Free BMI Calculator</h2>
        <p className="text-[#1A2F2B]/70">Enter your weight and height to check your Body Mass Index and receive personalized nutrition advice.</p>
      </div>

      <form onSubmit={calculateBMI} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <label htmlFor="weight" className="block text-sm font-semibold text-[#1A2F2B]">Weight (kg)</label>
             <div className="relative">
               <input
                 type="number"
                 id="weight"
                 value={weight}
                 onChange={(e) => setWeight(e.target.value)}
                 className="w-full pl-4 pr-12 py-4 rounded-2xl bg-[#1A2F2B]/5 border border-transparent focus:ring-2 focus:ring-[#EAC881] focus:bg-white focus:border-[#EAC881] transition-all duration-300 outline-none text-[#1A2F2B] font-medium"
                 placeholder="e.g. 70"
                 required
                 min="20"
                 max="300"
                 step="0.1"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A2F2B]/40 font-medium select-none pointer-events-none">kg</span>
             </div>
          </div>
          <div className="space-y-2">
             <label htmlFor="height" className="block text-sm font-semibold text-[#1A2F2B]">Height (cm)</label>
             <div className="relative">
               <input
                 type="number"
                 id="height"
                 value={height}
                 onChange={(e) => setHeight(e.target.value)}
                 className="w-full pl-4 pr-12 py-4 rounded-2xl bg-[#1A2F2B]/5 border border-transparent focus:ring-2 focus:ring-[#EAC881] focus:bg-white focus:border-[#EAC881] transition-all duration-300 outline-none text-[#1A2F2B] font-medium"
                 placeholder="e.g. 170"
                 required
                 min="100"
                 max="250"
                 step="0.1"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A2F2B]/40 font-medium select-none pointer-events-none">cm</span>
             </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full bg-[#1A2F2B] text-white flex items-center justify-center gap-2 hover:bg-[#1A2F2B]/90 transition-all duration-300 font-semibold text-lg hover:shadow-lg hover:-translate-y-0.5"
        >
          Calculate BMI
          <ArrowRight size={20} />
        </button>
      </form>

      {bmi !== null && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 pt-8 border-t border-[#1A2F2B]/10"
        >
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#1A2F2B]/60 block mb-2">Your Result</span>
            <div className="flex items-end justify-center gap-2 mb-3">
              <span className="font-display text-7xl font-bold text-[#1A2F2B] leading-none">{bmi}</span>
              <span className="text-xl text-[#1A2F2B]/60 font-medium pb-2">BMI</span>
            </div>
            
            {(() => {
              const category = getBmiCategory(bmi);
              return (
                <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${category.bg} ${category.color} font-semibold text-sm mb-6`}>
                  <User size={16} />
                  {category.label}
                </div>
              );
            })()}

            <div className="w-full max-w-lg mx-auto mb-10 px-4" role="group" aria-label="BMI Results Chart">
              <div aria-hidden="true" className="relative">
                <div className="relative h-5 w-full text-xs font-semibold text-[#1A2F2B]/60">
                  <span className="absolute left-0 transform -translate-x-1/2">15</span>
                  <span className="absolute left-[14%] transform -translate-x-1/2">18.5</span>
                  <span className="absolute left-[40%] transform -translate-x-1/2">25</span>
                  <span className="absolute left-[60%] transform -translate-x-1/2">30</span>
                  <span className="absolute left-[100%] transform -translate-x-1/2">40+</span>
                </div>
                
                <div className="relative h-4 rounded-full overflow-hidden flex w-full">
                  <div className="h-full bg-blue-300" style={{ width: '14%' }} title="Underweight"></div>
                  <div className="h-full bg-green-400" style={{ width: '26%' }} title="Normal"></div>
                  <div className="h-full bg-yellow-400" style={{ width: '20%' }} title="Overweight"></div>
                  <div className="h-full bg-red-400" style={{ width: '40%' }} title="Obese"></div>
                </div>
                
                <div className="relative w-full h-0">
                  <motion.div 
                    className="absolute top-[-26px] -ml-[8px]"
                    initial={{ left: '0%' }}
                    animate={{ left: `${Math.min(Math.max(((bmi - 15) / 25) * 100, 0), 100)}%` }}
                    transition={{ type: "spring", stiffness: 40, damping: 15, delay: 0.2 }}
                  >
                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#1A2F2B] drop-shadow-md"></div>
                  </motion.div>
                </div>
              </div>
              <div className="sr-only">
                {`Your calculated Body Mass Index is ${bmi}, which is considered ${getBmiCategory(bmi).label}. On the scale, under 18.5 is underweight, 18.5 to 24.9 is normal weight, 25 to 29.9 is overweight, and 30 or greater is obese.`}
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gradient-to-br from-[#1A2F2B]/5 to-transparent rounded-2xl p-6 text-left mb-8 border border-[#1A2F2B]/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#EAC881]/20">
                  <Target size={24} className="text-[#EAC881]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A2F2B] mb-2 text-lg">Nutrition Strategy</h4>
                  <p className="text-[#1A2F2B]/80 text-sm md:text-base leading-relaxed">
                    {getNutritionAdvice(bmi)}
                  </p>
                </div>
              </div>
            </motion.div>

            <button
              onClick={() => window.open('https://wa.me/919990356350')}
              className="inline-flex items-center justify-center w-full px-8 py-4 rounded-full bg-[#EAC881] text-[#1A2F2B] font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg group"
            >
              Get Personalized Diet Plan
              <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
