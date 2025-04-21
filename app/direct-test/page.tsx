import { groq } from 'next-sanity';
import { getClient } from '@/lib/sanity.client';
import Script from 'next/script';

async function fetchSettings() {
  const client = getClient();
  
  try {
    const settings = await client.fetch(groq`*[_type == "siteSettings"][0]`);
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

export default async function DirectTestPage() {
  const settings = await fetchSettings();
  
  // Extract title and description
  const title = settings?.siteTitle?.en || 'Entagl Default Title';
  const description = settings?.seoDescription?.en || 'Entagl Default Description';
  
  return (
    <>
      {/* Direct script to set title and description */}
      <Script id="direct-meta-setter" strategy="beforeInteractive">
        {`
          document.title = "${title}";
          
          // Create or update meta description
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', "${description}");
        `}
      </Script>
      
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Direct Title/Description Test</h1>
        
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="text-lg font-bold mb-2">Settings from Sanity:</h2>
          <pre className="bg-white p-2 rounded overflow-auto max-h-60">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
        
        <div className="bg-blue-100 p-4 rounded mb-6">
          <h2 className="text-lg font-bold mb-2">Title/Description Used:</h2>
          <ul>
            <li><strong>Title:</strong> {title}</li>
            <li><strong>Description:</strong> {description}</li>
          </ul>
        </div>
        
        <div className="mt-6">
          <p>Check the page title in your browser tab - it should now show: <strong>{title}</strong></p>
          <p>The description meta tag should also be set to: <strong>{description}</strong></p>
        </div>
      </div>
    </>
  );
} 