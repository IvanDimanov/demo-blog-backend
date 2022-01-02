const forbiddenErrorSchema = {
  description: 'Response object with common 403 HTTP error "Forbidden"',
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
      example: 'FORBIDDEN',
    },

    message: {
      description: 'User-friendly error message',
      type: 'string',
      example: 'Forbidden',
    },
  },
  required: [
    'id',
    'code',
    'message',
  ],
} as const


export default forbiddenErrorSchema
