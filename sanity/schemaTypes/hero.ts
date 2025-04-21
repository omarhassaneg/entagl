import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Hero Title',
      type: 'localeString', // Use the localized string type
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image hotspot cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'localeString', // Use the localized string type
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
}); 