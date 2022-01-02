import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import mongoose from 'mongoose'
import { FromSchema } from 'json-schema-to-ts'

import { envVarSchema, envConfigKey } from '@src/plugins/fastifyEnv'
import { models } from '@src/database/mainDB/models'

type MyPluginOptions = {
  uri: string
}

const ConnectDB: FastifyPluginAsync<MyPluginOptions> = async (
  fastify: FastifyInstance,
) => {
  mongoose.connection.on('connected', () => {
    fastify.log.info({ actor: 'MongoDB' }, 'connected')
  })

  mongoose.connection.on('disconnected', () => {
    fastify.log.error({ actor: 'MongoDB' }, 'disconnected')
  })

  const {
    MONGODB_URI,
  } = (fastify as unknown as { [envConfigKey]: FromSchema<typeof envVarSchema> })[envConfigKey]

  const client = await mongoose.connect(MONGODB_URI)

  fastify.decorate('mainDB', {
    client,
    models,
  } as FastifyInstance['mainDB'])
}

export default fp(ConnectDB)
