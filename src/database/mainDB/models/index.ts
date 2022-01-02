import { PaginateModel, Mongoose } from 'mongoose'

import userModel, { User } from './userModel'
import blogModel, { Blog } from './blogModel'
import articleModel, { Article } from './articleModel'
import commentModel, { Comment } from './commentModel'

type Models = {
  userModel: PaginateModel<User>
  blogModel: PaginateModel<Blog>
  articleModel: PaginateModel<Article>
  commentModel: PaginateModel<Comment>
}

export const models: Models = {
  userModel,
  blogModel,
  articleModel,
  commentModel,
}

declare module 'fastify' {
  export interface FastifyInstance {
    mainDB: {
      client: Mongoose
      models: Models
    }
  }
}
