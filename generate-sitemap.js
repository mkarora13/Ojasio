import fs from 'fs';
import path from 'fs';
import { fileURLToPath } from 'url';

// A simple script to generate sitemap.xml and robots.txt

const generateSitemap = () => {
  const baseUrl = 'https://www.ojasio.com';
  const currentDate = new Date().toISOString();

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

  const blogFileNames = [
    "best-diet-plan-working-women",
    "pcos-weight-loss-success-story",
    "understanding-insulin-resistance",
    "diabetes-blood-pressure-management",
  ];

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

  xml += `\n</urlset>`;

  const publicDir = 'public';
  import('fs').then(fs => {
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
    }
  
    // Write sitemap.xml
    fs.writeFileSync(`${publicDir}/sitemap.xml`, xml);
    console.log('sitemap.xml generated successfully!');
  
    // Write robots.txt
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
    fs.writeFileSync(`${publicDir}/robots.txt`, robotsTxt);
    console.log('robots.txt generated successfully!');
  });
};

generateSitemap();
