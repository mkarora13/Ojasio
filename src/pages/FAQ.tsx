import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, ArrowRight, Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { WhatsAppFloatingButton } from '../components/ui/WhatsAppFloatingButton';
import { SEO } from '../components/seo/SEO';

const faqs = [
  {
    question: "What is the core philosophy of Ojasio?",
    answer: (
      <>
        <p className="mb-4">
          Ojasio functions as an elite clinical nutrition consultancy devoted exclusively to biological optimization and sustainable health reconstruction. We engineer profoundly individualized dietary pathways rooted in metabolic science. Our primary disciplines include complex weight regulation, endocrine stabilization (such as PCOS), metabolic disorders, and elite wellness conditioning. We reject algorithmic template diets, instead deploying expert-led, biochemically customized interventions designed to serve as permanent systemic resets.
        </p>
        <div className="mt-6 mb-2 bg-[#1A2F2B]/5 p-6 rounded-2xl border border-[#1A2F2B]/10">
          <p className="mb-3 text-[#1A2F2B] font-medium font-sans">Etymologically derived from Sanskrit, <span className="font-display italic text-xl text-[#EAC881]">Ojas</span> signifies the absolute peak of:</p>
          <ul className="pl-5 mb-4 space-y-2">
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Physiological Resilience</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Vibrant Energy</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Robust Immunity</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Cellular Luminosity</span></li>
          </ul>
          <p className="italic text-[#1A2F2B]/80 border-l-4 border-[#EAC881] pl-4 font-serif">
            "It is recognized as the ultimate biochemical reserve—the sovereign energy governing human longevity."
          </p>
        </div>
      </>
    )
  },
  {
    question: "How can I initiate a consultation with the clinical team?",
    answer: (
      <span>
        We guarantee uninterrupted support throughout your metabolic rehabilitation journey. Direct inquiries and detailed medical profiles can be directed to our clinical coordination team via <a href="mailto:hello@ojasio.com" className="font-semibold text-[#1A2F2B] hover:text-[#EAC881] transition-colors border-b border-[#EAC881]/30 hover:border-[#EAC881] pb-0.5">hello@ojasio.com</a>. For expedited onboarding and real-time scheduling concerns, we strongly advise engaging our concierge team directly via the WhatsApp portal located on your screen.
      </span>
    )
  },
  {
    question: "What specific therapeutic domains does Ojasio cover?",
    answer: "Ojasio engineers an extensive portfolio of clinical dietary interventions aimed at generating profound, measurable outcomes. Our specializations encompass sophisticated lipolysis (fat loss) protocols, comprehensive endocrine and PCOS reversal frameworks, precise glycemic control for diabetes, targeted lean hypertrophy (muscle gain), and executive-tier lifestyle conditioning optimized for high-performing professionals."
  },
  {
    question: "What are the clinical credentials of the founder?",
    answer: "Disha Arora anchors Ojasio’s methodologies. Educated extensively in Food & Nutrition Management at Georgian College, Canada, she holds esteemed qualifications as a clinical Nutritionist, Nutrition Manager, and Active CSNM Member. Her robust medical background includes strategic tenures at Sir Ganga Ram Hospital (New Delhi) and specialized nutritional operations alongside global conglomerates. Having architected dietary transformations for thousands globally, her approach is impeccably researched, deeply analytical, and unapologetically results-driven."
  },
  {
    question: "Why should I choose an Ojasio biochemical protocol?",
    answer: "Aligning with Ojasio ensures you abandon generalized, deprivation-based dieting in favor of scientific, tailored nourishment. We construct highly strategic dietary architectures that actively accommodate intense professional schedules. By prioritizing nutrient density and metabolic stability over sheer caloric restriction, we guarantee that your physical transformation is both fundamentally restorative and permanently sustainable."
  },
  {
    question: "How does Ojasio distinguish itself from commercial diet platforms?",
    answer: "The critical distinction lies in our unwavering commitment to biochemical individuality and founder-directed clinical oversight. We vehemently reject automated, algorithmic meal delivery. Backed by over a decade of international practice, Ojasio intertwines robust medical nutrition therapy with empathetic behavioral coaching, positioning us as an elite clinical partner rather than a transient commercial diet vendor."
  },
  {
    question: "What is the optimal methodology for fat loss in India?",
    answer: "The most potent weight reduction strategy in India is one that respects indigenous culinary traditions while optimizing macronutrient efficiency. We specialize in recalibrating traditional, culturally rich meals into highly functional, hyper-satiating nutritional blocks, driving systemic fat oxidation without forcefully alienating you from the heritage foods you enjoy."
  },
  {
    question: "Is Ojasio equipped to manage severe PCOS symptoms?",
    answer: "Unequivocally. Our clinical focus regarding PCOS centers heavily on neutralizing systemic inflammation and aggressively reversing insulin resistance through precise carbohydrate sequencing. Our bespoke nutritional therapeutics directly target the endocrine disruption at its root, facilitating natural symptom resolution and sustainable metabolic control."
  },
  {
    question: "Are these protocols viable for intense executive schedules?",
    answer: "Absolutely. Our dietary architectures are custom-built for high-velocity lifestyles. We engineer streamlined, minimally invasive meal strategies that bypass extensive culinary preparation, perfectly stabilizing cognitive focus and energy levels amidst back-to-back corporate engagements and frequent global transit."
  },
  {
    question: "Do you accommodate specialized or restrictive dietary choices?",
    answer: "We seamlessly navigate all nutritional orientations. Whether you require a strictly plant-based (vegan/vegetarian) framework, or follow heavily carnivorous or pescatarian patterns, your protocol is mathematically calculated to ensure peak amino acid profiles and essential micronutrient saturation."
  },
  {
    question: "How do I maintain compliance during heavy international travel?",
    answer: "We proactively shield your progress against travel disruptions. Your protocol includes highly pragmatic tactical guides for navigating airport logistics, hotel dining, and executive restaurant scenarios, perfectly bridging the gap between clinical rigidity and real-world mobility."
  },
  {
    question: "Are your consultations exclusively geographically restricted?",
    answer: "Not at all. Ojasio operates via a highly secure, frictionless digital infrastructure, delivering our premium, high-touch clinical consultations seamlessly to clients worldwide. Your geographical location will not impede your access to elite nutritional engineering."
  },
  {
    question: "What is the financial accessibility of an Ojasio program?",
    answer: "We believe clinical excellence shouldn't necessitate financial exhaustion. While our therapeutic strategy is undeniably premium, the execution relies intentionally on highly accessible, locally sourced ingredients. You invest in elite guidance, not an exorbitant grocery markup."
  },
  {
    question: "What timeline should I anticipate for optimal body reconfiguration?",
    answer: "True physiological remodeling is a methodical progression. While immediate metabolic improvements often manifest rapidly, we target a clinical fat-reduction rate of 2 to 4 kilograms monthly to protect muscle mass and endocrine health, ensuring the transformation is entirely permanent."
  },
  {
    question: "Can your team actively manage complex glycemic issues like diabetes?",
    answer: "Yes. We deploy rigorous, advanced carbohydrate modulation therapies tailored to blunt insulin volatility. Our high-fiber, strategically timed dietary interventions rapidly stabilize blood glucose parameters, frequently requiring physician coordination to manage reduced medication dependency."
  },
  {
    question: "Is aggressive physical training mandatory for your protocols?",
    answer: "While we advocate for functional movement to elevate metabolic rates, intensive gym training is absolutely not a prerequisite for lipolysis. We engineer the nutritional protocol to drive primary fat loss, while integrating highly scalable, lifestyle-appropriate physical activity that suits your current capacity."
  },
  {
    question: "How to Find a Nutritionist Who Creates Custom Meal Plans",
    schemaAnswer: "Understanding exactly how to find a nutritionist who creates custom meal plans begins with vetting their clinical credentials and their approach to your unique biology. When evaluating professionals, look for a Certified Nutrition Manager who designs protocols specifically around your blood work, lifestyle, and cultural preferences, rather than handing you a generic printed template. According to the Mayo Clinic, highly individualized dietary interventions yield a 40% higher long-term adherence rate compared to standard prescriptive diets. You must look for red flags like practitioners selling their own branded supplements or pushing extreme caloric deficits without addressing underlying metabolic health. We strongly recommend seeking someone who provides comprehensive coaching that factors in your daily stress and sleep patterns alongside your nutrition. At Ojasio, our Certified Nutrition Manager constructs fully personalized meal architectures for clients globally, ensuring your path to health is built exclusively for you.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Finding the right nutrition professional</h3>
        <p className="mb-4">
          Understanding exactly <strong>how to find a nutritionist who creates custom meal plans</strong> begins with vetting their clinical credentials and their approach to your unique biology. When evaluating professionals, look for a Certified Nutrition Manager who designs protocols specifically around your blood work, lifestyle, and cultural preferences, rather than handing you a generic printed template. According to the Mayo Clinic, highly individualized dietary interventions yield a 40% higher long-term adherence rate compared to standard prescriptive diets. You must look for red flags like practitioners selling their own branded supplements or pushing extreme caloric deficits without addressing underlying metabolic health. We strongly recommend seeking someone who provides comprehensive coaching that factors in your daily stress and sleep patterns alongside your nutrition. For more insights on how we structure this, you can review our <Link to="/blog/healthy-weight-management-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">clinical approach to holistic nutrition</Link>. At Ojasio, our Certified Nutrition Manager constructs fully personalized meal architectures for clients globally, ensuring your path to health is built exclusively for you. 
        </p>
      </>
    )
  },
  {
    question: "What to Look for When Hiring a Nutrition Coach",
    schemaAnswer: "Knowing what to look for when hiring a nutrition coach is critical to ensuring you achieve sustainable, long-lasting metabolic changes rather than short-term water weight loss. First and foremost, verify their formal qualifications; a Certified Nutrition Manager brings clinical rigor that an uncertified enthusiast simply cannot match. You must assess their understanding of cultural cuisines, particularly if you require Indian food adaptations, and their flexibility to accommodate online consultations if you are an NRI or a busy corporate professional. The World Health Organization (WHO) has noted that culturally appropriate dietary counseling significantly improves health outcomes in diverse populations. A superior coach will deeply analyze your blood markers, sleep quality, and daily stress before suggesting a single meal. At Ojasio, we pride ourselves on building deeply empathetic, scientifically robust programs that respect your heritage while optimizing your health.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Vetting nutrition professionals</h3>
        <p className="mb-4">
          Knowing <strong>what to look for when hiring a nutrition coach</strong> is critical to ensuring you achieve sustainable, long-lasting metabolic changes rather than short-term water weight loss. First and foremost, verify their formal qualifications; a Certified Nutrition Manager brings clinical rigor that an uncertified enthusiast simply cannot match. You must assess their understanding of cultural cuisines, particularly if you require Indian food adaptations, and their flexibility to accommodate online consultations if you are an NRI or a busy corporate professional. The World Health Organization (WHO) has noted that culturally appropriate dietary counseling significantly improves health outcomes in diverse populations. A superior coach will deeply analyze your blood markers, sleep quality, and daily stress before suggesting a single meal. Discover more about our approach in our <Link to="/blog/healthy-weight-management-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">guide to sustainable eating</Link>. At Ojasio, we pride ourselves on building deeply empathetic, scientifically robust programs that respect your heritage while optimizing your health. 
        </p>
      </>
    )
  },
  {
    question: "How Much Does a Custom Meal Plan from a Nutritionist Cost?",
    schemaAnswer: "When determining how much a custom meal plan from a nutritionist costs, it is vital to view it as an investment in preventive healthcare rather than a simple expense. A premium custom protocol encompasses deep biochemical analysis, ongoing lifestyle coaching, and continuous dietary adjustments, saving you from years of expensive trial-and-error dieting that disrupts your metabolism. According to Harvard Medical School, every dollar invested in preventive lifestyle counseling saves significantly more in future chronic disease management and medical bills. The true value lies in addressing the root causes of exhaustion, weight gain, and hormonal imbalances before they require serious medical intervention. Professional guidance protects your long-term metabolic health and hormonal stability. To make this transformative step completely accessible and risk-free, Ojasio invites you to explore our process without any initial commitment.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Understanding the investment in professional nutrition guidance</h3>
        <p className="mb-4">
          When determining <strong>how much a custom meal plan from a nutritionist costs</strong>, it is vital to view it as an investment in preventive healthcare rather than a simple expense. A premium custom protocol encompasses deep biochemical analysis, ongoing lifestyle coaching, and continuous dietary adjustments, saving you from years of expensive trial-and-error dieting that disrupts your metabolism. According to Harvard Medical School, every dollar invested in preventive lifestyle counseling saves significantly more in future chronic disease management and medical bills. The true value lies in addressing the root causes of exhaustion, weight gain, and hormonal imbalances before they require serious medical intervention. Professional guidance protects your <strong>long-term metabolic health and hormonal stability</strong>. You can read more about the value of doing this properly in our <Link to="/blog/healthy-weight-management-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">healthy weight maintenance guide</Link>. To make this transformative step completely accessible and risk-free, Ojasio invites you to explore our process without any initial commitment. 
        </p>
      </>
    )
  },
  {
    question: "Should I See a Nutritionist if I'm Prediabetic?",
    schemaAnswer: "If you are wondering, 'should I see a nutritionist if I'm prediabetic?', the answer is a resounding yes, because this is precisely the critical window where you can halt the progression entirely. Prediabetes is a metabolic warning sign, but it is highly reversible when you implement a clinically engineered, low-glycemic dietary strategy to fiercely stabilize your blood sugar levels. An NCBI clinical review published conclusive data showing that targeted lifestyle and dietary interventions can reduce the incidence of type 2 diabetes by up to 58% in high-risk individuals. A Certified Nutrition Manager will design a protocol that regulates your insulin response through precise carbohydrate sequencing and fiber pairing, preventing dramatic glucose spikes without stripping away the foods you enjoy. Reversing prediabetes requires immediate strategic action. At Ojasio, we specialize in building these precise protective frameworks so you can confidently reclaim your metabolic health today.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Determining if professional help can prevent diabetes</h3>
        <p className="mb-4">
          If you are wondering, "<strong>should I see a nutritionist if I'm prediabetic?</strong>", the answer is a resounding yes, because this is precisely the critical window where you can halt the progression entirely. Prediabetes is a metabolic warning sign, but it is highly reversible when you implement a clinically engineered, low-glycemic dietary strategy to fiercely stabilize your blood sugar levels. An NCBI clinical review published conclusive data showing that targeted lifestyle and dietary interventions can reduce the incidence of type 2 diabetes by up to 58% in high-risk individuals. A Certified Nutrition Manager will design a protocol that regulates your insulin response through precise carbohydrate sequencing and fiber pairing, preventing dramatic glucose spikes without stripping away the foods you enjoy. <strong>Reversing prediabetes requires immediate strategic action</strong>. Learn more about blood sugar management in our comprehensive <Link to="/blog/diabetic-diet-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">diabetic diet guide</Link>. At Ojasio, we specialize in building these precise protective frameworks so you can confidently reclaim your metabolic health today. 
        </p>
      </>
    )
  },
  {
    question: "Does Losing Weight Really Help You Get Hired for Jobs?",
    schemaAnswer: "Addressing the sensitive question of whether losing weight really helps you get hired for jobs requires looking beyond surface-level aesthetics to understand the profound shift in personal energy and professional presence. While some studies from the Harvard T.H. Chan School of Public Health suggest implicit biases regarding weight exist in corporate environments, the true career advantage of shedding unhealthy visceral fat is the massive resurgence of your cognitive clarity, stamina, and self-confidence. When you optimize your nutrition, you eliminate mid-afternoon brain fog and command rooms with an undeniable, vibrant executive presence. True confidence is the ultimate career accelerant, radiating powerfully during high-stakes interviews and board meetings alike. At Ojasio, we build compassionate, empowering protocols specifically for corporate professionals, ensuring you enter every professional scenario feeling physically and mentally unstoppable.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Career impact of weight loss</h3>
        <p className="mb-4">
          Addressing the sensitive question of whether <strong>losing weight really helps you get hired for jobs</strong> requires looking beyond surface-level aesthetics to understand the profound shift in personal energy and professional presence. While some studies from the Harvard T.H. Chan School of Public Health suggest implicit biases regarding weight exist in corporate environments, the true career advantage of shedding unhealthy visceral fat is the massive resurgence of your cognitive clarity, stamina, and self-confidence. When you optimize your nutrition, you eliminate mid-afternoon brain fog and command rooms with an undeniable, vibrant executive presence. <strong>True confidence is the ultimate career accelerant</strong>, radiating powerfully during high-stakes interviews and board meetings alike. You can explore how nutrition fuels productivity in our <Link to="/blog/best-diet-plan-working-women" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">workplace wellness insights</Link>. At Ojasio, we build compassionate, empowering protocols specifically for corporate professionals, ensuring you enter every professional scenario feeling physically and mentally unstoppable. 
        </p>
      </>
    )
  },
  {
    question: "Can You Lose Weight Working a Desk Job?",
    schemaAnswer: "When clients ask, 'can you lose weight working a desk job?', the answer is an absolute yes, because physiological fat loss is driven roughly 80% by specialized nutrition and only 20% by physical movement. A sedentary career is never a permanent barrier when your dietary architecture is dialed in correctly. To succeed, you must master strategic meal timing to prevent cortisol-driven grazing, keep protein-rich desk snacks readily available, and maintain aggressive daily hydration to support cellular metabolism. According to the NHS, prolonged sedentary behavior safely requires a slight caloric down-regulation balanced with high-density nutrients to prevent energy lethargy. By controlling the glycemic impact of your lunches, you easily bypass the devastating 3 PM desk crash. Strategic nutrition completely overrides a sedentary lifestyle. Ojasio creates meticulously engineered, highly practical meal plans designed exclusively for executives and desk workers globally.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Weight loss strategies for sedentary work</h3>
        <p className="mb-4">
          When clients ask, "<strong>can you lose weight working a desk job?</strong>", the answer is an absolute yes, because physiological fat loss is driven roughly 80% by specialized nutrition and only 20% by physical movement. A sedentary career is never a permanent barrier when your dietary architecture is dialed in correctly. To succeed, you must master strategic meal timing to prevent cortisol-driven grazing, keep protein-rich desk snacks readily available, and maintain aggressive daily hydration to support cellular metabolism. According to the NHS, prolonged sedentary behavior safely requires a slight caloric down-regulation balanced with high-density nutrients to prevent energy lethargy. By controlling the glycemic impact of your lunches, you easily bypass the devastating 3 PM desk crash. <strong>Strategic nutrition completely overrides a sedentary lifestyle</strong>. Check out our strategies for busy individuals in our <Link to="/blog/how-to-lose-weight-beginners" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">beginners weight loss guide</Link>. Ojasio creates meticulously engineered, highly practical meal plans designed exclusively for executives and desk workers globally. 
        </p>
      </>
    )
  },
  {
    question: "Why Is My Job Making It Hard to Lose Weight?",
    schemaAnswer: "Understanding exactly why your job is making it hard to lose weight requires looking closely at the metabolic disruption caused by chronic corporate stress and irregular schedules. When you work relentless hours, your body pumps out elevated cortisol, a stress hormone that actively stores deep visceral belly fat and drastically disrupts your hunger hormones, ghrelin and leptin. The Mayo Clinic confirms that chronic work stress heavily correlates with weight gain due to elevated cortisol driving intense cravings for hyper-palatable, sugary foods. This biological trap is worsened by poor canteen options, skipped meals, and late-night takeaway orders when you are simply too exhausted to cook. Your biology is reacting logically to an intensely stressful environment. At Ojasio, our Certified Nutrition Manager engineers personalized protocols that directly counteract this cortisol response, stabilizing your energy precisely around your demanding corporate reality.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Work-related weight loss obstacles</h3>
        <p className="mb-4">
          Understanding exactly <strong>why your job is making it hard to lose weight</strong> requires looking closely at the metabolic disruption caused by chronic corporate stress and irregular schedules. When you work relentless hours, your body pumps out elevated cortisol, a stress hormone that actively stores deep visceral belly fat and drastically disrupts your hunger hormones, ghrelin and leptin. The Mayo Clinic confirms that chronic work stress heavily correlates with weight gain due to elevated cortisol driving intense cravings for hyper-palatable, sugary foods. This biological trap is worsened by poor canteen options, skipped meals, and late-night takeaway orders when you are simply too exhausted to cook. <strong>Your biology is reacting logically to an intensely stressful environment</strong>. Read more about tackling stubborn belly fat in our <Link to="/blog/how-to-lose-belly-fat" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">guide to losing belly fat</Link>. At Ojasio, our Certified Nutrition Manager engineers personalized protocols that directly counteract this cortisol response, stabilizing your energy precisely around your demanding corporate reality. 
        </p>
      </>
    )
  },
  {
    question: "How to Lose Weight With a Sedentary Office Job",
    schemaAnswer: "Mastering how to lose weight with a sedentary office job relies entirely on establishing an unshakable nutritional system that operates on autopilot during your chaotic workdays. You must initiate your morning with a deeply satiating, high-protein breakfast—such as a spinach and paneer scramble or a heavy Greek yogurt bowl—to completely lock down your hunger hormones until lunchtime. It is vital to eat strategically spaced, low-glycemic meals every 3 to 4 hours to avoid frantic late-afternoon sugar binges. The World Health Organization (WHO) emphasizes that controlling dietary quality is the primary defense against obesity in sedentary office environments. Keep smart snacks like roasted makhanas (fox nuts) or unsalted almonds securely at your desk, and constantly hydrate with filtered water. Preventing hunger through protein pacing is your ultimate corporate advantage. Ojasio flawlessly translates these robust strategies into your bespoke, culturally tailored nutritional action plan.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Weight loss strategies for desk workers</h3>
        <p className="mb-4">
          Mastering <strong>how to lose weight with a sedentary office job</strong> relies entirely on establishing an unshakable nutritional system that operates on autopilot during your chaotic workdays. You must initiate your morning with a deeply satiating, high-protein breakfast—such as a spinach and paneer scramble or a heavy Greek yogurt bowl—to completely lock down your hunger hormones until lunchtime. It is vital to eat strategically spaced, low-glycemic meals every 3 to 4 hours to avoid frantic late-afternoon sugar binges. The World Health Organization (WHO) emphasizes that controlling dietary quality is the primary defense against obesity in sedentary office environments. Keep smart snacks like roasted makhanas (fox nuts) or unsalted almonds securely at your desk, and constantly hydrate with filtered water. <strong>Preventing hunger through protein pacing is your ultimate corporate advantage</strong>. Learn more about optimal fasting strategies in our <Link to="/blog/intermittent-fasting-weight-loss-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">intermittent fasting guide</Link>. Ojasio flawlessly translates these robust strategies into your bespoke, culturally tailored nutritional action plan. 
        </p>
      </>
    )
  },
  {
    question: "Best Meal Prep Ideas for Busy Work Schedules",
    schemaAnswer: "Discovering the best meal prep ideas for busy work schedules is the ultimate secret weapon for ambitious professionals who refuse to let intense hours destroy their health. The most effective strategy is dedicated weekend batch cooking; preparing massive batches of protein-rich dal, quinoa, or roasted chicken breasts ensures you are never caught unprepared on a Tuesday night. Start utilizing overnight oats layered with chia seeds and almonds for zero-prep mornings, and assemble chopped salad jars with the dressing safely at the bottom for crisp office lunches. According to a study published in the International Journal of Behavioral Nutrition and Physical Activity, individuals who consistently prepare their meals in advance are 30% more likely to maintain a healthy weight category over time. Pre-portioning your nutrition removes daily decision fatigue completely. At Ojasio, we integrate precise weekly meal prep blueprints seamlessly into every personalized program we deliver worldwide.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Time-saving meal planning solutions</h3>
        <p className="mb-4">
          Discovering the <strong>best meal prep ideas for busy work schedules</strong> is the ultimate secret weapon for ambitious professionals who refuse to let intense hours destroy their health. The most effective strategy is dedicated weekend batch cooking; preparing massive batches of protein-rich dal, quinoa, or roasted chicken breasts ensures you are never caught unprepared on a Tuesday night. Start utilizing overnight oats layered with chia seeds and almonds for zero-prep mornings, and assemble chopped salad jars with the dressing safely at the bottom for crisp office lunches. According to a study published in the International Journal of Behavioral Nutrition and Physical Activity, individuals who consistently prepare their meals in advance are 30% more likely to maintain a healthy weight category over time. <strong>Pre-portioning your nutrition removes daily decision fatigue completely</strong>. You can find more targeted meal advice in our <Link to="/blog/healthy-weight-management-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">overall wellness guide</Link>. At Ojasio, we integrate precise weekly meal prep blueprints seamlessly into every personalized program we deliver worldwide. 
        </p>
      </>
    )
  },
  {
    question: "How to Stick to a Diet When You Work Long Hours",
    schemaAnswer: "Uncovering exactly how to stick to a diet when you work long hours demands shifting your focus entirely away from finite willpower and directly toward building unbreakable daily systems. The reality of a demanding career means that by 7 PM, your cognitive discipline is completely depleted; if you rely on willpower alone, you will inevitably order takeout. Success requires flexible adherence layered over automated meal systems. You must deploy meticulous meal prep, fiercely protect your scheduled eating windows, and stash emergency protein-rich snack packs for late-night desk grinds. Research from the NCBI clearly indicates that flexible dietary approaches, rather than rigid, restrictive regimens, dramatically significantly increase long-term adherence rates in high-stress populations. You must choose a nutritional protocol that bends to fit your chaotic reality rather than forcing you to achieve textbook perfection. Ojasio’s Certified Nutrition Manager personally crafts your entire protocol around your exact executive schedule, ensuring effortless consistency.",
    answer: (
      <>
        <h3 className="italic text-[#1A2F2B]/60 text-lg mb-3">Diet consistency for demanding jobs</h3>
        <p className="mb-4">
          Uncovering exactly <strong>how to stick to a diet when you work long hours</strong> demands shifting your focus entirely away from finite willpower and directly toward building unbreakable daily systems. The reality of a demanding career means that by 7 PM, your cognitive discipline is completely depleted; if you rely on willpower alone, you will inevitably order takeout. <strong>Success requires flexible adherence layered over automated meal systems</strong>. You must deploy meticulous meal prep, fiercely protect your scheduled eating windows, and stash emergency protein-rich snack packs for late-night desk grinds. Research from the NCBI clearly indicates that flexible dietary approaches, rather than rigid, restrictive regimens, dramatically significantly increase long-term adherence rates in high-stress populations. You must choose a nutritional protocol that bends to fit your chaotic reality rather than forcing you to achieve textbook perfection. Discover how to build sustainable habits in our <Link to="/blog/healthy-weight-management-complete-guide" className="text-[#EAC881] hover:text-[#1A2F2B] transition-colors underline">holistic lifestyle journals</Link>. Ojasio’s Certified Nutrition Manager personally crafts your entire protocol around your exact executive schedule, ensuring effortless consistency. 
        </p>
      </>
    )
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { key?: number, question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-[#1A2F2B]/10 overflow-hidden group">
      <button className="w-full py-8 flex justify-between items-center text-left focus:outline-none transition-colors group-hover:text-[#EAC881]"
        onClick={onClick}>
        <h3 className="font-display text-xl md:text-2xl text-[#1A2F2B] pr-8 group-hover:text-[#EAC881] transition-colors">{question}</h3>
        <span className={`flex-shrink-0 w-10 h-10 rounded-full border border-[#1A2F2B]/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#1A2F2B] border-[#1A2F2B] text-white' : 'text-[#1A2F2B] group-hover:border-[#EAC881] group-hover:text-[#EAC881]'}`}>
           <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      
        {isOpen && (
          <div>
            <div className="pb-8 font-serif text-lg text-[#1A2F2B]/80 font-light leading-relaxed pr-10">
              {answer}
            </div>
          </div>
        )}
      
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 font-sans selection:bg-[#EAC881]/30 text-[#1A2F2B]">
      <SEO 
        title="FAQ - Ojasio Nutrition Consultations"
        description="Frequently asked questions about Ojasio's premium nutrition consultations, weight loss strategies, and holistic wellness plans."
        url="https://www.ojasio.com/faq"
        jsonLdSchema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": (faq as any).schemaAnswer || (typeof faq.answer === 'string' ? faq.answer : faq.question)
            }
          }))
        }}
      />
      {/* Premium Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto text-center mb-24">
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-[0.3em] text-[#EAC881] mb-6">Expert Knowledge & Clarity</h4>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium tracking-tight text-[#1A2F2B] mb-8 leading-[1.1]">
            Frequently Asked<br />
            <span className="italic font-light text-[#1A2F2B]/70">Questions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-serif text-[#1A2F2B]/70 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to know about our premium nutrition consultations, sustainable weight loss strategies, and expert-led holistic wellness pans.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(26,47,43,0.05)] border border-[#1A2F2B]/5">
          <div className="divide-y divide-[#1A2F2B]/10">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleAccordion(index)}
              />
            ))}
          </div>
          
          <div className="mt-16 pt-12 border-t border-[#1A2F2B]/10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-6">
               <MessageCircle className="text-[#EAC881] w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-[#1A2F2B] mb-4">Still have questions?</h3>
            <p className="font-serif text-lg text-[#1A2F2B]/80 max-w-lg mx-auto leading-relaxed mb-8">
              We're here to help you begin your transformation journey. Simply tap the WhatsApp button in the corner of your screen to speak directly with our premium care team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-10">
              <a 
                href="https://wa.me/919990356350?text=Hi%20Ojasio%2C%20I%20would%20like%20to%20book%20a%20consultation." 
                target="_blank" 
                rel="noopener noreferrer" className="flex-1 w-full inline-flex items-center justify-center gap-3 bg-[#EAC881] hover:bg-[#1A2F2B] text-[#1A2F2B] hover:text-white px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              <a 
                href="mailto:hello@ojasio.com" 
                target="_blank" 
                rel="noopener noreferrer" className="flex-1 w-full inline-flex items-center justify-center gap-3 bg-transparent border border-[#1A2F2B]/20 hover:border-[#1A2F2B] text-[#1A2F2B] px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
              >
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </div>

            <div className="flex items-center gap-6 justify-center text-[#1A2F2B]/60 pt-6 border-t border-[#1A2F2B]/10 w-full max-w-sm">
              <a href="https://www.instagram.com/ojasio/" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAC881] transition-colors" aria-label="Instagram">
                 <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/dishaarora3085" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAC881] transition-colors" aria-label="LinkedIn">
                 <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppFloatingButton />
    </main>
  );
};
