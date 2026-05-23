import fs from 'fs';
import path from 'path';

const generateSitemap = () => {
  const baseUrl = 'https://ojasio.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Define static routes
  const staticRoutes = [
    '/',
    '/about',
    '/founder',
    '/reviews',
    '/blog',
    '/contact',
    '/faq',
  ];

  const programRoutes = [
    '/programs/pcos-diet-plan',
    '/programs/weight-loss-diet-plan',
    '/programs/thyroid-diet-plan',
    '/programs/hormonal-imbalance-diet',
    '/programs/diet-plan-for-working-professionals',
  ];

  // Dynamically read blog files
  const blogsDir = path.join(process.cwd(), 'src/data/blogs');
  let blogFileNames = [];
  if (fs.existsSync(blogsDir)) {
    blogFileNames = fs.readdirSync(blogsDir)
      .filter(f => f.endsWith('.tsx') || f.endsWith('.ts'))
      .map(f => f.replace(/.tsx?$/, ''));
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add programs routes
  programRoutes.forEach(route => {
    xml += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  // Add blog routes
  blogFileNames.forEach(slug => {
    xml += `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  const publicDir = 'public';
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write sitemap.xml
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('sitemap.xml generated successfully!');

  // Write robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('robots.txt generated successfully!');
};

generateSitemap();
