import type {StructureResolver} from 'sanity/structure'

// Define the structure for the Site Settings singleton
const settingsListItem = (S: any) =>
  S.listItem()
    .title('Site Settings')
    .icon(() => '⚙️') // Simple emoji icon
    .child(
      S.document()
        .schemaType('siteSettings')
        .documentId('siteSettings') // Use a fixed document ID
        .title('Site Settings')
    );

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      settingsListItem(S), // Add the singleton settings item
      S.divider(), // Add a visual separator
      // Filter out the 'siteSettings' type from the default list
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings'].includes(listItem.getId() ?? '')
      ),
    ])
