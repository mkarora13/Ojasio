import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState('Weight Loss');
  const [otherGoal, setOtherGoal] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      await fetch("https://formsubmit.co/ajax/hello@ojasio.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            whatsapp,
            email,
            goal: primaryGoal === 'Other' ? otherGoal : primaryGoal,
            medical_history: medicalHistory,
            _subject: `New Assessment Inquiry from ${name}`
        })
      });
    } catch (error) {
      console.error(error);
    }
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setPrimaryGoal('Weight Loss');
      setOtherGoal('');
      setName('');
      setWhatsapp('');
      setEmail('');
      setMedicalHistory('');
    }, 5000);
  };

  const inputClass = "w-full p-4 bg-ivory/50 border border-beige rounded-none focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-colors font-light text-green-deep placeholder:text-green-deep/40";

  return (
    <div className="w-full bg-ivory pt-10 pb-24">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-display text-green-deep mb-4"
          >
            Initiate Your Clinical Assessment
          </motion.h1>
           <p className="text-xl text-green-deep/70 font-light max-w-2xl mx-auto">
             Secure your bespoke metabolic evaluation by completing the comprehensive intake dossier below, or engage our priority concierge team immediately via WhatsApp.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-beige"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-soft/10 text-green-soft rounded-full flex items-center justify-center mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-display text-green-deep mb-2">Inquiry Sent!</h3>
                <p className="text-green-deep/70">Our team will reach out to you within 24 hours.</p>
              </div>
            ) : (
              <form action="https://formsubmit.co/hello@ojasio.com" method="POST" className="space-y-6">
                <input type="hidden" name="_next" value={window.location.href} />
                <input type="hidden" name="_subject" value="New Assessment Inquiry" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-deep mb-2">Full Name</label>
                    <input required type="text" name="name" className={inputClass} placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-green-deep mb-2">WhatsApp Number</label>
                    <input required type="tel" name="whatsapp" className={inputClass} placeholder="+123 456 7890" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-deep mb-2">Email Address</label>
                    <input required type="email" name="email" className={inputClass} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-deep mb-2">Primary Goal</label>
                  <select 
                    name="goal"
                    className={inputClass}
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                  >
                    <option>Weight Loss</option>
                    <option>Weight Gain</option>
                    <option>Diabetes Management</option>
                    <option>PCOS Management</option>
                    <option>General Fitness & Vitality</option>
                    <option>Child Nutrition Management</option>
                    <option>Holistic Wellness</option>
                    <option>Healthy Relationship with Food</option>
                    <option>Energy & Daily Performance</option>
                    <option>Clinical Health Management</option>
                    <option>Confidence & Body Composition</option>
                    <option>Lifestyle Transformation</option>
                    <option>Other</option>
                  </select>
                </div>

                {primaryGoal === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2"
                  >
                    <label className="block text-sm font-medium text-green-deep mb-2">Please Specify</label>
                    <input 
                      required 
                      type="text" 
                      name="other_goal"
                      className={inputClass} 
                      placeholder="Specify your primary goal..." 
                      value={otherGoal}
                      onChange={(e) => setOtherGoal(e.target.value)}
                    />
                  </motion.div>
                )}

                <div>
                   <label className="block text-sm font-medium text-green-deep mb-2">Medical History & Condition Details</label>
                   <textarea name="medical_history" rows={4} className={inputClass} placeholder="Please describe any medical conditions, current medications, or specific dietary restrictions..." value={medicalHistory} onChange={(e) => setMedicalHistory(e.target.value)}></textarea>
                </div>

                <div className="pt-4">
                  <Button type="submit" fullWidth size="lg" className="text-sm tracking-widest uppercase">
                    Submit Assessment
                  </Button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Direct Contact */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col space-y-8"
          >
            <div className="bg-green-deep text-ivory p-10 rounded-3xl shadow-xl flex flex-col h-full justify-center">
               <h3 className="text-3xl font-display mb-4">Prefer a quick chat?</h3>
               <p className="text-ivory/80 font-light mb-10 leading-relaxed">
                 Skip the form and connect with our nutrition specialists directly via WhatsApp. Instant bookings and fast replies.
               </p>
               
               <a href="https://wa.me/919990356350?text=Hi%20Ojasio%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="block w-full mb-4">
                 <Button variant="whatsapp" fullWidth size="lg" className="flex items-center space-x-3 py-5">
                   <Phone size={24} />
                   <span className="text-lg">Book your 20 minutes free consultation</span>
                 </Button>
               </a>

               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@ojasio.com" target="_blank" rel="noopener noreferrer" className="block w-full">
                 <Button variant="secondary" fullWidth size="lg" className="flex items-center space-x-3 py-5 bg-white text-green-deep border-none hover:bg-gold hover:text-white transition-colors">
                   <Send size={24} />
                   <span className="text-lg">Email Us</span>
                 </Button>
               </a>

               <div className="mt-12 pt-8 border-t border-ivory/20">
                 <div className="flex items-center space-x-4">
                   <img loading="lazy" 
                    src="https://images.pexels.com/photos/37274943/pexels-photo-37274943.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Disha Arora" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                   />
                   <div>
                     <p className="font-display text-xl text-gold-light">Disha Arora</p>
                     <p className="text-sm text-ivory/60 font-light">Lead Nutritionist</p>
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
