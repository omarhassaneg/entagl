import { defineType, defineField, defineArrayMember } from 'sanity';
import { supportedLanguages } from './localeString'; // Reuse supported languages

export default defineType({
  name: 'localeRichText',
  title: 'Localized Rich Text',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: 'blockContent',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) => (lang.isDefault ? Rule.required() : Rule),
    })
  ),
}); 