import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import JSON5 from 'json5'

type ParseError = Error & {
  statusCode?: 400
}

const plugin = fastifyPlugin(async (
  fastify: FastifyInstance,
  options,
  done: () => void,
) => {
  fastify.addContentTypeParser('application/json5', { parseAs: 'string' }, (request, body, done) => {
    try {
      const json = JSON5.parse(String(body))
      done(null, json)
    } catch (error) {
      const parseError: ParseError = error as Error
      parseError.statusCode = 400
      done(parseError, undefined)
    }
  })

  done()
})


export default plugin
