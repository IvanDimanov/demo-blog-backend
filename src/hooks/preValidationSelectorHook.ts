import { FastifyInstance } from 'fastify'
import JSON5 from 'json5'

type SelectorQuery = {
  whereRules?: string
  orderBy?: string
  page?: string
  include?: string | string[]
}


const preValidationSelectorHook = (fastify: FastifyInstance): void => {
  fastify.addHook('preValidation', async (request) => {
    const {
      whereRules = `{}`,
      orderBy = `[{ column: 'createdAt', order: 'desc' }]`,
      page = `{ index: 0, size: 10 }`,
      include = '',
    } = request.query as SelectorQuery


    if (typeof whereRules == 'string') {
      try {
        (request.query as SelectorQuery).whereRules = JSON5.parse(whereRules)
      } catch (error) {
        /* Parsing error, it'll be caught by API validation */
      }
    }

    if (typeof orderBy == 'string') {
      try {
        (request.query as SelectorQuery).orderBy = JSON5.parse(orderBy)
      } catch (error) {
        /* Parsing error, it'll be caught by API validation */
      }
    }

    if (typeof page == 'string') {
      try {
        (request.query as SelectorQuery).page = JSON5.parse(page)
      } catch (error) {
        /* Parsing error, it'll be caught by API validation */
      }
    }

    if (typeof include == 'string') {
      try {
        (request.query as SelectorQuery).include = include
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      } catch (error) {
        /* Parsing error, it'll be caught by API validation */
      }
    }
  })
}


export default preValidationSelectorHook
