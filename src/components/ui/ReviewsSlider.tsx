import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Aditi Rao",
    location: "Mumbai, India",
    content: "I had struggled with irregular cycles and painful hormonal acne for 5 years. Trying to figure it out alone was exhausting. Disha Arora's holistic approach changed everything—I'm not restricted; I simply learned how to nourish my body correctly. My acne has entirely cleared up.",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    location: "London, UK",
    content: "My doctor told me losing weight was nearly impossible with my thyroid condition, which left me feeling defeated. Working with Ojasio proved them wrong. By focusing heavily on gut health and insulin control, I managed to naturally drop 12kg without ever feeling starved or deprived.",
    rating: 5
  },
  {
    name: "Zoya Farooq",
    location: "Dubai, UAE",
    content: "The afternoon fatigue and constant mood swings were taking a serious toll on my demanding corporate career. This personalized plan finally helped me stabilize my blood sugar. I have my sharp focus back, and I feel incredible.",
    rating: 5
  },
  {
    name: "Harper Sterling",
    location: "New York, USA",
    content: "I was highly skeptical at first, but Disha’s nuanced grasp of functional nutrition is unmatched. She doesn't just hand you a generic diet chart; she carefully explains the biochemistry of why certain foods work for you. My insulin resistance is successfully reversed.",
    rating: 5
  },
  {
    name: "Lavanya Krishnamurthy",
    location: "Bangalore, India",
    content: "An absolutely premium experience from day one. I work 10-hour days, and the tailored meal plans were practical, profoundly nourishing, and extremely easy to incorporate. That awful, persistent bloating I battled for years is history.",
    rating: 5
  },
  {
    name: "Grace Holloway",
    location: "Sydney, Australia",
    content: "After burning out on every fad diet imaginable, Ojasio was a breath of fresh air. It’s a genuinely therapeutic lifestyle upgrade. I am sleeping beautifully, and my inflammatory markers have significantly dropped.",
    rating: 5
  },
  {
    name: "Tanya Gill",
    location: "Toronto, Canada",
    content: "I initially joined strictly for weight loss, but the miraculous improvements in my systemic hormonal health were the real victory here. After years of frustrating unpredictability, my cycles are perfectly regular.",
    rating: 5
  },
  {
    name: "Isabelle Chen",
    location: "Chicago, USA",
    content: "Disha genuinely invests in her clients. The meticulous check-ins and smart micro-adjustments she made to my nutritional plan changed everything. My debilitating hormonal migraines have almost completely vanished.",
    rating: 5
  }
];

export interface Review {
  name: string;
  location: string;
  content: string;
  rating: number;
}

interface ReviewsSliderProps {
  reviews?: Review[];
}

export const ReviewsSlider: React.FC<ReviewsSliderProps> = ({ reviews = REVIEWS }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure index is valid when switching between articles with different number of reviews
  const safeIndex = currentIndex >= reviews.length ? 0 : currentIndex;

  useEffect(() => {
    // Reset index if it becomes out of bounds
    if (currentIndex >= reviews.length) {
      setCurrentIndex(0);
    }
  }, [reviews, currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [reviews]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 px-4 sm:px-12 my-16 bg-[#1A2F2B] rounded-3xl overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Star size={120} className="text-[#EAC881]" />
      </div>
      
      <h3 className="text-3xl font-display text-white text-center mb-12 relative z-10">Real Experiences</h3>
      
      <div className="relative min-h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: reviews[safeIndex].rating || 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-[#EAC881] fill-[#EAC881]" />
              ))}
            </div>
            <p className="text-xl md:text-2xl font-serif italic text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              "{reviews[safeIndex].content || ''}"
            </p>
            <div className="font-sans">
              <p className="text-white font-semibold tracking-wide uppercase text-sm">{reviews[safeIndex].name}</p>
              <p className="text-[#EAC881] text-xs uppercase tracking-widest mt-1">{reviews[safeIndex].location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#EAC881] hover:text-[#1A2F2B] transition-colors z-20"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#EAC881] hover:text-[#1A2F2B] transition-colors z-20"
      >
        <ChevronRight size={20} />
      </button>
      
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === safeIndex ? 'w-8 bg-[#EAC881]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};
