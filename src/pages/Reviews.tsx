import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Kiran R.",
      age: 34,
      profession: "Corporate Director",
      location: "San Francisco, USA",
      topic: "Executive Fat Loss & Stamina",
      text: "Navigating high-stakes boardrooms and endless international flights left my metabolism wrecked. Traditional dieting felt like a punishment I couldn't sustain. Ojasio fundamentally re-engineered my fuel intake. They crafted an adaptive eating protocol that accommodated business dinners and volatile travel schedules. Within 16 weeks, my visceral fat plummeted, my chronic brain fog lifted, and I reclaimed a level of executive stamina I thought was permanently lost."
    },
    {
      name: "Isabella Martinez",
      age: 28,
      profession: "Architect",
      location: "Madrid, Spain",
      topic: "Systemic PCOS Reboot",
      text: "The clinical diagnosis of PCOS felt like a life sentence of hormonal chaos, uncontrollable acne, and creeping weight gain. Ojasio's intervention was nothing short of revolutionary. Through targeted nutritional chemistry and anti-inflammatory food sequencing, they stabilized my insulin naturally. My dermatological issues resolved entirely, my cycle normalized after years of irregularity, and I organically dropped 6 kg without tracking a single calorie."
    },
    {
      name: "Anand Desai",
      age: 48,
      profession: "Finance Partner",
      location: "London, UK",
      topic: "Advanced Glycemic Control",
      text: "When my physician flagged my pre-diabetic trajectory, panic set in. I assumed my culturally rich culinary traditions were permanently off-limits. Ojasio's clinical team proved otherwise. By instituting strategic glycemic buffering and precise meal timing, they intercepted my rising HbA1c levels, bringing them comfortably back to baseline. The panic is gone, and my metabolic health is firmly back in my control, all while still enjoying the foods of my heritage."
    },
    {
      name: "David H.",
      age: 39,
      profession: "Tech Founder",
      location: "Austin, USA",
      topic: "Hypertension & Stress Management",
      text: "Running a startup had pushed my cortisol and blood pressure into dangerous territory. I was perpetually exhausted yet unable to sleep deeply. The Ojasio framework functioned like a systemic reset. By introducing mineral-dense dietary adjustments and circadian-aligned eating windows, my blood pressure normalized within four months. I finally achieved deep restorative sleep and operate daily with unshakeable mental clarity."
    },
    {
      name: "Priya V.",
      age: 32,
      profession: "Marketing Lead",
      location: "Toronto, Canada",
      topic: "Gut Health Restoration",
      text: "Severe gastrointestinal distress and perpetual bloating dictated my mood and wardrobe for years. No generic probiotic fixed it. Ojasio instituted a methodical elimination and reintroduction protocol tailored specifically to my microbiome. The constant inflammatory response halted. My digestion is flawlessly regulated, my skin is radiating, and the daily afternoon lethargy has been fully eradicated."
    },
    {
      name: "The Sharma Family",
      age: 37,
      profession: "Working Parents",
      location: "Dubai, UAE",
      topic: "Pediatric Nutritional Excellence",
      text: "Our young son's severe food aversions and stagnant growth curve were incredibly stressful. Disha provided an empathetic, scientifically sound pediatric strategy. She taught us how to neurologically associate nutrient-dense foods with positive experiences. The transformation was profound: his immune resilience spiked, his growth metrics normalized, and dinnertime evolved from a battleground into a peaceful, nourishing family ritual."
    },
    {
      name: "Kenji M.",
      age: 26,
      profession: "Data Scientist",
      location: "Tokyo, Japan",
      topic: "Hypertrophic Lean Mass Gain",
      text: "Despite consuming massive amounts of food, I remained chronically underweight and structurally weak. Ojasio diagnosed my malabsorption issues and engineered a high-biological-value protein and complex carbohydrate matrix. Over 5 months, I successfully accumulated 8 kg of solid, lean architectural muscle. My biomechanical strength is phenomenal, and my somatic confidence has fundamentally changed."
    },
    {
      name: "Elena K.",
      age: 31,
      profession: "Performance Coach",
      location: "Melbourne, Australia",
      topic: "Elite Sports Nutrition",
      text: "As an athlete, my physical plateau was incredibly frustrating. My recovery times were extending, and my power output was dropping. The Ojasio team deployed a sophisticated sports nutrition protocol focusing on glycogen replenishment and mitochondrial support. The shift was immediate. My explosive power returned, delayed onset muscle soreness vanished, and I dropped my body fat percentage into elite metrics."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await fetch("https://formsubmit.co/ajax/hello@ojasio.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            rating: `${rating} Stars`,
            review: reviewText,
            _subject: `New Ojasio Review Submitted (${rating} Stars by ${firstName} ${lastName})`
        })
      });
    } catch (error) {
      console.error(error);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFirstName('');
      setLastName('');
      setEmail('');
      setReviewText('');
    }, 5000);
  };

  return (
    <div className="w-full bg-ivory pt-10 pb-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-display text-green-deep mb-6 leading-tight"
        >
          Trusted by Clients<br className="hidden md:block"/> Worldwide
        </motion.h1>
         <div className="w-20 h-1 bg-gold mx-auto" />
      </div>

      {/* Numbers Section */}
      <section className="bg-green-deep py-20 mb-24 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-ivory relative z-10">
          {[
            { value: "1000+", label: "Clients Managed" },
            { value: "5000+", label: "People Educated" },
            { value: "50+", label: "Seminars Conducted" },
          ].map((stat, idx) => (
             <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col"
              >
                <span className="text-6xl font-display font-semibold text-gold mb-3 drop-shadow-sm">{stat.value}</span>
                <span className="uppercase tracking-[0.2em] text-sm text-ivory/80 font-medium">{stat.label}</span>
              </motion.div>
          ))}
        </div>
      </section>

      {/* Header for Testimonials */}
      <div className="text-center mb-16 px-4 mt-24">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-16 bg-gold/50"></div>
          <span className="uppercase tracking-[0.4em] font-sans text-[10px] md:text-xs text-gold font-bold">Client Experiences</span>
          <div className="h-[1px] w-16 bg-gold/50"></div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-green-deep font-light">Success Stories</h2>
      </div>

      {/* Testimonials Slideshow */}
      <div className="max-w-5xl mx-auto px-4 mb-40 relative">
        <div className="relative flex items-center justify-center w-full">
            {/* Desktop Left Button */}
            <button 
              onClick={prevSlide} 
              className="hidden md:flex absolute -left-4 lg:-left-16 z-20 p-4 rounded-full border border-gold/30 text-gold bg-transparent hover:bg-gold hover:border-gold hover:text-white transition-all duration-500 focus:outline-none"
            >
               <ChevronLeft size={28} strokeWidth={1} />
            </button>

            <div className="w-full relative px-0">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={currentIndex}
                     initial={{ opacity: 0, scale: 0.98 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.98 }}
                     transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                     className="w-full py-4"
                  >
                     <div className="bg-[#FAF9F6] px-8 py-12 md:px-16 md:py-16 relative flex flex-col items-center text-center shadow-[0_15px_40px_-15px_rgba(26,54,43,0.08)] border border-gold/10">
                        <MessageSquareQuote className="absolute top-6 left-6 md:top-10 md:left-10 text-gold/5 h-16 w-16 md:h-24 md:w-24 transform -scale-x-100 z-0 stroke-[0.5]" />
                        
                        <div className="relative z-10 w-full flex flex-col items-center">
                          <span className="inline-block tracking-[0.2em] font-sans text-[10px] md:text-xs text-gold font-bold uppercase mb-8">
                             — {testimonials[currentIndex].topic} —
                          </span>
                          
                          <p className="text-sm md:text-base lg:text-lg text-green-deep/80 font-sans font-light italic mb-10 max-w-3xl leading-relaxed">
                            "{testimonials[currentIndex].text}"
                          </p>
                          
                          <div className="flex flex-col items-center justify-center pt-8 border-t border-gold/20 w-48">
                             <p className="font-display text-xl md:text-2xl text-green-deep mb-2">{testimonials[currentIndex].name}</p>
                             <p className="text-xs md:text-sm font-sans text-green-deep/60 mb-2">{testimonials[currentIndex].age}, {testimonials[currentIndex].profession}</p>
                             <p className="text-[9px] md:text-[10px] font-sans tracking-[0.2em] uppercase text-gold">{testimonials[currentIndex].location}</p>
                          </div>
                        </div>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Desktop Right Button */}
            <button 
              onClick={nextSlide} 
              className="hidden md:flex absolute -right-4 lg:-right-16 z-20 p-4 rounded-full border border-gold/30 text-gold bg-transparent hover:bg-gold hover:border-gold hover:text-white transition-all duration-500 focus:outline-none"
            >
               <ChevronRight size={28} strokeWidth={1} />
            </button>
        </div>
        
        {/* Mobile Navigation Controls & Desktop Dots */}
        <div className="flex flex-col justify-center items-center mt-12 w-full relative z-20">
          <div className="flex md:hidden items-center justify-center gap-8 mb-6">
            <button 
              onClick={prevSlide} 
              className="p-3 rounded-full border border-gold/30 text-gold bg-transparent hover:bg-gold hover:text-white transition-all duration-300 focus:outline-none"
            >
               <ChevronLeft size={20} strokeWidth={1} />
            </button>
            <button 
              onClick={nextSlide} 
              className="p-3 rounded-full border border-gold/30 text-gold bg-transparent hover:bg-gold hover:text-white transition-all duration-300 focus:outline-none"
            >
               <ChevronRight size={20} strokeWidth={1} />
            </button>
          </div>
          <div className="flex gap-3">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${currentIndex === idx ? 'bg-gold w-8' : 'bg-gold/30 hover:bg-gold/60'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Submit Review Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mb-32 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl shadow-green-deep/5 border border-gold/20"
      >
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-display text-green-deep mb-4">Share Your Experience</h3>
              <p className="font-light text-green-deep/70">
                We value your feedback. Let us know about your journey with Ojasio.
              </p>
            </div>

            <form className="space-y-10" action="https://formsubmit.co/hello@ojasio.com" method="POST">
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_subject" value={`New Review from ${firstName} ${lastName}`} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="rating" value={`${rating} Stars`} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-2">First Name</label>
                  <input 
                    required 
                    type="text" 
                    name="first_name"
                    className="w-full border border-beige rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 bg-ivory/50" 
                    placeholder="Enter your first name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-2">Last Name</label>
                  <input 
                    required 
                    type="text" 
                    name="last_name"
                    className="w-full border border-beige rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 bg-ivory/50" 
                    placeholder="Enter your last name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-2">Email Address</label>
                <input 
                  required 
                  type="email" 
                  name="email"
                  className="w-full border border-beige rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 bg-ivory/50" 
                  placeholder="Enter your email address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>

              <div className="border-t border-beige pt-8">
                <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-4 text-center">
                  Rate your experience with us
                </label>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <button 
                      type="button" 
                      key={i} 
                      className={`${(hoverRating || rating) > i ? 'text-gold fill-gold' : 'text-gray-300'} hover:text-gold transition-colors focus:outline-none`}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    >
                      <Star size={40} className={(hoverRating || rating) > i ? 'fill-gold' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-beige pt-8">
                <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-4">
                  Your Review (Optional)
                </label>
                <textarea 
                  name="review"
                  rows={4}
                  className="w-full border border-beige rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 resize-none bg-ivory/50"
                  placeholder="Tell us what you loved..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>

              <Button type="submit" disabled={rating === 0} className="w-full py-5 text-sm tracking-widest font-bold bg-green-deep text-ivory hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                SUBMIT REVIEW
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-10">
            <div className="w-20 h-20 bg-green-deep rounded-full flex items-center justify-center mx-auto mb-6">
              <Star size={40} className="text-gold fill-gold" />
            </div>
            <h3 className="text-3xl font-display text-green-deep mb-4">Thank you!</h3>
            <p className="font-light text-green-deep/70">
              Your feedback helps us continuously improve the Ojasio experience.
            </p>
          </div>
        )}
      </motion.div>

      {/* Net Promoter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-beige-light p-12 rounded-3xl"
      >
        <h3 className="text-3xl font-display text-green-deep mb-4">Ready to start?</h3>
        <p className="text-lg font-light text-green-deep/70 mb-10">
          Our success is defined by your vitality. Join thousands who have changed their lives.
        </p>
        <Button size="lg" onClick={() => navigate('/contact')}>
          Start Your Transformation Today
        </Button>
      </motion.div>
    </div>
  );
};
