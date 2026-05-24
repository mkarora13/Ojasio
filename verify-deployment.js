
import fs from 'fs';
import path from 'path';

console.log('\n🔍 Starting Post-Build Deployment Validation...\n');

const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error('❌ ERROR: dist directory not found. Please build the project first.');
  process.exit(1);
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('❌ ERROR: sitemap.xml not found in dist/.');
  process.exit(1);
}

console.log('✅ Found dist/ directory and sitemap.xml.');

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [];
const regex = /<loc>(https:\/\/ojasio\.com([^<]*))<\/loc>/g;
let match;
while ((match = regex.exec(sitemap)) !== null) {
  urls.push(match[2]); // We capture the path part
}

let allValid = true;

console.log('\n📋 Validating Physical HTML Files for Routes...\n');

urls.forEach(routePath => {
  // Homepage validation
  if (routePath === '' || routePath === '/') {
    const indexPath = path.join(distDir, 'index.html');
    if (!fs.existsSync(indexPath)) {
       console.error(`❌ MISSING: Index route / -> ${indexPath}`);
       allValid = false;
    } else {
       console.log(`✅ SUCCESS: / -> index.html`);
    }
    return;
  }

  // Blog article validation
  if (routePath.startsWith('/blog/')) {
    const htmlPath = path.join(distDir, routePath, 'index.html');
    if (fs.existsSync(htmlPath)) {
       console.log(`✅ SUCCESS: ${routePath} -> physically rendered correctly at dist${routePath}/index.html`);
    } else {
       console.error(`❌ MISSING: ${routePath} does not have a static HTML file at dist${routePath}/index.html`);
       allValid = false;
    }
  }
});

if (allValid) {
  console.log('\n🎉 All routes and physical articles validated perfectly. Deployment is safe to proceed!\n');
} else {
  console.log('\n🚨 VALIDATION FAILED. Some files were not successfully prerendered.\n');
  process.exit(1);
}
