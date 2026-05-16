import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  canonicalUrl?: string;
  jsonLdSchema?: Record<string, any>;
}

export function SEO({
  title,
  description,
  url = 'https://www.ojasio.com',
  image = 'https://www.ojasio.com/og-image.jpg',
  type = 'website',
  canonicalUrl,
  jsonLdSchema,
}: SEOProps) {
  const fullTitle = `${title} | Ojasio - Premium Wellness & Nutrition`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {jsonLdSchema && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      )}
    </Helmet>
  );
}
