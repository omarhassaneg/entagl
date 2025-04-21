'use client';

import { useEffect, useState } from 'react';

interface SiteSettings {
  siteTitle?: string;
  seoDescription?: string;
}

interface DebugResponse {
  success: boolean;
  language: string;
  config: any;
  query: string;
  settings: SiteSettings;
  raw: any;
  error?: string;
}

export default function SiteSettingsDisplay({ lang }: { lang: string }) {
  const [debug, setDebug] = useState<DebugResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDebugInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/debug?lang=${lang}`);
        const data = await response.json();
        setDebug(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchDebugInfo();
  }, [lang]);

  if (loading) {
    return <div className="p-4 mt-4 bg-gray-100 rounded">Loading site settings debug info...</div>;
  }

  if (error) {
    return <div className="p-4 mt-4 bg-red-100 rounded">Error: {error}</div>;
  }

  if (!debug) {
    return <div className="p-4 mt-4 bg-yellow-100 rounded">No debug info available</div>;
  }

  return (
    <div className="p-4 mt-4 bg-gray-100 rounded">
      <h2 className="text-lg font-bold mb-2">Site Settings Debug Info</h2>
      
      <div className="mb-4">
        <h3 className="text-md font-semibold">Language: {debug.language}</h3>
      </div>

      {debug.success ? (
        <>
          <div className="mb-4">
            <h3 className="text-md font-semibold">Settings:</h3>
            <pre className="bg-white p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(debug.settings, null, 2)}
            </pre>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-semibold">Raw Document:</h3>
            <pre className="bg-white p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(debug.raw, null, 2)}
            </pre>
          </div>
          
          <div className="mb-4">
            <h3 className="text-md font-semibold">Query:</h3>
            <pre className="bg-white p-2 rounded overflow-auto max-h-40">
              {debug.query}
            </pre>
          </div>

          <div className="mb-4">
            <h3 className="text-md font-semibold">Config:</h3>
            <pre className="bg-white p-2 rounded overflow-auto max-h-40">
              {JSON.stringify(debug.config, null, 2)}
            </pre>
          </div>
        </>
      ) : (
        <div className="bg-red-100 p-2 rounded">
          <h3 className="text-md font-semibold">Error:</h3>
          <p>{debug.error}</p>
        </div>
      )}
    </div>
  );
} 