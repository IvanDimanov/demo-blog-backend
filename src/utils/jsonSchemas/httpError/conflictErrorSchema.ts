const conflictErrorSchema = {
  description: 'Response object with common 409 HTTP error "Conflict"',
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
      example: 'CONFLICT',
    },

    message: {
      description: 'User-friendly error message',
      type: 'string',
      example: 'Conflict',
    },
  },
  required: [
    'id',
    'code',
    'message',
  ],
} as const


export default conflictErrorSchema
