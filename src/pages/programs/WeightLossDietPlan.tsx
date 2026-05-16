import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../components/seo/SEO';
import { CheckCircle2, ChevronRight, Activity, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { WhatsAppFloatingButton } from '../../components/ui/WhatsAppFloatingButton';
import { ReviewsSlider } from '../../components/ui/ReviewsSlider';
import * as ReviewData from '../../data/reviewsData';

export const WeightLossDietPlan: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Weight Loss Diet Plan: Sustainable Fat Loss for Women | Ojasio",
    "description": "Evidence-based weight loss diet plan designed for working women and NRIs. Lose stubborn fat, fix your metabolism, and keep the weight off permanently.",
    "author": {
      "@type": "Person",
      "name": "Disha Arora"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ojasio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ojasio.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is a clinical weight loss diet different from a crash diet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Crash diets severely restrict calories, leading to muscle loss, a damaged metabolism, and immediate weight regain. A clinical weight loss diet focuses on metabolic flexibility, prioritizing protein and fiber to ensure you burn fat while preserving muscle mass and keeping your basal metabolic rate (BMR) high."
          }
        },
        {
          "@type": "Question",
          "name": "Can I lose weight while eating a traditional Indian diet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Traditional Indian diets are rich in lentils, whole grains, and spices that support metabolic health. The key to weight loss is optimizing the macro-nutrient ratio by increasing protein (paneer, chicken, dal) and managing the portion size of carbohydrates (rice, roti)."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      <SEO 
        title="Weight Loss Diet Plan: Sustainable Fat Loss for Women | Ojasio"
        description="Evidence-based weight loss diet plan designed for working women and NRIs. Lose stubborn fat, fix your metabolism, and keep the weight off permanently."
        url="https://www.ojasio.com/programs/weight-loss-diet-plan"
        jsonLdSchema={schema}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] mb-8 leading-tight">The Definitive Weight Loss Diet Plan for the Modern Woman</h1>
        <p className="text-xl md:text-2xl text-[#1A2F2B]/80 font-light leading-relaxed mb-12">
          Stop shrinking yourself. Start fueling your metabolism. Discover the clinical framework designed specifically for Indian women and NRIs to shed stubborn fat, rebuild energy, and never diet again.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 max-w-5xl mx-auto pb-24">
        <div className="prose md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-8 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-[#1A2F2B]/80 font-sans">
          
          <div className="bg-[#EAC881]/10 p-8 md:p-10 rounded-2xl border border-[#EAC881]/30 mb-16 not-prose">
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Quick Expert Answer</h3>
            <p className="text-[#1A2F2B]/80 font-light leading-relaxed text-lg mb-0 text-justify">
              "Sustainable weight loss is not a math equation of calories in versus calories out—it is a hormonal equation. When you severely restrict calories, your body panics, spikes cortisol, and aggressively holds onto fat while burning muscle. To permanently lose weight, you must focus on blood sugar stabilization. Eat adequate protein to preserve muscle mass, incorporate healthy fats to signal safety to your brain, and prioritize fiber to feed your microbiome." <br/><br/>
              <span className="font-medium text-[#1A2F2B]">— Disha Arora, Certified Nutrition Manager at Ojasio</span>
            </p>
          </div>

          <h2>The Truth About Weight Loss for Women Over 25</h2>
          <p>
            You have likely read every magazine article, downloaded every fitness app, and tried fasting until noon. Perhaps you lost 5 kilos, only to gain back 7 when you inevitably resumed a normal lifestyle. 
          </p>
          <p>
            It is not a failure of willpower. It is a failure of approach. 
          </p>
          <p>
            For working women navigating their late 20s, 30s, and 40s, weight loss is deeply intertwined with metabolic age, stress (cortisol), and hormonal shifts. The modern lifestyle—sitting for 10 hours a day, eating refined foods at odd hours, and chronic sleep deprivation—fundamentally alters how your body processes energy. 
          </p>

          <h2>Core Principles of Clinical Fat Loss</h2>
          <p>
            At Ojasio, our weight loss philosophy is rooted in metabolic restoration. Before you can lose weight, you have to heal the systems that govern fat storage. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Activity className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">1. Muscle Preservation</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Muscle is metabolically expensive; it burns calories even when you are resting. Our diet plans mandate high protein to ensure the weight you lose is pure fat, not your metabolic engine.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <TrendingDown className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">2. Insulin Management</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Insulin is the fat-storage hormone. When insulin is high, fat burning is physically impossible. We structure meals to flatten blood sugar curves, keeping you in a fat-oxidation state longer.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <ShieldCheck className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">3. Hormonal Safety</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Extreme diets signal "famine" to your brain, lowering thyroid function and pausing ovulation. Gentle deficits and nutrient density signal "safety", allowing the body to release stored fat.</p>
            </div>
          </div>

          <h2>The Indian and NRI Weight Loss Strategy</h2>
          <p>
            A major hurdle for Indian women living locally or abroad (in the UK, Canada, UAE, or USA) is adapting a traditional Indian palate to modern metabolic science. You do not need to abandon your heritage to be healthy. The Indian diet is fundamentally nutritious; it simply requires architectural restructuring. 
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Flipping the Ratios:</strong> In a standard Indian thali, rice or roti occupies 60% of the plate, dal 20%, and sabzi (vegetables) 20%. For weight loss, vegetables must occupy 50%, protein (dal, paneer, chicken) 25%, and carbs (rice, roti) 25%.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Choosing Ancestral Grains:</strong> Moving away from highly refined wheat (maida) back to ancestral, robust grains like jowar, bajra, ragi, and amaranth. These grains are packed with resistant starch that feeds the gut microbiome.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Smart Snacking:</strong> Swapping the 4 PM chai and biscuits for spiced makhana (fox nuts), roasted chana, or a handful of almonds and walnuts. </div>
            </li>
          </ul>

          <div className="bg-[#FAF9F6] p-10 rounded-3xl border-l-4 border-[#EAC881] my-16 shadow-sm">
            <h3 className="text-[#1A2F2B] font-display text-2xl block mb-4 mt-0">The 30-30-30 Rule</h3>
            <p className="text-xl font-light m-0 leading-relaxed text-[#1A2F2B]/80">
              For an optimal start to your day, aim to consume <strong>30 grams of protein</strong> within <strong>30 minutes of waking up</strong>. This simple intervention dramatically improves morning insulin sensitivity and cuts evening sugar cravings in half. A scoop of high-quality whey protein, a large portion of eggs, or a dense moong dal chilla are perfect vehicles.
            </p>
          </div>

          <h2>Your 7-Day Fat Loss Blueprint</h2>
          <p>
            This plan is designed not as a prescription, but as an educational template to show you how a clinical weight loss week looks when structured correctly. 
          </p>

          <div className="overflow-x-auto my-12 not-prose rounded-2xl shadow-[0_10px_40px_-15px_rgba(26,47,43,0.15)] border border-[#1A2F2B]/10">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#1A2F2B] text-white">
                  <th className="p-6 font-display font-medium text-xl w-32 tracking-wider">Day</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Breakfast</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Lunch</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Dinner</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Monday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Besan Chilla packed with grated paneer</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Chicken/Tofu Curry + 1 Bajra Roti + Salad</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Light Dal Tadka + Large bowl of sautéed veggies</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Tuesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Protein Smoothie (Spinach, whey/plant protein, chia seeds)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Rajma (Kidney bean) salad with cucumber, tomato, paneer</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Grilled Chicken Breast or Grilled Paneer with asparagus</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Wednesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">3 Scrambled Eggs with spinach and mushrooms</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Brown Rice Pulao with Soya Chunks + Raita</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Fish Tikka (or Cauliflower Tikka) + Mint Chutney</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Thursday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">High-protein Greek yogurt with walnuts & berries</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Chana Masala + 1 Jowar Roti + Green Salad</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Zucchini Noodles with minced chicken or lentils</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Friday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Moong Dal Dosa (Pesarattu)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover dinner OR Grilled Chicken Caesar Salad</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Baked Salmon (or Tofu) with roasted broccoli</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Saturday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Oats Porridge with 1 scoop protein & seeds</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Palak Paneer + Small portion brown rice</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Clear chicken or vegetable soup with a large salad</td>
                </tr>
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Sunday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Masala Omelette + 1 slice sourdough toast</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mindful Meal out! (Focus on protein, enjoy the carbs)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Moong Dal soup with steamed vegetables</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Success Story: Escaping the Diet Trap</h2>
          <p className="border-l-4 border-[#EAC881] pl-6 italic text-[#1A2F2B]/80 font-serif text-xl my-10 bg-white p-8 rounded-tr-2xl rounded-br-2xl shadow-sm border-t border-b border-r">
            "I had tried every diet under the sun—keto, intermittent fasting, juice cleanses. I would always lose a few kilos, only to rebound spectacularly a month later. It completely destroyed my relationship with food. Working with Disha and the Ojasio team completely changed my paradigm. They didn't put me on a diet; they rebuilt my metabolism. By eating more protein and actually incorporating carbs back into my meals strategically, my energy levels soared. I lost 14 kilos over 6 months, and for the first time in ten years, I know exactly what to do to keep it off. It feels like absolute freedom." <br/><br/>
            <span className="font-sans font-semibold text-lg text-[#1A2F2B]">— Ananya (London, UK)</span>
          </p>

          <div className="not-prose my-16">
            <h3 className="font-display text-3xl text-center mb-10 text-[#1A2F2B]">More Success Stories</h3>
            <ReviewsSlider reviews={ReviewData.WEIGHT_LOSS_REVIEWS} />
          </div>

          <div className="mt-24 pt-16 border-t border-[#1A2F2B]/10 not-prose">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-[#EAC881] flex-1"></div>
              <h2 className="text-3xl font-display font-normal text-[#1A2F2B] m-0 text-center uppercase tracking-widest bg-[#EAC881]/10 py-3 px-8 rounded-full border border-[#EAC881]/30 shadow-sm">Frequently Asked Questions</h2>
              <div className="h-px bg-[#EAC881] flex-1"></div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  How fast is it safe to lose weight?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>A clinically safe and sustainable rate of fat loss is between 0.5 to 1 kilogram per week. Rapid weight loss (e.g., 5 kilos in a week) is almost entirely water and muscle depletion, which damages your metabolism and guarantees rapid regain.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Can I drink alcohol on a weight loss diet?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>Yes, but with caveats. Your body treats alcohol as a toxin. When you drink, your liver stops metabolizing fat to process the alcohol. If you choose to drink, stick to clear spirits with soda (no sugary mixers like tonic or juice) and limit it to 1-2 drinks a week, ensuring you stay highly hydrated.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Do I need to do heavy cardio to lose weight?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>Actually, extreme, high-intensity cardio every day can sometimes stall weight loss by driving cortisol too high. The most effective protocol for fat loss is a combination of a high-protein diet, strength-training (to build muscle), and low-intensity steady-state movement (like walking 8,000-10,000 steps daily) to oxidize fat without spiking stress.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2F2B] text-white p-10 md:p-14 rounded-[2.5rem] mt-24 text-center shadow-xl relative overflow-hidden group not-prose">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[80px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EAC881]/10 rounded-full blur-[60px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             
             <h2 className="text-3xl md:text-5xl font-display text-white mb-8 relative z-10">Stop guessing. Start healing.</h2>
             <p className="font-serif text-lg md:text-xl font-light text-white/90 leading-relaxed mb-10 relative z-10 max-w-3xl mx-auto">
                Ready for a roadmap built specifically for your metabolism, your lifestyle, and your goals? 
             </p>
             <a href="https://www.ojasio.com" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center justify-center bg-[#EAC881] text-[#1A2F2B] px-8 py-5 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(234,200,129,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)]">
               Book your free 15-minute discovery call
             </a>
          </div>

        </div>
      </section>
      <WhatsAppFloatingButton />
    </div>
  );
};
