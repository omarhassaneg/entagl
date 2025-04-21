import { groq } from 'next-sanity';
import { getClient } from '@/lib/sanity.client';

async function fetchSettingsData() {
  const client = getClient();
  
  try {
    // Try the direct query approach first
    const directQuery = `*[_type == "siteSettings"][0]`;
    const directResult = await client.fetch(directQuery);
    
    // Try accessing with different field patterns
    const settingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
      "titleEn": siteTitle.en,
      "titleTr": siteTitle.tr,
      "titleRu": siteTitle.ru,
      "descEn": seoDescription.en,
      "descTr": seoDescription.tr,
      "descRu": seoDescription.ru,
      _id,
      _type,
      siteTitle,
      seoDescription
    }`;
    
    const settings = await client.fetch(settingsQuery);
    
    return {
      direct: directResult,
      processed: settings,
      error: null
    };
  } catch (error) {
    return {
      direct: null,
      processed: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default async function TestPage() {
  const data = await fetchSettingsData();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sanity Settings Test</h1>
      
      {data.error ? (
        <div className="bg-red-100 p-4 rounded mb-6">
          <h2 className="text-lg font-bold text-red-800">Error</h2>
          <p>{data.error}</p>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-lg font-bold mb-2">Direct Query Result</h2>
            <pre className="bg-white p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(data.direct, null, 2)}
            </pre>
          </div>
          
          <div className="bg-gray-100 p-4 rounded mb-6">
            <h2 className="text-lg font-bold mb-2">Processed Data</h2>
            <pre className="bg-white p-2 rounded overflow-auto max-h-60">
              {JSON.stringify(data.processed, null, 2)}
            </pre>
          </div>
          
          <div className="bg-blue-100 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Title Values:</h2>
            <ul>
              <li><strong>English:</strong> {data.processed?.titleEn || 'Not found'}</li>
              <li><strong>Turkish:</strong> {data.processed?.titleTr || 'Not found'}</li>
              <li><strong>Russian:</strong> {data.processed?.titleRu || 'Not found'}</li>
            </ul>
            
            <h2 className="text-lg font-bold mt-4 mb-2">Description Values:</h2>
            <ul>
              <li><strong>English:</strong> {data.processed?.descEn || 'Not found'}</li>
              <li><strong>Turkish:</strong> {data.processed?.descTr || 'Not found'}</li>
              <li><strong>Russian:</strong> {data.processed?.descRu || 'Not found'}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
} 