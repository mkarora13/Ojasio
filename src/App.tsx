/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Disha } from './pages/Disha';
import { Reviews } from './pages/Reviews';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { PCOSDietPlan } from './pages/programs/PCOSDietPlan';
import { WeightLossDietPlan } from './pages/programs/WeightLossDietPlan';
import { ThyroidDietPlan } from './pages/programs/ThyroidDietPlan';
import { HormonalImbalanceDiet } from './pages/programs/HormonalImbalanceDiet';
import { WorkingProfessionalsDiet } from './pages/programs/WorkingProfessionalsDiet';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="founder" element={<Disha />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="programs/pcos-diet-plan" element={<PCOSDietPlan />} />
        <Route path="programs/weight-loss-diet-plan" element={<WeightLossDietPlan />} />
        <Route path="programs/thyroid-diet-plan" element={<ThyroidDietPlan />} />
        <Route path="programs/hormonal-imbalance-diet" element={<HormonalImbalanceDiet />} />
        <Route path="programs/diet-plan-for-working-professionals" element={<WorkingProfessionalsDiet />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

