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
      name: "Meera Desai",
      age: 34,
      profession: "Working Mother",
      location: "Chicago, USA",
      topic: "Weight Loss Transformation",
      text: "I struggled with post-pregnancy weight and intense sugar cravings that made traditional dieting impossible with a full-time job. Disha designed a flexible plan incorporating my favorite Indian meals. I never felt starved. The portions were satisfying, and the cravings naturally faded. I've lost 12 kg and 4 inches around my waist in 5 months. I finally fit into my old clothes and have the energy to keep up with my toddler without crashing at 3 PM. My confidence is completely back."
    },
    {
      name: "Sofia Martinez",
      age: 27,
      profession: "Graduate Student",
      location: "Barcelona, Spain",
      topic: "PCOS Management",
      text: "I was plagued by irregular cycles, acne, and stubborn weight gain from undiagnosed PCOS. Ojasio didn't just give me a diet; they educated me on how certain foods triggered my symptoms. The holistic plan was easy on my student budget and tight schedule. My cycle regulated within 3 months, my skin cleared up, and I safely lost 5 kg. I feel like I finally have control over my body again. The constant exhaustion is gone, and I feel vibrant and focused."
    },
    {
      name: "Rajesh Sharma",
      age: 52,
      profession: "Corporate Executive",
      location: "Mumbai, India",
      topic: "Diabetes Control",
      text: "Diagnosed with Type 2 diabetes, dealing with high stress, and having zero time for extensive workouts, I thought I had to give up all my comfort foods. The Ojasio team showed me how to balance my plates and manage my eating timings around my endless meetings. My HbA1c dropped from 8.2 to 6.1, and my medicine dosage has been halved. My doctor was amazed. I feel lighter, my brain fog has lifted, and I'm no longer anxious about my health's future."
    },
    {
      name: "David Okafor",
      age: 45,
      profession: "Entrepreneur",
      location: "London, UK",
      topic: "Blood Pressure Management",
      text: "I had high blood pressure from chronic stress and poor eating habits on the go. The Ojasio plan was practical. It wasn't about eating kale salads every day; it was about smart choices I could make even in restaurants. My BP normalized to 120/80 consistently over 6 months, and I lost 8 kg of visceral fat. I sleep soundly now, and the constant midday fatigue has vanished. I truly feel revitalized and younger."
    },
    {
      name: "Chloe Evans",
      age: 31,
      profession: "Graphic Designer",
      location: "Sydney, Australia",
      topic: "Lifestyle Improvement",
      text: "I suffered from severe bloating, poor sleep, and a sedentary lifestyle leading to constant sluggishness. Ojasio focused on my gut health and daily routine. The small tweaks to my morning habits and hydration made a world of difference without needing a gym. My digestion issues are completely resolved, and my sleep quality is drastically better. I wake up feeling refreshed instead of hitting snooze, and have sustained energy to truly enjoy my weekends."
    },
    {
      name: "Aisha & Yusuf Khan",
      age: 38,
      profession: "Homemaker & Parent",
      location: "Dubai, UAE",
      topic: "Child Nutrition Management",
      text: "Yusuf was a picky eater, constantly falling sick, and lacked growth milestones. Dinner time used to be a battlefield. Disha guided me on how to present nutrient-dense foods creatively so he'd actually enjoy them. Our journey has been incredible. Yusuf gained healthy weight, his immunity improved, and he now eats a variety of vegetables. As a mom, the relief of seeing my child thrive and eat happily without forcing him is immeasurable."
    },
    {
      name: "Kenji Sato",
      age: 24,
      profession: "Software Engineer",
      location: "Tokyo, Japan",
      topic: "Weight Gain",
      text: "I was underweight, had poor stamina, and struggled to build muscle despite eating a lot of junk food. I realized I wasn't eating the right calories. Ojasio created a high-protein, calorie-dense plan that didn't make me feel bloated or sluggish. I gained 7 kg of lean muscle mass in 4 months. I finally feel strong and confident in my clothes. My posture has improved, and I have the stamina to play sports after work."
    },
    {
      name: "Elena Rustova",
      age: 29,
      profession: "Yoga Instructor",
      location: "Vancouver, Canada",
      topic: "Fitness + Workout Guidance",
      text: "I had hit a plateau in my fitness and felt completely depleted after teaching my classes. Even as a fitness professional, I needed guidance. The sports nutrition approach filled the gaps in my diet I had ignored for years. I saw a noticeable improvement in stamina and muscle recovery, and my body fat dropped by 4%. I feel incredibly resilient. The constant soreness is gone, and I have the fuel to give my 100% to my students."
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

            <form className="space-y-10" onSubmit={handleSubmitReview}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold uppercase tracking-wider text-green-deep mb-2">First Name</label>
                  <input 
                    required 
                    type="text" 
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
                  rows={4}
                  className="w-full border border-beige rounded-xl p-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 resize-none bg-ivory/50"
                  placeholder="Tell us what you loved..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>

              <Button type="submit" disabled={rating === 0 || isSubmitting} className="w-full py-5 text-sm tracking-widest font-bold bg-green-deep text-ivory hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
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
