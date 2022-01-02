import { RouteShorthandOptions } from 'fastify'

import { articleSchema } from '@src/database/mainDB/models/articleModel'

import whereRulesSchema from '@src/utils/jsonSchemas/whereRulesSchema'
import orderBySchema from '@src/utils/jsonSchemas/orderBySchema'
import pageSchema from '@src/utils/jsonSchemas/pageSchema'

import badRequestErrorSchema from '@src/utils/jsonSchemas/httpError/badRequestErrorSchema'


export const querystringSchema = {
  type: 'object',
  properties: {
    whereRules: whereRulesSchema,
    orderBy: orderBySchema,
    page: pageSchema,
  },

  required: ['whereRules', 'page'],
  additionalProperties: false,
} as const


export const successResponseSchema = {
  title: 'Articles success response',
  description: 'Array of Article objects with applied pagination, sorting, filtration',
  type: 'object',
  properties: {
    totalRecords: {
      description: 'How many records match the filtration criteria. Used to determine total number of pages.',
      type: 'integer',
      min: 0,
      max: 1_000_000,
      example: 731,
    },

    records: {
      description: 'Array of Article objects',
      type: 'array',
      items: articleSchema,
    },
  },

  required: ['totalRecords', 'records'],
  additionalProperties: false,
} as const


export const routeOptions: RouteShorthandOptions = {
  schema: {
    summary: 'Get All Articles',
    description: 'Return multiple Articles by using pagination, sorting, filtration',
    tags: ['Article'],

    querystring: querystringSchema,

    response: {
      200: successResponseSchema,
      400: badRequestErrorSchema,
    },
  },
}

