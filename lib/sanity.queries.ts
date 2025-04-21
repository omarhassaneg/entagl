import { groq } from 'next-sanity';

// Helper function to select localized fields
const locale = (lang: string) => `coalesce(${lang}, "tr")`; // Fallback to Turkish (tr) if field is missing

// --- Page Query --- 
// Selects all page fields, resolving the image URL for the hero image
// Uses the locale helper to get the correct language for title, body, hero title, and hero CTA
const pageFields = (lang: string) => groq`
  _id,
  "title": title.${locale(lang)},
  "slug": slug.current,
  "hero": {
    "title": hero.title.${locale(lang)},
    "image": hero.image.asset->url,
    "cta": hero.cta.${locale(lang)}
  },
  "body": body.${locale(lang)}[]{..., markDefs[]{..., asset->{url, _id}}},
  "bodyRaw": body.${locale(lang)}
`;

export const pageBySlugQuery = (lang: string) => groq`
*[_type == "page" && slug.current == $slug][0] {
  ${pageFields(lang)}
}
`;

// --- Site Settings Query ---
// Fetches the singleton 'siteSettings' document
// Uses the locale helper for translatable fields
export const settingsQuery = (lang: string) => {
  console.log('Executing settingsQuery with lang:', lang);
  // The localeString schema creates fields with names matching language codes (en, tr, ru)
  // We need to access them directly rather than using nested notation
  const query = groq`*[_type == "siteSettings" && _id == "siteSettings"][0] {
    "siteTitle": siteTitle.${lang},
    "seoDescription": seoDescription.${lang}
  }`;
  console.log('Generated GROQ query:', query);
  return query;
};

// --- Example: Query for Homepage (assuming slug is '/') ---
export const homePageQuery = (lang: string) => groq`
*[_type == "page" && slug.current == '/'][0] {
  ${pageFields(lang)}
}
`;

// --- Query to get all page slugs (for static generation) ---
export const pagePathsQuery = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`; 