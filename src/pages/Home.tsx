import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplets, Target, Utensils, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SEO } from '../components/seo/SEO';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Clinical Weight Management', icon: <Target size={32} className="text-gold" />, desc: 'Effective lipolysis and weight reduction demand a scientific approach, not restrictive starvation diets. We engineer sustainable, nutrient-dense eating protocols tailored specifically to your metabolic rate. By addressing the root causes of weight stagnation, our customized strategies ensure steady fat loss while protecting your vital energy reserves and optimizing long-term body composition.' },
    { title: 'Advanced Diabetes Control', icon: <Activity size={32} className="text-gold" />, desc: 'Reclaiming control over blood glucose parameters involves sophisticated carbohydrate management and precise food pairing. Our clinical diabetes nutrition frameworks are designed to actively enhance insulin sensitivity and blunt post-meal sugar spikes. We provide practical, culturally integrated meal plans that seamlessly fit into your life while aggressively stabilizing your metabolic markers.' },
    { title: 'PCOS & Hormonal Balance', icon: <Droplets size={32} className="text-gold" />, desc: 'Polycystic Ovary Syndrome (PCOS) fundamentally requires a dedicated, anti-inflammatory dietary intervention. We construct specialized nutrition pathways targeting systemic insulin resistance and hormone dysregulation. Our evidence-based approach helps normalize menstrual cycles, reduce severe androgenic symptoms, and facilitate entirely natural, long-lasting wellness.' },
    { title: 'Strategic Lean Mass Building', icon: <Utensils size={32} className="text-gold" />, desc: 'Quality weight gain involves cellular nourishment, not empty caloric gluttony. We develop intelligent, hypertrophic nutrition plans structured to increase muscle density safely. By utilizing high-biological-value protein sources and complex carbohydrates, we naturally stimulate healthy appetite and promote robust physical strength.' },
    { title: 'Comprehensive Lifestyle Conditioning', icon: <Heart size={32} className="text-gold" />, desc: 'True peak performance necessitates impeccable internal health. Our holistic lifestyle and fitness conditioning programs are architected to amplify daily endurance, sharpen cognitive focus, and fortify immune resilience. We seamlessly merge modern dietary science with practical habits for individuals demanding high-octane daily functioning.' },
  ];

  const stats = [
    { value: '1000+', label: 'Clients Served' },
    { value: '5000+', label: 'Lives Impacted' },
    { value: '50+', label: 'Seminars Conducted' },
  ];

  return (
    <div className="w-full">
      <SEO 
        title="Ojasio | Premium Nutrition & Diet Consultation by Disha Arora"
        description="Book your 1-on-1 nutrition consultation with Disha Arora. Specializing in weight loss, PCOS, diabetes, and sustainable diet plans for busy professionals."
        url="https://www.ojasio.com"
        jsonLdSchema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Ojasio",
          "image": "https://www.ojasio.com/logo.png",
          "url": "https://www.ojasio.com",
          "telephone": "+91-XXXXXXXXXX",
          "description": "Premium nutrition and wellness consultations by certified nutritionist Disha Arora.",
          "founder": {
            "@type": "Person",
            "name": "Disha Arora"
          }
        }}
      />
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
              <h3 className="text-gold uppercase tracking-[0.4em] text-xs font-sans font-bold mb-6">PREMIUM WELLNESS</h3>
              <h1 className="text-5xl lg:text-7xl xl:text-[5.5rem] font-display text-green-deep mb-6 leading-[1.0] flex flex-col gap-2">
                <span>Modern Nutrition</span>
                <span className="italic font-light text-gold text-4xl lg:text-6xl xl:text-7xl">Rooted in Vitality</span>
              </h1>
              <div className="w-full overflow-hidden">
                <p className="text-xs sm:text-sm md:text-base font-light font-sans tracking-wide text-green-deep/80 max-w-2xl mx-auto md:mx-0">
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
                <img 
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1600" 
                  alt="Healthy gourmet food" 
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" 
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                />
             </div>
             
             {/* Right side images */}
             <div className="md:col-span-4 flex flex-col gap-4 hidden md:flex">
                <div className="flex-1 rounded-tr-[3rem] rounded-bl-[2rem] overflow-hidden shadow-xl relative group">
                   <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
                   <img 
                     src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                     alt="Yoga and wellbeing" 
                     className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 object-top" 
                     fetchPriority="high"
                     loading="eager"
                   />
                </div>
                <div className="flex-1 rounded-br-[3rem] rounded-tl-[2rem] overflow-hidden shadow-xl relative group">
                   <div className="absolute inset-0 bg-green-deep/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                   <img 
                     src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800" 
                     alt="Workout and fitness" 
                     className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" 
                     fetchPriority="high"
                     loading="eager"
                   />
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
            <div className="bg-ivory hover:bg-beige/30 transition-colors p-8 flex flex-col justify-start items-start text-left border-t border-gold/20 md:border-t-0">
               <h5 className="font-bold text-xl md:text-2xl mb-4 font-display text-green-deep">Integrative Functional Healing</h5>
               <p className="text-sm md:text-base font-sans text-green-deep/70 leading-relaxed font-light">Authentic physiological restoration extends far beyond restrictive caloric arithmetic. It demands a profound alignment of gut microbiome integrity, psychological resilience, and cellular nourishment. Through Ojasio’s meticulous methodologies, we synthesize the latest advancements in nutritional biochemistry with time-tested holistic practices to architect a resilient, disease-resistant physiological state, ultimately redefining your baseline of health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 lg:py-32 bg-beige relative overflow-hidden border-y border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative h-[450px] sm:h-[550px] lg:h-full lg:min-h-[800px] w-full rounded-[2rem] overflow-hidden shadow-xl order-2 lg:order-1"
            >
              <img 
                src="https://images.pexels.com/photos/15319019/pexels-photo-15319019.jpeg" 
                alt="Premium Wellness Experience" 
                className="absolute inset-0 w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-green-deep/20 mix-blend-multiply transition-colors"></div>
              <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-[1.5rem] border border-white/40 z-20 pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center order-1 lg:order-2"
            >
              <div className="mb-12 md:mb-16 text-left">
                <span className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.25em] text-gold mb-6 block">The Ojasio Paradigm</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-green-deep leading-[1.15] mb-8">
                  Why Discerning Individuals Trust Clinical Precision
                </h2>
                <p className="text-lg md:text-xl text-green-deep/80 font-light leading-relaxed font-sans">
                  Transcend generic dietary advice. Engage with a scientifically grounded, expert-guided methodology that honors your unique biochemical fingerprint. We construct pragmatic, high-impact nutritional architectures uniquely suited to accommodate the rigors of an elite professional lifestyle.
                </p>
              </div>
              
              <div className="space-y-10 md:space-y-12">
                {[
                  { 
                    title: 'Precision Protocols for Optimal Fat Oxidation', 
                    desc: 'Achieve remarkable weight regulation through data-driven dietary design. We meticulously construct macronutrient-balanced profiles that combat insulin resistance and accelerate natural fat loss without enforcing detrimental starvation cycles.' 
                  },
                  { 
                    title: 'Root-Cause Resolution for Endocrine Disorders', 
                    desc: 'Systemic health originates from hormonal equilibrium. We merge diagnostic insights with therapeutic diets to dramatically alleviate PCOS symptoms, reverse chronic inflammation, and reclaim your inherent biochemical stability.' 
                  },
                  { 
                    title: 'Executive Nutrition for High-Demand Careers', 
                    desc: 'Relentless corporate demands require impeccable fuel. Our remarkably adaptable meal algorithms flawlessly integrate into chaotic business travel schedules and exhaustive working hours to sustain paramount cognitive performance.' 
                  },
                  { 
                    title: 'Sustainably Elegant & Culturally Aligned Food Choices', 
                    desc: 'Therapeutic nutrition should never feel isolating. We brilliantly weave medically sound dietary adjustments into your native cultural cuisine, utilizing readily available regional ingredients for a transformation that is permanently sustainable.' 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-10 border-l border-gold/30 group hover:border-gold transition-colors duration-500">
                    <div className="absolute left-[-5px] top-2.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(196,160,82,0.8)] group-hover:scale-150 transition-transform duration-500"></div>
                    <h3 className="text-xl md:text-2xl font-display font-medium text-green-deep mb-3 leading-tight tracking-tight group-hover:text-gold transition-colors duration-300">{item.title}</h3>
                    <p className="text-base md:text-lg font-light text-green-deep/80 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
            Initiate Your Metabolic Rehabilitation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm font-sans text-green-deep/70 mb-10 leading-relaxed uppercase tracking-widest"
          >
            A profound physiological shift awaits. Secure your consultation to commence a definitive health optimization protocol.
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
