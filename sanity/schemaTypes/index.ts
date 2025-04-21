import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import page from './page'
import hero from './hero'
import localeString from './localeString'
import localeRichText from './localeRichText'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, page, hero, localeString, localeRichText, siteSettings],
}

export const schemaTypes = [page, hero, localeString, localeRichText, siteSettings]
