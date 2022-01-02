const badRequestErrorSchema = {
  description: 'Response object with common 400 HTTP error "Bad Request"',
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
      example: 'BAD_REQUEST',
    },

    message: {
      description: 'User-friendly error message',
      type: 'string',
      example: 'Bad Request',
    },
  },
  required: [
    'id',
    'code',
    'message',
  ],
} as const


export default badRequestErrorSchema
