import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { createMongooseSchema } from 'convert-json-schema-to-mongoose'
import { FromSchema } from 'json-schema-to-ts'

import {
  articleBaseSchema,
  blogBaseSchema,
  commentBaseSchema,
} from './schemas'

export const articleSchema = {
  ...articleBaseSchema,
  properties: {
    ...articleBaseSchema.properties,

    blog: blogBaseSchema,

    comments: {
      type: 'array',
      items: {
        ...commentBaseSchema,
        description: 'Array of Comments related to the Article',
      },
    },
  },
} as const


export const swaggerDefinitionSchema = articleSchema

export type Article = FromSchema<typeof articleSchema>


const compiledSchema = createMongooseSchema({}, articleSchema)
delete compiledSchema.blog
delete compiledSchema.comments

const mongooseSchema = new Schema(compiledSchema, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

mongooseSchema.virtual('blog', {
  ref: 'blog',
  localField: 'blogId',
  foreignField: '_id',
  justOne: true,
})

mongooseSchema.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'articleId',
})

mongooseSchema.plugin(mongoosePaginate)

export default model<Article>('article', mongooseSchema)
