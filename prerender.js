import fs from 'fs';
import path from 'path';

const distPath = path.resolve('dist');

const today = new Date().toISOString().split('T')[0];

const BLOG_ARTICLES = [
  { slug: 'diabetes-blood-pressure-management', title: 'Complete Guide to Managing Diabetes and High Blood Pressure Naturally', desc: 'How Nutrition and Lifestyle Can Support Healthy Blood Sugar and Blood Pressure Levels' },
  { slug: 'pcos-diet-plan', title: 'The Ultimate 7-Day PCOS Diet Plan', desc: 'Discover the most effective Indian vegetarian and global diet plans to manage PCOS and reverse symptoms.' },
  { slug: 'lose-weight-without-starving', title: 'How to Lose Weight Without Starving', desc: 'A sustainable approach to weight loss using nutrient-dense foods.' },
  { slug: 'best-foods-for-hormonal-balance', title: 'Best Foods for Hormonal Balance', desc: 'Discover the top foods to restore hormonal equity and boost wellness.' },
  { slug: 'lifestyle-guide-busy-professionals', title: 'Complete Lifestyle Guide for Busy Professionals', desc: 'Nutrition and productivity tips for people on the go.' },
  { slug: 'best-indian-breakfast-weight-loss', title: 'Best Indian Breakfast for Weight Loss: High-Protein & Quick', desc: 'Traditional and modern Indian breakfast recipes.' },
  { slug: 'best-diet-plan-working-women', title: 'Best Diet Plan for Working Women', desc: 'Optimized nutrition strategy designed for the modern working woman.' },
  { slug: 'vegetarian-weight-loss-diet-plan', title: 'Vegetarian Weight Loss Diet Plan', desc: 'A complete plant-based protocol for fat loss.' },
  { slug: 'understanding-insulin-resistance', title: 'Understanding Insulin Resistance', desc: 'Everything you need to know about insulin and metabolic health.' },
  { slug: 'pcos-weight-loss-success-story', title: 'PCOS Weight Loss Success Story', desc: 'Real-world results and step-by-step strategies.' }
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
    path: '/services',
    title: 'Nutrition Programs & Diet Plans | Ojasio',
    description: 'Explore Ojasio\'s premium programs including PCOS Diet Plans, Weight Loss Programs, and Metabolic Health Consultation.',
    schema: {},
    noscript: "<h1>Our Premium Diet and Nutrition Programs</h1><p>Explore Ojasio's customized protocols for reverse chronic conditions, weight loss, and sustained metabolic vitality.</p>"
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

if (indexTemplate) {
  routes.forEach(route => {
    // Determine target directory
    const dirPath = route.path === '/' ? distPath : path.join(distPath, route.path);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

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

    const noscriptTag = `\n<noscript>${route.noscript}</noscript>\n`;

    // Inject into index template
    let html = indexTemplate;
    
    // Remove existing title if any, then inject
    html = html.replace(/<title>.*?<\/title>/, '');
    html = html.replace('</head>', `${headTags}</head>`);
    html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptTag}`);

    fs.writeFileSync(path.join(dirPath, 'index.html'), html);
    console.log(`Prerendered: ${route.path}`);
  });
}
