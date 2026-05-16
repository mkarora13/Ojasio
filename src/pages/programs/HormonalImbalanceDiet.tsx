import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../components/seo/SEO';
import { CheckCircle2, Waves, Heart, Flame } from 'lucide-react';
import { WhatsAppFloatingButton } from '../../components/ui/WhatsAppFloatingButton';
import { ReviewsSlider } from '../../components/ui/ReviewsSlider';
import * as ReviewData from '../../data/reviewsData';

export const HormonalImbalanceDiet: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Hormonal Imbalance Diet Plan: The Ultimate Guide to Resetting Your Body",
    "description": "Expert-driven hormonal imbalance diet. Learn how to manage estrogen dominance, high cortisol, and adrenal fatigue naturally through clinical nutrition.",
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
          "name": "How long does it take to balance hormones with diet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Because human cells and hormonal cycles take about 90 to 100 days to fully turn over, the timeline for meaningful hormonal healing is roughly 3 months (90 days). However, physiological shifts such as reduced bloating, deeper sleep, and fewer sugar cravings can often be observed within the first two weeks of adopting a hormone-balancing diet."
          }
        },
        {
          "@type": "Question",
          "name": "Can intermittent fasting cause hormonal imbalance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For women of reproductive age, aggressive intermittent fasting (such as 16+ hours) can definitely act as an environmental stressor. When the body goes without food for long periods, it signals the adrenal glands to pump out cortisol. Chronically high cortisol can down-regulate progesterone and suppress ovulation."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      <SEO 
        title="Hormonal Imbalance Diet Plan: Reset Your Body | Ojasio"
        description="Expert-driven hormonal imbalance diet. Learn how to manage estrogen dominance, high cortisol, and adrenal fatigue naturally through clinical nutrition."
        url="https://www.ojasio.com/programs/hormonal-imbalance-diet"
        jsonLdSchema={schema}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] mb-8 leading-tight">The Complete Hormonal Imbalance Diet: How to Eat Your Way back to Health</h1>
        <p className="text-xl md:text-2xl text-[#1A2F2B]/80 font-light leading-relaxed mb-12">
          Master your metabolism by addressing the root cause. Discover the clinical nutrition frameworks designed to conquer estrogen dominance, lower cortisol, and rebuild adrenal health naturally.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 max-w-5xl mx-auto pb-24">
        <div className="prose md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-8 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-[#1A2F2B]/80 font-sans">
          
          <div className="bg-[#EAC881]/10 p-8 md:p-10 rounded-2xl border border-[#EAC881]/30 mb-16 not-prose">
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Quick Expert Answer</h3>
            <p className="text-[#1A2F2B]/80 font-light leading-relaxed text-lg mb-0 text-justify">
              "Your hormones are not random actors; they are messengers heavily influenced by what you eat and how you live. The symptoms you experience—whether it's crippling PMS, unexplained weight gain, or midnight anxiety—are simply your body frantically communicating that the chemical environment is flawed. The fastest way to restore hormonal balance is not through obscure supplements, but by systematically reducing inflammation, stabilizing blood sugar, and ensuring your liver and gut can properly excrete used hormones." <br/><br/>
              <span className="font-medium text-[#1A2F2B]">— Disha Arora, Certified Nutrition Manager at Ojasio</span>
            </p>
          </div>

          <h2>The Silent Epidemic of Hormonal Chaos</h2>
          <p>
            Whether you are a corporate executive in New York or a busy mother in Mumbai, you have likely normalized feeling less than optimal. You drink three coffees to power through the morning, experience intense sugar cravings by 4 PM, suffer from painful periods, and toss and turn all night. 
          </p>
          <p>
            Mainstream medicine often labels these symptoms as "normal" parts of aging or simply prescribes synthetic hormones (like the birth control pill) to mask the discomfort. But the underlying issue—a foundational hormonal imbalance—remains untreated. 
          </p>

          <h2>Understanding the Big Three Disruptions</h2>
          <p>
            Hormonal imbalance rarely occurs in isolation. It is usually a domino effect involving three major systems:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12 not-prose">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Waves className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">Estrogen Dominance</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">When estrogen is too high relative to progesterone. Leads to heavy periods, severe PMS, breast tenderness, fibroids, and weight gain around the hips and thighs. Driven by poor liver function, lack of fiber, and environmental toxins.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Flame className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">High Cortisol (The Stress Hormone)</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">When the body is under constant stress, it pumps out cortisol. Chronic high cortisol causes the body to store visceral fat (belly fat), destroys sleep architecture, and directly steals resources from producing progesterone.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
              <Heart className="text-[#EAC881] w-12 h-12 mb-4" />
              <h4 className="font-display text-xl text-[#1A2F2B] mb-3">Low Progesterone</h4>
              <p className="font-light text-[#1A2F2B]/80 text-sm leading-relaxed">Progesterone is the calming, anti-anxiety hormone that thickens the uterine lining and promotes deep sleep. It is the first hormone to drop when the body is stressed by chronic dieting or over-exercising.</p>
            </div>
          </div>

          <h2>The Liver-Gut Connection to Hormonal Balance</h2>
          <p>
            Many people do not realize that hormones are not just produced; they must also be excreted. Once estrogen has done its job in your body, it travels to the liver. The liver packages up the used estrogen and sends it to the gut, where it binds to fiber and leaves the body through a bowel movement. 
          </p>
          <p>
            If your liver is sluggish (from a diet high in processed foods or alcohol) or if you are constipated (from a lack of fiber), that packaged estrogen cannot escape. Instead, it gets reabsorbed into the bloodstream, circulating again and causing systemic estrogen dominance. 
          </p>

          <h2>The Hormonal Imbalance Diet: What to Eat</h2>
          <p>
            Healing a hormonal imbalance requires feeding your liver and stabilizing your adrenals. Focus on incorporating these super-frames into your day:
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Cruciferous Vegetables (The Estrogen Detoxifiers):</strong> Broccoli, cauliflower, Brussels sprouts, and cabbage contain a compound called DIM (Diindolylmethane). DIM specifically aids the liver in breaking down estrogen safely. Aim for at least one serving a day.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Root Vegetables (The Adrenal Soothers):</strong> Complex, slow-burning carbohydrates like sweet potatoes, carrots, and beets are essential for bringing high cortisol levels down. A small portion at dinner can significantly improve sleep quality.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>High-Quality Fats (The Building Blocks):</strong> Your body literally manufactures sex hormones from cholesterol. You must consume high-quality fats like avocados, walnuts, chia seeds, flax seeds, and cold-pressed olive or coconut oil. Low-fat diets are notorious for crushing hormone production.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong>Protein at Every Meal (The Blood Sugar Anchor):</strong> Managing insulin is the first rule of hormonal club. You must anchor every meal with 20 to 30 grams of protein to prevent the blood sugar spikes that trigger cortisol release.</div>
            </li>
          </ul>

          <div className="bg-[#FAF9F6] p-10 rounded-3xl border-l-4 border-[#EAC881] my-16 shadow-sm">
            <h3 className="text-[#1A2F2B] font-display text-2xl block mb-4 mt-0">The Cortisol-Coffee Reality Check</h3>
            <p className="text-xl font-light m-0 leading-relaxed text-[#1A2F2B]/80">
              If you wake up and immediately drink black coffee on an empty stomach, you are actively engaging in hormonal sabotage. Caffeine on an empty stomach drastically spikes cortisol and adrenaline. Always consume at least two glasses of water and a solid, protein-rich breakfast <strong>before</strong> having your morning coffee. 
            </p>
          </div>

          <h2>Seed Cycling: A Gentle Hormonal Support Protocol</h2>
          <p>
            Seed cycling is a naturopathic protocol that uses specific seeds to support the two main phases of the menstrual cycle. It provides the specific fatty acids and nutrients required to boost estrogen in the first half and progesterone in the second half.
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#1A2F2B] shrink-0 mt-1" />
              <div><strong>Phase 1 (Follicular Phase - Days 1 to 14):</strong> From the first day of your period until ovulation. Consume 1 tablespoon each of freshly ground <strong>Flax seeds</strong> and <strong>Pumpkin seeds</strong> daily. These support healthy estrogen levels.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#1A2F2B] shrink-0 mt-1" />
              <div><strong>Phase 2 (Luteal Phase - Days 15 to 28):</strong> From ovulation until the start of your next period. Switch to 1 tablespoon each of freshly ground <strong>Sunflower seeds</strong> and <strong>Sesame seeds</strong> daily. These are rich in zinc and vitamin E, which support progesterone production.</div>
            </li>
          </ul>

          <h2>7-Day Hormone Resect Meal Plan (Global Edition)</h2>
          <p>
            This plan is engineered to support your adrenals, detoxify estrogen, and keep your blood sugar perfectly flat.
          </p>

          <div className="overflow-x-auto my-12 not-prose rounded-2xl shadow-[0_10px_40px_-15px_rgba(26,47,43,0.15)] border border-[#1A2F2B]/10">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#1A2F2B] text-white">
                  <th className="p-6 font-display font-medium text-xl w-32 tracking-wider">Day</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Nourishing Breakfast</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Grounding Lunch</th>
                  <th className="p-6 font-display font-medium text-lg border-l border-white/10">Liver-Supporting Dinner</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Monday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Eggs cooked in ghee + spinach + ½ avocado</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Quinoa salad with roasted chickpeas, cucumber, olive oil</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Baked Salmon (or Tofu) + roasted Brussels sprouts</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Tuesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Chia Seed Pudding (almond milk) + whey protein + walnuts</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Chicken/Paneer Curry + 1 portion brown rice + Broccoli</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Steamed asparagus + sweet potato + light dal</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Wednesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Moong Dal Chilla (savory pancake) + mint chutney</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Lentil soup + mixed green salad with pumpkin seeds</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Stir-fry mixed veggies with grilled chicken</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Thursday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Gluten-free oats + flax seeds + blueberries</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Rajma (Kidney beans) + 1 Multigrain Roti + Dahi</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Zucchini Noodles with minced chicken/lentils + marinara</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Friday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Besan Chilla packed with grated paneer</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover stir-fry or Grilled Chicken Wrap</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Bone broth (or clear vegetable broth) + steamed veggies</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Saturday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mashed avocado on sourdough toast + 2 boiled eggs</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Palak Paneer/Chicken + 1 Ragi Roti</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Cabbage rolls stuffed with lean protein + tomato sauce</td>
                </tr>
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Sunday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Protein Smoothie (Whey/Plant protein, spinach, berries)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mindful Cheat Meal! (Keep portions checked)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Moong Dal soup with steamed greens</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="not-prose my-16">
            <h3 className="font-display text-3xl text-center mb-10 text-[#1A2F2B]">Success Stories of Hormonal Harmony</h3>
            <ReviewsSlider reviews={ReviewData.HORMONAL_BALANCE_REVIEWS} />
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
                  How long does it take to balance hormones with diet?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>Because human cells and hormonal cycles take about 90 to 100 days to fully turn over, the timeline for meaningful hormonal healing is roughly 3 months (90 days). However, physiological shifts such as reduced bloating, deeper sleep, and fewer sugar cravings can often be observed within the first two weeks of adopting a hormone-balancing diet.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Can intermittent fasting cause hormonal imbalance?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>For women of reproductive age, aggressive intermittent fasting (such as 16+ hours) can definitely act as an environmental stressor. When the body goes without food for long periods, it signals the adrenal glands to pump out cortisol. Chronically high cortisol can down-regulate progesterone and suppress ovulation. For most women, 12 to 14 hours of overnight fasting is a much safer, hormone-friendly baseline.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Do I need hormone testing before starting a diet?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>While comprehensive testing (such as a DUTCH test or standard blood work) is fantastic for identifying the exact broken pathways, you do not need a test to begin foundational healing. Stabilizing blood sugar, improving liver health with cruciferous vegetables, and reducing stress will benefit every hormonal profile across the board.</p>
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
