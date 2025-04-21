import { defineType, defineField } from 'sanity';
import { CogIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  liveEdit: true,
  __experimental_actions: ['update', 'publish'], // Prevents creating or deleting multiple instances
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'localeString', // Localized
      description: 'The main title for the website, used in browser tabs and SEO.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'localeString', // Localized
      description: 'The default description used for search engine results.',
    }),
    // Add other global settings here, e.g., logo, header/footer links
  ],
  preview: {
    select: {
      title: 'siteTitle.tr',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      };
    },
  },
}); 