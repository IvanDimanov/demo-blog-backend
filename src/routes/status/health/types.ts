import { RouteShorthandOptions } from 'fastify'

export const successResponseSchema = {
  type: 'object',
  properties: {
    serverTime: {
      description: 'Server ISO time',
      type: 'string',
      format: 'date-time',
      example: '2019-09-24T17:43:21.142Z',
    },

    isDbConnected: {
      description: 'Can server access the DB',
      type: 'boolean',
      example: true,
    },

    dbTime: {
      description: 'Database ISO time',
      type: 'string',
      format: 'date-time',
      example: '2019-09-24T17:43:21.142Z',
    },
  },
  required: [
    'serverTime',
    'isDbConnected',
    'dbTime',
  ],
  additionalProperties: false,
} as const


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Health check',
    description: 'Common ping test to check if server is still alive and connected to DB.',
    tags: ['Status'],

    response: {
      200: successResponseSchema,
    },
  },
}
