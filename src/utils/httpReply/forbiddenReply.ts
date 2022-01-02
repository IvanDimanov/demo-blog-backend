import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 403
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'FORBIDDEN'] Standard key used to describe the specific error
 * @param {String} [message = 'Forbidden'] User-friendly error message
 * @return {FastifyReply}
 */
const forbiddenReply = (
  reply: FastifyReply,
  code = 'FORBIDDEN',
  message = 'Forbidden',
): FastifyReply => reply
  .code(403)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default forbiddenReply
