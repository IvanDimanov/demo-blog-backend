import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyEnv from 'fastify-env'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'

const ajv = new Ajv({
  strict: false,
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: true,
  allErrors: true,
})
addFormats(ajv)

export const envVarSchema = {
  type: 'object',
  properties: {
    PORT: {
      type: 'integer',
      minimum: 1,
      maximum: 1_000_000,
    },

    HOST: {
      type: 'string',
      oneOf: [
        { format: 'ipv4' },
        { format: 'ipv6' },
      ],
    },

    MONGODB_URI: {
      type: 'string',
      format: 'uri',
    },

    ENABLE_CORS: {
      type: 'boolean',
      default: false,
    },

    ENABLE_SWAGGER: {
      type: 'boolean',
      default: false,
    },

    SWAGGER_HOST: {
      type: 'string',
      default: 'localhost',
    },

    SWAGGER_DEFAULT_SCHEME: {
      type: 'string',
      enum: ['HTTP', 'HTTPS'],
      default: 'HTTP',
    },
  },
  required: ['PORT', 'MONGODB_URI'],
} as const

export const envConfigKey = 'env'


const plugin = fastifyPlugin(async (
  fastify: FastifyInstance,
  options,
  done: () => void,
) => {
  // @ts-ignore
  await fastify.setValidatorCompiler(({ schema }) => ajv.compile(schema))

  await fastify.register(
    fastifyEnv,
    {
      dotenv: true,
      schema: envVarSchema,
      confKey: envConfigKey,
    },
  )

  done()
})


export default plugin
