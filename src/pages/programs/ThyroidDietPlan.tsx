import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../components/seo/SEO';
import { CheckCircle2, ShieldAlert, Zap, Droplets } from 'lucide-react';
import { WhatsAppFloatingButton } from '../../components/ui/WhatsAppFloatingButton';

export const ThyroidDietPlan: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "Thyroid Diet Plan: The Complete Guide for Hypothyroidism & Hyperthyroidism",
    "description": "Evidence-based Thyroid diet plan targeting hypothyroidism, hyperthyroidism, and Hashimoto's. Discover how to use food to heal your thyroid and boost metabolism.",
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
          "name": "Should I avoid all cruciferous vegetables if I have a thyroid condition?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Goitrogens in raw cruciferous vegetables (like cabbage and cauliflower) can interfere with iodine uptake. However, cooking these vegetables deactivates the goitrogenic compounds, making them perfectly safe to eat in moderate amounts."
          }
        },
        {
          "@type": "Question",
          "name": "Can a diet cure my hypothyroidism permanently?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hypothyroidism (particularly Hashimoto's) is an autoimmune condition. While diet may not 'cure' the genetic predisposition, an anti-inflammatory diet can put the condition into clinical remission, drastically lower TPO antibodies, and eliminate symptoms like brain fog and hair loss."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      <SEO 
        title="Thyroid Diet Plan: The Complete Guide for Indian Women & NRIs | Ojasio"
        description="Evidence-based Thyroid diet plan targeting hypothyroidism and hyperthyroidism. Discover how to use food to heal your thyroid and boost metabolism."
        url="https://www.ojasio.com/programs/thyroid-diet-plan"
        jsonLdSchema={schema}
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] mb-8 leading-tight">The Ultimate Thyroid Diet Plan: From Hypothyroidism to Healing</h1>
        <p className="text-xl md:text-2xl text-[#1A2F2B]/80 font-light leading-relaxed mb-12">
          Harness the power of clinical nutrition to lower inflammation, boost your basal metabolic rate, and eliminate brain fog—tailored specifically for the Indian and NRI lifestyle.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 lg:px-12 max-w-5xl mx-auto pb-24">
        <div className="prose md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-8 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-[#1A2F2B]/80 font-sans">
          
          <div className="bg-[#EAC881]/10 p-8 md:p-10 rounded-2xl border border-[#EAC881]/30 mb-16 not-prose">
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Quick Expert Answer</h3>
            <p className="text-[#1A2F2B]/80 font-light leading-relaxed text-lg mb-0 text-justify">
              "You cannot just pop a Thyroxine pill and expect your metabolism to magically fix itself if you continue to eat an inflammatory diet. The vast majority of hypothyroidism cases, especially among Indian women, are autoimmune (Hashimoto's). The only way to stop the immune system from attacking your thyroid gland is to remove systemic triggers—like gluten, processed soy, and refined seed oils—while front-loading nutrients essential for T4 to T3 conversion, namely Selenium, Zinc, and Vitamin D." <br/><br/>
              <span className="font-medium text-[#1A2F2B]">— Disha Arora, Certified Nutrition Manager at Ojasio</span>
            </p>
          </div>

          <h2>Understanding the Thyroid Gland: Your Body's Master Metronome</h2>
          <p>
            Your thyroid is a small, butterfly-shaped gland located at the base of your neck. It acts as the master metronome for your entire body, dictating how fast or slow your cells convert nutrients into energy. 
          </p>
          <p>
            According to the American Thyroid Association, women are five to eight times more likely than men to have thyroid problems. For Indian women—both locally and living as NRIs—stress, nutrient-depleted soils, and diets heavy in refined carbohydrates act as the perfect storm for thyroid dysfunction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#1A2F2B]/5 border-t-4 border-t-[#EAC881]">
              <h4 className="font-display text-2xl text-[#1A2F2B] mb-4">Hypothyroidism (Underactive)</h4>
              <p className="font-light text-[#1A2F2B]/80 text-[15px] leading-relaxed mb-4">
                The metronome is ticking too slowly. T4 and T3 hormones are low. The body goes into hibernation mode.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><ShieldAlert size={16} className="text-[#EAC881] mt-0.5" /> Rapid, unexplained weight gain</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><ShieldAlert size={16} className="text-[#EAC881] mt-0.5" /> Hair falling out in clumps</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><ShieldAlert size={16} className="text-[#EAC881] mt-0.5" /> Severe fatigue and brain fog</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><ShieldAlert size={16} className="text-[#EAC881] mt-0.5" /> Constipation</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#1A2F2B]/5 border-t-4 border-t-[#1A2F2B]">
              <h4 className="font-display text-2xl text-[#1A2F2B] mb-4">Hyperthyroidism (Overactive)</h4>
              <p className="font-light text-[#1A2F2B]/80 text-[15px] leading-relaxed mb-4">
                The metronome is frantic. The gland pumps out excess hormone, throwing the body into overdrive.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><Zap size={16} className="text-[#1A2F2B] mt-0.5" /> Rapid, unintentional weight loss</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><Zap size={16} className="text-[#1A2F2B] mt-0.5" /> Heart palpitations and anxiety</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><Zap size={16} className="text-[#1A2F2B] mt-0.5" /> Profuse sweating</li>
                <li className="flex items-start gap-2 text-sm text-[#1A2F2B]/70"><Zap size={16} className="text-[#1A2F2B] mt-0.5" /> Diarrhea</li>
              </ul>
            </div>
          </div>

          <h2>Why Diet is Crucial: The T4 to T3 Conversion Problem</h2>
          <p>
            When your doctor prescribes Levothyroxine (e.g., Thyronorm), they are giving you a synthetic version of the *inactive* thyroid hormone, T4. But your cells cannot use T4. Your body, specifically the liver and gut, must convert that T4 into the *active* form, T3. 
          </p>
          <p>
             Here is the catch: that conversion process relies heavily on specific nutrients (Selenium, Zinc, Iron, and B-vitamins) and a healthy gut microbiome. If you are eating a highly inflammatory diet (like consuming refined seed oils and excessive sugar), your liver gets congested, your gut gets inflamed, and you fail to convert the T4 medicine into the T3 energy your body desperately needs. This is why so many women have "normal" lab results but still feel exhausted.
          </p>

          <h2>The Hypothyroidism Healing List: What to Eat</h2>
          <p>
            If you are aiming to heal an underactive thyroid, focus on these critical nutrient pillars:
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Selenium (The Converter):</strong> Selenium acts as the catalyst to convert T4 to active T3. The easiest way to get it? Eat exactly <strong>two Brazil nuts</strong> every morning. Also found in sunflower seeds, fish, and pasture-raised eggs.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Zinc (The Synthesizer):</strong> Required for the production of thyroid hormone. Load your plate with pumpkin seeds, lentils (sprouted are even better), and chickpeas.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">High-Quality Protein:</strong> The thyroid requires the amino acid Tyrosine to function. Do not skimp on paneer, lean chicken, eggs, and deep-sea fatty fish to ensure a robust amino acid profile.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Iodine (Use Caution):</strong> The thyroid needs iodine to make hormones. However, iodine deficiency is rare in modern diets due to iodized salt. For most Hashimoto's patients, taking high doses of iodine supplements can actually be like throwing gasoline on an autoimmune fire. Stick to dietary iodine via iodized salt and moderate seaweeds.</div>
            </li>
          </ul>

          <h2>The "Do Not Eat" List for Thyroid Health</h2>
          <p>
            When treating Hashimoto's (autoimmune hypothyroidism), removing food triggers is mathematically more important than adding superfoods. 
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#1A2F2B] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Gluten:</strong> The molecular structure of gluten closely resembles the structure of the thyroid gland. In Hashimoto's, eating gluten causes the immune system to mistakenly attack your thyroid (molecular mimicry). Eliminating wheat, barley, and rye is often a game-changer.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#1A2F2B] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Unfermented Soy:</strong> Soy milk, highly processed tofu, and edamame contain compounds that can impair the thyroid's ability to absorb iodine. (Fermented soy like miso or tempeh in extreme moderation is generally acceptable).</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={28} className="text-[#1A2F2B] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B] text-xl block mb-1">Refined Sugars & Seed Oils:</strong> These fuel systemic inflammation, destroying the gut lining where 20% of your T4 to T3 conversion occurs.</div>
            </li>
          </ul>

          <div className="bg-[#FAF9F6] p-10 rounded-3xl border-l-4 border-[#EAC881] my-16 shadow-sm">
            <p className="text-xl font-light m-0 leading-relaxed text-[#1A2F2B]/80">
              <b className="text-[#1A2F2B] font-display text-2xl block mb-3">💡 Clinical Pro Tip: The Cabbage Myth</b> You do not need to banish cauliflower and cabbage. The goitrogens in cruciferous vegetables only pose a risk when eaten completely raw in massive quantities. When you steam, boil, or sauté broccoli, cabbage, or cauliflower, the heat permanently denatures the goitrogenic compounds, making them perfectly safe and highly beneficial for your liver.
            </p>
          </div>

          <h2>Your 7-Day Thyroid Healing Blueprint (Gluten-Free & Soy-Free)</h2>
          <p>
            This template focuses on maximizing Selenium and Zinc while remaining dairy-optional and entirely gluten-free.
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
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. Moong Dal Chilla + boiled egg</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Quinoa or Brown Rice + Rajma + Cooked Spinach</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Baked Salmon (max Omega 3s) + roasted carrots</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Tuesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. Overnight Chia Pudding (almond milk)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Chicken/Paneer Curry + 1 Bajra Roti + Cucumber</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Light Dal Tadka + Steamed cauliflower with ghee</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Wednesday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. 3 Scrambled Eggs with mushrooms</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Lobia (Black-eyed peas) + Amaranth Roti + Salad</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Lemon Greek Chicken + cooked zucchini</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Thursday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. Poha (flattened rice) with loads of peanuts</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Kala Chana (Black chickpeas) + brown rice</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Stir-fry vegetables (no soy sauce) with paneer</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Friday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. Jowar idli with coconut chutney</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Leftover paneer or chicken wraps (gluten-free wrap)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Fish Curry (or Moong Dal soup) + steamed greens</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Saturday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">2 Brazil Nuts. Gluten-free oats with pumpkin seeds</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Palak Paneer/Chicken + 1 Ragi Roti</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Clear vegetable soup packed with ginger and garlic</td>
                </tr>
                <tr className="hover:bg-[#FAF9F6] transition-colors">
                  <td className="p-6 font-semibold text-[#1A2F2B] text-lg uppercase tracking-wider">Sunday</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Protein Smoothie (Whey/Plant protein, spinach)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mindful Cheat Meal! (Keep portions checked)</td>
                  <td className="p-6 text-[#1A2F2B]/80 font-light border-l border-[#1A2F2B]/5">Mashed sweet potato and grilled fish/tofu</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#1A2F2B]/5 my-16">
            <h2 className="text-3xl font-display text-[#1A2F2B] mt-0 mb-8 border-b border-[#EAC881]/30 pb-4">From Struggle to Strength: A Real Ojasio Client Story</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                 <img loading="lazy" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sarah - Ojasio Client Success Story UK" className="rounded-2xl object-cover w-full h-[300px] shadow-lg" />
              </div>
              <div className="w-full md:w-2/3">
                <p className="font-light text-lg leading-relaxed text-[#1A2F2B]/80 mb-6">
                  Meet Sarah, 38, based in the UK. After her second pregnancy, she was diagnosed with Hashimoto's Hypothyroidism. She was placed on 75mcg of Thyroxine, but two years later, her primary symptoms—crippling brain fog, cold extremities, and severe hair thinning—had not gone away. Her doctor assumed she was just stressed.
                </p>
                <p className="font-light text-lg leading-relaxed text-[#1A2F2B]/80 mb-6">
                  When Sarah partnered with Ojasio, we immediately identified that her high-wheat diet was keeping her antibodies severely elevated. We transitioned her to a delicious, sustainable gluten-free Indian diet, incorporating jowar, bajra, and selenium-rich nuts.
                </p>
                <p className="font-light text-lg leading-relaxed text-[#1A2F2B]/80">
                  By month four, Sarah's TPO antibodies had dropped by 60%. Her brain fog lifted, her hair began to regain volume, and she finally had the energy to keep up with her toddlers. She didn't just mask the symptoms; she cooled the autoimmune fire at the source.
                </p>
              </div>
            </div>
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
                  Should I stop taking my thyroid medication if I go on a diet?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>Absolutely not. Never adjust or stop your thyroid medication without direct blood tests and supervision from your endocrinologist. Our clinical diet plan works in tandem with your medication. As your body heals, your doctor may naturally decide to lower your dose based on your improving labs.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Do I have to give up gluten forever if I have Hashimoto's?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>Current clinical research heavily supports a strict gluten-free trial for at least 3-6 months for patients with Hashimoto's, as molecular mimicry is a significant driver of the autoimmune attack. Many patients find that their symptoms dramatically improve, making the lifestyle change well worth it.</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  What should I eat if I have Hyperthyroidism (Overactive Thyroid)?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12 text-lg">
                  <p>For an overactive thyroid, your metabolism is burning too quickly. You need a high-calorie, nutrient-dense diet to prevent extreme muscle loss. Interestingly, consuming raw cruciferous vegetables (like raw broccoli or raw cabbage) is actually beneficial here, as their goitrogenic properties can gently help slow down thyroid hormone production. You must also prioritize calcium and vitamin D, as hyperthyroidism severely leeches bone density.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2F2B] text-white p-10 md:p-14 rounded-[2.5rem] mt-24 text-center shadow-xl relative overflow-hidden group not-prose">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[80px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EAC881]/10 rounded-full blur-[60px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             
             <h2 className="text-3xl md:text-5xl font-display text-white mb-8 relative z-10">Stop guessing. Start healing.</h2>
             <p className="font-serif text-lg md:text-xl font-light text-white/90 leading-relaxed mb-10 relative z-10 max-w-3xl mx-auto">
                Ready for a roadmap built specifically for your thyroid markers, your lifestyle, and your goals? 
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
