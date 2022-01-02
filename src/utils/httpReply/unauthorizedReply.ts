import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 401
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'UNAUTHORIZED'] Standard key used to describe the specific error
 * @param {String} [message = 'Unauthorized'] User-friendly error message
 * @return {FastifyReply}
 */
const unauthorizedReply = (
  reply: FastifyReply,
  code = 'UNAUTHORIZED',
  message = 'Unauthorized',
): FastifyReply => reply
  .code(401)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default unauthorizedReply
