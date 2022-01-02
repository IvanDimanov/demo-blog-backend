/**
 * All base schemas are created in a single file
 * in order to resolve circular dependencies between schemas.
 * Base schemas describe properties in MongoDB.
 * We add relations (based on foreign `id`) when we create the Mongoose models.
 */

export const userBaseSchema = {
  title: 'User',
  type: 'object',
  properties: {
    _id: {},

    firstName: {
      type: 'string',
    },

    lastName: {
      type: 'string',
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    '_id',
    'firstName',
    'lastName',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
} as const


export const blogBaseSchema = {
  title: 'Blog',
  type: 'object',
  properties: {
    _id: {},

    url: {
      type: 'string',
      format: 'uri',
    },

    title: {
      type: 'string',
    },

    description: {
      type: 'string',
    },

    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
    },

    owner: {
      ...userBaseSchema,
      description: 'User responsible for the Blog',
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    '_id',
    'url',
    'title',
    'description',
    'rating',
    'owner',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
} as const


export const articleBaseSchema = {
  title: 'Article',
  type: 'object',
  properties: {
    _id: {},

    blogId: {
      type: 'string',
      ref: 'blog',
    },

    path: {
      type: 'string',
    },

    title: {
      type: 'string',
    },

    text: {
      type: 'string',
    },

    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
    },

    author: {
      ...userBaseSchema,
      description: 'User who created the Article',
    },

    reviewers: {
      type: 'array',
      items: {
        ...userBaseSchema,
        description: 'Array of Users who approved the Article',
      },
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    '_id',
    'blogId',
    'path',
    'title',
    'text',
    'rating',
    'author',
    'reviewers',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
} as const


export const commentBaseSchema = {
  title: 'Comment',
  type: 'object',
  properties: {
    _id: {},

    articleId: {
      type: 'string',
    },

    title: {
      type: 'string',
    },

    text: {
      type: 'string',
    },

    rating: {
      type: 'number',
      minimum: 0,
      maximum: 5,
    },

    author: {
      ...userBaseSchema,
      description: 'User who created the Comment',
    },

    createdAt: {
      type: 'string',
      format: 'date-time',
    },

    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    '_id',
    'articleId',
    'title',
    'text',
    'rating',
    'author',
    'createdAt',
    'updatedAt',
  ],
  additionalProperties: false,
} as const
