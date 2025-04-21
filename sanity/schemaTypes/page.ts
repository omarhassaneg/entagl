import { defineType, defineField } from 'sanity';
import { BookIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'localeString', // Localized
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
      description: 'The unique URL path for this page (e.g., /about-us)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'hero', // Reference the hero object type
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'localeRichText', // Localized rich text
    }),
    // Optional: Add a field for language if needed for specific filtering,
    // although content is already segmented by language in localeString/localeRichText.
    // defineField({
    //   name: 'language',
    //   type: 'string',
    //   readOnly: true,
    //   hidden: true, // Hide if primarily using locale objects
    // }),
  ],
  preview: {
    select: {
      title: 'title.tr', // Preview with Turkish title
      subtitle: 'slug.current',
      media: 'hero.image',
    },
  },
}); 