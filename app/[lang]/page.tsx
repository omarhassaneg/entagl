import SiteSettingsDisplay from '../components/SiteSettingsDisplay';

export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <div>
      {/* Existing content */}
      
      {/* Add debug info */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Site Settings Debug</h1>
        <SiteSettingsDisplay lang={params.lang} />
      </div>
    </div>
  );
} 