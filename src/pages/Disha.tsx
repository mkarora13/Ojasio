import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, Users, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Disha: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-ivory pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-5xl font-display text-green-deep mb-4">
              Meet Your Nutrition Expert
            </h1>
            <h2 className="text-3xl text-gold font-display mb-8">
              <span className="block">Disha Arora</span>
              <span className="block text-sm font-sans tracking-widest text-green-deep/70 mt-1 uppercase">(NUTRITIONIST, ACTIVE CSNM MEMBER)</span>
              <span className="block text-xl text-green-deep/80 font-serif italic mt-2">Founder, Ojasio</span>
            </h2>
            
            <div className="space-y-6 text-sm font-sans text-green-deep/70 font-light leading-relaxed">
              <p>
                Disha Arora’s journey in nutrition, diet management, and wellness is built on over a decade of continuous learning, hands-on experience, and a deep commitment to transforming lives through food and lifestyle.
              </p>
              <p>
                With a strong academic foundation in Food & Nutrition Management from Georgian College, Canada, she combines global education with practical, real-world application. Over the years, she has worked across diverse environments including clinics, corporate setups, diet centers, and customer-focused wellness platforms, allowing her to understand the unique health challenges faced by individuals from different backgrounds.
              </p>
              <p>
                Her experience goes beyond theoretical knowledge. Disha has worked closely with clients dealing with weight management, diabetes, PCOS, and overall lifestyle disorders, helping them achieve sustainable and realistic results through personalised nutrition strategies. Her ability to adapt to different client needs, cultures, and routines makes her approach both flexible and highly effective.
              </p>
              <p>
                Throughout her journey, she has also contributed to wellness awareness by conducting seminars and engaging with thousands of individuals globally, educating them on the importance of balanced nutrition and healthy living.
              </p>
              <p>
                What sets Disha apart is her client-centric approach. She believes that every individual is different, and therefore every diet plan should be personalised, practical, and easy to follow. Her focus is not just on short-term results but on creating long-term lifestyle changes that lead to lasting health and well-being.
              </p>
              <p>
                With a blend of international exposure, practical expertise, and a passion for holistic wellness, Disha Arora continues to help individuals take control of their health and build a better, healthier future.
              </p>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7 }}
             className="order-1 lg:order-2 relative aspect-[4/5] max-h-[600px] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white mx-auto w-full max-w-md"
          >
            <img 
              src="https://images.pexels.com/photos/37274943/pexels-photo-37274943.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Disha Arora" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Elegant overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-green-deep/80 to-transparent flex flex-col justify-end p-8 text-ivory">
               <div className="font-display text-3xl tracking-wide">
                 <span className="block">Disha Arora</span>
                 <span className="block text-xs font-sans tracking-widest text-ivory/80 mt-1 uppercase">(NUTRITIONIST, ACTIVE CSNM MEMBER)</span>
               </div>
               <div className="flex flex-col mt-1">
                 <span className="text-gold-light italic text-lg">Founder, Ojasio</span>
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="my-32 relative text-center"
        >
          {/* Subtle background element */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display text-gold/[0.03] select-none pointer-events-none whitespace-nowrap z-0">
            VITALITY
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h3 className="text-xs tracking-[0.3em] md:tracking-[0.4em] text-gold uppercase font-semibold mb-6">The Philosophy</h3>
            <h2 className="text-4xl md:text-5xl font-display text-green-deep mb-12">
               Decoding <span className="italic text-gold">Ojasio</span>
            </h2>

            <div className="bg-white p-10 md:p-16 lg:p-20 rounded-[2.5rem] shadow-2xl shadow-green-deep/5 border border-gold/10 relative overflow-hidden">
               {/* Decorative corner accents */}
               <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-gold/30 rounded-tl-[2.5rem]" />
               <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-gold/30 rounded-br-[2.5rem]" />
               
               <div className="flex justify-center mb-8">
                  <span className="px-6 py-2 border border-gold/20 rounded-full text-sm font-sans tracking-widest text-green-deep uppercase bg-green-soft/20">
                    Root Word: Ojas
                  </span>
               </div>
               
               <p className="text-lg md:text-xl font-light text-green-deep/80 leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
                 In Sanskrit, <span className="font-medium italic text-green-deep">Ojas</span> represents the ultimate manifestation of:
               </p>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                 {[
                   { t: 'Vitality' },
                   { t: 'Life Energy' },
                   { t: 'Immunity' },
                   { t: 'Inner Glow' }
                 ].map((item, idx) => (
                   <div key={idx} className="flex flex-col items-center space-y-3 p-4 px-2 rounded-2xl hover:bg-green-soft/10 transition-colors">
                     <div className="h-[1px] w-12 bg-gold mb-2"></div>
                     <span className="font-display text-xl md:text-2xl text-green-deep tracking-wide">{item.t}</span>
                   </div>
                 ))}
               </div>

               <div className="max-w-2xl mx-auto mb-16">
                 <p className="text-xl md:text-2xl font-display text-green-deep italic leading-snug">
                   "It is considered the essence of health and well-being<br className="hidden md:block"/> — the energy that sustains life."
                 </p>
               </div>

               <div className="bg-green-deep text-ivory p-10 md:p-12 rounded-[2rem] shadow-inner relative overflow-hidden border border-gold/20">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]"></div>
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold blur-[100px] rounded-full opacity-20"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span className="font-display text-4xl md:text-5xl text-gold mb-6 tracking-wide">Ojasio</span>
                    <p className="text-lg md:text-xl font-light font-sans text-ivory/90 leading-relaxed mb-8 max-w-2xl mx-auto">
                      A modern platform that enhances your life energy, health, and overall vitality.
                    </p>
                    <div className="h-[1px] w-24 bg-gold/30 mb-8"></div>
                    <p className="text-[11px] md:text-xs font-sans uppercase tracking-[0.3em] font-semibold text-gold/90 leading-loose">
                      "Where vitality meets modern nutrition and wellness"
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-10 shadow-lg border border-beige"
        >
          <h3 className="text-3xl font-display text-center text-green-deep mb-12">Why Trust Me?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <GraduationCap size={40} />, title: "International Education", desc: "Georgian College, Canada" },
              { icon: <Briefcase size={40} />, title: "10+ Years Experience", desc: "Clinics, MNCs & Wellness Establishments" },
              { icon: <Users size={40} />, title: "Diverse Clients", desc: "Successfully managed clients globally" },
              { icon: <Star size={40} />, title: "Personalised Approach", desc: "Data-driven, biologically tailored plans" }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-4">
                <div className="text-gold mb-4">{item.icon}</div>
                <h4 className="text-xl font-display text-green-deep mb-2">{item.title}</h4>
                <p className="text-gray-600 font-light text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 text-center">
            <Button size="lg" onClick={() => navigate('/contact')}>
              Start Your Transformation Today
            </Button>
        </div>
      </div>
    </div>
  );
};
