import { Metadata } from 'next';

// Static metadata
export const metadata: Metadata = {
  title: 'Entagl - Static Title Test',
  description: 'This is a static description test for Entagl',
};

export default function StaticTestPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Static Metadata Test</h1>
      
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Static Metadata Used:</h2>
        <ul>
          <li><strong>Title:</strong> Entagl - Static Title Test</li>
          <li><strong>Description:</strong> This is a static description test for Entagl</li>
        </ul>
      </div>
      
      <div className="mt-6">
        <p>Check the page title in your browser tab - it should show: <strong>Entagl - Static Title Test</strong></p>
        <p>The page should have a meta description tag with: <strong>This is a static description test for Entagl</strong></p>
      </div>
    </div>
  );
} 