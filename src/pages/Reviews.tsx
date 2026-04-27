import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { text: "Lost 8 kg in 3 months with Ojasio. The process felt effortless because the food was tailored to my lifestyle. My energy levels are incredible.", author: "Priya S.", location: "Mumbai, India" },
    { text: "My sugar levels improved significantly. Disha's scientific approach gave me my life back when I thought nothing else would work.", author: "Rajiv K.", location: "Delhi, India" },
    { text: "Best personalised diet plan I've ever followed. No starving, pure nutrition. Highly recommended for busy professionals!", author: "Sarah Jenkins", location: "London, UK" },
    { text: "Finally put on healthy muscle weight without relying on artificial gainers. truly exceptional knowledge and guidance.", author: "Marcus Thompson", location: "New York, USA" },
    { text: "Managing PCOS used to be a nightmare. Within 6 months, my cycle is regular and I have so much more energy.", author: "Elena Rossi", location: "Milan, Italy" },
    { text: "The attention to detail and continuous support make Ojasio worth every penny. It's a true luxury wellness experience.", author: "Samir T.", location: "Dubai, UAE" },
    { text: "I have tried countless generic diet plans. Ojasio is the first one that understood my cultural food preferences and adapted seamlessly.", author: "Aisha M.", location: "Toronto, Canada" },
    { text: "Post-partum weight loss seemed impossible. Disha created a plan that nourished me and my baby while safely getting me back in shape.", author: "Neha Gupta", location: "Bangalore, India" },
    { text: "My cholesterol is down, and I'm off my meds! The holistic approach at Ojasio is life-saving and incredibly empowering.", author: "David Chen", location: "Singapore" },
    { text: "A truly transformative experience. I don't feel like I'm on a diet; I feel like I've learned how to eat for the rest of my life.", author: "Jessica H.", location: "Sydney, Australia" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

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
      await fetch("https://formsubmit.co/ajax/dishaarora3085@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            rating: `${rating} Stars`,
            review: reviewText,
            _subject: `New Ojasio Review Submitted (${rating} Stars)`
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

      {/* Testimonials Slideshow */}
      <div className="max-w-5xl mx-auto px-4 mb-32 relative">
        <div className="relative min-h-[450px] md:min-h-[400px] flex items-center justify-center">
           <AnimatePresence mode="wait">
              <motion.div
                 key={currentIndex}
                 initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                 transition={{ duration: 0.6, ease: "easeInOut" }}
                 className="absolute w-full px-2 sm:px-12"
              >
                 <div className="bg-white p-10 md:p-16 lg:p-20 rounded-[2.5rem] shadow-2xl shadow-green-deep/5 border border-gold/10 text-center relative overflow-hidden group">
                    <MessageSquareQuote className="absolute top-6 left-6 md:top-10 md:left-10 text-beige/40 h-16 w-16 md:h-24 md:w-24 transform -scale-x-100 z-0" />
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="flex justify-center text-gold mb-8 space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
                      </div>
                      
                      <p className="text-xl md:text-3xl lg:text-4xl text-green-deep/90 font-light italic mb-12 leading-relaxed md:leading-normal font-display">
                        "{testimonials[currentIndex].text}"
                      </p>
                      
                      <div className="flex flex-col items-center justify-center">
                         <div className="h-0.5 w-12 bg-gold mb-4"></div>
                         <p className="font-display font-bold text-xl md:text-2xl text-green-deep mb-1">{testimonials[currentIndex].author}</p>
                         <p className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-gold font-semibold">{testimonials[currentIndex].location}</p>
                      </div>
                    </div>
                 </div>
              </motion.div>
           </AnimatePresence>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-12 gap-6 md:gap-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={prevSlide} 
              className="p-4 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300 focus:outline-none hover:shadow-lg hover:-translate-x-1"
            >
               <ChevronLeft size={24} />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${currentIndex === idx ? 'bg-gold w-10' : 'bg-gold/30 hover:bg-gold/60'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide} 
              className="p-4 rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-white transition-all duration-300 focus:outline-none hover:shadow-lg hover:translate-x-1"
            >
               <ChevronRight size={24} />
            </button>
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
              <div>
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
