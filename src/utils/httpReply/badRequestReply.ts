import { FastifyReply } from 'fastify'
import { v4 as uuidv4 } from 'uuid'

/**
 * Shorthand error reply for HTTP status code 400
 *
 * @param {FastifyReply} reply We'll enhance the `reply` with our standard error format
 * @param {String} [code = 'BAD_REQUEST'] Standard key used to describe the specific error
 * @param {String} [message = 'Bad Request'] User-friendly error message
 * @return {FastifyReply}
 */
const badRequestReply = (
  reply: FastifyReply,
  code = 'BAD_REQUEST',
  message = 'Bad Request',
): FastifyReply => reply
  .code(400)
  .type('application/json')
  .send({
    id: uuidv4(),
    code,
    message,
  })

export default badRequestReply
