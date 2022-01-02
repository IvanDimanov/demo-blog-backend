const internalServerErrorSchema = {
  description: 'Response object with common 500 HTTP error "Internal Server Error"',
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
      example: 'INTERNAL_SERVER_ERROR',
    },

    message: {
      description: 'User-friendly error message',
      type: 'string',
      example: 'Internal Server Error',
    },
  },
  required: [
    'id',
    'code',
    'message',
  ],
} as const


export default internalServerErrorSchema
