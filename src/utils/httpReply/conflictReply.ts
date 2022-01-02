import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 409
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'CONFLICT'] Standard key used to describe the specific error
 * @param {String} [message = 'Conflict'] User-friendly error message
 * @return {FastifyReply}
 */
const conflictReply = (
  reply: FastifyReply,
  code = 'CONFLICT',
  message = 'Conflict',
): FastifyReply => reply
  .code(409)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default conflictReply
