import { defineField, defineType } from 'sanity';

export const supportedLanguages = [
  { id: 'en', title: 'English', isDefault: false },
  { id: 'tr', title: 'Turkish', isDefault: true },
  { id: 'ru', title: 'Russian', isDefault: false },
];

export const baseLanguage = supportedLanguages.find(l => l.isDefault);

export default defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  // Fieldsets can be used to group object fields. Displays them visually together
  // Initial state is 'open', narrow screen devices may collapse fields
  // Sets of fields that are configurable by language
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
      type: 'string',
      fieldset: lang.isDefault ? undefined : 'translations',
      validation: (Rule) => (lang.isDefault ? Rule.required() : Rule),
    })
  ),
}); 