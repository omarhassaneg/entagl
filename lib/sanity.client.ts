import { createClient, type SanityClient, type ClientConfig } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-01';

// Debug logging for environment variables
console.log('[Sanity Config] Environment:', {
  projectId,
  dataset,
  apiVersion,
  nodeEnv: process.env.NODE_ENV,
  hasToken: !!process.env.SANITY_API_READ_TOKEN,
});

if (!projectId || !dataset) {
  throw new Error('[Sanity Config] Missing required environment variables');
}

// Determine if we're in preview mode or need the authenticated client
const useCdn = process.env.NODE_ENV === 'production';

// Shared configuration
const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn,
};

// Client for fetching data in the browser
export const sanityClient: SanityClient = createClient({
  ...config,
  stega: {
    enabled: false,
    studioUrl: '/studio',
  }
});

// Authenticated client for fetching draft content
export const sanityPreviewClient: SanityClient = createClient({
  ...config,
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true,
  perspective: 'previewDrafts',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  }
});

// Helper function to get the appropriate client
export function getClient(preview: boolean = false): SanityClient {
  const client = preview ? sanityPreviewClient : sanityClient;
  
  // Create a wrapped version of the client
  const wrappedClient = {
    ...client,
    fetch: async function <T>(
      query: string,
      params?: any,
      options?: any
    ): Promise<T> {
      console.log('[Sanity] Fetching with query:', query);
      console.log('[Sanity] Using client config:', {
        projectId: client.config().projectId,
        dataset: client.config().dataset,
        apiVersion: client.config().apiVersion,
        useCdn: client.config().useCdn,
        perspective: client.config().perspective,
      });
      
      try {
        const result = await client.fetch<T>(query, params, options);
        console.log('[Sanity] Fetch result:', result);
        return result;
      } catch (error) {
        console.error('[Sanity] Fetch error:', error);
        throw error;
      }
    }
  };
  
  return wrappedClient as SanityClient;
} 