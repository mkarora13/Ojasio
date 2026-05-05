import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Diamond, CheckCircle, Leaf, Target, ShieldCheck, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const navigate = useNavigate();

  const differentiators = [
    "Personalisation at the core — no generic diet charts",
    "Science-backed strategies combined with holistic principles",
    "Designed for real lifestyles, not unrealistic routines",
    "Focus on long-term transformation, not short-term results",
    "Global approach with culturally adaptable nutrition plans"
  ];

  const values = [
    { title: "Personalisation Over Perfection", desc: "Every individual is unique, and so is every plan we create.", icon: <Target className="w-6 h-6" /> },
    { title: "Sustainability Over Shortcuts", desc: "We focus on habits that last a lifetime, not quick results that fade.", icon: <Leaf className="w-6 h-6" /> },
    { title: "Science Meets Holistic Wisdom", desc: "We combine modern research with time-tested wellness principles.", icon: <Diamond className="w-6 h-6" /> },
    { title: "Simplicity & Practicality", desc: "Nutrition should fit your life — not complicate it.", icon: <CheckCircle className="w-6 h-6" /> },
    { title: "Integrity & Trust", desc: "We prioritise honesty, transparency, and real results.", icon: <ShieldCheck className="w-6 h-6" /> },
    { title: "Client-Centric Approach", desc: "Your goals, your lifestyle, your journey — everything revolves around you.", icon: <Heart className="w-6 h-6" /> }
  ];

  return (
    <div className="w-full bg-ivory pt-20 pb-32">
      {/* Hero & Brand Story */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <Diamond className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display text-green-deep leading-tight mb-8">
            The Ojasio Movement
          </h1>
          <p className="text-xl md:text-3xl font-display italic text-gold max-w-3xl mx-auto leading-snug">
            "Ojasio is not just a nutrition platform — it is a movement towards a more conscious, balanced, and empowered way of living."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-green-deep/5 border border-gold/20 mb-32"
        >
          <div className="space-y-8 text-lg md:text-xl text-green-deep/80 font-light leading-relaxed">
            <p>
              In a world filled with quick fixes, restrictive diets, and overwhelming information, Ojasio stands for clarity, simplicity, and results that last. We believe that true health is not achieved through extremes, but through a personalised and sustainable approach that respects your body, your lifestyle, and your individuality.
            </p>
            <p>
              At Ojasio, we combine the precision of modern nutritional science with the wisdom of holistic wellness to create plans that are not only effective, but also practical and enjoyable. Every recommendation is thoughtfully designed to fit seamlessly into your daily life, ensuring that transformation is not temporary — but a lasting change.
            </p>
            <p>
              We work with individuals across the globe, helping them take control of their health through structured guidance, continuous support, and deeply personalised strategies. Whether your goal is weight management, hormonal balance, disease control, or overall well-being, Ojasio is built to guide you every step of the way.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Differentiators */}
      <section className="bg-green-deep py-24 mb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display text-gold mb-4">What Makes Ojasio Different</h2>
            <div className="w-16 h-px bg-gold/30 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-ivory/10 backdrop-blur-sm border border-gold/20 p-8 rounded-2xl flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-6 text-gold">
                  <Diamond size={20} />
                </div>
                <p className="text-ivory font-light text-lg">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="bg-beige rounded-[3rem] p-10 md:p-16 lg:p-24 shadow-2xl shadow-green-deep/5 border border-gold/20 relative overflow-hidden">
          {/* Decorative luxury elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]"></div>
          <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/30 hidden md:block"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/30 hidden md:block"></div>
          
          <div className="flex flex-col relative z-10">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-display text-green-deep mb-6">Driving Global Wellness</h2>
              <div className="w-16 h-px bg-gold mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col relative"
              >
                <h3 className="text-sm md:text-base font-bold font-sans uppercase tracking-[0.25em] text-gold mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-gold"></span>
                  Our Mission
                </h3>
                <h4 className="text-2xl md:text-3xl font-display text-green-deep mb-6 leading-snug">
                  Precision Nutrition for Lifelong Vitality
                </h4>
                <p className="text-lg md:text-xl font-light text-green-deep/80 text-justify leading-relaxed font-serif pt-2 tracking-wide">
                  At Ojasio, our mission is to profoundly transform lives through science-backed, deeply personalized nutrition protocols. We empower discerning individuals to effortlessly achieve sustainable weight loss, naturally manage PCOS and lifestyle disorders, and take absolute control of their well-being. By bridging elite functional medicine with real-world accessibility, we ensure lasting health without compromising on the joy of eating.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col relative"
              >
                <div className="absolute -left-8 lg:-left-12 top-0 bottom-0 w-px bg-gold/30 hidden md:block"></div>
                <h3 className="text-sm md:text-base font-bold font-sans uppercase tracking-[0.25em] text-gold mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-gold"></span>
                  Our Vision
                </h3>
                <h4 className="text-2xl md:text-3xl font-display text-green-deep mb-6 leading-snug">
                  Redefining Luxury Integrative Health
                </h4>
                <p className="text-lg md:text-xl font-light text-green-deep/80 text-justify leading-relaxed font-serif pt-2 tracking-wide">
                  We envision Ojasio as the world’s most trusted premium wellness brand, completely elevating the modern experience of therapeutic nutrition. We see a future where bespoke dietary guidance grants every client absolute metabolic dominance, mental clarity, and boundless energy—creating a balanced, sophisticated lifestyle that perfectly complements their highest personal and professional ambitions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display text-green-deep mb-4">Core Values of Ojasio</h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {values.map((value, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col text-center items-center group"
            >
              <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                {value.icon}
              </div>
              <h4 className="text-xl font-bold font-display text-green-deep mb-3">{value.title}</h4>
              <p className="font-light text-green-deep/70">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.7 }}
         className="text-center mt-32 max-w-2xl mx-auto px-4"
      >
         <h2 className="text-3xl md:text-4xl font-display text-green-deep mb-8">Ready to begin your journey?</h2>
         <Button size="lg" onClick={() => navigate('/contact')} className="w-full sm:w-auto px-12 py-5 text-sm tracking-[0.2em]">
            START YOUR TRANSFORMATION
          </Button>
      </motion.div>
    </div>
  );
};
