import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../components/seo/SEO';
import { CheckCircle2, Coffee, Clock, Briefcase } from 'lucide-react';
import { WhatsAppFloatingButton } from '../../components/ui/WhatsAppFloatingButton';
import { ReviewsSlider } from '../../components/ui/ReviewsSlider';
import * as ReviewData from '../../data/reviewsData';

export const WorkingProfessionalsDiet: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Diet Plan for Working Professionals | Ojasio",
    "description": "The ultimate diet plan for working professionals in India, UAE, UK, and Canada. Master meal prep, quick healthy meals, office snacks, and high energy.",
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
          "name": "How do I stop falling asleep at my desk after lunch?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The post-lunch crash is entirely caused by a sharp spike and subsequent crash in your blood sugar. To stop this, you must change your lunch composition. Decrease the amount of white rice or refined wheat, and drastically increase protein (chicken, paneer, eggs) and fiber. Also, taking a 10-minute walk after eating dramatically blunts the insulin spike."
          }
        },
        {
          "@type": "Question",
          "name": "Is black coffee bad for my hormones while working?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Black coffee is fine, but timing is everything. Drinking it on an empty stomach first thing in the morning spikes cortisol aggressively. Always drink it after you have had a solid, protein-based breakfast to protect your adrenals and maintain steady energy."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      <SEO 
        title="Diet Plan for Working Professionals | Ojasio"
        description="The ultimate diet plan for working professionals in India, UAE, UK, and Canada. Master meal prep, quick healthy meals, office snacks, and high energy."
        url="https://www.ojasio.com/programs/diet-plan-for-working-professionals"
        jsonLdSchema={schema}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] mb-8 leading-tight">Diet Plan for Working Professionals: Master Your Energy & Focus</h1>
        <p className="text-xl md:text-2xl text-[#1A2F2B]/80 font-light leading-relaxed mb-12">
          From Mumbai commutes to London desk jobs. Discover the no-nonsense clinical framework to meal-prep, snack smartly, and banish the 3 PM burnout permanently.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 max-w-5xl mx-auto pb-24">
        <div className="prose md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-8 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-[#1A2F2B]/80 font-sans">
          
          <div className="bg-[#EAC881]/10 p-8 md:p-10 rounded-2xl border border-[#EAC881]/30 mb-16 not-prose">
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Quick Expert Answer</h3>
            <p className="text-[#1A2F2B]/80 font-light leading-relaxed text-lg mb-0 text-justify">
              "The biggest mistake working professionals make is relying on caffeine for energy instead of actual food. When you are stressed at your desk in Dubai or rushing to a meeting in Toronto, your brain needs stable glucose. If you skip breakfast or eat a high-carb lunch, you will inevitably crash at 3 PM. The clinical solution is not a restrictive diet, but strategic meal assembly—focusing heavily on pre-planned protein and structural hydration—so your brain always has a steady supply of premium fuel."
            </p>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display text-[#1A2F2B] mt-20 mb-10 border-b border-[#EAC881]/30 pb-6 not-prose">The Executive Health Crisis</h2>
          <p>
            You are operating in a high-stakes environment. Whether you are leading a corporate team in India, managing finances in the UAE, or consulting in the UK and Canada, your days are defined by endless meetings, high stress, and very little time for yourself. 
          </p>
          <p>
            The result? Your waistline is slowly expanding, your sleep is broken, and you find yourself staring blankly at your monitor by mid-afternoon. Mainstream advice tells you to "meal prep for 4 hours every Sunday" or "just eat salads." For a busy professional, neither of these is a realistic or sustainable long-term strategy.
          </p>

          <h2 className="text-3xl lg:text-4xl font-display text-[#1A2F2B] mt-20 mb-10 border-b border-[#EAC881]/30 pb-6 not-prose">Why the "Corporate Diet" Fails</h2>
          <p>
            Most professionals fall into a chaotic eating cycle driven by convenience and stress.
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>The Fasted Morning Trap:</strong> Running out the door with just coffee. This spikes adrenaline and cortisol, keeping your nervous system in "fight or flight" mode all day.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>The Carbo-Loaded Lunch:</strong> Eating a massive bowl of white rice, pasta, or ordering a heavy sandwich. This causes a massive insulin spike, directly leading to the infamous "food coma" at your desk.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>The Vending Machine Dinner:</strong> Arriving home starving at 8 PM and bingeing on snacks before you even start cooking dinner.</div>
            </li>
          </ul>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Clock className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">Time Efficiency</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">We focus on "assembly over cooking". A healthy meal should not take more than 15 minutes to put together. </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Coffee className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">Energy Stability</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Say goodbye to the 3 PM crash. We stabilize your blood sugar with high-quality proteins and fats.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Briefcase className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">Cognitive Output</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Omega-3s and antioxidants are prioritized to reduce brain fog and improve executive function during deep work.</p>
            </div>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display text-[#1A2F2B] mt-20 mb-10 border-b border-[#EAC881]/30 pb-6 not-prose">The 5 Pillars of the Executive Diet</h2>
          <p>
            To transform your body composition and skyrocket your productivity, adopt these five non-negotiable pillars. No macro-counting required.
          </p>

          <ol>
             <li className="font-display text-xl mb-2 text-[#1A2F2B]">1. The 30-Gram Breakfast Rule</li>
             <p className="mt-0">If you leave the house having consumed 30 grams of protein, you win the day. High-protein breakfasts (like eggs or a heavy protein smoothie) blunt your hunger hormones for the next 12 hours. It is the highest-ROI habit for a working professional.</p>

             <li className="font-display text-xl mb-2 text-[#1A2F2B]">2. The "Cook Once, Eat Twice" Mandate</li>
             <p className="mt-0">Never cook a fresh lunch from scratch if you are working. Always double the portion of your healthy dinner (like chicken curry or rajma) and neatly pack half immediately into a glass container for the next day's lunch.</p>

             <li className="font-display text-xl mb-2 text-[#1A2F2B]">3. Structural Hydration</li>
             <p className="mt-0">Dehydration manifests as brain fog and false hunger. Keep a 1.5-liter water bottle on your desk. Your singular goal is to finish it before you log off.</p>

             <li className="font-display text-xl mb-2 text-[#1A2F2B]">4. The 3 PM Emergency Stash</li>
             <p className="mt-0">Willpower is a finite resource that gets depleted after back-to-back meetings. Keep a sealed jar of roasted nuts, seeds, or makhana exactly where you can see it at your desk.</p>

             <li className="font-display text-xl mb-2 text-[#1A2F2B]">5. The Golden Ratio Plate</li>
             <p className="mt-0">Whenever you eat at a corporate cafeteria or order out, visualize this: 50% of the plate must be fiber (vegetables/salad), 25% protein (dal/meat), and 25% complex carbs (rice/roti).</p>
          </ol>

          <div className="bg-[#FAF9F6] p-10 rounded-3xl border-l-4 border-[#EAC881] my-16 shadow-sm">
            <h3 className="text-[#1A2F2B] font-display text-2xl block mb-4 mt-0">The Airport / Travel Survival Guide</h3>
            <p className="text-xl font-light m-0 leading-relaxed text-[#1A2F2B]/80">
              When traveling for work (whether flying through Heathrow or transiting in Dubai), lounges are filled with refined carbs that will bloat you immediately. <strong>Always pack a high-quality whey protein packet in your carry-on luggage.</strong> You can mix it with water anywhere in the world to instantly stabilize your hunger, protecting you from the inevitable bread basket.
            </p>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display text-[#1A2F2B] mt-20 mb-10 border-b border-[#EAC881]/30 pb-6 not-prose">7-Day Meal Plan: The High-Performance Routine</h2>
          <p>
            Designed for minimal kitchen time and maximum mental clarity.
          </p>

          <div className="overflow-x-auto my-12 not-prose rounded-2xl shadow-[0_10px_40px_-15px_rgba(26,47,43,0.15)] border border-[#1A2F2B]/10">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#1A2F2B] text-white">
                  <th className="p-6 font-display font-medium text-xl w-32 tracking-wider">Day</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Quick Breakfast (Before Commute)</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Desk Lunch (Reheated or Packed)</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Nourishing Dinner</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Monday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Overnight Protein Oats (prepped Sunday)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Rajma from Sunday night + brown rice</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Grilled Chicken Breast + Roasted broccoli (make double)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Tuesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">3 Scrambled Eggs + 1 slice sourdough toast</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover Grilled Chicken over a massive mixed green salad</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Palak Paneer + 1 Multigrain roti (make double)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Wednesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Protein Shake (Whey, spinach, peanut butter, almond milk)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover Palak Paneer</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Baked Salmon/Fish + Zucchini noodles (15 min cook time)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Thursday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Moong Dal Chillas (batter prepped Sunday)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Ordering out? Go for Greek salad with double grilled chicken</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Soya Chunks Pulao + Dahi (make double)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Friday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Greek Yogurt layered with walnuts and chia seeds</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover Soya Pulao</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Takeout night! (Sushi or Tandoori Chicken recommended)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Saturday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Avocado Toast with 2 poached eggs</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Lentil (Dal) soup with mixed vegetables</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Stir-fry mixed veggies with tofu/chicken</td>
                </tr>
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Sunday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Poha with extra peanuts and green peas</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mindful Cheat Meal (Pizza, Pasta, whatever you crave!)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Meal Prep Dinner: Massive batch of Rajma or Chicken Curry</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-3xl lg:text-4xl font-display text-[#1A2F2B] mt-24 mb-10 border-b border-[#EAC881]/30 pb-6 not-prose">From Struggle to Strength: A Real Ojasio Client Story</h2>
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-sm border border-[#1A2F2B]/5 relative my-16 overflow-hidden not-prose">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#EAC881]/10 rounded-bl-full"></div>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-[#1A2F2B] flex items-center justify-center text-[#EAC881] font-display text-2xl font-bold">K</div>
              <div>
                <h4 className="font-display text-2xl text-[#1A2F2B] m-0">Kavita, 41</h4>
                <p className="text-[#1A2F2B]/60 font-medium text-sm tracking-wider uppercase m-0 mt-1">Dubai, UAE • Chief Financial Officer</p>
              </div>
            </div>
            
            <div className="space-y-6 relative z-10">
              <p className="text-[#1A2F2B]/80 font-serif text-xl leading-relaxed italic m-0">
                "I was working 60-hour weeks, ordering high-end takeout for every meal, and relying on four espressos a day just to function. I came to Ojasio complaining of chronic fatigue, severe bloating, and a creeping weight gain of 10 kilos that wouldn't budge despite hitting the gym sporadically on weekends. I assumed I was just getting older."
              </p>
              <p className="text-[#1A2F2B]/80 font-serif text-xl leading-relaxed italic m-0">
                "They immediately restructured my day. Since I hated cooking, they didn't force me into meal prep. Instead, they audited my favorite takeout spots in Dubai and built a 'Smart Order' menu for my assistants. We replaced my sugary morning latte with a clean protein shake that took 60 seconds to blend."
              </p>
              <p className="text-[#1A2F2B]/80 font-serif text-xl leading-relaxed italic m-0">
                "By week three, my blood sugar stabilized, completely eliminating my afternoon crashes. Within four months, I lost 11 kilos, reversed my pre-diabetes, and gained an immense amount of mental clarity. Ojasio didn't just give me a diet. They gave me a system that actually fits a CFO's schedule."
              </p>
            </div>
          </div>

          <div className="mt-24 pt-16 border-t border-[#1A2F2B]/10 not-prose">
            <div className="text-center mb-16">
              <span className="text-[#EAC881] font-bold tracking-widest uppercase text-sm mb-4 block">Knowledge Base</span>
              <h2 className="text-4xl lg:text-5xl font-display text-[#1A2F2B]">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[#1A2F2B]/5 hover:border-[#EAC881]/50 transition-colors duration-300">
                <h3 className="text-2xl font-display text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  How do I stop falling asleep at my desk after lunch?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-14 text-lg">
                  <p>The post-lunch crash is entirely caused by a sharp spike and subsequent crash in your blood sugar. To stop this, you must change your lunch composition. Decrease the amount of white rice or refined wheat, and drastically increase protein (chicken, paneer, eggs) and fiber. Also, taking a 10-minute walk after eating dramatically blunts the insulin spike.</p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[#1A2F2B]/5 hover:border-[#EAC881]/50 transition-colors duration-300">
                <h3 className="text-2xl font-display text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Is black coffee bad for my hormones while working?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-14 text-lg">
                  <p>Black coffee is fine, but timing is everything. Drinking it on an empty stomach first thing in the morning spikes cortisol aggressively. Always drink it after you have had a solid, protein-based breakfast to protect your adrenals and maintain steady energy.</p>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-[#1A2F2B]/5 hover:border-[#EAC881]/50 transition-colors duration-300">
                <h3 className="text-2xl font-display text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  I really don't have time to cook. Can I still lose weight?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-14 text-lg">
                  <p>Absolutely. Weight loss is about choices, not culinary skills. You can buy pre-boiled eggs, pre-cut salads, ready-made roasted chicken, and plain Greek yogurt from the supermarket. Assembly takes 5 minutes. If you have to order in, just follow the Golden Ratio (50% veg, 25% protein, 25% complex carbs).</p>
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
             <a href="https://calendly.com/ojasiocare" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center justify-center bg-[#EAC881] text-[#1A2F2B] px-8 py-5 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(234,200,129,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)]">
               BOOK YOUR FREE 20 MINUTE DISCOVERY CALL
             </a>
          </div>

        </div>
      </section>
      <WhatsAppFloatingButton />
    </div>
  );
};
