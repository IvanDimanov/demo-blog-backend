import { FastifyInstance } from 'fastify'

import badRequestReply from '@src/utils/httpReply/badRequestReply'
import internalServerErrorReply from '@src/utils/httpReply/internalServerErrorReply'

const setErrorHandler = (fastify: FastifyInstance): void => {
  fastify.setErrorHandler(async (error, request, reply) => {
    /**
     * Handles general validation errors
     */
    if (Array.isArray(error.validation)) {
      badRequestReply(reply, 'VALIDATION_ERROR', error.message)
      return
    }

    /**
     * Handles errors produces by `await mongooseModel.find().populate(query.include)`
     * where `query.include` has keys that are not valid properties in `mongooseModel`.
     */
    if (error.message.startsWith('Cannot populate path')) {
      badRequestReply(reply, 'VALIDATION_ERROR', error.message.split('.')[0])
      return
    }

    const errorLog = {
      request: {
        id: request.id,
        method: request.method,
        url: request.url,
        query: request.query,
      },
      msg: error.message,
    }

    fastify.log.error(errorLog)

    /* Useful for debugging local */
    console.error(errorLog)
    console.error(errorLog.request.query)

    internalServerErrorReply(reply)
  })
}


export default setErrorHandler
