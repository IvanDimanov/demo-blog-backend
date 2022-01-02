import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 500
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'INTERNAL_SERVER_ERROR'] Standard key used to describe the specific error
 * @param {String} [message = 'Internal Server Error'] User-friendly error message
 * @return {FastifyReply}
 */
const internalServerErrorReply = (
  reply: FastifyReply,
  code = 'INTERNAL_SERVER_ERROR',
  message = 'Internal Server Error',
): FastifyReply => reply
  .code(500)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default internalServerErrorReply
