import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist/client');

const today = new Date().toISOString().split('T')[0];

const BLOG_ARTICLES = [
  { slug: 'diabetes-blood-pressure-management', title: 'Complete Guide to Managing Diabetes and High Blood Pressure Naturally', desc: 'How Nutrition and Lifestyle Can Support Healthy Blood Sugar and Blood Pressure Levels' },
  { slug: 'pcos-diet-plan', title: 'The Ultimate 7-Day PCOS Diet Plan', desc: 'Discover the most effective Indian vegetarian and global diet plans to manage PCOS and reverse symptoms.' },
  { slug: 'lose-weight-without-starving', title: 'How to Lose Weight Without Starving', desc: 'A sustainable approach to weight loss using nutrient-dense foods.' },
  { slug: 'best-foods-for-hormonal-balance', title: 'Best Foods for Hormonal Balance', desc: 'Discover the top foods to restore hormonal equity and boost wellness.' },
  { slug: 'lifestyle-guide-busy-professionals', title: 'Complete Lifestyle Guide for Busy Professionals', desc: 'Nutrition and productivity tips for people on the go.' },
  { slug: 'best-indian-breakfast-weight-loss', title: 'Best Indian Breakfast for Weight Loss: High-Protein & Quick', desc: 'Traditional and modern Indian breakfast recipes.' },
  { slug: 'best-diet-plan-for-working-women-in-india', title: 'Best Diet Plan for Working Women', desc: 'Optimized nutrition strategy designed for the modern working woman.' }
];

const routes = [
  {
    path: '/',
    title: 'Ojasio | Premium Nutrition & Diet Consultation by Disha Arora',
    description: 'Expert online diet plans for PCOS, weight loss, and metabolic health by Certified Nutrition Manager Disha Arora. Achieve sustainable results globally.',
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Ojasio",
      "url": "https://ojasio.com",
      "description": "Premium online nutrition and diet consultation by a certified nutrition manager. Specializing in PCOS, weight loss, diabetes diet, and personalized meal plans worldwide.",
      "founder": {
        "@type": "Person",
        "name": "Disha Arora",
        "jobTitle": "Certified Nutrition Manager",
        "url": "https://ojasio.com/about"
      },
      "areaServed": ["India", "United Kingdom", "Canada", "United States", "UAE", "Australia", "Europe"],
      "serviceType": ["Nutrition Consultation", "Diet Planning", "Weight Loss Coaching", "PCOS Diet", "Diabetes Nutrition", "Corporate Wellness"],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "url": "https://ojasio.com/contact"
      }
    },
    noscript: "<h1>Ojasio Premium Nutrition Consultation</h1><p>Expert online diet plans for PCOS, weight loss, and metabolic health by Certified Nutrition Manager Disha Arora. Achieve sustainable results globally through our science-backed dietary frameworks.</p>"
  },
  {
    path: '/about',
    title: 'About Disha Arora | Ojasio Certified Nutrition Manager',
    description: 'Learn about Disha Arora, the expert Nutrition Manager behind Ojasio. Discover our philosophy on sustainable health, wellness, and holistic diet planning.',
    schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Disha Arora",
        "jobTitle": "Certified Nutrition Manager"
    },
    noscript: "<h1>About Disha Arora and Ojasio</h1><p>Learn about our deeply rooted philosophy in holistic healing through customized, unrestrictive dietary plans.</p>"
  },
  {
    path: '/founder',
    title: 'Founder Disha Arora | Ojasio Premium Nutrition',
    description: 'Meet Disha Arora, Certified Nutrition Manager and founder of Ojasio. Specializing in clinical nutrition, PCOS, and metabolic repair.',
    schema: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Disha Arora",
        "jobTitle": "Certified Nutrition Manager"
    },
    noscript: "<h1>Meet Disha Arora</h1><p>Disha Arora is the founder of Ojasio.</p>"
  },
  {
    path: '/reviews',
    title: 'Client Reviews & Success Stories | Ojasio',
    description: 'Read real success stories and reviews from Ojasio clients worldwide who have reversed PCOS, lost weight, and regained their health.',
    schema: {},
    noscript: "<h1>Client Reviews</h1><p>Real success stories from our global clients.</p>"
  },
  {
    path: '/faq',
    title: 'Frequently Asked Questions | Ojasio Nutrition',
    description: 'Find answers to common questions about Ojasio\'s premium nutrition programs, booking process, and how we help you achieve your health goals.',
    schema: {},
    noscript: "<h1>Frequently Asked Questions</h1><p>Answers to common questions about Ojasio.</p>"
  },
  {
    path: '/contact',
    title: 'Contact Ojasio | Nutrition Consultation Booking',
    description: 'Get in touch with Ojasio to book your premium online nutrition consultation. We serve clients in India, UK, USA, Canada, UAE, and Australia.',
    schema: {},
    noscript: "<h1>Contact Ojasio</h1><p>Book a consultation by emailing hello@ojasio.com.</p>"
  },
  {
    path: '/blog',
    title: 'Ojasio Nutrition Blog | Health Tips & Diet Plans',
    description: 'Read the latest insights on PCOS, weight loss, diabetes, and metabolic health from Ojasio\'s expert nutritionists.',
    schema: {},
    noscript: "<h1>Ojasio Nutrition Blog</h1><p>Read the latest insights on PCOS, weight loss, diabetes, and metabolic health.</p>"
  },
  {
    path: '/programs/pcos-diet-plan',
    title: 'PCOS Diet Plan & Consultation | Ojasio',
    description: 'The Ultimate 7-Day PCOS Diet Plan and expert consultation by Certified Nutrition Manager Disha Arora. Reverse PCOS naturally.',
    schema: {},
    noscript: "<h1>PCOS Diet Plan</h1><p>The Ultimate 7-Day PCOS Diet Plan to naturaly reverse PCOS.</p>"
  },
  {
    path: '/programs/weight-loss-diet-plan',
    title: 'Weight Loss Diet Plan for Women | Ojasio',
    description: 'Sustainably lose weight with a clinical approach focusing on metabolic restoration and hormonal health, not starving.',
    schema: {},
    noscript: "<h1>Weight Loss Diet Plan</h1><p>Science based fat loss plan focusing on metabolic health.</p>"
  },
  {
    path: '/programs/thyroid-diet-plan',
    title: 'Thyroid Diet Plan & Hashimoto\'s Management | Ojasio',
    description: 'Diet plan for managing hypothyroidism and Hashimoto\'s naturally. Optimize your thyroid function and T4 to T3 conversion.',
    schema: {},
    noscript: "<h1>Thyroid Diet Plan</h1><p>Diet plan for managing hypothyroidism and Hashimoto's naturally.</p>"
  },
  {
    path: '/programs/hormonal-imbalance-diet',
    title: 'Hormonal Imbalance Diet Plan | Ojasio',
    description: 'Balance your hormones naturally with a precise, clinical nutrition plan targeting liver health, gut flora, and blood sugar.',
    schema: {},
    noscript: "<h1>Hormonal Imbalance Diet</h1><p>Balance your hormones naturally with a targeted nutrition plan.</p>"
  },
  {
    path: '/programs/diet-plan-for-working-professionals',
    title: 'Diet Plan for Working Professionals | Ojasio',
    description: 'A practical, high-performance diet plan for busy executives and professionals. Enhance energy and mental clarity.',
    schema: {},
    noscript: "<h1>Working Professionals Diet Plan</h1><p>A practical, high-performance diet plan for busy executives.</p>"
  }
];

// Add Blog routes dynamically
BLOG_ARTICLES.forEach(article => {
  routes.push({
    path: `/blog/${article.slug}`,
    title: `${article.title} | Ojasio Nutrition`,
    description: article.desc,
    image: `https://ojasio.com/images/${article.slug}.jpg`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.desc,
      "author": {
        "@type": "Person",
        "name": "Disha Arora",
        "jobTitle": "Certified Nutrition Manager",
        "url": "https://ojasio.com/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Ojasio",
        "url": "https://ojasio.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ojasio.com/logo.png"
        }
      },
      "datePublished": today,
      "dateModified": today,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ojasio.com/blog/${article.slug}`
      },
      "image": `https://ojasio.com/images/${article.slug}.jpg`,
      "keywords": `PCOS diet, weight loss, ${article.title.toLowerCase()}`,
      "articleSection": "Nutrition",
      "inLanguage": "en"
    },
    faqSchema: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is the best approach for ${article.title}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A balanced, protein-rich diet accompanied by holistic wellness strategies is the most effective approach."
            }
          }
        ]
    },
    noscript: `<article><h1>${article.title}</h1><p>${article.desc}</p><p>Please enable JavaScript to view the full interactive article, or contact us to book a consultation.</p></article>`
  });
});

const indexTemplate = fs.existsSync(path.join(distPath, 'index.html')) ? fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8') : '';

async function run() {
  if (!indexTemplate) {
    console.error('index.html not found!');
    return;
  }

  // Import SSR Render function
  const serverSsr = await import('./dist/server/entry-server.js');
  console.log("serverSsr exports:", Object.keys(serverSsr));
  const { render } = serverSsr;

  for (const route of routes) {
    // Determine target directory
    const dirPath = route.path === '/' ? distPath : path.join(distPath, route.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    try {
      // SSR render
      const { html: appHtml } = render(route.path);


    // Build the injected HTML tags
    const canonical = `https://ojasio.com${route.path === '/' ? '' : route.path}`;
    const headTags = `
      <title>${route.title}</title>
      <meta name="description" content="${route.description}" />
      <link rel="canonical" href="${canonical}" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      <!-- Open Graph -->
      <meta property="og:title" content="${route.title}" />
      <meta property="og:description" content="${route.description}" />
      <meta property="og:url" content="${canonical}" />
      <meta property="og:type" content="${route.path.startsWith('/blog/') ? 'article' : 'website'}" />
      <meta property="og:site_name" content="Ojasio" />
      ${route.image ? `<meta property="og:image" content="${route.image}" />` : ''}
      
      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${route.title}" />
      <meta name="twitter:description" content="${route.description}" />
      ${route.image ? `<meta name="twitter:image" content="${route.image}" />` : ''}

      <!-- Schemas -->
      ${route.schema && Object.keys(route.schema).length > 0 ? `<script type="application/ld+json">${JSON.stringify(route.schema)}</script>` : ''}
      ${route.faqSchema ? `<script type="application/ld+json">${JSON.stringify(route.faqSchema)}</script>` : ''}
    `;

    // Remove existing title if any, then inject
    let finalHtml = indexTemplate;
    finalHtml = finalHtml.replace(/<title>.*?<\/title>/, '');
    finalHtml = finalHtml.replace('</head>', `${headTags}</head>`);
    
    // Inject the fully rendered app
    finalHtml = finalHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    fs.writeFileSync(path.join(dirPath, 'index.html'), finalHtml);
    console.log(`Prerendered: ${route.path}`);
    } catch (e) {
      console.error(`Failed to prerender ${route.path}`, e);
    }
  }
}

run();
