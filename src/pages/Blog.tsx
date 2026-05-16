import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, ChevronRight, Mail, Calendar, Clock, Star, Download, Share2, Moon, Plane, BookOpen, Briefcase, Check, FileText } from 'lucide-react';
import { WhatsAppFloatingButton } from '../components/ui/WhatsAppFloatingButton';
import { ReviewsSlider } from '../components/ui/ReviewsSlider';
import * as ReviewData from '../data/reviewsData';

import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

// Content Data Structure

const DIET_PLANS: Record<string, any> = {
  "Indian Vegetarian": {
    country: "Indian Vegetarian",
    why: "An Indian vegetarian diet plan for PCOS leverages traditional, anti-inflammatory spices like turmeric, methi, and cinnamon. Complex carbohydrates are paired with protein and fiber to blunt blood sugar response and keep insulin flat.",
    days: {
      1: { breakfast: "2 Besan (gram flour) or Moong Dal Chillas stuffed with grated paneer and spinach + mint chutney", lunch: "1 Bowl of Jowar roti with mixed vegetables + 1 bowl dal + cucumber raita", dinner: "Light lauki (bottle gourd) soup + Sautéed tofu/paneer with bell peppers", snack: "Warm water with overnight soaked methi (fenugreek) seeds / 1 small bowl of fresh papaya or a green apple / 1 cup of Spearmint Tea + roasted makhana (fox nuts)" },
      2: { breakfast: "Savoury oats upma with plenty of peas, carrots, and peanuts", lunch: "1 portion Quinoa pulao + Rajma (kidney beans) + side salad", dinner: "Palak paneer (light gravy) with 1 bajra (pearl millet) roti", snack: "Warm cinnamon water / Handful of soaked almonds and 2 walnuts / Green tea + roasted chickpeas" },
      3: { breakfast: "Sprouted moong dal chat with diced tomatoes, cucumber, and lemon juice", lunch: "Brown rice + Chana dal + Bhindi (okra) masala", dinner: "Clear vegetable soup + grilled paneer salad with olive oil dressing", snack: "Warm water with turmeric / 1 whole orange or sweet lime / Spearmint Tea + 1 tbsp flaxseeds/pumpkin seeds" },
      4: { breakfast: "Poha (flattened rice) made with peas, peanuts, and half a grated carrot", lunch: "2 Ragi (finger millet) rotis + Baingan Bharta (mashed eggplant) + plain curd", dinner: "Moong dal khichdi (more dal, less rice) with a dollop of ghee", snack: "Overnight soaked methi water / Half cup pomegranate seeds / Herbal tea + handful of roasted peanuts" },
      5: { breakfast: "Vegetable dalia (broken wheat) with a side of plain yogurt", lunch: "1 bowl cooked millets (foxtail or barnyard) + mixed vegetable sambar", dinner: "Stir-fried broccoli and bell peppers with tofu/paneer", snack: "Warm cinnamon water / Small bowl of watermelon / Spearmint Tea + roasted edamame or chana" },
      6: { breakfast: "Paneer bhurji (scrambled Indian cottage cheese) with 1 multigrain toast", lunch: "2 Jowar rotis + Ghiya (bottle gourd) sabzi + small bowl of sprouts", dinner: "Pumpkin soup + portion of roasted vegetables", snack: "Warm water with lemon / A cup of buttermilk (chaas) with cumin powder / Green tea + cucumber sticks with hummus" },
      7: { breakfast: "Buckwheat (kuttu) pancakes or dosas with coconut chutney", lunch: "Brown rice + Black chana curry + a generous portion of cabbage salad", dinner: "Zucchini noodles (zoodles) or lightly sautéed vegetables with a protein source", snack: "Methi seed water / 1 sliced apple with a little almond butter / Spearmint Tea + a small piece of dark chocolate" }
    }
  },
  "Canada": {
    country: "Canada",
    why: "Balanced meals with high fiber, protein, and healthy fats help regulate insulin and reduce inflammation. Focuses on slow-digesting complex carbs and deeply satiating plant proteins.",
    days: {
      1: { breakfast: "Oatmeal with chia seeds and blueberries", lunch: "Quinoa salad with chickpeas and veggies", dinner: "Grilled tofu with roasted vegetables", snack: "Greek yogurt with flaxseeds" },
      2: { breakfast: "Avocado toast on whole grain bread", lunch: "Lentil soup with side salad", dinner: "Baked salmon with broccoli", snack: "Apple with almond butter" },
      3: { breakfast: "Smoothie with spinach, banana, and peanut butter", lunch: "Brown rice with black beans and veggies", dinner: "Stir-fried tofu with bell peppers", snack: "Mixed nuts" },
      4: { breakfast: "Scrambled eggs or paneer with veggies", lunch: "Whole wheat wrap with hummus and salad", dinner: "Grilled chicken or tofu with quinoa", snack: "Cottage cheese with berries" },
      5: { breakfast: "Overnight oats with seeds", lunch: "Chickpea salad bowl", dinner: "Vegetable soup with whole grain toast", snack: "Carrot sticks with hummus" },
      6: { breakfast: "Protein smoothie", lunch: "Brown rice sushi-style bowl", dinner: "Baked tofu with greens", snack: "Walnuts" },
      7: { breakfast: "Whole grain pancakes (no sugar)", lunch: "Lentil and veggie bowl", dinner: "Light vegetable stew", snack: "Dark chocolate (small piece)" }
    }
  },
  "USA": {
    country: "USA",
    why: "Focus on protein-rich and low glycemic foods helps stabilize blood sugar and reduce cravings. High fiber from raw leafy greens provides volume eating.",
    days: {
      1: { breakfast: "Greek yogurt with granola and berries", lunch: "Grilled chicken salad", dinner: "Salmon with sweet potato", snack: "Almonds" },
      2: { breakfast: "Protein smoothie", lunch: "Quinoa bowl with veggies", dinner: "Stir-fried tofu", snack: "Apple slices" },
      3: { breakfast: "Avocado toast", lunch: "Lentil soup", dinner: "Grilled chicken with greens", snack: "Peanut butter with celery" },
      4: { breakfast: "Oatmeal with nuts", lunch: "Brown rice bowl", dinner: "Baked fish or tofu", snack: "Yogurt" },
      5: { breakfast: "Egg scramble", lunch: "Chickpea salad", dinner: "Vegetable stir fry", snack: "Mixed seeds" },
      6: { breakfast: "Smoothie bowl", lunch: "Whole grain sandwich", dinner: "Grilled protein + veggies", snack: "Walnuts" },
      7: { breakfast: "Pancakes (healthy version)", lunch: "Soup + salad", dinner: "Light quinoa bowl", snack: "Dark chocolate" }
    }
  },
  "UK": {
    country: "UK",
    why: "Traditional whole foods and fiber-rich meals support gut health and hormone balance. Warm, cooked foods are gentler on digestion.",
    days: {
      1: { breakfast: "Porridge with berries", lunch: "Lentil soup", dinner: "Grilled fish with veggies", snack: "Nuts" },
      2: { breakfast: "Whole grain toast + avocado", lunch: "Chickpea salad", dinner: "Stir-fried vegetables", snack: "Apple" },
      3: { breakfast: "Yogurt with seeds", lunch: "Brown rice bowl", dinner: "Baked tofu", snack: "Carrots + hummus" },
      4: { breakfast: "Smoothie", lunch: "Whole wheat wrap", dinner: "Vegetable stew", snack: "Almonds" },
      5: { breakfast: "Oats with flaxseeds", lunch: "Soup + salad", dinner: "Grilled paneer", snack: "Yogurt" },
      6: { breakfast: "Eggs or tofu scramble", lunch: "Quinoa salad", dinner: "Roasted vegetables", snack: "Seeds" },
      7: { breakfast: "Pancakes (healthy)", lunch: "Lentil bowl", dinner: "Light soup", snack: "Dark chocolate" }
    }
  },
  "Australia": {
    country: "Australia",
    why: "Fresh, clean eating with minimal processed food reduces inflammation and improves insulin response. Exceptional healthy fats provide the needed cholesterol backbone.",
    days: {
      1: { breakfast: "Avocado toast", lunch: "Chicken salad", dinner: "Grilled fish + veggies", snack: "Nuts" },
      2: { breakfast: "Smoothie", lunch: "Quinoa bowl", dinner: "Stir fry", snack: "Fruit" },
      3: { breakfast: "Yogurt bowl", lunch: "Lentil salad", dinner: "Baked tofu", snack: "Seeds" },
      4: { breakfast: "Oats", lunch: "Whole grain wrap", dinner: "Grilled veggies", snack: "Almonds" },
      5: { breakfast: "Eggs or paneer", lunch: "Chickpea bowl", dinner: "Soup", snack: "Apple" },
      6: { breakfast: "Smoothie bowl", lunch: "Salad bowl", dinner: "Protein + veggies", snack: "Walnuts" },
      7: { breakfast: "Pancakes", lunch: "Soup", dinner: "Light quinoa", snack: "Dark chocolate" }
    }
  },
  "Spain": {
    country: "Spain",
    why: "Mediterranean-style diet rich in healthy fats and fiber helps regulate hormones and improve metabolism. One of the most anti-inflammatory diets.",
    days: {
      1: { breakfast: "Whole grain toast with olive oil", lunch: "Chickpea salad", dinner: "Grilled vegetables", snack: "Nuts" },
      2: { breakfast: "Yogurt with fruits", lunch: "Lentil stew", dinner: "Fish with salad", snack: "Seeds" },
      3: { breakfast: "Smoothie", lunch: "Brown rice with veggies", dinner: "Tofu stir fry", snack: "Apple" },
      4: { breakfast: "Oats", lunch: "Salad with olive oil", dinner: "Vegetable soup", snack: "Almonds" },
      5: { breakfast: "Toast + avocado", lunch: "Chickpea bowl", dinner: "Grilled paneer", snack: "Yogurt" },
      6: { breakfast: "Smoothie bowl", lunch: "Lentil soup", dinner: "Roasted vegetables", snack: "Walnuts" },
      7: { breakfast: "Healthy pancakes", lunch: "Salad", dinner: "Light stew", snack: "Dark chocolate" }
    }
  },
  "Japan": {
    country: "Japan",
    why: "Light, portion-controlled meals with fermented foods improve gut health and hormonal balance. Fermented foods deeply nourish the gut microbiome.",
    days: {
      1: { breakfast: "Miso soup + rice", lunch: "Sushi bowl", dinner: "Grilled fish/tofu", snack: "Edamame" },
      2: { breakfast: "Rice + vegetables", lunch: "Bento-style meal", dinner: "Soup + tofu", snack: "Green tea + nuts" },
      3: { breakfast: "Smoothie", lunch: "Rice + lentils", dinner: "Stir fry", snack: "Seeds" },
      4: { breakfast: "Oats (modern variation)", lunch: "Salad bowl", dinner: "Light soup", snack: "Apple" },
      5: { breakfast: "Tofu scramble", lunch: "Rice bowl", dinner: "Vegetables", snack: "Edamame" },
      6: { breakfast: "Smoothie bowl", lunch: "Bento", dinner: "Soup", snack: "Nuts" },
      7: { breakfast: "Light rice meal", lunch: "Salad", dinner: "Light broth", snack: "Dark chocolate" }
    }
  }
};

const downloadDietPlanPDF = async (countryCode: string) => {
  const planInfo = DIET_PLANS[countryCode];
  if (!planInfo) return;

  const doc = new jsPDF();
  
  // Fetch Logo
  let logoBase64 = null;
  try {
     const logoUrl = 'https://images.pexels.com/photos/37275150/pexels-photo-37275150.png?auto=compress&cs=tinysrgb&w=150';
     const response = await fetch(logoUrl);
     const blob = await response.blob();
     const reader = new FileReader();
     logoBase64 = await new Promise<string>((resolve) => {
       reader.onloadend = () => resolve(reader.result as string);
       reader.readAsDataURL(blob);
     });
  } catch (err) {
     console.error('Failed to load logo', err);
  }

  // Premium Branding Header
  doc.setFillColor(26, 47, 43); // Deep Green Background
  doc.rect(0, 0, 210, 75, 'F');
  
  if (logoBase64) {
    doc.addImage(logoBase64, 'PNG', 95, 10, 20, 20);
  }

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(234, 200, 129); // Gold
  doc.text("OJASIO", 105, 38, { align: "center" });

  doc.setFontSize(11);
  doc.text("PREMIUM WELLNESS", 105, 45, { align: "center" });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(255, 255, 255);
  doc.text("Modern Nutrition", 105, 54, { align: "center" });
  doc.text("Rooted in Vitality", 105, 60, { align: "center" });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 200);
  doc.text("hello@ojasio.com", 105, 68, { align: "center" });

  let y = 90;

  doc.setFontSize(22);
  doc.setTextColor(26, 47, 43);
  doc.text(`${planInfo.country} - 7 Day PCOS Diet Plan`, 20, y);
  y += 15;

  doc.setFontSize(12);
  for (let i = 1; i <= 7; i++) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    const day = planInfo.days[i];
    if (!day) continue;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 47, 43);
    doc.text(`Day ${i}`, 20, y);
    y += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    
    const lines = [
      `Breakfast: ${day.breakfast}`,
      `Lunch: ${day.lunch}`,
      `Dinner: ${day.dinner}`,
      `Snack: ${day.snack}`
    ];
    
    lines.forEach(line => {
      const splitLines = doc.splitTextToSize(line, 170);
      doc.text(splitLines, 20, y);
      y += 6 * splitLines.length;
    });
    y += 5;
  }

  if (y > 230) {
    doc.addPage();
    y = 20;
  }
  
  y += 10;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(26, 47, 43);
  doc.text("Why This Works for PCOS", 20, y);
  y += 8;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  const whySplit = doc.splitTextToSize(planInfo.why, 170);
  doc.text(whySplit, 20, y);
  y += 6 * whySplit.length;

  try {
    // Generate QR Code for Ojasio website
    if (y > 220) {
      doc.addPage();
      y = 20;
    }
    y += 15;
    const qrDataUrl = await QRCode.toDataURL('https://ojasio.com', {
      margin: 1,
      color: { dark: '#1A2F2B', light: '#FFFFFF' }
    });
    doc.addImage(qrDataUrl, 'PNG', 20, y, 40, 40);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 47, 43);
    doc.text("Scan to transform your health", 65, y + 20);
    doc.setFont('helvetica', 'normal');
    doc.text("Visit ojasio.com to start your journey", 65, y + 26);
  } catch (error) {
    console.error('Error generating QR', error);
  }

  try {
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${planInfo.country.toLowerCase().replace(/ /g, '-')}-pcos-diet-plan.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (e) {
    console.error("Download failed, opening in new window", e);
    window.open(doc.output('bloburl'), '_blank');
  }
};

const PCOS_REVIEWS = [
  {
    quote: "I was told I might never conceive naturally. My cycles were completely absent. Adapting this holistic plan formulated by Disha Arora and trusting the process gave me my life and my body back.",
    name: "Zainab Q., 27",
    location: "DUBAI, UAE",
    metrics: [
      { label: "Weight Loss", value: "-9 kg" },
      { label: "Menstrual Cycle", value: "Restored" },
      { label: "Journey Duration", value: "6 Months" },
      { label: "Outcome", value: "Natural Pregnancy" }
    ]
  },
  {
    quote: "The Indian vegetarian plan was a game-changer. Disha Arora understood my cultural eating habits and adjusted the plan without eliminating the foods I love. My insulin resistance is completely reversed.",
    name: "Shruti B., 32",
    location: "MUMBAI, INDIA",
    metrics: [
      { label: "Insulin", value: "Normal" },
      { label: "Energy", value: "+80%" },
      { label: "Duration", value: "4 Months" },
      { label: "Outcome", value: "Reversed Prediabetes" }
    ]
  },
  {
    quote: "I tried everything from keto to intense cardio. The global PCOS variations allowed me to eat a Mediterranean style diet while managing my symptoms. Truly life-changing approach.",
    name: "Maria V., 29",
    location: "MADRID, SPAIN",
    metrics: [
      { label: "Acne", value: "100% Cleared" },
      { label: "Weight Loss", value: "-12 kg" },
      { label: "Mood", value: "Stabilized" },
      { label: "Outcome", value: "Hormonal Harmony" }
    ]
  },
  {
    quote: "Having struggled with PCOS fatigue for a decade, finding Disha Arora's structured plan was a blessing. I followed her high-protein bowl strategy and finally saw the scale move down.",
    name: "Natasha P., 35",
    location: "TORONTO, CANADA",
    metrics: [
      { label: "Fat Loss", value: "-15 kg" },
      { label: "Cycles", value: "Regular" },
      { label: "Fatigue", value: "Gone" },
      { label: "Outcome", value: "Sustained Vitality" }
    ]
  },
  {
    quote: "What impressed me most was how Disha Arora incorporated everyday Indian ingredients to create such a powerful healing protocol. I didn't feel like I was on a diet, yet the results were phenomenal.",
    name: "Geeta K., 28",
    location: "DELHI, INDIA",
    metrics: [
      { label: "Weight Loss", value: "-7 kg" },
      { label: "Hair Fall", value: "Stopped" },
      { label: "Duration", value: "3 Months" },
      { label: "Outcome", value: "Symptom Free" }
    ]
  },
  {
    quote: "Living in the UK, I struggled to find a plan that worked in winter. The warm comfort variations in the global plan healed my gut and cleared my skin. It's the most sustainable approach I've found.",
    name: "Chloe D., 31",
    location: "LONDON, UK",
    metrics: [
      { label: "Skin", value: "Glowing" },
      { label: "Bloating", value: "Resolved" },
      { label: "Duration", value: "5 Months" },
      { label: "Outcome", value: "Optimised Digestion" }
    ]
  }
];

const WEIGHT_LOSS_REVIEWS = [
  {
    quote: "I struggled with crash diets for years. They always left me hungry and frustrated. After adopting the plan, I lost 7 kg in 3 months by just eating properly.",
    name: "Simran",
    location: "DELHI",
    age: 26,
    metrics: [
      { label: "Results", value: "Lost 7 kg" },
      { label: "Time", value: "3 Months" }
    ]
  },
  {
    quote: "Constant fatigue and weight gain was destroying my confidence. Disha Arora's guidance changed everything. I lost 6 kg, improved my energy, and finally feel like myself again.",
    name: "Bhavana",
    location: "MUMBAI",
    age: 29,
    metrics: [
      { label: "Results", value: "Lost 6 kg" },
      { label: "Benefit", value: "More Energy" }
    ]
  },
  {
    quote: "My late-night eating habits were completely ruining my progress. With structured meals, I lost 8 kg and stopped craving junk food entirely.",
    name: "Vikram",
    location: "CANADA",
    age: 32,
    metrics: [
      { label: "Results", value: "Lost 8 kg" },
      { label: "Benefit", value: "No Cravings" }
    ]
  },
  {
    quote: "PCOS and stubborn fat made losing weight feel impossible. Disha Arora's structured plan helped me reduce weight significantly and eliminated my severe bloating.",
    name: "Anjali",
    location: "DELHI",
    age: 34,
    metrics: [
      { label: "Results", value: "Weight Reduced" },
      { label: "Benefit", value: "No Bloating" }
    ]
  },
  {
    quote: "I had tried multiple extreme diets and nothing worked long-term. Following this method, I finally lost 9 kg sustainably without feeling deprived for a single day.",
    name: "Leah",
    location: "UK",
    age: 30,
    metrics: [
      { label: "Results", value: "Lost 9 kg" },
      { label: "Benefit", value: "Sustainable" }
    ]
  },
  {
    quote: "Emotional eating issues held me back for years. The personalized nutrition plan from Disha Arora not only helped me lose 5 kg but profoundly improved my mindset towards food.",
    name: "Ritu",
    location: "GURGAON",
    age: 27,
    metrics: [
      { label: "Results", value: "Lost 5 kg" },
      { label: "Benefit", value: "Better Mindset" }
    ]
  },
  {
    quote: "Having a sedentary desk job made it hard to stay active. I lost 10 kg with a balanced diet plan plus walking. It was incredibly simple and effective.",
    name: "Michael",
    location: "USA",
    age: 35,
    metrics: [
      { label: "Results", value: "Lost 10 kg" },
      { label: "Action", value: "Diet + Walking" }
    ]
  },
  {
    quote: "Hormonal imbalance was making me feel awful. After correcting my diet, I lost 6 kg and significantly improved my cycles. Truly grateful.",
    name: "Sanjana",
    location: "AUSTRALIA",
    age: 31,
    metrics: [
      { label: "Results", value: "Lost 6 kg" },
      { label: "Benefit", value: "Better Cycles" }
    ]
  },
  {
    quote: "I was stuck on a weight plateau for years and thought my metabolism was broken. Disha Arora's guidance finally helped me lose 8 kg with balanced eating.",
    name: "Radhika",
    location: "INDIA",
    age: 33,
    metrics: [
      { label: "Results", value: "Lost 8 kg" },
      { label: "Benefit", value: "Broke Plateau" }
    ]
  }
];

const LocalReviewsSlider = ({ reviews }: { reviews: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const review = reviews[currentIndex];

  return (
    <div className="mt-20 bg-[#1A1A1A] p-10 md:p-14 rounded-[2rem] text-white relative overflow-hidden shadow-2xl not-prose">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1A2F2B]/50 rounded-full blur-[80px]"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#EAC881] font-bold">✦ Real Client Stories</span>
            <span className="hidden sm:block w-12 h-[1px] bg-[#EAC881]/40"></span>
          </div>
          <div className="flex gap-3">
            <button onClick={prevSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight size={18} className="transform rotate-180" />
            </button>
            <button onClick={nextSlide} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <p className="text-xl md:text-2xl font-light italic leading-relaxed text-white mb-10 font-serif">
                "{review.quote}"
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EAC881] to-[#1A2F2B] p-[2px] shrink-0">
                  <div className="w-full h-full bg-[#1A1A1A] rounded-full flex items-center justify-center text-[#EAC881] font-display text-2xl">
                    {review.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-display text-2xl text-white">{review.name}{review.age ? `, ${review.age}` : ''}</h4>
                  <p className="text-[#EAC881]/80 font-sans text-[11px] tracking-widest mt-1 uppercase">{review.location}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h5 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-semibold">The Transformation</h5>
              <div className="space-y-6">
                {review.metrics.map((metric: any, i: number) => (
                  <div key={i} className={`flex items-center justify-between ${i < review.metrics.length - 1 ? 'border-b border-white/10 pb-4' : 'pt-2'}`}>
                    <span className="text-white font-light">{metric.label}</span>
                    <span className="text-lg lg:text-xl font-display text-[#EAC881] text-right">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const openDietPlanModal = (countryCode: string) => {
  window.dispatchEvent(new CustomEvent('open-diet-plan', { detail: countryCode }));
};

export const DietPlanModal = ({ countryCode, onClose }: { countryCode: string, onClose: () => void }) => {
  const planInfo = DIET_PLANS[countryCode];
  if (!planInfo) return null;

  const handleDownload = async () => {
    await downloadDietPlanPDF(countryCode);
  };

  const planText = `Ojasio - ${planInfo.country} 7 Day PCOS Diet Plan\n\n${planInfo.why}\n\n` + 
    [1,2,3,4,5,6,7].map(i => `Day ${i}:\nBreakfast: ${planInfo.days[i].breakfast}\nLunch: ${planInfo.days[i].lunch}\nDinner: ${planInfo.days[i].dinner}\nSnack: ${planInfo.days[i].snack}`).join('\n\n');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ojasio - ${planInfo.country} PCOS Diet Plan`,
          text: planText,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      navigator.clipboard.writeText(planText);
      alert('Plan copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#1A2F2B]/60 backdrop-blur-sm" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 md:p-8 bg-[#1A2F2B] text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <h2 className="text-2xl md:text-3xl font-display mb-2">{planInfo.country}</h2>
          <p className="text-[#EAC881] text-sm md:text-base uppercase tracking-widest font-bold">7-Day PCOS Nutrition Guide</p>
        </div>
        
        <div className="p-6 md:p-8 overflow-y-auto grow custom-scrollbar bg-[#FAF9F6]">
          <p className="text-sm font-sans text-[#1A2F2B]/80 mb-8 leading-relaxed bg-[#EAC881]/10 p-5 rounded-2xl border border-[#EAC881]/30 italic">
            "{planInfo.why}"
          </p>
          
          <div className="space-y-6">
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <div key={day} className="bg-white p-6 rounded-2xl shadow-sm border border-[#1A2F2B]/5">
                <h3 className="font-display font-bold text-xl text-[#1A2F2B] mb-4 border-b border-[#EAC881]/30 pb-2">Day {day}</h3>
                <ul className="space-y-4 text-sm font-sans">
                  <li><strong className="text-[#1A2F2B] uppercase tracking-widest text-[10px] block mb-1">Breakfast</strong> <span className="text-[#1A2F2B]/80 font-light">{planInfo.days[day].breakfast}</span></li>
                  <li><strong className="text-[#1A2F2B] uppercase tracking-widest text-[10px] block mb-1">Lunch</strong> <span className="text-[#1A2F2B]/80 font-light">{planInfo.days[day].lunch}</span></li>
                  <li><strong className="text-[#1A2F2B] uppercase tracking-widest text-[10px] block mb-1">Dinner</strong> <span className="text-[#1A2F2B]/80 font-light">{planInfo.days[day].dinner}</span></li>
                  <li><strong className="text-[#1A2F2B] uppercase tracking-widest text-[10px] block mb-1">Snack</strong> <span className="text-[#1A2F2B]/80 font-light">{planInfo.days[day].snack}</span></li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 border-t border-[#1A2F2B]/10 bg-white flex flex-wrap gap-4 justify-between shrink-0">
          <button onClick={handleDownload} className="flex-1 flex justify-center items-center gap-2 bg-[#EAC881] text-[#1A2F2B] px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all shadow-md">
            <Download size={16} /> Download your plan
          </button>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <button onClick={handleShare} className="flex-1 sm:w-auto flex justify-center items-center gap-2 bg-[#FAF9F6] border border-[#1A2F2B]/20 text-[#1A2F2B] px-6 py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all" title="Share">
              <Share2 size={16} /> Share
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BLOG_POSTS = [
  {
    id: "diabetes-blood-pressure-management",
    featured: true,
    title: "Complete Guide to Managing Diabetes and High Blood Pressure Naturally",
    subtitle: "How Nutrition and Lifestyle Can Support Healthy Blood Sugar and Blood Pressure Levels",
    category: "Metabolic Health",
    readTime: "8 Min Read",
    author: "DISHA ARORA | NUTRITIONIST | NUTRITION MANAGER | ACTIVE CSNM MEMBER",
    image: "https://images.pexels.com/photos/37620949/pexels-photo-37620949.png?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/37620949/pexels-photo-37620949.png?auto=compress&cs=tinysrgb&w=2000",
    excerpt: "Discover daily habits and foods that may help support healthy blood sugar and blood pressure levels. Learn how natural nutrition and proper wellness habits can contribute to your metabolic health.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          
          {/* 1. Powerful Introduction */}
          <h2>A Powerful Foundation for Your Metabolic Health</h2>
          <p className="lead text-xl md:text-2xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed font-serif">
            "Your daily lifestyle choices lay the groundwork for a healthier, more vibrant life. A calm, educational, and reassuring approach to nutrition can meticulously transform your metabolic health and foster long-term vitality."
          </p>
          <p>
            Globally, concerns around managing diabetes, stabilizing blood sugar, and combating high blood pressure are growing at an unprecedented rate. In today’s fast-paced environment, we lead increasingly demanding lives, often leaving little room to prioritize our cardiovascular and systemic health. However, the importance of everyday lifestyle and holistic nutrition choices cannot be overstated when it comes to disease prevention and vitality.
          </p>
          <p>
            Early prevention and proactive care matter. There is a profound, clinically proven link between chronic stress, modern processed food habits, an insidious lack of quality restorative sleep, and long-term metabolic disruption. Making thoughtful, expert-led adjustments to your daily routine can help support healthier lifestyle habits, reverse metabolic sluggishness, and significantly elevate your overall wellness trajectory over the coming decades.
          </p>
          <figure className="my-10">
            <img loading="lazy" src="https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Premium lifestyle wellness and healthy habits" className="w-full rounded-2xl object-cover shadow-lg aspect-[21/9]" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50 mt-2">Nourishing the body and mind through mindful daily habits.</figcaption>
          </figure>

          {/* 2. Understanding Diabetes & High Blood Pressure */}
          <h2>Understanding Diabetes & High Blood Pressure</h2>
          <p>
            In simple terms, <strong>diabetes</strong> occurs when your body struggles to effectively manage blood sugar (glucose) levels. This happens either because the body does not produce enough insulin or cannot use it properly. Common signs include excessive thirst, frequent urination, and unusual fatigue.
          </p>
          <p>
            <strong>High blood pressure</strong> (hypertension), on the other hand, means the force of your blood pushing against your blood vessel walls is consistently too high. Over time, this places extra strain on your heart and arteries. It is often called a "silent condition" because it may not present clear symptoms until it is quite advanced. Risk factors for both conditions include a sedentary lifestyle, poor diet, genetics, and excess body weight.
          </p>
          <div className="bg-[#FAF9F6] p-6 rounded-2xl border border-[#EAC881]/30 my-8">
            <p className="text-sm font-light m-0">
              <strong className="text-[#1A2F2B]">Important Note:</strong> This guide provides nutritional and lifestyle education. Readers should absolutely consult a qualified doctor or healthcare professional for an accurate diagnosis, medical concerns, and treatment. Nutrition and lifestyle alone do not guarantee cures, but they may help support overall health and symptom management.
            </p>
          </div>

          {/* 3. Foods That May Help Support Healthy Blood Sugar Levels */}
          <h2>Foods That May Help Support Healthy Blood Sugar Levels</h2>
          <p>
            Instead of fearing food, embrace the right kinds of nourishment. Exploring a balanced diabetes diet plan can improve your relationship with food while helping to manage symptoms.
          </p>
          <ul>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Whole Grains:</strong> Foods like brown rice, oats, and quinoa take longer to digest, slowing the release of sugar into your bloodstream.</div>
            </li>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Leafy Vegetables & High-Fiber Foods:</strong> Spinach, kale, and broccoli provide incredible volume and fiber without spiking blood sugar.</div>
            </li>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Lentils and Legumes:</strong> Brilliant sources of slow-digesting complex carbohydrates and plant-based protein.</div>
            </li>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Nuts and Seeds:</strong> Almonds, walnuts, and chia seeds provide healthy fats that promote sustained energy.</div>
            </li>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Berries & Cinnamon:</strong> Blackberries, blueberries, and a dash of cinnamon may help improve insulin sensitivity naturally.</div>
            </li>
            <li className="flex items-start gap-4">
               <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> 
               <div><strong className="text-[#1A2F2B]">Yogurt & Healthy Proteins:</strong> Protein helps you feel full and helps stabilize blood sugar effectively.</div>
            </li>
          </ul>

          {/* 4. Foods That May Help Support Healthy Blood Pressure Levels */}
          <h2>Foods That May Help Support Healthy Blood Pressure Levels</h2>
          <p>
            When considering a healthy diet for blood pressure and overarching heart health, focus on incorporating nutrient-dense, heart-friendly options. 
          </p>
          <div className="bg-[#FAF9F6] p-8 md:p-14 rounded-[2rem] shadow-sm border border-[#EAC881]/30 my-12 not-prose relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[60px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
            <h4 className="font-display text-2xl md:text-3xl text-[#1A2F2B] mb-10 relative z-10 text-center">Essential Heart-Healthy Nutrients</h4>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="bg-white p-8 rounded-[1.5rem] border border-[#1A2F2B]/5 shadow-sm hover:shadow-md transition-shadow">
                 <h5 className="font-bold text-[#1A2F2B] uppercase tracking-[0.15em] text-sm md:text-base mb-6 pb-4 border-b border-[#EAC881]/30 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#EAC881] shrink-0"></div>
                   Potassium & Low Sodium
                 </h5>
                 <p className="text-base font-light text-[#1A2F2B]/80 mb-6 leading-relaxed">Potassium actively helps your body balance excess sodium levels and eases tension in your blood vessel walls.</p>
                 <ul className="space-y-4 text-base text-[#1A2F2B]">
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Bananas and Plantains</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Beetroot and Beetroot Juice</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Sweet Potatoes and Yams</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Spinach and Leafy Greens</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Avocados</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#EAC881] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Lentils and Kidney Beans</span></li>
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-[1.5rem] border border-[#1A2F2B]/5 shadow-sm hover:shadow-md transition-shadow">
                 <h5 className="font-bold text-[#1A2F2B] uppercase tracking-[0.15em] text-sm md:text-base mb-6 pb-4 border-b border-[#EAC881]/30 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#1A2F2B] shrink-0"></div>
                   Heart-Friendly Fats & Fiber
                 </h5>
                 <p className="text-base font-light text-[#1A2F2B]/80 mb-6 leading-relaxed">Supporting your intricate cardiovascular system means prioritizing clean, unprocessed fats and rich whole foods.</p>
                 <ul className="space-y-4 text-base text-[#1A2F2B]">
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Fatty fish (rich in Omega-3s like Salmon)</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Extra virgin olive oil (Cold-pressed)</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Oats, Quinoa, and Whole Grains</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Flaxseeds and Chia Seeds</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Almonds, Walnuts, and Pistachios</span></li>
                   <li className="flex items-start gap-3"><CheckCircle2 size={18} className="text-[#1A2F2B] shrink-0 mt-1" /> <span className="font-light leading-relaxed">Berries and Citrus Fruits</span></li>
                 </ul>
              </div>
            </div>
          </div>

          {/* 5. Foods and Habits to Avoid */}
          <h2>Foods and Habits to Avoid</h2>
          <p>Avoiding certain pitfalls is just as crucial as what you add to your plate.</p>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
             <div className="flex-1 bg-red-50 p-6 rounded-2xl border-l-[6px] border-red-500 shadow-sm transition-all hover:shadow-md">
                <h4 className="font-bold text-red-800 mb-4 text-xl">The Don'ts</h4>
                <ul className="space-y-4 text-[#1A2F2B]/80 font-light list-none p-0">
                  <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span><strong>Excess Sugar:</strong> Including sugary beverages and refined sweets.</span></li>
                  <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span><strong>High Sodium Foods:</strong> Processed foods and excessive table salt.</span></li>
                  <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span><strong>Smoking & Alcohol:</strong> Avoid smoking entirely and limit alcohol excess.</span></li>
                  <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span><strong>Sedentary Lifestyle:</strong> Lack of movement stiffens arteries.</span></li>
                  <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span><strong>Poor Wellness:</strong> Avoid excess stress and a lack of quality sleep.</span></li>
                </ul>
             </div>
          </div>

          {/* 6. Daily Lifestyle Habits That Matter */}
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center my-14 lg:my-20">
            <div>
              <h2 className="text-3xl font-display text-[#1A2F2B] mb-6">Daily Lifestyle Habits That Matter</h2>
              <p>Small, achievable lifestyle tips for diabetes and hypertension can help manage conditions naturally over time. These beginner-friendly wellness habits will transform your health foundation.</p>
              <ul>
                <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> <span><strong className="text-[#1A2F2B]">Walking & Light Workouts:</strong> Just 30 minutes of brisk walking can significantly improve insulin sensitivity.</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> <span><strong className="text-[#1A2F2B]">Hydration:</strong> Drinking adequate water supports blood volume and helps flush excess sodium through the kidneys.</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> <span><strong className="text-[#1A2F2B]">Sleep & Stress Management:</strong> High cortisol from stress and poor sleep raises blood pressure and blood sugar simultaneously. Aim for 7-8 hours.</span></li>
                <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-2" /> <span><strong className="text-[#1A2F2B]">Meal Timing & Portion Control:</strong> Eating at consistent times trains your body to manage insulin drops and prevents late-night binge episodes.</span></li>
              </ul>
            </div>
            
            <figure className="order-first md:order-last">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-[#1A2F2B]/5 aspect-[4/5] sm:aspect-square md:aspect-[3/4] lg:aspect-[4/5] max-w-md mx-auto md:max-w-none">
                <div className="absolute inset-0 bg-[#1A2F2B]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <img loading="lazy" src="https://images.pexels.com/photos/4803920/pexels-photo-4803920.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Mental wellness and stress management" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out block" />
              </div>
              <figcaption className="text-sm font-light text-center text-[#1A2F2B]/60 mt-6 tracking-wide uppercase">Mindful routines support healthy metabolism.</figcaption>
            </figure>
          </div>

          {/* 7. Tips for Working Professionals & Night Shift Workers */}
          <h2>Tips for Working Professionals & Night Shift Workers</h2>
          <p>When you have back-to-back meetings or work irregular shifts, maintaining health routines seems daunting. If you are looking for the best nutritionist in Delhi NCR or online nutrition consultation in India, our strategies focus heavily on realistic adjustments.</p>
          <ul>
             <li className="flex items-start gap-4">
               <span className="text-[#EAC881] mt-1">•</span> <span className="leading-relaxed"><strong className="text-[#1A2F2B]">Meal Planning:</strong> Prepare meals ahead of time so you aren't forced into rushed, unhealthy eating habits.</span>
             </li>
             <li className="flex items-start gap-4">
               <span className="text-[#EAC881] mt-1">•</span> <span className="leading-relaxed"><strong className="text-[#1A2F2B]">Carry-Friendly Healthy Snacks:</strong> Keep almonds, roasted chickpeas, or fresh fruits securely packed at your desk to avoid junk food dependency.</span>
             </li>
             <li className="flex items-start gap-4">
               <span className="text-[#EAC881] mt-1">•</span> <span className="leading-relaxed"><strong className="text-[#1A2F2B]">Hydration at the Workplace:</strong> Keep a large glass bottle visible and drink steadily throughout your shift.</span>
             </li>
             <li className="flex items-start gap-4">
               <span className="text-[#EAC881] mt-1">•</span> <span className="leading-relaxed"><strong className="text-[#1A2F2B]">Sleep Management:</strong> For night shift workers, ensure your sleeping environment during the day is pitch black and cool to simulate night time.</span>
             </li>
          </ul>

          {/* 8. Vegetarian & Non-Vegetarian Meal Suggestions */}
          <h2>Vegetarian & Non-Vegetarian Meal Suggestions</h2>
          <p>Here are globally relatable, balanced eating examples that align with a diet for a healthy heart and balanced sugar.</p>
          
          <div className="bg-[#FAF9F6] p-8 md:p-14 rounded-[2rem] shadow-sm border border-[#EAC881]/30 my-12 not-prose relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[60px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
            <h4 className="font-display text-2xl md:text-3xl text-[#1A2F2B] mb-10 relative z-10 text-center">Daily Balanced Meals</h4>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="bg-white p-8 rounded-[1.5rem] border border-[#1A2F2B]/5 shadow-sm hover:shadow-md transition-shadow">
                 <h5 className="font-bold text-[#1A2F2B] uppercase tracking-[0.15em] text-sm md:text-base mb-6 pb-4 border-b border-[#EAC881]/30 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#EAC881] shrink-0"></div>
                   Vegetarian Options
                 </h5>
                 <ul className="space-y-6 text-base text-[#1A2F2B]">
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Breakfast</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">Steel-cut oats cooked with almond milk, chia seeds, and a handful of berries.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Lunch</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">A robust bowl of quinoa, black lentils, cucumbers, and tomatoes with an olive oil dressing.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Snacks</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">A portion of unsweetened Greek yogurt with walnuts.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Dinner</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">Gently sautéed tofu with a generous serving of broccoli and bell peppers.</span></li>
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-[1.5rem] border border-[#1A2F2B]/5 shadow-sm hover:shadow-md transition-shadow">
                 <h5 className="font-bold text-[#1A2F2B] uppercase tracking-[0.15em] text-sm md:text-base mb-6 pb-4 border-b border-[#EAC881]/30 flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#1A2F2B] shrink-0"></div>
                   Non-Vegetarian Options
                 </h5>
                 <ul className="space-y-6 text-base text-[#1A2F2B]">
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Breakfast</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">Scrambled eggs or a vegetable omelet with a side of whole-grain toast.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Lunch</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">Grilled chicken breast over a large bed of leafy greens, sprinkled with nuts.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Snacks</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">A small apple with pure peanut butter.</span></li>
                   <li className="flex flex-col"><strong className="text-[#1A2F2B] font-bold text-xs uppercase tracking-[0.1em] mb-2 opacity-80">Dinner</strong> <span className="leading-loose text-[#1A2F2B]/90 font-light">Baked salmon (rich in Omega-3) with roasted asparagus or beetroot salad.</span></li>
                 </ul>
              </div>
            </div>
          </div>

          {/* 9. When to Consult a Doctor */}
          <h2>When to Consult a Doctor</h2>
          <p>Nutritional guidance is meant to complement traditional medicine. You should seek immediate professional medical consultation if you experience any of the following:</p>
          <ul className="space-y-3 font-light">
             <li>• Persistent symptoms that do not resolve.</li>
             <li>• Sudden, unexplained dizziness or fainting.</li>
             <li>• Unusual fatigue that keeps you incredibly lethargic.</li>
             <li>• Frequent urination that disrupts your daily routine.</li>
             <li>• Sudden or drastic blood pressure spikes.</li>
          </ul>
          <p>Regular health checkups are an absolute necessity. Please always trust your healthcare professional for primary care management.</p>

        </div>

        {/* 10. Realistic Wellness Experiences */}
        <ReviewsSlider reviews={ReviewData.DIABETES_BP_REVIEWS} />

        {/* 11. FAQ Section */}
        <div className="mt-24 mb-16 border-t border-[#1A2F2B]/10 pt-16 font-sans">
          <h3 className="text-3xl font-display text-[#1A2F2B] mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6 max-w-4xl mx-auto text-[#1A2F2B]/80 font-light">
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">What foods help manage blood sugar naturally?</h4>
                <p>Foods rich in fiber, whole grains like oats and quinoa, green leafy vegetables, lentils, legumes, nuts, and healthy proteins help slow digestion and prevent drastic sugar spikes.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">What should people with high blood pressure avoid?</h4>
                <p>It is recommended to avoid high sodium (salt) packaged foods, excess refined sugar, heavily processed meals, smoking, and excessive alcohol.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">Can nutrition support heart health?</h4>
                <p>Absolutely. A diet rich in fresh vegetables, omega-3 fatty acids (like in salmon and walnuts), olive oil, and low sodium foods can contribute to maintaining a healthy cardiovascular profile while lowering inflammation.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">Is walking good for diabetes management?</h4>
                <p>Yes, regular brisk walking combined with other healthy lifestyle habits can help improve insulin sensitivity and support healthier blood sugar levels by allowing your muscles to utilize glucose effectively.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">How does sleep affect blood pressure?</h4>
                <p>Poor sleep or lack of sleep increases cortisol (the stress hormone), which can raise resting heart rate and blood pressure. Setting a consistent sleep schedule is a vital part of hypertension management.</p>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-[#EAC881]/20 shadow-sm">
                <h4 className="font-bold text-[#1A2F2B] text-lg mb-2">What lifestyle habits help manage diabetes?</h4>
                <p>Nutrition support for diabetes is critical, but prioritizing adequate sleep, managing daily stress through meditation or deep breathing, keeping hydrated, and maintaining regular, light physical activity are equally important for overall metabolic wellness.</p>
             </div>
          </div>
        </div>
      </>
    )
  },
  {
    id: "pcos-diet-plan",
    featured: true,
    title: "The Ultimate 7-Day PCOS Diet Plan: Indian & Global Nutrition Guide",
    subtitle: "For Hormonal Balance & Healing From Within",
    category: "PCOS & Hormones",
    readTime: "9 Min Read",
    author: "Disha Arora | Nutritionist | Nutrition Manager | Active CSNM Member",
    image: "https://images.pexels.com/photos/37409098/pexels-photo-37409098.png",
    coverImage: "https://images.pexels.com/photos/4394022/pexels-photo-4394022.jpeg",
    excerpt: "Discover a premium, science-backed 7-day Indian vegetarian diet plan for PCOS along with global eating variations. Learn how to manage weight, balance hormones naturally, and feel energetic.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          <p className="lead text-xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed">
            "85% of women with PCOS have insulin resistance. An anti-inflammatory, low-glycaemic diet is the single most effective non-pharmacological intervention."
          </p>

          <p>
            Weight gain that feels impossible to lose. Unpredictable periods causing constant stress. Fatigue that drains your energy by 3 PM. If you are battling Polycystic Ovary Syndrome (PCOS), these struggles aren't just inconvenient—they deeply impact how you feel in your own body every single day. Women all across the world face this silently, but finding balance is possible. 
          </p>

          <h2>Why Diet Is The Real Medicine</h2>
          <p>
            You’ve likely been told to "just lose weight." But PCOS isn't about willpower. It’s an endocrine disorder intricately tied to <strong>insulin resistance</strong>, hormonal imbalance, and chronic inflammation. When your cells resist insulin, your body pumps out more of it, which triggers your ovaries to overproduce testosterone. Over time, this leads to weight gain around your midsection, adult acne, hair thinning, and skipped periods.
          </p>
          <p>
            Healing begins not with starvation diets, but with strategic, deeply nourishing food that acts as medicine for your cells.
          </p>

          <img loading="lazy" src="https://images.pexels.com/photos/5622182/pexels-photo-5622182.jpeg" alt="Preparing healthy food" className="w-full rounded-2xl my-12 object-cover aspect-[21/9] shadow-lg" />

          <h2>The 7-Day Indian Vegetarian PCOS Diet Plan</h2>
          
          <p>
            An Indian vegetarian diet plan for PCOS is uniquely powerful because it leverages traditional, anti-inflammatory spices like turmeric, methi, and cinnamon. While many believe an Indian diet is inherently high in carbs and unsuitable for hormonal balance, a thoughtfully structured plan emphasizes whole food complex carbohydrates like millets (jowar, bajra, ragi), protein-rich dals, and antioxidant-rich vegetables. 
          </p>
          <p>
            The secret is in the sequencing and pairings: always pairing a carbohydrate with a fiber and protein source to blunt any blood sugar response. Instead of restricting your favorite cultural meals, this protocol aims to optimize them to keep your insulin flat, reducing androgen dominance and supporting natural ovulation.
          </p>

          <div className="bg-[#FAF9F6] p-8 md:p-10 rounded-[2rem] shadow-sm border border-[#EAC881]/30 my-10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#EAC881]/10 rounded-full blur-[40px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
            <div className="relative z-10 max-w-xl">
               <h4 className="font-display text-xl text-[#1A2F2B] mb-4">Complete 7-Day Indian Protocol</h4>
               <p className="text-sm font-light m-0 text-[#1A2F2B]/80 mb-6"><strong>What's inside:</strong> Comprehensive daily meal sequencing (Waking up to Dinner), smart insulin-balancing tips, and a full grocery shopping list tailored for the Indian kitchen.</p>
               <ul className="text-sm font-light space-y-3 mb-0">
                  <li className="flex items-center gap-2 m-0 p-0 before:hidden"><CheckCircle2 size={16} className="text-[#EAC881] shrink-0" /> Balanced macros using everyday ingredients</li>
                  <li className="flex items-center gap-2 m-0 p-0 before:hidden"><CheckCircle2 size={16} className="text-[#EAC881] shrink-0" /> Includes traditional spices & herbs</li>
                  <li className="flex items-center gap-2 m-0 p-0 before:hidden"><CheckCircle2 size={16} className="text-[#EAC881] shrink-0" /> Specifically designed for insulin resistance</li>
                </ul>
            </div>
            <button 
              onClick={() => openDietPlanModal("Indian Vegetarian")}
              className="relative z-10 shrink-0 flex items-center justify-center gap-3 bg-[#1A2F2B] text-white px-8 py-5 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#EAC881] hover:text-[#1A2F2B] transition-all duration-300 shadow-[0_10px_30px_rgba(26,47,43,0.15)] hover:shadow-[0_15px_40px_rgba(234,200,129,0.3)] hover:-translate-y-1"
            >
              <ArrowRight size={18} /> View & Share Plan
            </button>
          </div>

          <h2>Natural Home Remedies for Hormonal Healing</h2>
          <p>
            Nature provides profound therapeutic compounds that act directly on your endocrine system. Incorporating these natural remedies daily can make a significant difference:
          </p>
          <ul className="space-y-4">
            <li><strong>Cinnamon Water:</strong> Cinnamon acts as a powerful insulin sensitizer. It mimics insulin, lowering blood sugar levels effectively and improving fasting glucose.</li>
            <li><strong>Methi (Fenugreek) Seeds:</strong> Soaking fenugreek seeds overnight and drinking the water helps slow the absorption of sugar in the stomach and stimulates insulin.</li>
            <li><strong>Spearmint Tea:</strong> Clinically proven to have anti-androgenic properties. Drinking two cups a day significantly lowers free testosterone levels, reducing facial hair growth (hirsutism) and acne.</li>
            <li><strong>Flaxseeds:</strong> Rich in lignans, which bind to excess aggressive estrogens in the gut and safely excrete them from the body.</li>
            <li><strong>Turmeric:</strong> A potent anti-inflammatory. Since PCOS is an inflammatory state, turmeric (with black pepper for absorption) soothes cellular inflammation.</li>
          </ul>

          <h2>Global PCOS Diet Variations</h2>
          <p className="mb-10 text-xl font-light italic">PCOS is a global reality. Managing it should fit your local cuisine and lifestyle. Here’s how women around the world eat for hormonal balance.</p>

          <div className="space-y-8 my-8">
            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇨🇦 Canada (High-Protein Bowls)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Hearty, protein-forward to stay warm and satisfied.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Steel-cut oats with chia seeds for breakfast; Quinoa, avocado, and black bean bowls for lunch.</li>
                  <li><strong>Why it works:</strong> Focuses on slow-digesting complex carbs and deeply satiating plant proteins to keep insulin flat all day.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("Canada")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>
            
            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇺🇸 USA (Balanced Plates)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Quick, fresh, and lean.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Green smoothies with spinach and hemp protein; large mixed greens salads with lean chicken or tofu and olive oil vinaigrette.</li>
                  <li><strong>Why it works:</strong> High fiber from raw leafy greens provides volume eating, while lean proteins maintain muscle mass without spiking blood sugar.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("USA")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇬🇧 UK (Warm Comfort)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Wholesome, root-vegetable heavy, and warming.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Lentil and root vegetable soups; roasted broccoli and carrots with baked salmon or tempeh.</li>
                  <li><strong>Why it works:</strong> Warm, cooked foods are gentler on digestion, while salmon provides crucial Omega-3s to fight systemic inflammation.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("UK")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇦🇺 Australia (Fresh & Coastal)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Bright, fresh produce and light seafood.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Smashed avocado on sourdough (fermented, slow-carb) with poached eggs; grilled barramundi with a large fresh salad.</li>
                  <li><strong>Why it works:</strong> Exceptional healthy fats (avocado, eggs, fish) provide the cholesterol backbone needed to synthesize healthy sex hormones safely.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("Australia")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇪🇸 Spain (Mediterranean Style)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Rich in antioxidants and healthy oils.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Tomato gazpacho; large plates of grilled vegetables drizzled heavily in extra virgin olive oil; walnuts and almonds as snacks.</li>
                  <li><strong>Why it works:</strong> The Mediterranean diet is clinically proven to be one of the most anti-inflammatory diets in the world, perfect for PCOS management.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("Spain")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>

            <div className="bg-[#FAF9F6] p-8 rounded-2xl shadow-sm border border-[#EAC881]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4">🇯🇵 Japan (Clean & Fermented)</h4>
                <p className="text-sm font-light m-0"><strong>Style:</strong> Small portions, fermented, and algae-rich.</p>
                <ul className="text-sm font-light mt-4 mb-0">
                  <li><strong>Sample Meal:</strong> Miso soup; a small portion of rice with natto (fermented soybeans) and grilled fish; seaweed salads.</li>
                  <li><strong>Why it works:</strong> Fermented foods (like miso and natto) deeply nourish the gut microbiome, which is essential for proper estrogen clearance and metabolism.</li>
                </ul>
              </div>
              <button 
                onClick={() => openDietPlanModal("Japan")}
                className="shrink-0 flex items-center justify-center gap-2 bg-white border border-[#1A2F2B]/10 text-[#1A2F2B] px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#1A2F2B] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowRight size={14} /> View Plan
              </button>
            </div>
          </div>


          <h2>What to Eat vs. What to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
            <div className="bg-white p-8 rounded-2xl border-t-4 border-green-600 shadow-lg">
              <h4 className="font-bold text-[#1A2F2B] mb-6 text-xl uppercase tracking-widest text-center">✔ What to Eat</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <strong>Fiber-Rich Veggies:</strong> Broccoli, spinach, kale</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <strong>Lean Proteins:</strong> Paneer, eggs, lentils, tofu</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <strong>Healthy Fats:</strong> Walnuts, almonds, olive oil, avocado</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <strong>Anti-Inflammatory:</strong> Turmeric, ginger, berries</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl border-t-4 border-red-500 shadow-lg">
              <h4 className="font-bold text-[#1A2F2B] mb-6 text-xl uppercase tracking-widest text-center">✖ What to Avoid</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><X size={20} className="text-red-500 shrink-0" /> <strong>Refined Sugars:</strong> Sweets, sodas, packaged juices</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><X size={20} className="text-red-500 shrink-0" /> <strong>Maida (Refined Flour):</strong> White bread, pastas, biscuits</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><X size={20} className="text-red-500 shrink-0" /> <strong>Processed Foods:</strong> Chips, ready-to-eat meals</li>
                <li className="flex items-center gap-3 text-[#1A2F2B]/80 font-light"><X size={20} className="text-red-500 shrink-0" /> <strong>Excess Dairy:</strong> Especially if acne-prone</li>
              </ul>
            </div>
          </div>

          <h2>Expert Lifestyle Tips for Hormonal Harmony</h2>
          <ul className="space-y-6">
            <li><strong>Sleep is Non-Negotiable:</strong> Lack of sleep increases insulin resistance by 30% the next day. Aim for 7-8 hours of quality sleep.</li>
            <li><strong>Stress Management:</strong> High cortisol stops ovulation. Practice yoga, meditation, or simple deep breathing exercises daily.</li>
            <li><strong>Movement:</strong> Don't over-exercise (which spikes cortisol). Prioritize strength training and 10k steps over exhausting cardio sessions.</li>
            <li><strong>Consistency:</strong> Hormones take 3 to 6 months to cycle and shift. Do not expect magic in 10 days. Stay consistent.</li>
          </ul>

        </div>

        {/* Real Client Story */}
        <ReviewsSlider reviews={ReviewData.PCOS_REVIEWS} />
      </>
    )
  },
  {
    id: "lose-weight-without-starving",
    featured: false,
    title: "How to Lose Weight Without Starving: A Sustainable, Science-Backed Approach to Fat Loss",
    subtitle: "The Ultimate Guide to Sustainable Fat Loss",
    category: "Weight Loss",
    readTime: "8 Min Read",
    author: "Disha Arora | Nutritionist | Nutrition Manager | Active CSNM Member",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop",
    coverImage: "https://images.pexels.com/photos/8436499/pexels-photo-8436499.jpeg",
    excerpt: "Learn how to lose weight without starving using a sustainable diet plan, home remedies, yoga, and workouts. Healthy fat loss made simple and effective.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          <p className="lead text-xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed">
            If you’ve ever tried to lose weight, chances are you’ve been told one thing repeatedly: Eat less. Skip meals. Cut carbs. Avoid everything you love.
          </p>

          <p>
            And for a few days, it works. You see the scale drop… until suddenly: You feel tired. Irritated. Hungry all the time. And eventually, the weight comes back.
          </p>

          <p>
            Here’s the truth most diets don’t tell you: <strong>You don’t need to starve to lose weight.</strong> In fact, starvation is the biggest reason people fail. Sustainable fat loss is not about eating less — it’s about <strong>eating right</strong>.
          </p>

          <h2>Why Starving Doesn’t Work (Simple Science)</h2>
          <p>
            Your body is incredibly smart. When you drastically reduce your food intake, your metabolism slows down to conserve energy.
          </p>
          <ul>
            <li><strong>Hunger Hormones Spikes:</strong> Ghrelin levels increase, causing intense food obsession.</li>
            <li><strong>Fat Storage:</strong> Your body holds onto fat to protect against "famine."</li>
            <li><strong>Energy Crash:</strong> You feel constant fatigue and mood swings.</li>
          </ul>
          <p>
            This creates a vicious cycle: Eat less → feel hungry → binge → gain weight. The solution is to eat foods that keep you full, energized, and balanced.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-16 not-prose">
            <img loading="lazy" src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1000" alt="Workout" className="w-full h-full object-cover rounded-[2rem] aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-[#EAC881]/20" />
            <img loading="lazy" src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1000" alt="Cooking Ingredients" className="w-full h-full object-cover rounded-[2rem] aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-[#EAC881]/20" />
            <img loading="lazy" src="https://images.pexels.com/photos/6246497/pexels-photo-6246497.jpeg?auto=format&fit=crop&q=80&w=1000" alt="Yoga Lifestyle" className="w-full h-full object-cover rounded-[2rem] aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-[#EAC881]/20" />
            <img loading="lazy" src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=1000" alt="Running" className="w-full h-full object-cover rounded-[2rem] aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-[#EAC881]/20" />
          </div>

          <h2>What to Eat for Healthy Weight Loss</h2>
          <p>Instead of focusing on restriction, focus on <strong>nourishment</strong>.</p>
          
          <div className="space-y-6 my-8">
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#EAC881]/20">
              <h4 className="text-xl font-display text-[#1A2F2B] mb-2">1. High Protein Foods</h4>
              <p className="text-sm">✔ Keeps you full longer ✔ Reduces cravings</p>
              <p className="text-sm font-light mt-2"><strong>Include:</strong> Paneer, Tofu, Lentils (dal), Greek yogurt, Eggs (optional).</p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#EAC881]/20">
              <h4 className="text-xl font-display text-[#1A2F2B] mb-2">2. Fiber-Rich Foods</h4>
              <p className="text-sm">✔ Slows digestion ✔ Controls blood sugar</p>
              <p className="text-sm font-light mt-2"><strong>Include:</strong> Oats, Vegetables (broccoli, spinach, carrots), Fruits (apple, papaya).</p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#EAC881]/20">
              <h4 className="text-xl font-display text-[#1A2F2B] mb-2">3. Healthy Fats</h4>
              <p className="text-sm">✔ Supports hormones ✔ Keeps you satisfied</p>
              <p className="text-sm font-light mt-2"><strong>Include:</strong> Nuts (almonds, walnuts), Seeds (flaxseeds, chia), Olive oil.</p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-xl border border-[#EAC881]/20">
              <h4 className="text-xl font-display text-[#1A2F2B] mb-2">4. Complex Carbohydrates</h4>
              <p className="text-sm">✔ Provides steady energy ✔ Prevents sugar spikes</p>
              <p className="text-sm font-light mt-2"><strong>Include:</strong> Brown rice, Quinoa, Millets (jowar, bajra).</p>
            </div>
          </div>

          <h2>Sample Day Diet Plan (Balanced & Filling)</h2>
          <div className="bg-white rounded-2xl shadow-md border border-[#1A2F2B]/10 p-8 my-8">
            <ul className="space-y-4 not-prose list-none p-0 m-0">
              <li className="flex gap-4 items-start border-b border-[#1A2F2B]/10 pb-4">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Morning</span>
                <span className="font-light text-[#1A2F2B]/80">Warm water with lemon + soaked almonds</span>
              </li>
              <li className="flex gap-4 items-start border-b border-[#1A2F2B]/10 pb-4 pt-2">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Breakfast</span>
                <span className="font-light text-[#1A2F2B]/80">Vegetable oats + seeds</span>
              </li>
              <li className="flex gap-4 items-start border-b border-[#1A2F2B]/10 pb-4 pt-2">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Mid-Morning</span>
                <span className="font-light text-[#1A2F2B]/80">Fruit bowl</span>
              </li>
              <li className="flex gap-4 items-start border-b border-[#1A2F2B]/10 pb-4 pt-2">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Lunch</span>
                <span className="font-light text-[#1A2F2B]/80">2 rotis + dal + sabzi + salad</span>
              </li>
              <li className="flex gap-4 items-start border-b border-[#1A2F2B]/10 pb-4 pt-2">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Evening Snack</span>
                <span className="font-light text-[#1A2F2B]/80">Roasted makhana + green tea</span>
              </li>
              <li className="flex gap-4 items-start pt-2">
                <span className="text-[#EAC881] font-bold w-32 shrink-0">Dinner</span>
                <span className="font-light text-[#1A2F2B]/80">Light vegetable soup + paneer/tofu</span>
              </li>
            </ul>
          </div>

          <h2>What to Avoid (For Faster Results)</h2>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
            <div className="flex-1 bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-red-700 mb-4 text-lg">Avoid These:</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Sugary drinks and sodas</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> White bread and maida products</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Deep fried and greasy food</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Ultra-processed packaged snacks</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Excess caffeine (especially on empty stomach)</li>
              </ul>
            </div>
            <div className="flex-1 bg-[#1A2F2B] p-6 rounded-2xl text-white shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-[#EAC881] mb-4 text-lg">Why?</h4>
              <p className="font-light text-white/80 mb-4">These foods:</p>
              <ul className="space-y-3 text-white/80 font-light">
                <li className="flex items-center gap-2">Spike insulin levels rapidly</li>
                <li className="flex items-center gap-2">Increase stubborn fat storage</li>
                <li className="flex items-center gap-2">Cause huge mid-day sugar crashes and cravings</li>
              </ul>
            </div>
          </div>

          <h2>What to Do (For Lasting Success)</h2>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
            <div className="flex-1 bg-green-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-green-700 mb-4 text-lg">Make Sure To:</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Eat protein with every single meal</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Drink at least 2.5–3 liters of water</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Aim for 8,000–10,000 steps daily</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Sleep for 7–8 hours every night</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Chew your food slowly and properly</li>
              </ul>
            </div>
            <div className="flex-1 bg-[#EAC881]/10 p-6 rounded-2xl text-[#1A2F2B] border border-[#EAC881]/20 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-[#1A2F2B] mb-4 text-lg">Why?</h4>
              <p className="font-light text-[#1A2F2B]/80 mb-4">These core habits provide structure and:</p>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-2">Keep your metabolism naturally fired up</li>
                <li className="flex items-center gap-2">Promote healthy digestion and reduce bloating</li>
                <li className="flex items-center gap-2">Stabilize blood sugar to dramatically reduce cravings</li>
                <li className="flex items-center gap-2">Signal your brain properly when you are actually full</li>
              </ul>
            </div>
          </div>

          <h2>Natural Home Remedies for Weight Loss</h2>
          <p>Simple daily habits can make a big difference in enhancing your body's natural metabolic processes:</p>
          <ul className="space-y-2">
            <li><strong>Jeera Water:</strong> Boosts digestion and reduces bloating. Drink in the morning.</li>
            <li><strong>Lemon Water:</strong> Improves metabolism gently when taken on an empty stomach.</li>
            <li><strong>Cinnamon Water:</strong> Helps control sugar cravings and stablize blood sugar.</li>
            <li><strong>Warm Water:</strong> Sip throughout the day to improve digestion and flush toxins.</li>
          </ul>

          <h2>Movement That Helps You Lose Weight Naturally</h2>
          
          <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-4 text-lg flex items-center gap-2">🧘‍♀️ Yoga (Beginner)</h4>
              <ul className="space-y-2 text-[#1A2F2B]/80 font-light mb-4">
                <li>• Surya Namaskar (5–10 rounds)</li>
                <li>• Bhujangasana</li>
                <li>• Kapalbhati (5 minutes)</li>
              </ul>
              <p className="text-sm font-semibold text-[#EAC881]">✔ Improves metabolism ✔ Reduces stress</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-4 text-lg flex items-center gap-2">🏃 Workout Plan</h4>
              <ul className="space-y-2 text-[#1A2F2B]/80 font-light mb-4">
                <li>• Walking: 30–45 minutes daily</li>
                <li>• Strength training: 3 times a week</li>
                <li>• Home workouts: squats, pushups</li>
              </ul>
              <p className="text-sm font-semibold text-[#EAC881]">✔ Burns fat ✔ Builds lean muscle</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20 md:col-span-2">
              <h4 className="font-bold text-[#1A2F2B] mb-4 text-lg flex items-center gap-2">🏊 Swimming (If Available)</h4>
              <p className="text-[#1A2F2B]/80 font-light mb-4">Aim for 2–3 times per week. Swimming provides a high-calorie burn with zero impact on your joints.</p>
              <p className="text-sm font-semibold text-[#EAC881]">✔ Full body workout ✔ Burns high calories</p>
            </div>
          </div>

          <h2>Daily Habits That Accelerate Fat Loss</h2>
          <ul>
            <li><strong>Sleep:</strong> 7–8 hours every night.</li>
            <li><strong>Hydration:</strong> Drink 2.5–3 liters of water.</li>
            <li><strong>Stress:</strong> Meditate and manage stressors actively.</li>
            <li><strong>Timing:</strong> Eat your meals on consistent times.</li>
          </ul>

          <h2>Final Thoughts</h2>
          <p>Weight loss doesn’t need to be painful. You don’t need to starve, avoid everything you love, or follow extreme diets. You just need the <strong>right food</strong>, the <strong>right habits</strong>, and <strong>consistency</strong>.</p>
        </div>

        {/* Real Client Story */}
        <ReviewsSlider reviews={ReviewData.WEIGHT_LOSS_REVIEWS} />
      </>
    )
  },
  {
    id: "best-foods-for-hormonal-balance",
    featured: false,
    title: "Best Foods for Hormonal Balance",
    subtitle: "A Clinical Nutritionist's Guide to Healing",
    category: "Gut Health & Wellness",
    readTime: "5 Min Read",
    author: "Disha Arora | Nutritionist | Nutrition Manager | Active CSNM Member",
    image: "https://images.pexels.com/photos/6632286/pexels-photo-6632286.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/6632286/pexels-photo-6632286.jpeg?auto=compress&cs=tinysrgb&w=2000",
    excerpt: "Your hormones dictate everything from your mood to your metabolism. Explore the best foods to include in your daily routine to balance them naturally.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          
          <h2>What is Hormonal Imbalance?</h2>
          <p>
            Think of hormones as your body’s chemical messengers. They travel through your bloodstream, telling your organs and tissues what to do and when to do it. From your metabolism and heart rate to your mood, sleep, and reproductive cycles—hormones control it all. 
            When you experience a hormonal imbalance, it means you have too much or too little of a certain hormone. Even tiny shifts in this delicate ecosystem can cause widespread disruption, turning what should be a perfectly synchronized orchestra into chaos.
          </p>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/5214957/pexels-photo-5214957.jpeg" alt="Hormonal balance and wellness" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Balancing your hormones naturally through proper nutrition and lifestyle.</figcaption>
          </figure>

          <h2>Signs and Symptoms to Watch For</h2>
          <p>
            How do you know if your hormones are out of sync? Your body is incredibly communicative, but often we dismiss its warning signs as "normal" aging or stress. Common symptoms include:
          </p>
          <ul className="space-y-4 my-8 pl-4 border-l-4 border-[#EAC881] list-none">
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Unexplained Weight Gain:</strong> Specifically stubborn visceral fat around the abdomen, often signaling high cortisol or insulin resistance.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Adult Acne:</strong> Deep, cystic breakouts along the jawline typically point to elevated androgens or estrogen dominance.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Severe Mood Swings & Anxiety:</strong> Feeling overwhelmed, irritable, or dealing with intense PMS symptoms due to dropping progesterone levels.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Irregular Periods & Fatigue:</strong> Chronic exhaustion no matter how much you sleep, coupled with unpredictable or missing menstrual cycles.</span></li>
          </ul>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/6608542/pexels-photo-6608542.jpeg?auto=format&fit=crop&q=80&w=1600" alt="Healthy balanced lifestyle" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Understanding your body's signals is the first step toward profound healing.</figcaption>
          </figure>

          <h2>The Best Foods for Hormonal Balance</h2>
          
          <div className="space-y-6 my-8 not-prose">
            <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">1. Healthy Fats</h4>
              <p className="text-sm font-light m-0 text-[#1A2F2B]/80"><strong>What to Eat:</strong> Avocados, wild-caught salmon, chia seeds, flaxseeds, and organic ghee.</p>
              <p className="text-sm font-light mt-2 text-[#1A2F2B]/80"><strong>Why it works:</strong> Your body literally cannot synthesize hormones without cholesterol and healthy fats. Fat is the molecular building block for estrogen, progesterone, and testosterone. Furthermore, Omega-3 fatty acids actively lower systemic inflammation and cellular stress.</p>
            </div>
            
            <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">2. Fiber-Rich Foods</h4>
              <p className="text-sm font-light m-0 text-[#1A2F2B]/80"><strong>What to Eat:</strong> Dark leafy greens, broccoli, oats, lentils, and berries.</p>
              <p className="text-sm font-light mt-2 text-[#1A2F2B]/80"><strong>Why it works:</strong> Fiber feeds the estrobolome—a specific set of bacteria in your gut responsible for metabolizing and eliminating excess estrogen. Without fiber, excess estrogen gets reabsorbed into your bloodstream, leading to estrogen dominance.</p>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">3. Quality Protein Sources</h4>
              <p className="text-sm font-light m-0 text-[#1A2F2B]/80"><strong>What to Eat:</strong> Organic eggs, grass-fed poultry, lentils, quinoa, and almonds.</p>
              <p className="text-sm font-light mt-2 text-[#1A2F2B]/80"><strong>Why it works:</strong> Dietary protein provides essential amino acids needed to produce peptide hormones, such as insulin and growth hormone. Starting your morning with 20-30g of high-quality protein dramatically flattens your blood sugar curve for the remainder of the day.</p>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">4. Anti-Inflammatory Foods</h4>
              <p className="text-sm font-light m-0 text-[#1A2F2B]/80"><strong>What to Eat:</strong> Turmeric, ginger, extra virgin olive oil, green tea, and dark chocolate.</p>
              <p className="text-sm font-light mt-2 text-[#1A2F2B]/80"><strong>Why it works:</strong> Systemic inflammation triggers the adrenal glands to pump out cortisol. When cortisol is chronically elevated, it signals your liver to dump glucose, driving insulin resistance. Anti-inflammatory foods cool down this stress response at a cellular level.</p>
            </div>

            <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">5. Herbs and Adaptogens</h4>
              <p className="text-sm font-light m-0 text-[#1A2F2B]/80"><strong>What to Eat:</strong> Ashwagandha, Maca root, Holy Basil (Tulsi), and Spearmint.</p>
              <p className="text-sm font-light mt-2 text-[#1A2F2B]/80"><strong>Why it works:</strong> Adaptogens physically regulate your HPA axis (Hypothalamic-Pituitary-Adrenal axis). They help lower excess cortisol and protect your body from the physical wear-and-tear of modern stress, naturally preserving your progesterone levels.</p>
            </div>
          </div>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/1161547/pexels-photo-1161547.jpeg?auto=format&fit=crop&q=80&w=1600" alt="Nutritional ingredients" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
          </figure>

          <h2>Foods to Strictly Avoid</h2>
          <p>If you're serious about healing your endocrine system, you must significantly limit:</p>
          <ul className="space-y-4 my-8">
            <li><strong>Refined Sugar & Simple Carbs:</strong> These cause violent spikes in insulin, leading to insulin resistance, which prompts your ovaries to create excess testosterone (the primary driver of PCOS).</li>
            <li><strong>Processed Seed Oils:</strong> Canola, soybean, and sunflower oils oxidize easily in the body, creating massive systemic inflammation and cellular damage.</li>
            <li><strong>Excess Caffeine & Alcohol:</strong> Drinking coffee on an empty stomach spikes cortisol by up to 30%. Alcohol severely taxes the liver, crippling its ability to filter and detoxify old hormones out of your system.</li>
          </ul>

          <h2>Daily Routine Tips for Healing</h2>
          <p>
            Food is only half the equation. Your environment and daily habits dictate your internal biochemistry just as much as your plate does.
          </p>
          <ul className="space-y-4 my-8 pl-4 border-l-4 border-[#EAC881] list-none">
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Meal Timing:</strong> Stop eating 3 hours before bed to allow your insulin levels to drop, permitting maximum release of Human Growth Hormone (HGH) overnight.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Sleep Hygiene:</strong> 90% of your hormonal repair happens during deep REM sleep. Keep your room pitch dark and avoid blue light 90 minutes before sleep.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Hydration:</strong> Drink warm lemon water upon waking to stimulate hepatic (liver) function, accelerating the detoxification of excess hormones.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Stress Management:</strong> Practice slow, guided diaphragmatic breathing for 5 minutes daily. This physically shifts your nervous system out of "fight or flight" (sympathetic) and into "rest and digest" (parasympathetic).</span></li>
          </ul>

          <h2>Do's and Don'ts</h2>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
            <div className="flex-1 bg-green-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-green-700 mb-4 text-lg">DO's</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Eat protein within 60 minutes of waking.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Walk for 15 minutes after your heaviest meal.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Cycle your seeds (flax/pumpkin phase 1, sunflower/sesame phase 2).</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> Prioritize strength training over excessive chronic cardio.</li>
              </ul>
            </div>
            <div className="flex-1 bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-red-700 mb-4 text-lg">DON'Ts</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Don't drink coffee on an empty stomach.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Don't drastically slash your healthy fat intake.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Don't ignore chronic, low-grade stress.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> Don't eat large meals late at night.</li>
              </ul>
            </div>
          </div>

        </div>
        
        <ReviewsSlider reviews={ReviewData.HORMONAL_BALANCE_REVIEWS} />
      </>
    )
  },
  {
    id: "lifestyle-guide-busy-professionals",
    title: "Complete Lifestyle Guide for Busy Professionals, Night Shift Workers, and Budget-Friendly Healthy Living",
    subtitle: "Realistic, actionable wellness for the real world.",
    category: "Lifestyle",
    readTime: "12 Min Read",
    author: "Disha Arora | Nutritionist | Nutrition Manager | Active CSNM Member",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000",
    excerpt: "Learn how to maintain a healthy lifestyle despite corporate jobs, night shifts, limited budgets, and lack of time. Practical, realistic, and actionable guidance for the modern worker.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          
          <h2>Introduction</h2>
          <p className="lead text-xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed">
            "You don't need a perfect schedule to be healthy. You just need a strategy that bends to fit your reality."
          </p>
          <p>
            We are constantly told to sleep 8 hours, eat fresh home-cooked meals 3 times a day, and exercise daily. But let’s be honest: if you work a 10-hour corporate desk job, rotate through night shifts, or are navigating life on a strict budget, that "textbook" advice often feels like an impossible luxury. You might feel fatigued, overwhelmed, and guilty for relying on quick fixes or skipping meals altogether.
          </p>
          <p>
            This guide is not about perfection. It’s about <strong>adaptation</strong>. Whether you have zero time to cook, an unpredictable schedule, or financial constraints, maintaining a healthy lifestyle is achievable when you focus on practical, realistic adjustments rather than idealistic goals.
          </p>

          <h2>What is a Healthy Lifestyle in Today’s World?</h2>
          <p>
            Forget the magazines. In today’s fast-paced world, a healthy lifestyle doesn't mean eating kale salads on a beach. It means having the <strong>energy</strong> to get through your workday without crashing at 3 PM. It means your hormones are balanced so you can sleep soundly when you finally hit the pillow. It means having a functional immune system, a clear mind, and an approach to food that doesn't cause you chronic stress.
          </p>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Professional working" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Adapting your health journey to fit your real, everyday life.</figcaption>
          </figure>

          <h2>Lifestyle Pros and Cons</h2>
          <p>The impact of your daily habits compound over time. Here is what happens under the surface:</p>
          
          <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
            <div className="bg-[#1A2F2B]/5 p-6 rounded-2xl border border-[#1A2F2B]/10">
              <h4 className="text-[#1A2F2B] font-display text-xl mb-4">Pros of a Disciplined Lifestyle</h4>
              <ul className="space-y-3 font-light">
                <li>• <strong>Metabolism:</strong> Efficiently burns fuel; maintains stable weight.</li>
                <li>• <strong>Hormones:</strong> Balanced cortisol and insulin leading to stable moods.</li>
                <li>• <strong>Energy:</strong> Sustained vitality throughout the day without caffeine dependency.</li>
                <li>• <strong>Mental Health:</strong> Reduced anxiety, sharper focus, and better resilience to stress.</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h4 className="text-red-900 font-display text-xl mb-4">Cons of Poor Habits</h4>
              <ul className="space-y-3 text-red-900/80 font-light">
                <li>• <strong>Metabolism:</strong> Sluggish digestion, insulin resistance, and stubborn fat.</li>
                <li>• <strong>Hormones:</strong> High cortisol, disrupted melatonin, and reproductive issues.</li>
                <li>• <strong>Energy:</strong> Constant lethargy, afternoon crashes, and brain fog.</li>
                <li>• <strong>Mental Health:</strong> Increased irritability, heightened stress, and depressive moods.</li>
              </ul>
            </div>
          </div>

          <h2>Do’s and Don’ts</h2>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
            <div className="flex-1 bg-green-50 p-6 rounded-2xl border-l-4 border-green-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-green-700 mb-4 text-lg">The Do's</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> <strong>Hydrate early:</strong> Drink two glasses of water before your first coffee.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> <strong>Protein first:</strong> Anchor your first meal with solid protein (eggs, paneer, lentils) to stabilize blood sugar.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> <strong>Incidental movement:</strong> Take stairs, walk while on calls.</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-500 shrink-0" /> <strong>Protect sleep:</strong> Keep your room cool and dark, no matter what time you sleep.</li>
              </ul>
            </div>
            <div className="flex-1 bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 shadow-sm transition-shadow hover:shadow-md">
              <h4 className="font-bold text-red-700 mb-4 text-lg">The Don'ts</h4>
              <ul className="space-y-3 text-[#1A2F2B]/80 font-light">
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> <strong>Don't skip meals:</strong> It destroys your metabolism and leads to severe binge eating later.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> <strong>Avoid junk dependency:</strong> Don't rely on sugary biscuits or chips for energy.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> <strong>Don't skimp on sleep:</strong> Irregular sleep wreaks havoc on your insulin sensitivity.</li>
                <li className="flex items-center gap-3"><X size={18} className="text-red-500 shrink-0" /> <strong>Don't drink calories:</strong> Avoid sugary sodas and heavily sweetened teas/coffees.</li>
              </ul>
            </div>
          </div>

          <h2>Corporate Professionals Lifestyle Guide</h2>
          <p><strong>The Problem:</strong> Long sitting hours, high stress, and irregular meal timings due to back-to-back meetings.</p>
          <p><strong>The Solution:</strong></p>
          <ul className="space-y-4 my-8 pl-4 border-l-4 border-[#EAC881] list-none">
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Meal Timing:</strong> Do not let more than 4-5 hours pass without eating. If a meeting runs late, have a small handful of almonds ready at your desk.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Office Snacks:</strong> Stock your drawer with roasted makhana (fox nuts), murmura (puffed rice), roasted chana, unsalted peanuts, or protein bars.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Hydration:</strong> Keep a 1-liter bottle on your desk. Make it a rule to finish it before lunch, and refill it for the afternoon.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Movement:</strong> Implement the 50/10 rule. Sit for 50 minutes, stand/walk/stretch for 10 minutes. </span></li>
          </ul>

          <h2>Night Shift Lifestyle Guide</h2>
          <p><strong>The Problem:</strong> Circadian rhythm disruption, poor digestion at night, hormonal imbalance, and poor daytime sleep quality.</p>
          <p><strong>The Solution:</strong></p>
          <ul className="space-y-4 my-8 pl-4 border-l-4 border-[#EAC881] list-none">
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Meal Timing:</strong> Eat your "main" heavy meal before your shift begins (around 7-8 PM). During the night shift, your digestion slows down naturally.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>What to eat during the shift:</strong> Stick to light, warm, and easily digestible foods. Think soups, a small portion of dal-rice, or a protein shake. </span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Foods to avoid:</strong> Heavy, greasy fast food, excessively sugary energy drinks, and heavy dairy which will trigger acid reflux.</span></li>
            <li className="flex gap-4 items-start"><CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" /> <span><strong>Sleep Recovery:</strong> When you get home, wear sunglasses if the sun is up. Make your bedroom pitch black. Eat a very light carbohydrate snack (like a banana or plain toast) to naturally boost serotonin and help you sleep.</span></li>
          </ul>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Night shift and planning" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Structured habits make unconventional schedules manageable.</figcaption>
          </figure>

          <h2>For People Who Can’t Cook at Home</h2>
          <p>Not everyone has the time, energy, or facilities to cook elaborate meals. You can still eat healthy on the go.</p>
          <div className="bg-[#FAF9F6] p-6 rounded-2xl shadow-sm border border-[#EAC881]/20 my-8">
            <ul className="space-y-3">
              <li><strong>Smart Outside Choices:</strong> Opt for grilled, baked, or steamed over fried. Choose a chicken salad, paneer tikka, idli, or a simple thali (skip the heavy gravies) instead of cheesy pastas or burgers.</li>
              <li><strong>No-Cook Meals:</strong> Mix Greek yogurt with fruits and nuts. Create a sprouted moong salad (buy sprouts ready-made). Hummus with carrot/cucumber sticks.</li>
              <li><strong>Ready-to-Eat Nutritious Ideas:</strong> Keep hard-boiled eggs (if possible), pre-cut fruits, unsweetened peanut butter on whole wheat bread, or a high-quality whey protein powder handy.</li>
            </ul>
          </div>

          <h2>Budget-Friendly Nutrition Guide</h2>
          <p>Healthy eating does NOT have to be expensive. You don't need avocados, salmon, or chia seeds to be fit. Local, traditional foods are incredibly powerful.</p>
          
          <div className="space-y-6 my-8 not-prose">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">Cheap but Nutritious Indian Foods</h4>
              <p className="text-sm font-light text-[#1A2F2B]/80">Sattu (roasted gram flour) is the ultimate cheap protein. Moong dal, eggs, locally sourced seasonal greens (palak, methi), and dahi (curd).</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">Protein on a Budget</h4>
              <p className="text-sm font-light text-[#1A2F2B]/80">Eggs, soya chunks, locally sourced paneer, black chana, rajma, and lentils. Milk is also a highly affordable complete protein.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">Smart Grocery Planning</h4>
              <p className="text-sm font-light text-[#1A2F2B]/80">Buy seasonal fruits and vegetables—they are cheaper and more nutritious. Buy grains and pulses in bulk. Skip the packaged "diet" snacks; they are overpriced and highly processed.</p>
            </div>
          </div>

          <figure className="my-12">
            <img loading="lazy" src="https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="Budget friendly healthy living" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Affordable, accessible local foods are the foundation of good health.</figcaption>
          </figure>

          <div className="bg-[#1A2F2B] text-white p-8 rounded-3xl my-10 not-prose">
            <h3 className="text-2xl font-display text-[#EAC881] mb-6">Special Focus Sections</h3>
            
            <h4 className="text-lg font-bold mb-2">🤰 Pregnant Women</h4>
            <p className="text-white/80 font-light mb-8">
              Focus on simple, safe, and nutritious habits. Prioritize folic acid (dark leafy greens, lentils), iron, and calcium. Do not restrict calories, but manage portions to avoid drastic sugar spikes. Snack on soaked almonds, walnuts, and fresh fruits. Stay highly hydrated.
            </p>

            <h4 className="text-lg font-bold mb-2">👦 Kids & Growing Children</h4>
            <p className="text-white/80 font-light">
              Children need dense energy and healthy fats for brain development. Include ghee, full-fat dairy, eggs, and nuts. Don't frame foods as "good" or "bad"; teach them balance. Hide veggies in parathas, sauces, or soups if they are picky eaters.
            </p>
          </div>

          <h2>Sample Daily Routines</h2>
          
          <div className="grid md:grid-cols-2 gap-8 my-8 not-prose">
             <div className="border border-[#1A2F2B]/10 p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4 border-b border-[#1A2F2B]/10 pb-4">The Office Worker</h4>
                <ul className="space-y-4 text-sm font-light text-[#1A2F2B]/80">
                  <li className="flex justify-between border-b border-gray-100 pb-2"><strong>7:30 AM:</strong> <span>Warm water</span></li>
                  <li className="flex justify-between border-b border-gray-100 pb-2"><strong>8:30 AM:</strong> <span>High protein breakfast</span></li>
                  <li className="flex justify-between border-b border-gray-100 pb-2"><strong>11:30 AM:</strong> <span>Nuts and green tea</span></li>
                  <li className="flex justify-between border-b border-gray-100 pb-2"><strong>1:30 PM:</strong> <span>Balanced lunch</span></li>
                  <li className="flex justify-between border-b border-gray-100 pb-2"><strong>5:00 PM:</strong> <span>Roasted chana/fruit</span></li>
                  <li className="flex justify-between pb-2"><strong>8:30 PM:</strong> <span>Light dinner</span></li>
                </ul>
             </div>
             
             <div className="border border-[#1A2F2B]/10 p-6 rounded-2xl bg-[#FAF9F6] shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-display text-xl text-[#1A2F2B] mb-4 border-b border-[#1A2F2B]/10 pb-4">The Night Shift Worker</h4>
                <ul className="space-y-4 text-sm font-light text-[#1A2F2B]/80">
                  <li className="flex justify-between border-b border-[#1A2F2B]/5 pb-2"><strong>4:00 PM:</strong> <span>Hydrate, movement</span></li>
                  <li className="flex justify-between border-b border-[#1A2F2B]/5 pb-2"><strong>5:00 PM:</strong> <span>"Breakfast" meal</span></li>
                  <li className="flex justify-between border-b border-[#1A2F2B]/5 pb-2"><strong>8:30 PM:</strong> <span>Main heavy meal</span></li>
                  <li className="flex justify-between border-b border-[#1A2F2B]/5 pb-2"><strong>1:00 AM:</strong> <span>Light digestable snack</span></li>
                  <li className="flex justify-between border-b border-[#1A2F2B]/5 pb-2"><strong>4:00 AM:</strong> <span>Clear soup/shake</span></li>
                  <li className="flex justify-between pb-2"><strong>7:30 AM:</strong> <span>Very light carb snack</span></li>
                </ul>
             </div>
          </div>

          <h2>Final Thoughts</h2>
          <p>Health is not reserved for the wealthy or the people with endless free time. It is a daily practice of making the *slightly better* choice within your current circumstances. Take control of what you can, and forgive yourself for what you can't.</p>

        </div>

        <ReviewsSlider reviews={ReviewData.LIFESTYLE_REVIEWS} />
      </>
    )
  },
  {
    id: "best-indian-breakfast-weight-loss",
    title: "Best Indian Breakfast for Weight Loss: High-Protein & Quick",
    subtitle: "Fuel your morning and boost your metabolism without comprising on authentic taste.",
    category: "Healthy Breakfasts",
    readTime: "7 Min Read",
    author: "DISHA ARORA | NUTRITIONIST | NUTRITION MANAGER | ACTIVE CSNM MEMBER",
    image: "https://images.pexels.com/photos/35351659/pexels-photo-35351659.jpeg",
    coverImage: "https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg",
    excerpt: "Discover the most effective, nutrient-dense traditional Indian breakfast options meticulously designed to stabilize blood sugar, burn fat, and keep you energized.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          
          <h2>The Importance of a High-Protein Breakfast</h2>
          <p className="lead text-xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed">
            "Your first meal sets the metabolic tone for the entire day. Treat it with the respect it deserves."
          </p>

          <p>
            For many, the standard Indian breakfast consists of buttery parathas, sweet chai with biscuits, or simple carbohydrate-heavy dishes like upma or standard poha. However, starting your day with fast-digesting carbohydrates leads to a rapid spike in blood sugar, followed inevitably by a mid-morning energy crash, brain fog, and subsequent cravings. 
          </p>
          <p>
            If your goal is sustainable weight loss, managing conditions like PCOS, or simply maximizing productivity as a working professional in India, you do not need to abandon your cultural roots. The key to the <strong>best Indian breakfast for weight loss</strong> lies in strategically upgrading our traditional dishes with high-quality protein, essential healthy fats, and complex fibers to stabilize insulin and support metabolic health.
          </p>

          <h2>Why Breakfast Matters</h2>
          <p>
            The role of breakfast in a fat-loss journey is often misunderstood. A well-constructed, protein-rich meal in the morning does more than just fill your stomach:
          </p>
          <ul>
            <li><strong>Metabolism & Thermogenesis:</strong> A high-protein breakfast increases the thermic effect of food (TEF), meaning your body burns more calories simply digesting the meal.</li>
            <li><strong>Cravings & Satiety:</strong> Adequate protein (20-30g) and healthy fats suppress the hunger hormone ghrelin, preventing you from overeating during lunch or reaching for sugary evening snacks.</li>
            <li><strong>Hormonal Balance & PCOS:</strong> For women navigating PCOS, prioritizing fiber and protein in the morning prevents the insulin spikes that trigger hormonal imbalances and stubborn belly fat storage.</li>
            <li><strong>Muscle Retention:</strong> When losing weight, preserving lean muscle mass is vital for a toned appearance and a fast metabolism. Protein prevents muscle breakdown.</li>
            <li><strong>Productivity:</strong> For corporate employees and busy professionals in cities like Delhi NCR, stable blood sugar guarantees sustained, laser-sharp focus throughout morning meetings.</li>
          </ul>

          <h2>Top 5 Premium Indian Breakfasts for Weight Loss</h2>

          <h4 className="font-bold text-[#1A2F2B] mb-2 mt-10 text-xl">1. High-Protein Moong Dal Chilla</h4>
          <figure className="my-8">
            <img loading="lazy" src="https://images.pexels.com/photos/33379362/pexels-photo-33379362.jpeg" alt="High-Protein Moong Dal Chilla" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Vegetarian • Complex Carbohydrates • Plant Protein</figcaption>
          </figure>
          <p>Instead of carb-heavy flour, use soaked and blended green gram (moong dal) to create a savory, crepe-like dish that serves as an excellent blend of complex carbohydrates and plant protein.</p>
          <ul>
            <li><strong>The Premium Upgrade:</strong> Stuff the chilla with 50g of fresh, low-fat paneer or scrambled tofu. Add fresh spinach and bell peppers for volume without calories.</li>
            <li><strong>Metabolic Benefit:</strong> Promotes an immense feeling of fullness while aiding gut health due to high fiber.</li>
          </ul>

          <h4 className="font-bold text-[#1A2F2B] mb-2 mt-10 text-xl">2. Savory Oats with Lentils (Oats Khichdi)</h4>
          <figure className="my-8">
            <img loading="lazy" src="https://images.pexels.com/photos/6363499/pexels-photo-6363499.jpeg" alt="Savory Oats with Lentils" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Vegetarian • Beta-Glucan Fiber</figcaption>
          </figure>
          <p>Avoid sugary, highly processed instant oats. Instead, slow-cook rolled oats with yellow lentils, turmeric, and Indian spices to create a comforting, balanced morning meal.</p>
          <ul>
            <li><strong>The Premium Upgrade:</strong> Mix in chopped carrots, peas, and a small dollop of pure A2 cow ghee. Pair with a side of plain Greek yogurt for an extra protein boost.</li>
            <li><strong>Metabolic Benefit:</strong> The beta-glucan fiber in oats actively lowers cholesterol and prevents the insulin spikes that cause abdominal fat storage.</li>
          </ul>

          <h4 className="font-bold text-[#1A2F2B] mb-2 mt-10 text-xl">3. Almond & Seed Embedded Besan Chilla</h4>
          <figure className="my-8">
            <img loading="lazy" src="https://images.pexels.com/photos/22698518/pexels-photo-22698518.jpeg" alt="Besan Chilla" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Vegetarian • Low Glycemic Index</figcaption>
          </figure>
          <p>Gram flour (besan) possesses a notably lower glycemic index compared to refined white wheat flour. It is naturally gluten-free and highly nutrient-dense.</p>
          <ul>
            <li><strong>The Premium Upgrade:</strong> Incorporate crushed almonds, flax seeds, and chia seeds directly into the batter before cooking on a cast-iron skillet.</li>
            <li><strong>Metabolic Benefit:</strong> The inclusion of omega-3 fatty acids stabilizes blood glucose, reducing the release of the fat-storing hormone insulin.</li>
          </ul>

          <h4 className="font-bold text-[#1A2F2B] mb-2 mt-10 text-xl">4. Ragi Malt with Nuts</h4>
          <figure className="my-8">
            <img loading="lazy" src="https://images.pexels.com/photos/30308595/pexels-photo-30308595.jpeg" alt="Ragi Malt" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Vegetarian • High Calcium • Iron</figcaption>
          </figure>
          <p>Ragi is an exquisite ancestral source of calcium, iron, and complex carbs. To optimize it for fat loss, it must be balanced with protein.</p>
          <ul>
            <li><strong>The Premium Upgrade:</strong> Prepare the ragi in unsweetened almond or soy milk. Skip the sugar entirely. Top generously with crushed walnuts, almonds, and clean plant-based protein.</li>
            <li><strong>Metabolic Benefit:</strong> Provides a steady state of sustained energy release, making it the perfect healthy breakfast for office goers and busy parents.</li>
          </ul>

          <h4 className="font-bold text-[#1A2F2B] mb-2 mt-10 text-xl">5. Masala Egg Bhurji</h4>
          <figure className="my-8">
            <img loading="lazy" src="https://images.pexels.com/photos/7393351/pexels-photo-7393351.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Egg Scramble" className="w-full rounded-2xl object-cover aspect-video shadow-lg mb-4" />
            <figcaption className="text-xs text-center text-[#1A2F2B]/50">Non-Vegetarian • Complete Amino Acids</figcaption>
          </figure>
          <p>For immediate, high-yield biological protein, non-vegetarian Indian options like an egg bhurji (scramble) or leftover grilled chicken wrap are unparalleled for pure fat loss.</p>
          <ul>
            <li><strong>The Premium Upgrade:</strong> Sauté 3 egg whites with 1 whole egg, packed with spinach, tomatoes, and onions. Roll in a multigrain or lettuce wrap.</li>
            <li><strong>Metabolic Benefit:</strong> Delivers complete amino acid profiles essential for muscle recovery, ensuring weight loss comes from fat, not muscle mass.</li>
          </ul>

          <div className="my-24 not-prose">
            <h3 className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-[#EAC881] mb-4 text-center">Variations</h3>
            <h2 className="text-3xl md:text-5xl font-display text-[#1A2F2B] mb-16 text-center leading-snug">
              Breakfast for Different Lifestyles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#FAF9F6] border border-[#1A2F2B]/10 p-10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(26,47,43,0.05)] hover:-translate-y-1 transition-transform group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#1A2F2B]/5 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Briefcase className="text-[#EAC881]" size={28} />
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Working Professionals</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  Time is your most valuable asset. Prepare overnight oats in a glass jar with chia seeds, flax seeds, and a scoop of high-quality whey or plant protein powder. Carry it to your office and enjoy a pristine, insulin-stabilizing meal at your desk. This quick Indian breakfast prevents the notorious 11 AM energy slump, keeping your focus sharp through back-to-back corporate meetings while effortlessly supporting your fat loss goals.
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-[#1A2F2B]/10 p-10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(26,47,43,0.05)] hover:-translate-y-1 transition-transform group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#1A2F2B]/5 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Moon className="text-[#EAC881]" size={28} />
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Night Shift Employees</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  Focus on light, easily digestible proteins before you sleep in the morning to offset circadian rhythm disruption. A simple tofu scramble or a Greek yogurt bowl topped with crushed walnuts prevents insulin-driven bloating and heavily aids deep, restorative recovery sleep during daylight hours.
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-[#1A2F2B]/10 p-10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(26,47,43,0.05)] hover:-translate-y-1 transition-transform group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#1A2F2B]/5 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <Plane className="text-[#EAC881]" size={28} />
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Frequent Travelers</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  Hotel buffets are traps disguised as luxury. Always navigate straight to the live counter and request a plain omelette loaded with immune-boosting vegetables, or grab a black coffee with a side of mixed nuts. Avoid the bakery section and fruit juices entirely to keep your metabolism active while flying or touring.
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-[#1A2F2B]/10 p-10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(26,47,43,0.05)] hover:-translate-y-1 transition-transform group">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#1A2F2B]/5 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <BookOpen className="text-[#EAC881]" size={28} />
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Students & Busy Parents</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  You cannot pour from an empty cup. Keep hard-boiled eggs ready in the fridge or prepare an instant nutrient-dense smoothie (blending spinach, banana, pure peanut butter, and plant protein) that takes exactly two minutes to assemble. This guarantees premium nutrition on your most chaotic mornings.
                </p>
              </div>
            </div>
          </div>

          <h2>The Protocol: Do's &amp; Don'ts</h2>
          <div className="flex flex-col md:flex-row gap-8 my-8 not-prose">
            <div className="flex-1 bg-green-50 p-6 rounded-2xl border-l-[6px] border-green-500 shadow-sm transition-all hover:shadow-md">
              <h4 className="font-bold text-green-800 mb-4 text-xl">The Do's</h4>
              <ul className="space-y-4 text-[#1A2F2B]/80 font-light list-none p-0">
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <span className="text-base"><strong>Pacing:</strong> Ensure 20g+ of protein per meal.</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <span className="text-base"><strong>Hydration:</strong> Start with warm water before eating.</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <span className="text-base"><strong>Texture:</strong> Sneak in seeds or veggies for fiber.</span></li>
                <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-green-600 shrink-0" /> <span className="text-base"><strong>Movement:</strong> A 10-minute walk blunts sugar spikes.</span></li>
              </ul>
            </div>
            <div className="flex-1 bg-red-50 p-6 rounded-2xl border-l-[6px] border-red-500 shadow-sm transition-all hover:shadow-md">
              <h4 className="font-bold text-red-800 mb-4 text-xl">The Don'ts</h4>
              <ul className="space-y-4 text-[#1A2F2B]/80 font-light list-none p-0">
                <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span className="text-base"><strong>Skipping:</strong> Leads to massive overeating later.</span></li>
                <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span className="text-base"><strong>Sugar:</strong> Cereals destroy your morning glucose curve.</span></li>
                <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span className="text-base"><strong>Heavy Oils:</strong> Dripping parathas slow your brain.</span></li>
                <li className="flex items-center gap-3"><X size={20} className="text-red-600 shrink-0" /> <span className="text-base"><strong>Empty Tea:</strong> Triggers intense acidity and cortisol.</span></li>
              </ul>
            </div>
          </div>

          <div className="my-24 relative rounded-[3rem] overflow-hidden not-prose group">
            <img loading="lazy" src="https://images.pexels.com/photos/4056015/pexels-photo-4056015.jpeg" alt="Intermittent Fasting" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2F2B]/95 to-[#1A2F2B]/70 backdrop-blur-sm"></div>
            <div className="relative p-10 md:p-16 lg:p-20 z-10 text-white flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                 <h3 className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-[#EAC881] mb-4">Advanced Strategy</h3>
                 <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Intermittent Fasting & Breakfast</h2>
                 <p className="font-serif text-lg md:text-xl font-light text-white/90 leading-relaxed mb-8">
                   When utilizing intermittent fasting for weight loss, "breakfast" simply means "breaking the fast", even if your first meal occurs at 1 PM. Strategic fasting works wonderfully for reversing insulin resistance, but it requires mindful execution.
                 </p>
              </div>
              <div className="w-full md:w-1/2 bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl">
                 <h4 className="text-xl font-display text-white mb-6">Who Should Proceed with Caution?</h4>
                 <ul className="space-y-4 font-serif text-lg font-light text-white/90">
                   <li className="flex gap-4 items-start">
                     <span className="text-[#EAC881] shrink-0 mt-1">✦</span>
                     <span>Women with severely elevated cortisol or advanced stage PCOS (extreme fasting can worsen hormonal imbalances).</span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="text-[#EAC881] shrink-0 mt-1">✦</span>
                     <span>Night shift workers requiring steady circadian cues to regulate displaced rhythms.</span>
                   </li>
                   <li className="flex gap-4 items-start">
                     <span className="text-[#EAC881] shrink-0 mt-1">✦</span>
                     <span>Individuals with a clinical history of extreme acid reflux.</span>
                   </li>
                 </ul>
              </div>
            </div>
          </div>

          <div className="my-24 flex flex-col md:flex-row-reverse gap-12 md:gap-20 items-stretch not-prose">
            <div className="w-full md:w-1/2 relative group">
               <div className="absolute -inset-4 bg-[#EAC881]/20 rounded-[3rem] blur-xl transition-all duration-700 group-hover:bg-[#EAC881]/30"></div>
               <img loading="lazy" src="https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Workout & Movement Integration" className="relative w-full h-full min-h-[400px] rounded-[2.5rem] shadow-[0_20px_50px_rgba(26,47,43,0.15)] object-cover border border-white/50 transform group-hover:scale-[1.02] transition-transform duration-700" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-[#EAC881] mb-4">The Intersection</h3>
              <h2>Workout & Movement Integration</h2>
              <p className="font-serif text-lg md:text-xl font-light text-[#1A2F2B]/80 leading-relaxed mb-8">
                Nutrition must marry movement. For optimum fat loss and hormonal alignment, pair your high-protein Indian breakfast with a dedicated routine. Even a 20-minute brisk walk works wonders for cellular metabolism.
              </p>
              <div className="space-y-8 mt-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-[#1A2F2B]/10 flex items-center justify-center shrink-0 shadow-sm bg-white">
                     <ArrowRight className="text-[#1A2F2B]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display text-[#1A2F2B] mb-2">Pre-Workout Fuel</h4>
                    <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">The best breakfast before a workout is easily digestible clean energy combined with light protein (e.g., half a banana paired with a boiled egg or a small bowl of curd).</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full border border-[#1A2F2B]/10 flex items-center justify-center shrink-0 shadow-sm bg-white">
                     <ArrowRight className="text-[#1A2F2B]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display text-[#1A2F2B] mb-2">Post-Workout Recovery</h4>
                    <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">Hit your body with a substantial protein load like the Moong Dal Chilla or a Masala Omelette within 60 minutes of training to maximize muscle synthesis and amplify the afterburn effect.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-24 not-prose">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h3 className="text-xs font-bold font-sans uppercase tracking-[0.2em] text-[#EAC881] mb-4">Budget Conscious</h3>
              <h2 className="text-3xl md:text-5xl font-display text-[#1A2F2B] mb-6">Premium Nutrition Can Be Affordable</h2>
              <p className="font-serif text-lg md:text-xl font-light text-[#1A2F2B]/80 leading-relaxed">
                Premium weight loss nutrition does not demand a premium grocery bill. Some of the healthiest, most potent Indian breakfasts cost less than your daily cup of cafe coffee.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-[#1A2F2B]/10 rounded-[2rem] p-8 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] border border-[#1A2F2B]/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <span className="text-3xl font-display text-[#EAC881]">01</span>
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Sprouts Salad</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  Sprouted moong beans tossed with onions, tomatoes, green chilies, and a squeeze of fresh lemon. Extremely economical and bursting with living enzymes, fiber, and clean protein.
                </p>
              </div>
              
              <div className="bg-white border border-[#1A2F2B]/10 rounded-[2rem] p-8 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] border border-[#1A2F2B]/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <span className="text-3xl font-display text-[#EAC881]">02</span>
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Sattu Drink</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  Roasted gram flour (sattu) whisked into chilled water, lemon, cumin powder, and a pinch of pink salt. It is the ultimate indigenous, high-protein summer drink for fat loss.
                </p>
              </div>
              
              <div className="bg-white border border-[#1A2F2B]/10 rounded-[2rem] p-8 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] border border-[#1A2F2B]/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <span className="text-3xl font-display text-[#EAC881]">03</span>
                </div>
                <h4 className="text-2xl font-display text-[#1A2F2B] mb-4">Boiled Eggs</h4>
                <p className="font-serif text-lg font-light text-[#1A2F2B]/80 leading-relaxed m-0">
                  The most cost-effective, highly bioavailable protein on the planet. Two boiled eggs with a sprinkle of black pepper provide unparalleled satiety and metabolic support.
                </p>
              </div>
            </div>
          </div>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-6 my-8 not-prose text-base">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">Which Indian breakfast is best for weight loss?</h4>
              <p className="font-light text-[#1A2F2B]/80">Any meal high in protein and complex fiber. Optimal choices include Moong Dal Chilla stuffed with paneer, Egg Bhurji with a slice of whole wheat toast, or Besan Chilla with seeds.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">Can I lose weight eating paratha?</h4>
              <p className="font-light text-[#1A2F2B]/80">Yes, if modified. Create a 'Dal Paratha' using leftover lentils in the dough instead of plain flour, use minimal oil, and pair it with a massive bowl of curd (protein) and salad instead of butter and sweet tea.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAC881]/20">
              <h4 className="font-bold text-[#1A2F2B] mb-2 text-lg">What breakfast is best for PCOS?</h4>
              <p className="font-light text-[#1A2F2B]/80">Women with PCOS must avoid sugar and refined carbs in the morning. The best option is a savory, low-GI meal like an Oats Khichdi with lots of vegetables or a tofu/egg scramble.</p>
            </div>
          </div>

        </div>

        <ReviewsSlider reviews={ReviewData.BREAKFAST_WEIGHT_LOSS_REVIEWS} />
      </>
    )
  },
  {
    id: "best-diet-plan-for-working-women-in-india",
    featured: true,
    title: "Best Diet Plan for Working Women",
    subtitle: "A realistic nutrition guide to manage hormones, boost energy, and lose weight without spending hours in the kitchen.",
    category: "Metabolic Health",
    readTime: "12 Min Read",
    author: "DISHA ARORA | NUTRITIONIST | NUTRITION MANAGER | ACTIVE CSNM MEMBER",
    image: "https://images.pexels.com/photos/37621071/pexels-photo-37621071.png?auto=compress&cs=tinysrgb&w=800",
    coverImage: "https://images.pexels.com/photos/37621071/pexels-photo-37621071.png?auto=compress&cs=tinysrgb&w=2000",
    excerpt: "Discover the ultimate diet plan for working Indian women. Manage PCOS, lose weight, and boost energy with easy meals, quick snacks, and a 7-day guide.",
    content: (
      <>
        <div className="prose md:prose-lg prose-headings:font-display prose-headings:font-normal prose-headings:text-[#1A2F2B] prose-h2:mb-10 prose-h2:mt-20 prose-h3:mt-16 prose-h3:mb-6 prose-p:text-[#1A2F2B]/80 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg lg:prose-p:text-xl prose-li:text-[#1A2F2B]/80 prose-li:font-light prose-li:leading-relaxed prose-li:text-lg lg:prose-li:text-xl prose-strong:font-semibold prose-strong:text-[#1A2F2B] prose-a:text-[#EAC881] hover:prose-a:text-[#1A2F2B] transition-colors max-w-none font-sans">
          
          <p className="lead text-xl md:text-2xl italic text-[#1A2F2B]/70 mb-10 border-l-4 border-[#EAC881] pl-8 leading-relaxed font-serif">
            You wake up exhausted, rush through a quick cup of chai, survive back-to-back Teams calls on cold toast and coffee, and crash at 8 PM with zero energy left for yourself. Sound familiar? For millions of working women navigating high-stress careers and family responsibilities, health takes the back seat—resulting in stubborn weight gain, PCOS, thyroid flare-ups, and an unshakeable afternoon slump. But what if managing your hormones and dropping those extra kilos didn't require cooking two separate meals or spending three hours meal-prepping on a Sunday? Enter the ultimate, realistic <strong>best diet plan for working women in India</strong>.
          </p>

          <h2>What is the Best Diet Plan for Working Women in India?</h2>
          <p>
            When we talk about the best diet plan for working women in India, we aren't talking about restrictive salads or imported superfoods. We are talking about strategically balancing traditional Indian meals to stabilize insulin, lower cortisol levels, and support sustainable fat burns throughout your nine-to-five. 
          </p>
          <p>
            Did you know? According to recent data, up to 1 in 5 Indian women suffer from PCOS (Polycystic Ovary Syndrome), with cases skyrocketing among corporate professionals due to chronic stress and sedentary habits. A clinical, culturally relevant diet focuses on anchoring every meal with high-quality protein and gut-healing fiber. Whether you're commuting in Mumbai or working from home in Toronto, optimizing your plate is your fastest route out of the fatigue trap.
          </p>

          <h2>Why Diet is Your Most Powerful Tool for Hormonal Balance</h2>
          <p>
            You cannot out-hustle a bad diet, especially when hormones are involved. An effective <strong>PCOS diet plan for office goers</strong> works at a cellular level to calm inflammation and regulate insulin. 
          </p>
          <p>
            Think of your metabolism like a finely tuned engine. If you repeatedly flood it with refined sugars and prolonged stress, the engine floods and stalls, storing the excess fuel as visceral fat—typically around the abdomen. When you nourish that same engine with clean, stable fuel sources—like whole grains, lean proteins, and healthy fats—the engine hums smoothly. By correcting your blood sugar curve, your body naturally down-regulates testosterone production, which directly signals your fat cells to release stored energy. 
          </p>

          <h2>Best Foods for Weight Loss and PCOS: What to Load Your Plate With</h2>
          <p>
            The secret to an <strong>indian diet plan for active lifestyle</strong> isn't starvation—it's addition. Focus on incorporating these powerframes into your day:
          </p>

          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Moong Dal (Mung Beans):</strong> Outstanding clinical profile for stabilizing blood sugar due to its immense fiber-to-protein ratio. Include it as chilla (savory pancakes) or sprouted salad.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Flaxseeds (Alsi):</strong> Highly concentrated in lignans which help flush excess circulating estrogen out of the body. Sprinkle freshly ground flaxseeds over your morning yogurt or oats.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Paneer & Tofu:</strong> Provide exceptional amino acid profiles necessary for repairing tissue and keeping you satiated. Add grilled paneer or tofu to your lunch boxes to prevent the 3 PM sugar craving.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Amaranth (Rajgira):</strong> A pseudo-cereal loaded with calcium, iron, and complete protein. Use it as a gluten-free roti alternative or breakfast porridge.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Walnuts & Almonds:</strong> High in Omega-3 fatty acids which directly reduce cellular inflammation—a key driver of PCOS. Pop a handful when you hit that mid-morning slump.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Cinnamon (Dalchini):</strong> Studies suggest cinnamon significantly mimics insulin, improving insulin sensitivity. Add a pinch to your morning tea or smoothie.</div>
            </li>
          </ul>

          <div className="bg-[#FAF9F6] p-8 rounded-2xl border-l-4 border-[#EAC881] my-10 shadow-sm">
            <p className="text-sm font-light m-0">
              <b className="text-[#1A2F2B]">💡 Pro Tip from Ojasio:</b> Never eat your carbs "naked". Always pair a carbohydrate (like an apple or roti) with a protein or fat (like a handful of almonds or a bowl of dal). This physically slows down digestion and stops your blood sugar from spiking uncontrollably!
            </p>
          </div>

          <h2>Foods to Avoid—And Why</h2>
          <p>
            When aiming for an effective weight loss and <strong>hormonal balance diet for professionals</strong>, certain everyday conveniences are secretly sabotaging your hard work:
          </p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Store-Bought Diet Biscuits/Rusks:</strong> Packed with hidden sugars, refined flour, and poor-quality trans fats that drive inflammation. <em>Swap with:</em> Roasted makhana (fox nuts) or unsalted peanuts.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Sweetened Tea/Coffee on an Empty Stomach:</strong> Sending caffeine and refined sugar into a fasted stomach spikes cortisol aggressively and disrupts morning insulin. <em>Swap with:</em> Two glasses of warm water, followed by breakfast, <em>then</em> your tea.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Fruit Juices (Even Fresh Pressed):</strong> Strips away the vital fiber, acting functionally like pure sugar to your liver. <em>Swap with:</em> Eat the whole fruit instead.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Refined Seed Oils (Sunflower/Soybean Oil):</strong> Highly processed and deeply inflammatory. <em>Swap with:</em> Quality A2 Ghee, cold-pressed mustard oil, or extra virgin coconut oil in moderation.</div>
            </li>
          </ul>

          <h2>Complete Workout Diet Plan Meal Plan: What to Eat for 7 Days</h2>
          <p>
             The key to adhering to <strong>easy healthy lunch ideas for indian women</strong> is keeping it realistic. Here is a high-protein, hormone-balancing blueprint designed specifically for busy professionals.
          </p>

          <div className="overflow-x-auto my-10">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[#1A2F2B] text-white">
                  <th className="p-4 rounded-tl-xl font-display font-medium text-lg">Day</th>
                  <th className="p-4 font-display font-medium text-lg">Breakfast (8:30 AM)</th>
                  <th className="p-4 font-display font-medium text-lg">Lunch (1:30 PM)</th>
                  <th className="p-4 rounded-tr-xl font-display font-medium text-lg">Dinner (7:30 PM)</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Monday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">2 Besan Chilla with mint chutney + 1 boiled egg</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">1 bowl Rajma (kidney beans) + 1 Multigrain Roti + Cucumber salad</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Grilled Paneer Tikka with sautéed bell peppers</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Tuesday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Overnight Oats (chia seeds, almond milk, half apple)</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Chicken Curry (or Soya Chunks) + 1 portion brown rice + Spinach</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Light Yellow Dal + Mixed Veg Sabzi (no roti)</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Wednesday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Masala Egg Bhurji (3 eggs) + 1 slice sourdough toast</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Chana (Chickpea) Salad with paneer cubes, tomatoes, and lemon dressing</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Greek Lemon Chicken with a side of roasted vegetables</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Thursday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Poha loaded with peanuts and green peas + side of plain yogurt</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Dal Makhani (low butter) + 1 Bajra Roti + Dahi</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Tofu Stir-fry with broccoli and zucchini</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Friday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">2 Moong Dal Dosa (Pesarattu) with peanut chutney</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Leftover stir-fry or Grilled Chicken Wrap (whole wheat)</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Baked Salmon (or Fish Curry) with cauliflower rice</td>
                </tr>
                <tr className="border-b border-[#1A2F2B]/10 bg-[#FAF9F6]">
                  <td className="p-4 font-semibold text-[#1A2F2B]">Saturday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Upma (semolina) packed with carrots and beans + buttermilk</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Palak Dal (Spinach Lentils) + 1 small portion Basmati rice</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Lentil (Masoor dal) Soup + large garden salad</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-[#1A2F2B] rounded-bl-xl">Sunday</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Protein Smoothie (Whey/Plant protein, spinach, berries)</td>
                  <td className="p-4 text-[#1A2F2B]/80 font-light">Enjoy a Mindful Cheat Meal! (Keep portions checked)</td>
                  <td className="p-4 text-[#1A2F2B]/80 rounded-br-xl font-light">Clear chicken or vegetable soup with eggs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p><strong>The Desk Warrior’s Snack Guide:</strong> Keep these at your workspace:</p>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div>Roasted Makhana (Fox Nuts) with black pepper.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div>A handful of unsalted almonds and pumpkin seeds.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div>A small bowl of homemade sprouts.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div>Apple slices with natural peanut butter.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div>Unsweetened Greek yogurt.</div>
            </li>
          </ul>

          <h2>Lifestyle Tips That Amplify Results</h2>
          <ul>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Incidental Movement:</strong> You don't need a 2-hour gym session. Simply stand up and pace during your phone calls. A 10-minute walk after lunch dramatically blunts post-meal insulin spikes.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Circadian Sleep:</strong> Ensure 7 hours of sleep in a pitch-dark room. Your body repairs hormonal damage primarily during the deep REM stages of rest. Without sleep, your cortisol stays elevated, making weight loss nearly impossible.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Hydration Strategy:</strong> Dehydration masquerades as hunger. Keep a 1-liter bottle at your desk and finish it by noon. This keeps your digestion active and flushes out metabolic waste efficiently.</div>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle2 size={24} className="text-[#EAC881] shrink-0 mt-1" />
              <div><strong className="text-[#1A2F2B]">Morning Sunlight:</strong> Expose your eyes to natural sunlight within 30 minutes of waking. This sets your circadian rhythm and naturally suppresses melatonin while boosting serotonin.</div>
            </li>
          </ul>

          <h2>From Struggle to Strength: A Real Ojasio Client Story</h2>
          <p>
            Meet Neha, 34, a senior IT consultant based in Vancouver with deep Indian roots. Working across time zones meant irregular meals, massive stress, and a heavy reliance on coffee. When she came to Ojasio, she was struggling with newly diagnosed PCOS, chronic bloating, and a 12 kg weight gain over two years. She felt incredibly defeated—she had tried keto and fasting, but they left her exhausted and craving sweets by 4 PM. 
          </p>
          <p>
            We realized she wasn't actually eating enough of the right things. By simply adding a protein-dense breakfast (like moong dal chilla) and incorporating balanced, traditional Indian lunches instead of sad salads, her energy began to return. We swapped her late-night scrolling for a wind-down routine to lower her cortisol. 
          </p>
          <p>
            Within 6 weeks, her bloating vanished and her sugar cravings stopped completely. By month three, she had naturally dropped 8 kg without starving herself or missing out on weekend dinners with her family. Today, Neha handles her high-stress job with sustained energy—because her metabolism is finally working *for* her, not against her.
          </p>
          <p className="border-l-4 border-[#EAC881] pl-6 italic text-[#1A2F2B]/80 font-serif text-xl my-8">
            "I used to think being healthy meant eating bland food and feeling hungry. Ojasio showed me how to use my favorite Indian meals to actually heal my body. I feel like myself again—only with twice the energy." — Neha (Vancouver, Canada)
          </p>

          <h2>Frequently Asked Questions</h2>
          
          <h3>Is rice okay for weight loss in a working professional’s diet?</h3>
          <p>Yes, absolutely. Rice is an excellent source of energy. The trick is portion control and pairing. When building the <strong>best diet plan for working women in India</strong>, ensure you mix a small serving of rice with double the amount of high-fiber vegetables and an ample serving of dal or chicken. This prevents the rapid spike in insulin while keeping you fully satisfied.</p>

          <h3>How do I manage the 4 PM office slump without reaching for sweets?</h3>
          <p>The 4 PM slump is directly caused by a drop in blood sugar, usually resulting from inadequate protein at lunch. Ensure your <strong>easy healthy lunch ideas for indian women</strong> include at least 20g of protein. At 4 PM, instead of a cookie, have roasted makhana, almonds, or black coffee with a piece of dark chocolate. It stabilizes sugar levels instantly.</p>

          <h3>Can I eat Indian food if I have PCOS?</h3>
          <p>Yes. Traditional Indian cooking is incredibly beneficial for a <strong>PCOS diet plan for office goers</strong> when prepared correctly. Millets (jowar, bajra), lentils, paneer, and rich anti-inflammatory spices like turmeric and cinnamon are phenomenal for hormonal healing. You just need to minimize refined oils and excessive flatbreads (rotis) in a single sitting.</p>

          <h3>I work night shifts. Does this diet still apply to me?</h3>
          <p>The principles remain identical, but the timing changes. You still need stable protein and fiber. As a shift worker, make sure your heaviest meal is before your shift starts. During the shift, eat light (soups, salads) as your digestive system naturally slows down at night. <span className="underline cursor-pointer text-[#EAC881] hover:text-[#1A2F2B]">Read our full lifestyle guide for night shift workers</span>.</p>

          <h3>Do I need to spend hours cooking to lose weight?</h3>
          <p>Not at all. The <strong>best diet plan for working women in India</strong> relies on smart assembly, not gourmet cooking. Make extra portions of dal or chicken during dinner to take for lunch the next day. Keep boiled eggs, pre-cut vegetables, and quick oats handy. Efficiency is key to consistency.</p>

          <div className="bg-[#1A2F2B] text-white p-10 rounded-[2.5rem] mt-16 text-center shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#EAC881]/10 rounded-full blur-[80px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#EAC881]/10 rounded-full blur-[60px] group-hover:bg-[#EAC881]/20 transition-all duration-700"></div>
             
             <h2 className="text-3xl md:text-5xl font-display text-white mb-6 relative z-10">Ready to Build Your Personalized Nutrition Plan?</h2>
             <p className="font-serif text-lg md:text-xl font-light text-white/90 leading-relaxed mb-8 relative z-10 max-w-3xl mx-auto">
                While this framework is incredibly powerful, no two bodies are identical. Your metabolism, specific hormonal history, and daily constraints require a roadmap built just for you. A generic plan gets you started, but a personalized clinical strategy gets you permanent results.
             </p>
             <p className="font-serif text-lg md:text-xl font-light text-white/90 leading-relaxed mb-10 relative z-10 max-w-3xl mx-auto">
                At Ojasio, we specialize in understanding your unique biology to craft meals that you love, fitting seamlessly into your busy schedule—without deprivation. We are here to guide you every step of the way.
             </p>
             <p className="text-xl font-semibold text-[#EAC881] relative z-10">
                Book your free 15-minute discovery call with Ojasio today — and let's build a plan that works for your body, your lifestyle, and your life. → <a href="https://www.ojasio.com" className="text-white underline hover:text-[#EAC881] transition-colors">www.ojasio.com</a>
             </p>
          </div>

        </div>
      </>
    )
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(BLOG_POSTS.map(post => post.category)))];

export const Blog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { id } = useParams();
  const navigate = useNavigate();
  
  const selectedPost = BLOG_POSTS.find(post => post.id === id) || null;
  
  const setSelectedPost = (post: typeof BLOG_POSTS[0] | null) => {
    if (post) {
      navigate(`/blog/${post.id}`);
    } else {
      navigate(`/blog`);
    }
  };

  const [dietPlanCountry, setDietPlanCountry] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: any) => setDietPlanCountry(e.detail);
    window.addEventListener('open-diet-plan', handleOpen as any);
    return () => window.removeEventListener('open-diet-plan', handleOpen as any);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedPost || dietPlanCountry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost, dietPlanCountry]);

  const filteredPosts = BLOG_POSTS.filter(post => 
    activeCategory === "All" || post.category === activeCategory
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#1A2F2B] font-sans selection:bg-[#EAC881]/30">
      
      {/* HEADER HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#EAC881]/10 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-[#1A2F2B]/5 rounded-full blur-[100px] -z-10 -translate-x-1/3"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-[#EAC881] text-[10px] font-bold uppercase tracking-[0.3em] block mb-6">Editorial</span>
          <h1 className="text-4xl md:text-5xl font-display text-[#1A2F2B] leading-[1.1] mb-6">
            The Wellness <span className="italic font-serif text-[#1A2F2B]/80">Journal</span>
          </h1>
          <p className="text-lg md:text-xl text-[#1A2F2B]/60 font-light leading-relaxed max-w-2xl mx-auto">
            Clinical insights, science-backed nutrition, and transformative protocols for a deeply nourished life.
          </p>
        </motion.div>

        {/* Category Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setSelectedPost(null);
                window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' });
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[#1A2F2B] text-white shadow-lg' 
                  : 'bg-white text-[#1A2F2B]/70 hover:bg-[#EAC881]/20 hover:text-[#1A2F2B] border border-[#1A2F2B]/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      <main className="px-6 lg:px-12 max-w-7xl mx-auto pb-24">
        
        <AnimatePresence mode="popLayout">
        {/* TILE GRID POSTS */}
        {filteredPosts.length > 0 && (
          <motion.div key="regular-posts-grid" layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, idx) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={post.id}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_30px_-15px_rgba(26,47,43,0.15)] border border-[#EAC881]/20 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(26,47,43,0.2)]"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A2F2B]">
                    {post.category}
                  </div>
                  <img loading="lazy" 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F2B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                </div>
                
                <div className="flex flex-col flex-grow p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-display text-[#1A2F2B] leading-tight mb-3 group-hover:text-[#EAC881] transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-[#1A2F2B]/60 font-light leading-relaxed mb-6 flex-grow text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-[#1A2F2B]/10 pt-5">
                    <div className="flex items-center gap-2 text-[10px] text-[#1A2F2B]/50 font-semibold tracking-widest uppercase">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#1A2F2B] group-hover:text-[#EAC881] transition-colors">
                      Read <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            </AnimatePresence>
          </motion.div>
        )}
        </AnimatePresence>
      </main>

      {/* LEAD CAPTURE / NEWSLETTER */}
      <section className="bg-[#1A2F2B] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#EAC881] via-transparent to-transparent"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Mail className="mx-auto text-[#EAC881] mb-6" size={40} strokeWidth={1} />
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">Expert Nutrition, Delivered.</h2>
          <p className="text-white/70 font-light text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Join our private newsletter for clinical insights, hormone-balancing recipes, and evidence-based wellness protocols. 
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto justify-center">
            <a href="https://wa.me/919990356350?text=Hi%20Ojasio%2C%20I%20would%20like%20to%20book%20a%20consultation." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="w-full bg-[#25D366] text-white px-8 py-4 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-[#128C7E] transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] whitespace-nowrap flex items-center justify-center gap-2">
                Book your free 20 minutes consultation
              </button>
            </a>
            <a href="mailto:hello@ojasio.com" className="w-full sm:w-auto mt-4 sm:mt-0">
               <button className="w-full bg-[#EAC881] text-[#1A2F2B] px-8 py-4 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(234,200,129,0.3)] whitespace-nowrap flex items-center justify-center gap-2">
                 Email Us
               </button>
            </a>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN BLOG READING MODAL OVERLAY */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          >
            {/* Modal Header Actions */}
            <div className="sticky top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md z-50 border-b border-[#1A2F2B]/5 px-6 lg:px-12 flex items-center justify-between">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-[#1A2F2B] hover:text-[#EAC881] transition-colors font-sans text-xs font-bold uppercase tracking-widest hidden sm:flex"
              >
                <ArrowRight size={16} className="transform rotate-180" /> Back to Journal
              </button>
              
              <div className="flex-1 text-center truncate px-4 hidden sm:block">
                <span className="text-[#1A2F2B] font-display text-lg tracking-wide truncate">{selectedPost.title}</span>
              </div>
              <div className="flex-1 text-left truncate sm:hidden">
                <span className="text-[#1A2F2B] font-display text-lg tracking-wide truncate">{selectedPost.title}</span>
              </div>
              
              <div className="flex gap-4 shrink-0">
                 <button 
                  onClick={() => setSelectedPost(null)}
                  className="w-10 h-10 rounded-full bg-[#1A2F2B]/5 flex items-center justify-center text-[#1A2F2B] hover:bg-[#1A2F2B] hover:text-white transition-all"
                 >
                   <X size={20} />
                 </button>
              </div>
            </div>

            {/* Modal Hero Banner */}
            <div className="relative w-full min-h-[60vh] md:min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end">
              <img loading="lazy" 
                src={selectedPost.coverImage || selectedPost.image} 
                alt={selectedPost.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2F2B] via-[#1A2F2B]/60 to-transparent"></div>
              
              <div className="relative z-10 px-6 lg:px-12 pb-12 lg:pb-20 pt-32 max-w-5xl mx-auto w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="bg-[#EAC881] text-[#1A2F2B] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block mb-6 shadow-lg">
                    {selectedPost.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white leading-tight mb-6">
                    {selectedPost.title}
                  </h1>
                  {selectedPost.subtitle && (
                    <p className="font-serif italic text-2xl lg:text-3xl text-white/80 mb-8 max-w-3xl">
                      {selectedPost.subtitle}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-6 text-white/60 font-sans text-xs uppercase tracking-widest font-semibold">
                    <div className="flex items-center gap-2">
                       <img loading="lazy" src="https://images.pexels.com/photos/37274943/pexels-photo-37274943.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Author" className="w-8 h-8 rounded-full object-cover border border-[#EAC881]/30" />
                       <span className="text-white">By {selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="bg-[#FAF9F6] relative">
              <WhatsAppFloatingButton />
              <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {selectedPost.content}
                </motion.div>

                {/* Article Footer CTA inside Modal */}
                <div className="mt-20 pt-16 border-t border-[#1A2F2B]/10 text-center">
                   <h4 className="font-display text-3xl text-[#1A2F2B] mb-4">Start your own healing journey.</h4>
                   <p className="text-[#1A2F2B]/60 mb-8 max-w-md mx-auto font-light">
                     Speak with our clinical nutritionists today and get a protocol engineered specifically for your body.
                   </p>
                   <button 
                     onClick={() => {
                        const message = encodeURIComponent(`Hi Ojasio, I read your article "${selectedPost.title}" and would like to book a free 20 minute consultation.`);
                        window.open(`https://wa.me/919990356350?text=${message}`, '_blank');
                     }} 
                     className="bg-[#1A2F2B] text-white px-8 py-4 rounded-xl font-sans text-sm tracking-widest uppercase font-bold hover:bg-[#EAC881] hover:text-[#1A2F2B] transition-all duration-300 shadow-[0_10px_30px_rgba(26,47,43,0.2)]"
                   >
                     Book Your Free 20 Minutes Consultation
                   </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {dietPlanCountry && (
          <DietPlanModal countryCode={dietPlanCountry} onClose={() => setDietPlanCountry(null)} />
        )}
      </AnimatePresence>

    </div>
  );
};
