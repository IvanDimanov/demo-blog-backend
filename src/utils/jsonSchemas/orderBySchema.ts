const orderBySchema = {
  title: 'Order by',
  description: 'We may want to order the list of results by a specific column.\n' +
               'This prop is an array of all requested orders.',
  type: 'array',
  example: [{ column: 'createdAt', order: 'desc' }],
  items: {
    description: 'Single results order request',
    type: 'object',
    properties: {
      column: {
        description: 'DB column name we want to sort order to',
        type: 'string',
        default: 'createdAt',
        example: 'createdAt',
      },

      order: {
        description: 'Sorting order direction',
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'desc',
        example: 'desc',
      },
    },
    required: ['column', 'order'],
    additionalProperties: false,
  },
} as const


export default orderBySchema
