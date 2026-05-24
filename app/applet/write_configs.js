const fs = require('fs');

const vercelConfig = {
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
};

fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));

const netlifyConfig = `
/*    /index.html   200
`;
fs.writeFileSync('public/_redirects', netlifyConfig);

const htaccessConfig = `
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  
  # Check if a directory with this name exists, and serve its index.html
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.*)$ /$1/index.html [L]

  # Check if a .html file exists
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L,QSA]

  # Fallback to SPA
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;
fs.writeFileSync('public/.htaccess', htaccessConfig);

console.log('Configs written');
