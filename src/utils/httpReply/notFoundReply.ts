import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 404
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'NOT_FOUND'] Standard key used to describe the specific error
 * @param {String} [message = 'Not found'] User-friendly error message
 * @return {FastifyReply}
 */
const notFoundReply = (
  reply: FastifyReply,
  code = 'NOT_FOUND',
  message = 'Not found',
): FastifyReply => reply
  .code(404)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default notFoundReply
