import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle, ArrowRight, Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { WhatsAppFloatingButton } from '../components/ui/WhatsAppFloatingButton';

const faqs = [
  {
    question: "What is Ojasio?",
    answer: (
      <>
        <p className="mb-4">
          Ojasio is a premium nutrition and wellness platform dedicated to holistic health and sustainable wellness. We provide highly personalized nutrition plans tailored to your unique biology and lifestyle. Our core expertise spans weight management, PCOS, diabetes management, and comprehensive lifestyle transformation. We believe in an expert-led, human approach, crafting strategies that aren't just diets, but foundational shifts toward your ultimate well-being.
        </p>
        <div className="mt-6 mb-2 bg-[#1A2F2B]/5 p-6 rounded-2xl border border-[#1A2F2B]/10">
          <p className="mb-3 text-[#1A2F2B] font-medium font-sans">In Sanskrit, <span className="font-display italic text-xl text-[#EAC881]">Ojas</span> represents the ultimate manifestation of:</p>
          <ul className="pl-5 mb-4 space-y-2">
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Vitality</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Life Energy</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Immunity</span></li>
            <li className="flex items-center gap-3"><span className="text-[#EAC881] text-lg">✦</span> <span className="font-serif">Inner Glow</span></li>
          </ul>
          <p className="italic text-[#1A2F2B]/80 border-l-4 border-[#EAC881] pl-4 font-serif">
            "It is considered the essence of health and well-being — the energy that sustains life."
          </p>
        </div>
      </>
    )
  },
  {
    question: "How to Contact Ojasio Customer Support?",
    answer: (
      <span>
        We ensure you are always supported on your journey. You can reach our dedicated support team via our official email at <a href="mailto:hello@ojasio.com" className="font-semibold text-[#1A2F2B] hover:text-[#EAC881] transition-colors border-b border-[#EAC881]/30 hover:border-[#EAC881] pb-0.5">hello@ojasio.com</a> for detailed queries. For immediate assistance and seamless consultation booking, we recommend connecting with us directly through our fast-response WhatsApp support. Click the WhatsApp button on your screen to start a conversation with our premium care team today.
      </span>
    )
  },
  {
    question: "What Services Does Ojasio Offer?",
    answer: "Ojasio offers a comprehensive suite of high-end wellness services, meticulously designed for real results. Our offerings include personalized diet plans, targeted sustainable fat-loss and weight management nutrition, comprehensive PCOS management, and specialized diabetes nutrition support. We also provide hormonal balance guidance, intelligent meal planning for working professionals with busy schedules, and holistic wellness coaching to elevate every aspect of your daily lifestyle."
  },
  {
    question: "Who is the Founder of Ojasio and Is the Founder Certified?",
    answer: "Disha Arora is the visionary founder of Ojasio. As a certified Nutritionist, Nutrition Manager, and Active CSNM Member, her journey is marked by excellence. She began her career with VLCC and completed a prestigious internship at Sir Ganga Ram Hospital, New Delhi, later working with an MNC process related to Nestlé. Disha further pursued advanced studies at Georgian College, Canada in Food & Nutrition Management. Having assisted 1000+ clients globally, conducted 50+ wellness seminars, and impacted over 5000 lives, she specializes in weight management, PCOS, diabetes care, blood pressure management, and integrating workout with nutrition guidance. Her approach is realistic, professional, and science-backed."
  },
  {
    question: "What Are the Benefits of Taking a Diet Plan from Ojasio?",
    answer: "Partnering with Ojasio means choosing a personalized approach that respects your time and body. You benefit from highly practical meal planning—no starvation, no extreme or fad dieting. Our focus is purely on sustainable, long-term results that fit seamlessly into busy, modern lifestyles. We provide budget-friendly, nutrient-dense nutrition strategies designed specifically to support working professionals, ensuring that your journey to wellness is empowering, enjoyable, and enduring."
  },
  {
    question: "What Makes Ojasio Different from Other Nutrition Brands?",
    answer: "Ojasio stands apart through a foundation of founder-led, personalized guidance backed by over 10 years of robust industry experience. We don't believe in generic templates. Having personally assisted 1000+ clients and impacted 5000+ lives with international education exposure, our brand merges high-end science with a profoundly human-centered wellness approach. Ojasio is not just a diet provider; we are a premium, trustworthy, and practical wellness partner dedicated to real-world transformation."
  },
  {
    question: "Which diet plan is best for weight loss in India?",
    answer: "The best weight loss plan in India is one that honors your cultural palate while intelligently managing your macros. We specialize in structuring traditional Indian meals—incorporating rich, regional ingredients—into a calorie-conscious, high-protein framework that drives sustainable fat loss without sacrificing the flavors you love."
  },
  {
    question: "Can Ojasio help with PCOS weight management?",
    answer: "Absolutely. We excel in PCOS weight management by focusing on hormonal balance, insulin sensitivity, and reducing systemic inflammation. Our tailored nutrition strategies tackle the root cause, making weight management an achievable, stress-free reality for women navigating PCOS."
  },
  {
    question: "Are Ojasio diet plans suitable for working professionals?",
    answer: "Yes, our plans are engineered specifically for the high-end working professional. We eliminate the prep-work stress by designing practical, easy-to-assemble meals that stabilize your energy levels throughout demanding corporate schedules and frequent travel."
  },
  {
    question: "Does Ojasio provide vegetarian and non-vegetarian meal plans?",
    answer: "We cater to all dietary preferences. Whether you adhere to a strict vegetarian, vegan, or non-vegetarian lifestyle, your customized meal plan is crafted to ensure optimal protein intake and nutrient density matching your personal choices."
  },
  {
    question: "Can I follow Ojasio plans while traveling?",
    answer: "Yes. We equip you with practical navigation strategies for hotel buffets, restaurant menus, and airport lounges, ensuring your wellness journey seamlessly integrates with your frequent travel schedule without compromising your goals."
  },
  {
    question: "Does Ojasio offer online consultations across India?",
    answer: "We offer seamless, premium online wellness consultations not only across Delhi NCR and India but globally. Our digital infrastructure ensures you receive personalized, high-touch support no matter where you are located."
  },
  {
    question: "Are Ojasio diet plans affordable?",
    answer: "Premium wellness should be accessible. Our customized plans ensure that you utilize practical, everyday ingredients that don't demand a premium grocery bill, making the Ojasio experience both luxurious in its care and highly budget-friendly in its execution."
  },
  {
    question: "How long does healthy weight loss take?",
    answer: "Sustainable weight loss is a journey, not a sprint. While individual results vary, a healthy, scientifically sound rate of fat loss is generally 2 to 4 kilograms per month. Our focus is entirely on permanent lifestyle shifts rather than temporary, rapid fluctuations."
  },
  {
    question: "Can Ojasio help with diabetes management?",
    answer: "Yes. Our expert-led approach incorporates intelligent carbohydrate scaling and fiber-rich meal structures specifically designed to stabilize blood sugar, manage insulin spikes, and comprehensively support individuals with diabetes."
  },
  {
    question: "Do I need to go to gym while following Ojasio plans?",
    answer: "While movement is celebrated for metabolic health, a gym membership is not mandatory. We seamlessly integrate simple home workouts, brisk walking strategies, and movement therapies that complement your nutrition plan and fit effortlessly into your existing lifestyle."
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
                href="https://wa.me/919990356350" 
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
