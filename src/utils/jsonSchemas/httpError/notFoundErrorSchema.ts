const notFoundErrorSchema = {
  description: 'Response object with common 404 HTTP error "Not found"',
  type: 'object',
  properties: {
    id: {
      description: 'Error UUIDv4',
      type: 'string',
      format: 'uuid',
      pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    },

    code: {
      description: 'Standard key used to describe the specific error',
      type: 'string',
      example: 'NOT_FOUND',
    },

    message: {
      description: 'User-friendly error message',
      type: 'string',
      example: 'Not found',
    },
  },
  required: [
    'id',
    'code',
    'message',
  ],
} as const


export default notFoundErrorSchema
