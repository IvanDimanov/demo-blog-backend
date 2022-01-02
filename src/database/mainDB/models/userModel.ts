import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { createMongooseSchema } from 'convert-json-schema-to-mongoose'
import { FromSchema } from 'json-schema-to-ts'

import {
  userBaseSchema,
  blogBaseSchema,
  commentBaseSchema,
  articleBaseSchema,
} from './schemas'

export const userSchema = {
  ...userBaseSchema,
    properties: {
      ...userBaseSchema.properties,

      blogs: {
        type: 'array',
        items: {
          ...blogBaseSchema,
          description: 'Array of Blogs owned by the User',
        },
      },

      comments: {
        type: 'array',
        items: {
          ...commentBaseSchema,
          description: 'Array of Comments written by the User',
        },
      },

      authoredArticles: {
        type: 'array',
        items: {
          ...articleBaseSchema,
          description: 'Array of Articles written by the User',
        },
      },

      reviewedArticles: {
        type: 'array',
        items: {
          ...articleBaseSchema,
          description: 'Array of Articles reviewed by the User',
        },
      },
    },
  } as const

export const swaggerDefinitionSchema = userSchema

export type User = FromSchema<typeof userSchema>


const compiledSchema = createMongooseSchema({}, userSchema)
delete compiledSchema.blogs
delete compiledSchema.comments
delete compiledSchema.authoredArticles
delete compiledSchema.reviewedArticles

const mongooseSchema = new Schema(compiledSchema, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

mongooseSchema.virtual('blogs', {
  ref: 'blog',
  localField: '_id',
  foreignField: 'owner._id',
})

mongooseSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'author._id',
})

mongooseSchema.virtual('authoredArticles', {
  ref: 'article',
  localField: '_id',
  foreignField: 'author._id',
})

mongooseSchema.virtual('reviewedArticles', {
  ref: 'article',
  localField: '_id',
  foreignField: 'reviewers._id',
})

mongooseSchema.plugin(mongoosePaginate)

export default model<User>('user', mongooseSchema)
