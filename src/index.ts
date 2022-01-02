import fastifyModule, { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import mongoose from 'mongoose'

/**
 * Just to make sure that Mongoose can use collection 'user'
 * and not create a new collection 'users':
 * https://mongoosejs.com/docs/api.html#mongoose_Mongoose-pluralize
 * https://github.com/Automattic/mongoose/issues/5947
 */
mongoose.pluralize(null)

/**
 * Setting `strict` to 'throw' will cause errors to be produced
 * when setting a document
 * instead of dropping the document bad data.
 * Please know that unknown additional data will trigger a validation error.
 * https://mongoosejs.com/docs/guide.html#strict
 */
mongoose.set('strict', 'throw')

import pluginFastifyEnv, { envVarSchema, envConfigKey } from '@src/plugins/fastifyEnv'
import pluginFastifyHelmet from '@src/plugins/fastifyHelmet'
import pluginFastifyCors from '@src/plugins/fastifyCors'
import pluginJson5 from '@src/plugins/json5'
import pluginFastifySwagger from '@src/plugins/fastifySwagger'
import pluginMongoose from '@src/plugins/mongoose'

import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'
import setErrorHandler from '@src/hooks/setErrorHandler'

import addAllRoutes from '@src/utils/addAllRoutes'

const start = async () => {
  try {
    const fastify: FastifyInstance = fastifyModule({
      logger: true,
    })

    await fastify.register(pluginFastifyEnv)
    await fastify.register(pluginFastifyHelmet)
    await fastify.register(pluginFastifyCors)
    await fastify.register(pluginJson5)
    await fastify.register(pluginFastifySwagger)
    await fastify.register(pluginMongoose)

    preValidationSelectorHook(fastify)
    setErrorHandler(fastify)

    addAllRoutes(fastify)

    const { PORT, HOST } = (fastify as unknown as { [envConfigKey]: FromSchema<typeof envVarSchema> })[envConfigKey]
    await fastify.listen(PORT, HOST)
  } catch (error) {
    process.stderr.write((error as Error).stack || '')
    process.exit(1)
  }
}

start()
