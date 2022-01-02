import { PaginateOptions } from 'mongoose'
import { FromSchema } from 'json-schema-to-ts'

import whereRulesSchema from '@src/utils/jsonSchemas/whereRulesSchema'
import orderBySchema from '@src/utils/jsonSchemas/orderBySchema'
import pageSchema from '@src/utils/jsonSchemas/pageSchema'

const querystringSchema = {
  type: 'object',
  properties: {
    whereRules: whereRulesSchema,
    orderBy: orderBySchema,
    page: pageSchema,
  },
  additionalProperties: false,
} as const

type Query = FromSchema<typeof querystringSchema>

const stringOperationToMongoOperation = {
  '=': '$eq',
  '!=': '$ne',
  '>': '$gt',
  '<': '$lt',
  '>=': '$gte',
  '<=': '$lte',
}

/**
 * This function will convert common querystring
 * to usable search / sort / paginate MongoDB params.
 *
 * Example:
 *   const blogs = await blogModel
 *     .paginate(...getMongoosePaginateQuery(query))
 *
 * @param {Query} query API request querystring params
 * @return {[Record<string, unknown>, PaginateOptions]} Arguments ready to use in `.paginate(...)`
 */
const getMongoosePaginateQuery = (
  query: Query,
): [Record<string, unknown>, PaginateOptions] => {
  const queryWhereClauses = {}

  query.whereRules?.where?.forEach(({ column, operation, value }) => {
    const mongoOperation = stringOperationToMongoOperation[operation]
    queryWhereClauses[column] ||= {}

    if (mongoOperation) {
      queryWhereClauses[column][mongoOperation] = value
    }
  })

  query.whereRules?.whereIn?.forEach(({ column, value }) => {
    queryWhereClauses[column] ||= {}
    queryWhereClauses[column].$in = value
  })

  query.whereRules?.whereNotIn?.forEach(({ column, value }) => {
    queryWhereClauses[column] ||= {}
    queryWhereClauses[column].$nin = value
  })


  const sort = query.orderBy?.reduce((map, { column, order }) => ({
    [column]: order,
    ...map,
  }), {})


  return [
    queryWhereClauses,
    {
      sort,
      page: (query.page?.index || 0) + 1,
      limit: query.page?.size || 10,
    },
  ]
}


export default getMongoosePaginateQuery
