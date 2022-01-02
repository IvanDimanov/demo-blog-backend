import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { createMongooseSchema } from 'convert-json-schema-to-mongoose'
import { FromSchema } from 'json-schema-to-ts'

import {
  blogBaseSchema,
  articleBaseSchema,
} from './schemas'

export const blogSchema = {
  ...blogBaseSchema,
  properties: {
    ...blogBaseSchema.properties,

    articles: {
      type: 'array',
      items: {
        ...articleBaseSchema,
        description: 'Array of articles related to the Blog',
      },
    },
  },
} as const


export const swaggerDefinitionSchema = blogSchema

export type Blog = FromSchema<typeof blogSchema>


const compiledSchema = createMongooseSchema({}, blogSchema)
delete compiledSchema.articles

const mongooseSchema = new Schema(compiledSchema, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

mongooseSchema.virtual('articles', {
  ref: 'article',
  localField: '_id',
  foreignField: 'blogId',
})

mongooseSchema.plugin(mongoosePaginate)

export default model<Blog>('blog', mongooseSchema)
