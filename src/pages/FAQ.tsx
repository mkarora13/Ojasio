import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { key?: number, question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-[#1A2F2B]/10 overflow-hidden group">
      <button
        className="w-full py-8 flex justify-between items-center text-left focus:outline-none transition-colors group-hover:text-[#EAC881]"
        onClick={onClick}
      >
        <h3 className="font-display text-xl md:text-2xl text-[#1A2F2B] pr-8 group-hover:text-[#EAC881] transition-colors">{question}</h3>
        <span className={`flex-shrink-0 w-10 h-10 rounded-full border border-[#1A2F2B]/20 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#1A2F2B] border-[#1A2F2B] text-white' : 'text-[#1A2F2B] group-hover:border-[#EAC881] group-hover:text-[#EAC881]'}`}>
           <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pb-8 font-serif text-lg text-[#1A2F2B]/80 font-light leading-relaxed pr-10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              "text": typeof faq.answer === 'string' ? faq.answer : faq.question // basic fallback for ReactNode
            }
          }))
        }}
      />
      {/* Premium Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-10 max-w-5xl mx-auto text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h4 className="text-[10px] sm:text-xs font-bold font-sans uppercase tracking-[0.3em] text-[#EAC881] mb-6">Expert Knowledge & Clarity</h4>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-medium tracking-tight text-[#1A2F2B] mb-8 leading-[1.1]">
            Frequently Asked<br />
            <span className="italic font-light text-[#1A2F2B]/70">Questions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-serif text-[#1A2F2B]/70 max-w-2xl mx-auto leading-relaxed font-light">
            Everything you need to know about our premium nutrition consultations, sustainable weight loss strategies, and expert-led holistic wellness pans.
          </p>
        </motion.div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="px-4 sm:px-6 lg:px-10 max-w-4xl mx-auto">
        <motion.div 
          className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_20px_60px_-15px_rgba(26,47,43,0.05)] border border-[#1A2F2B]/5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
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
                rel="noopener noreferrer"
                className="flex-1 w-full inline-flex items-center justify-center gap-3 bg-[#EAC881] hover:bg-[#1A2F2B] text-[#1A2F2B] hover:text-white px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
              <a 
                href="mailto:hello@ojasio.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 w-full inline-flex items-center justify-center gap-3 bg-transparent border border-[#1A2F2B]/20 hover:border-[#1A2F2B] text-[#1A2F2B] px-6 py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
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
        </motion.div>
      </section>

      <WhatsAppFloatingButton />
    </main>
  );
};
