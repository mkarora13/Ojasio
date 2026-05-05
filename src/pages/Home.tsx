import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplets, Target, Utensils, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Weight Loss', icon: <Target size={32} className="text-gold" />, desc: 'At Ojasio, weight loss is not about starving or following unrealistic diets. It is about creating a sustainable lifestyle that works for your body and routine. With years of hands-on experience across diverse client profiles, we design personalised plans that focus on fat loss while maintaining energy, metabolism, and overall health.' },
    { title: 'Diabetes Care', icon: <Activity size={32} className="text-gold" />, desc: 'Managing diabetes requires more than just avoiding sugar. It demands a structured and well-balanced nutritional strategy. At Ojasio, we create customised diet plans that help regulate blood sugar levels, improve insulin sensitivity, and support overall metabolic health.' },
    { title: 'PCOS Management', icon: <Droplets size={32} className="text-gold" />, desc: 'PCOS is a lifestyle-driven condition that requires a personalised and consistent approach. We design nutrition plans that focus on hormonal balance, weight management, and improving metabolic health.' },
    { title: 'Weight Gain', icon: <Utensils size={32} className="text-gold" />, desc: 'Healthy weight gain is not about eating excessively — it is about eating smart. At Ojasio, we focus on structured nutrition that promotes lean muscle gain, improves appetite naturally, and enhances overall strength.' },
    { title: 'Wellness & Fitness', icon: <Heart size={32} className="text-gold" />, desc: 'Fitness is not just about appearance — it is about how you feel, perform, and function daily. Our wellness and fitness plans are designed to improve energy levels, support physical activity, and enhance overall body performance.' },
  ];

  const stats = [
    { value: '1000+', label: 'Clients Served' },
    { value: '5000+', label: 'Lives Impacted' },
    { value: '50+', label: 'Seminars Conducted' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center bg-ivory overflow-hidden border-b border-gold/20 pt-28 pb-16">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full flex flex-col">
          
          {/* Top text section */}
          <div className="w-full flex flex-col items-center md:items-start justify-center mb-16 gap-4 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <h3 className="text-gold uppercase tracking-[0.4em] text-xs font-sans font-bold mb-6">Premium Wellness</h3>
              <h1 className="text-5xl lg:text-7xl xl:text-[5.5rem] font-display text-green-deep mb-6 leading-[1.0] flex flex-col gap-2">
                <span>Modern Nutrition</span>
                <span className="italic font-light text-gold text-4xl lg:text-6xl xl:text-7xl">Rooted in Vitality</span>
              </h1>
              <div className="w-full overflow-hidden">
                <p className="text-xs sm:text-sm md:text-base font-light font-sans tracking-wide text-green-deep/80 max-w-2xl mx-auto md:mx-0 xl:max-w-none xl:whitespace-nowrap">
                  Personalised diet plans combining modern science with holistic nutrition to deliver sustainable results for a global community.
                </p>
              </div>

            </motion.div>
          </div>

          {/* Large image grid spread across */}
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
             className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 h-[50vh] md:h-[60vh]"
          >
             {/* Main large image */}
             <div className="md:col-span-8 rounded-2xl md:rounded-tl-[4rem] md:rounded-br-[4rem] overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-green-deep/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600" alt="Healthy gourmet food" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
             </div>
             
             {/* Right side images */}
             <div className="md:col-span-4 flex flex-col gap-4 hidden md:flex">
                <div className="flex-1 rounded-tr-[3rem] rounded-bl-[2rem] overflow-hidden shadow-xl relative group">
                   <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                   <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Yoga and wellbeing" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 object-top" />
                </div>
                <div className="flex-1 rounded-br-[3rem] rounded-tl-[2rem] overflow-hidden shadow-xl relative group">
                   <div className="absolute inset-0 bg-green-deep/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                   <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" alt="Workout and fitness" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-deep text-ivory flex items-center justify-around min-h-[12rem] py-10 px-4">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-around divide-y md:divide-y-0 md:divide-x divide-white/10 gap-8 md:gap-0">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center w-full"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-[10px] uppercase font-sans tracking-widest opacity-60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-green-deep mb-4">Our Expertise</h2>
            <div className="w-16 h-px mx-auto md:mx-0 bg-gold/50" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20 border border-gold/20">
            {services.map((service, idx) => (
               <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-ivory p-8 flex flex-col justify-start items-start text-left hover:bg-beige/30 transition-colors"
               >
                <div className="mb-6 opacity-80">
                  {service.icon}
                </div>
                <h5 className="text-xl md:text-2xl font-display font-bold text-green-deep mb-4">{service.title}</h5>
                <p className="text-sm md:text-base font-sans text-green-deep/70 leading-relaxed font-light">{service.desc}</p>
              </motion.div>
            ))}
            
            {/* Callout box to fill grid */}
            <div className="bg-beige p-8 flex flex-col justify-start items-start text-left border-t border-gold/20 md:border-t-0">
               <h5 className="font-bold text-xl md:text-2xl mb-4 font-display text-green-deep">Holistic Wellness</h5>
               <p className="text-sm md:text-base font-sans text-green-deep/70 leading-relaxed font-light">True health goes beyond calories and diet charts. It involves balance — physically, mentally, and nutritionally. At Ojasio, we integrate modern nutritional science with holistic principles to create a complete wellness experience. This includes mindful eating, gut health, lifestyle correction, and sustainable habits. Our approach focuses on long-term transformation, helping you build a healthier relationship with food and your body.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-beige relative overflow-hidden border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-14">
              <span className="text-sm md:text-base font-bold uppercase tracking-[0.25em] text-[#C4A052] mb-4 block">The Ojasio Advantage</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] leading-tight mb-6">
                Why Discerning Individuals Choose Ojasio
              </h2>
              <p className="text-lg md:text-2xl text-[#1A2F2B]/80 font-light leading-relaxed font-serif italic max-w-2xl">
                Elevate your health journey with a science-backed, deeply personalized approach that respects your body's innate intelligence and demands for luxury wellness.
              </p>
            </div>
            
            <div className="space-y-12">
              {[
                { 
                  title: 'Deeply Personalised Nutrition Protocols', 
                  desc: 'There are no generic templates here. Every therapeutic diet plan is meticulously tailored to your unique biology, medical history, and lifestyle constraints for maximum clinical efficacy and sustainable weight loss.' 
                },
                { 
                  title: 'Advanced Scientific Integration', 
                  desc: 'We seamlessly blend modern functional medicine, evidence-based nutrition, and biochemical realities with holistic wellness wisdom to address the root cause of metabolic disorders and PCOS naturally.' 
                },
                { 
                  title: 'Global Adaptability & Premium Lifestyle Fit', 
                  desc: 'Whether you reside in Toronto, Dubai, or Mumbai, our dynamic nutritional strategies are designed to adapt seamlessly to diverse cultural cuisines, luxury travel schedules, and demanding international careers.' 
                },
                { 
                  title: 'Sustainable, Lifelong Wellness Transformation', 
                  desc: 'We strictly avoid starvation routines or short-term fixes. Our expert health coaching guarantees sustainable fat loss, optimized insulin sensitivity, and long-lasting vitality that you can maintain effortlessly.' 
                }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-10 border-l-2 border-[#C4A052]/30 group hover:border-[#C4A052] transition-colors duration-500">
                  <div className="absolute left-[-9px] top-2.5 w-4 h-4 rounded-full bg-[#C4A052] shadow-[0_0_15px_rgba(196,160,82,0.6)] group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(196,160,82,0.9)] transition-all duration-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display text-[#1A2F2B] mb-4 group-hover:text-[#C4A052] transition-colors duration-300">{item.title}</h3>
                  <p className="text-lg md:text-xl font-light text-[#1A2F2B]/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[600px] bg-ivory border border-gold/20 p-4"
          >
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200" 
              alt="Healthy vibrant bowl" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-green-deep/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-ivory border-t border-gold/20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-green-deep mb-6"
          >
            Take Control of Your Health
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-sans text-green-deep/70 mb-10 leading-relaxed uppercase tracking-widest"
          >
            Your transformation starts today. Join us to unlock your peak wellness.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
             <Button size="lg" className="shadow-none bg-green-deep" onClick={() => navigate('/contact')}>
              START YOUR TRANSFORMATION TODAY
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
