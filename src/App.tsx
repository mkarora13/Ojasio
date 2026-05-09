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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="expert" element={<Disha />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="blog" element={<Blog />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

