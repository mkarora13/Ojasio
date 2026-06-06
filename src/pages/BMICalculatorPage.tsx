import React from 'react';
import { SEO } from '../components/seo/SEO';
import { BMICalculator } from '../components/ui/BMICalculator';
import { Link } from 'react-router-dom';
import { Target, Activity } from 'lucide-react';

export const BMICalculatorPage: React.FC = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      <SEO 
        title="Free Online BMI Calculator | Check Your Body Mass Index - Ojasio"
        description="Use our free online BMI calculator to check your Body Mass Index instantly. Get a personalized health report and scientific nutrition advice tailored to your metabolic needs."
        url="https://www.ojasio.com/bmi-calculator"
        jsonLdSchema={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Ojasio BMI Calculator",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "url": "https://www.ojasio.com/bmi-calculator",
            "description": "A comprehensive Body Mass Index (BMI) calculator offering instant metabolic insights and personalized nutrition strategies.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Ojasio - Clinical Nutrition",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.ojasio.com/logo.png"
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Calculate Your BMI Online",
            "description": "Learn how to use the free online Ojasio BMI calculator to check your Body Mass Index instantly and get scientific nutritional advice.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Enter Your Height",
                "text": "Select your preferred unit and input your exact height into the calculator.",
                "url": "https://www.ojasio.com/bmi-calculator"
              },
              {
                "@type": "HowToStep",
                "name": "Enter Your Weight",
                "text": "Select your preferred unit and input your current weight into the calculator.",
                "url": "https://www.ojasio.com/bmi-calculator"
              },
              {
                "@type": "HowToStep",
                "name": "Calculate and Interpret Results",
                "text": "View your Body Mass Index score to determine your health category.",
                "url": "https://www.ojasio.com/bmi-calculator"
              }
            ]
          }
        ]}
      />

      <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-[#1A2F2B] mb-6">
            Calculate Your <span className="text-[#EAC881]">BMI</span>
          </h1>
          <p className="text-lg md:text-xl text-[#1A2F2B]/70 font-light leading-relaxed">
            Understanding your Body Mass Index is the first step toward lasting health. Enter your details below for an instant assessment and tailored nutritional strategy.
          </p>
        </div>

        <div className="relative">
          <BMICalculator />
        </div>
      </section>

      <section className="py-24 bg-white border-t border-[#1A2F2B]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display text-[#1A2F2B] mb-8">What Is BMI and Why It Matters</h2>
          <p className="text-lg text-[#1A2F2B]/70 font-light leading-relaxed mb-6 text-left">
            The Body Mass Index (BMI) is a scientifically validated metric that evaluates your weight in relation to your height. While it doesn't measure body fat directly, it serves as a crucial preliminary screening tool to identify possible weight problems for adults and evaluate metabolic risk. 
          </p>
          <div className="flex flex-col md:flex-row gap-8 mt-12">
            <div className="flex-1 bg-[#FAF9F6] p-8 rounded-2xl border border-[#EAC881]/20 text-left shadow-sm">
              <Target className="text-[#EAC881] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Identify Risks Early</h3>
              <p className="text-[#1A2F2B]/70 text-sm leading-relaxed">High BMI levels are strongly linked with adverse metabolic outcomes including insulin resistance, making it essential to monitor.</p>
            </div>
            <div className="flex-1 bg-[#FAF9F6] p-8 rounded-2xl border border-[#EAC881]/20 text-left shadow-sm">
              <Activity className="text-[#EAC881] mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Optimize Metabolism</h3>
              <p className="text-[#1A2F2B]/70 text-sm leading-relaxed">Knowing your baseline allows our certified nutritionists to craft exact protocols customized to transition your body to an optimal fat-burning state.</p>
            </div>
          </div>
          <div className="mt-12 text-center">
             <Link to="/blog/bmi-calculator-guide" className="inline-flex items-center gap-2 text-[#EAC881] font-semibold hover:text-[#1A2F2B] transition-colors border-b border-[#EAC881] pb-1 hover:border-[#1A2F2B]">
               Read our complete guide to mastering your BMI
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
