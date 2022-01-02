import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { createMongooseSchema } from 'convert-json-schema-to-mongoose'
import { FromSchema } from 'json-schema-to-ts'

import {
  commentBaseSchema,
  articleBaseSchema,
} from './schemas'

export const commentSchema = {
  ...commentBaseSchema,
  properties: {
    ...commentBaseSchema.properties,

    article: articleBaseSchema,
  },
} as const


export const swaggerDefinitionSchema = commentSchema

export type Comment = FromSchema<typeof commentSchema>


const compiledSchema = createMongooseSchema({}, commentSchema)
delete compiledSchema.article

const mongooseSchema = new Schema(compiledSchema, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

mongooseSchema.virtual('article', {
  ref: 'article',
  localField: 'articleId',
  foreignField: '_id',
  justOne: true,
})

mongooseSchema.plugin(mongoosePaginate)

export default model<Comment>('comment', mongooseSchema)
