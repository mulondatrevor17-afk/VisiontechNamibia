import { useEffect } from 'react';

interface PageMetadataOptions {
  keywords?: string;
  path?: string;
  ogImage?: string;
}

export function usePageMetadata(
  title: string,
  description: string,
  options: PageMetadataOptions = {}
) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to update or create meta tags
    const updateMeta = (nameOrProp: string, attr: 'name' | 'property', content: string) => {
      let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProp);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    // Standard Meta
    updateMeta('description', 'name', description);
    if (options.keywords) {
      updateMeta('keywords', 'name', options.keywords);
    }

    // OpenGraph Meta
    updateMeta('og:title', 'property', title);
    updateMeta('og:description', 'property', description);
    const url = `https://visiontechna.online${options.path || window.location.pathname}`;
    updateMeta('og:url', 'property', url);
    if (options.ogImage) {
      updateMeta('og:image', 'property', options.ogImage);
    }

    // Twitter Meta
    updateMeta('twitter:title', 'name', title);
    updateMeta('twitter:description', 'name', description);
    if (options.ogImage) {
      updateMeta('twitter:image', 'name', options.ogImage);
    }

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  }, [title, description, options.keywords, options.path, options.ogImage]);
}

