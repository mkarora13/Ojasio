import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../components/seo/SEO';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import { WhatsAppFloatingButton } from '../../components/ui/WhatsAppFloatingButton';

export const PCOSDietPlan: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "PCOS Diet Plan: The Ultimate Guide for Indian Women & NRIs",
    "description": "Comprehensive PCOS diet plan and nutrition guide targeting insulin resistance, hormonal imbalance, and weight loss. Expert advice from Ojasio.",
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
          "name": "What is the best diet for PCOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The best diet for PCOS focuses on stabilizing blood sugar and lowering insulin. It combines complex carbohydrates, high-quality protein, and healthy fats while minimizing refined sugars and highly processed foods."
          }
        },
        {
          "@type": "Question",
          "name": "Which foods should I completely avoid with PCOS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Avoid refined seed oils, deep-fried items, sugary beverages, and excessive amounts of refined flour (maida) and dairy if you have an intolerance."
          }
        }
      ]
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      <SEO 
        title="PCOS Diet Plan: The Ultimate Guide for Indian Women & NRIs | Ojasio"
        description="Comprehensive PCOS diet plan targeting insulin resistance, hormonal imbalance, and weight loss. Expert advice, 7-day meal plan, and success stories."
        url="https://www.ojasio.com/programs/pcos-diet-plan"
        jsonLdSchema={schema}
      />
      <div className="pt-32 pb-16 px-6 lg:px-12 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-display text-[#1A2F2B] mb-6">PCOS Diet Plan: The Definitive Guide to Reversing Symptoms Naturally</h1>

        <div className="prose md:prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-h2:mt-16 prose-h2:mb-6 prose-p:mb-8 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-li:text-[#1A2F2B]/80 font-sans">
          
          <div className="bg-[#EAC881]/10 p-8 rounded-2xl border border-[#EAC881]/30 mb-12 not-prose">
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Quick Expert Answer</h3>
            <p className="text-[#1A2F2B]/80 font-light leading-relaxed text-lg mb-0">
              The most effective PCOS diet plan focuses on reversing insulin resistance and lowering systemic inflammation. According to Ojasio nutritionist Disha Arora, "PCOS cannot be managed by starving yourself. It requires stabilizing your blood sugar by pairing every carbohydrate with a high-quality protein and fat source. A clinical approach prioritizes fiber-rich lentils, complex grains like amaranth or millets, and anti-inflammatory fats."
            </p>
          </div>

          <p>
            Whether you are struggling with unexplained weight gain in Mumbai, or navigating a busy lifestyle in London, Toronto, or Dubai, Polycystic Ovary Syndrome (PCOS) can feel incredibly isolating. You might be suffering from irregular periods, stubborn belly fat, adult acne, or thinning hair. Perhaps you have been told to "just lose weight" without any actionable guidance.
          </p>

          <p>
            The truth is, your body is not broken. Your metabolism is simply asking for a different fuel strategy. In this comprehensive guide, we will break down exactly how to use food to heal your hormones, featuring a complete 7-day PCOS diet plan tailored for the modern Indian palate—perfectly adaptable for NRIs worldwide.
          </p>

          <h2>Understanding PCOS: What It Is and Why It Happens</h2>
          <p>
            PCOS is a complex endocrine disorder that affects how a woman's ovaries function. According to the World Health Organization (WHO), PCOS affects an estimated 8–13% of women of reproductive age globally, with numbers appearing even higher in South Asian populations.
          </p>
          <p>
            At the core of roughly 70-80% of PCOS cases is <strong>insulin resistance</strong>. When you consume carbohydrates, your body breaks them down into glucose (sugar). Your pancreas releases insulin to usher that glucose into your cells. However, in an insulin-resistant body, the cells ignore the knock. The pancreas reacts by pumping out even more insulin. 
          </p>
          <p>
            This surplus of circulating insulin directly stimulates your ovaries to produce excess testosterone (androgens). Elevated testosterone is the root cause of the classic PCOS symptoms:
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Anovulation and Irregular Cycles:</strong> High androgens block the development and release of an egg.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Hirsutism and Hair Loss:</strong> Excess facial or body hair growth, coupled with thinning scalp hair (androgenic alopecia).</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Stubborn Belly Fat:</strong> Insulin tells your body to store fat, specifically around the visceral (abdominal) area.</span>
            </li>
          </ul>

          <h2>Why Diet is the Primary Treatment for PCOS</h2>
          <p>
            Medications like Metformin or oral contraceptives can manage symptoms, but they do not resolve the underlying metabolic dysfunction. Diet is the only sustainable lever you have to pull to lower insulin resistance. 
          </p>
          <p>
            According to Ojasio nutritionist Disha Arora, "When we optimize a client's diet to flatten their blood sugar curve, we almost immediately see a reduction in cravings and an improvement in energy. Within months, testosterone levels drop, and metabolic healing begins."
          </p>
          <p>
            [Internal link → read our complete guide to hormonal balance here]
          </p>

          <h2>The Ultimate PCOS Food List: What to Eat</h2>
          <p>
            A healing diet revolves around foods that digest slowly and provide maximum nutritional density.
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Complex Carbohydrates (Fiber):</strong> Focus on millets like bajra and jowar, brown rice, steel-cut oats, and sweet potatoes. These cause a very gentle rise in blood sugar compared to refined wheat.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>High-Quality Protein:</strong> Essential for satiety and preserving muscle mass (which burns glucose). Include moong dal, paneer, tofu, eggs, chicken breast, and fish.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Anti-Inflammatory Fats:</strong> Healthy fats do not spike insulin. Use walnuts, flaxseeds, chia seeds, almonds, avocado, and moderate amounts of A2 ghee or cold-pressed oils.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Cruciferous Vegetables:</strong> Broccoli, cauliflower, cabbage, and greens help the liver process and eliminate excess estrogen and toxins.</span>
            </li>
          </ul>

          <h2>PCOS Foods to Avoid Completely</h2>
          <p>
            Certain foods exacerbate insulin resistance and fuel inflammation:
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Refined Sugars & Syrups:</strong> The absolute enemy of insulin sensitivity. Found in sodas, packaged juices, and sweets.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Refined Carbohydrates:</strong> White bread, maida (refined flour), and conventional pasta digest too rapidly.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Seed Oils:</strong> Highly processed oils like soybean, canola, and sunflower oil promote systemic inflammation.</span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <span><strong>Conventional Dairy (For Some):</strong> If you are lactose intolerant or notice dairy triggers cystic acne, switch to almond or coconut milk. Otherwise, organic, full-fat dairy in moderation is acceptable.</span>
            </li>
          </ul>

          <h2>7-Day PCOS Diet Plan: South Asian & NRI Friendly</h2>
          <p>
            This sample meal plan is engineered for blood sugar stabilization, keeping the recipes familiar and easy to source globally.
          </p>

          <div className="overflow-x-auto my-10 not-prose">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#1A2F2B] text-white">
                  <th className="p-4 rounded-tl-xl font-display font-medium text-lg">Day</th>
                  <th className="p-4 font-display font-medium text-lg">Breakfast</th>
                  <th className="p-4 font-display font-medium text-lg">Lunch</th>
                  <th className="p-4 rounded-tr-xl font-display font-medium text-lg">Dinner</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Monday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Moong Dal Chilla with paneer stuffing + mint chutney</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Quinoa or Brown Rice with Rajma (Kidney Beans) + large cucumber salad</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Sautéed Chicken or Tofu with broccoli and zucchini</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Tuesday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Overnight Chia Seed Pudding with almond milk, walnuts, and strawberries</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Jowar Roti + Palak Paneer + mixed sprouts salad</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Clear vegetable soup + grilled fish (or paneer tikka)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Wednesday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">2 Scrambled Eggs (or Besan Chilla) + half an avocado</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Lobia (Black-eyed peas) curry + 1 portion brown rice + yogurt</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Mixed vegetable stir-fry in olive oil with roasted seeds</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Thursday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Oats porridge cooked in water with 1 scoop protein powder and flaxseeds</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Chicken Curry (lean cuts) + 1 Bajra Roti + string beans sabzi</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Dal tadka (tempered lentils) with a large bowl of roasted veggies</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Friday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Pesarattu (Green gram dosa) with coconut chutney</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Soya chunks pulao (made with brown rice) + cucumber raita</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Baked Salmon (or Tofu) with asparagus and lemon</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Saturday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Masala Egg Omelette with spinach + 1 slice of sourdough toast</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Kala Chana (Black chickpeas) curry + 1 multigrain roti</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Light chicken or mushroom soup with a side salad</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A2F2B] rounded-bl-xl">Sunday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Smoothie: Spinach, blueberries, almond butter, and chia seeds</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Enjoy a Mindful Meal (Keep portions checked, pair carbs with protein)</td>
                  <td className="p-4 text-[#1A2F2B]/80 rounded-br-xl font-light">Moong dal soup with steamed vegetables</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Real Experiences: Priya's PCOS Victory in London</h2>
          <p className="border-l-4 border-[#EAC881] pl-6 italic text-[#1A2F2B]/80 font-serif text-xl my-8">
            "When I moved to the UK for work, my PCOS flared up aggressively. The cold weather, the stress, and the reliance on quick supermarket sandwiches caused a 15 kg weight gain in just over a year. My doctor recommended birth control, but I wanted to fix the root cause. Working with Ojasio changed everything. They taught me how to find the right ingredients in London supermarkets to recreate hormone-healing Indian meals. By simply optimizing my breakfast protein and switching my walking routine to post-lunch, my periods returned naturally within 4 months, and the weight began steadily dropping off. I finally feel in control of my body again." — Priya (London, UK)
          </p>
          
          <p>
            [Internal link → discover our diet plan for working professionals]
          </p>

          <div className="mt-24 pt-16 border-t border-[#1A2F2B]/10 not-prose">
            <h2 className="text-3xl font-display text-[#1A2F2B] mb-8 text-center uppercase tracking-widest">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Can I reverse PCOS permanently with diet?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12">
                  <p>PCOS is a genetic predisposition, meaning it cannot be "cured" forever. However, the symptoms are almost entirely driven by lifestyle and diet. Through proper nutrition, you can put PCOS into complete remission, experiencing regular cycles, normalized weight, and clear skin.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  Do I have to give up rice if I have PCOS?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12">
                  <p>No. You do not need to give up rice. The key is serving size and food combinations. A small portion of rice consumed alongside a large portion of protein (like chicken or paneer) and fibrous vegetables will not cause a drastic insulin spike.</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#1A2F2B]/5">
                <h3 className="text-xl font-semibold text-[#1A2F2B] mb-4 flex items-start gap-4">
                  <span className="bg-[#1A2F2B] text-[#EAC881] w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-display mt-0.5 leading-none">Q</span>
                  How fast will I see results on a PCOS diet plan?
                </h3>
                <div className="text-[#1A2F2B]/80 font-light leading-relaxed pl-12">
                  <p>Most individuals notice a significant drop in sugar cravings and an improvement in energy within the first two weeks. Because hormone cycles take roughly 90 days to reset, measurable changes in period regularity and hair growth typically become evident after 3 months of strict compliance.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-[#1A2F2B]/10 text-center not-prose">
             <h4 className="font-display text-3xl text-[#1A2F2B] mb-4">Take Control of Your Health.</h4>
             <p className="text-[#1A2F2B]/60 mb-8 max-w-md mx-auto font-light">
               Ready to address the root cause of your symptoms? Book your free 15-minute discovery call with Ojasio today.
             </p>
             <a href="https://www.ojasio.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1A2F2B] text-white px-8 py-4 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-[#EAC881] hover:text-[#1A2F2B] transition-all duration-300 shadow-[0_10px_30px_rgba(26,47,43,0.2)]">
               Book your free 15-minute discovery call → www.ojasio.com
             </a>
          </div>

        </div>
      </div>
      <WhatsAppFloatingButton />
    </div>
  );
};
