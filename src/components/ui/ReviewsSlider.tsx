import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    name: "Priya",
    location: "Mumbai, India",
    content: "I had struggled with irregular periods and severe cystic acne for 5 years. Disha Arora's approach completely changed my relationship with food. I'm not just eating better; I feel emotionally lighter and my acne is gone.",
    rating: 5
  },
  {
    name: "Sarah",
    location: "London, UK",
    content: "My doctor told me weight loss was impossible with my thyroid condition. Working with Disha Arora proved them wrong. By focusing on gut health and hormonal balance, I naturally dropped 12kg without feeling starved.",
    rating: 5
  },
  {
    name: "Aisha",
    location: "Dubai, UAE",
    content: "The continuous fatigue and mood swings were ruining my career. Ojasio's personalized plan helped me understand my cortisol spikes. I finally have my energy back, and I feel like myself again.",
    rating: 5
  },
  {
    name: "Jessica",
    location: "New York, USA",
    content: "I was skeptical at first, but Disha Arora's science-backed nutritional advice is unmatched. She doesn't just tell you what to eat; she explains why. My insulin resistance is finally under control.",
    rating: 5
  },
  {
    name: "Ananya",
    location: "Bangalore, India",
    content: "A premium experience from start to finish. The meal plans are easy to follow, delicious, and deeply nourishing. My persistent bloating is history.",
    rating: 5
  },
  {
    name: "Emma",
    location: "Sydney, Australia",
    content: "After trying every fad diet, Ojasio was a breath of fresh air. It's truly holistic. I sleep beautifully now, and my chronic inflammation has significantly reduced.",
    rating: 5
  },
  {
    name: "Roshni",
    location: "Toronto, Canada",
    content: "I started the plan solely for weight loss, but the improvements in my hormonal health were the real victory. My cycles are finally regular after years of unpredictability.",
    rating: 5
  },
  {
    name: "Nina",
    location: "Chicago, USA",
    content: "Disha Arora genuinely cares about her clients. The check-ins and adjustments to my plan made all the difference. My hormonal migraines have almost completely vanished.",
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
