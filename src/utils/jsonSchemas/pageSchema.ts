const pageSchema = {
  title: 'Page',
  description: 'Multiple data results are returned in pages.\n' +
               'Setting "page.index: 0" will return the 1st page.\n' +
               'Setting "page.size: 10" will return maximum of 10 results per page.',
  type: 'object',
  example: { index: 0, size: 10 },
  properties: {
    index: {
      description: 'The index of the page to return. The index of the first page is 0.',
      type: 'integer',
      min: 0,
      max: 1_000_000,
      default: 0,
    },

    size: {
      description: 'How many results we need to return per a single page.',
      type: 'integer',
      min: 1,
      max: 1_000_000,
      default: 10,
    },
  },
  required: [
    'index',
    'size',
  ],
  additionalProperties: false,
} as const


export default pageSchema
