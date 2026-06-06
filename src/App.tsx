/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Lazy load route components for better performance
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Disha = React.lazy(() => import('./pages/Disha').then(module => ({ default: module.Disha })));
const Reviews = React.lazy(() => import('./pages/Reviews').then(module => ({ default: module.Reviews })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Blog = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const FAQ = React.lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const BMICalculatorPage = React.lazy(() => import('./pages/BMICalculatorPage').then(module => ({ default: module.BMICalculatorPage })));

// Programs lazy loaded
const PCOSDietPlan = React.lazy(() => import('./pages/programs/PCOSDietPlan').then(module => ({ default: module.PCOSDietPlan })));
const WeightLossDietPlan = React.lazy(() => import('./pages/programs/WeightLossDietPlan').then(module => ({ default: module.WeightLossDietPlan })));
const ThyroidDietPlan = React.lazy(() => import('./pages/programs/ThyroidDietPlan').then(module => ({ default: module.ThyroidDietPlan })));
const HormonalImbalanceDiet = React.lazy(() => import('./pages/programs/HormonalImbalanceDiet').then(module => ({ default: module.HormonalImbalanceDiet })));
const WorkingProfessionalsDiet = React.lazy(() => import('./pages/programs/WorkingProfessionalsDiet').then(module => ({ default: module.WorkingProfessionalsDiet })));

const SuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-8 h-8 border-4 border-[#1A2F2B] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function AppRoutes() {
  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="founder" element={<Disha />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<Blog />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="bmi-calculator" element={<BMICalculatorPage />} />
            <Route path="contact" element={<Contact />} />
            <Route path="programs/pcos-diet-plan" element={<PCOSDietPlan />} />
            <Route path="programs/weight-loss-diet-plan" element={<WeightLossDietPlan />} />
            <Route path="programs/thyroid-diet-plan" element={<ThyroidDietPlan />} />
            <Route path="programs/hormonal-imbalance-diet" element={<HormonalImbalanceDiet />} />
            <Route path="programs/diet-plan-for-working-professionals" element={<WorkingProfessionalsDiet />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

