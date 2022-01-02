import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

import { successResponseSchema, routeOptions } from './types'

export const addRoute = (fastify: FastifyInstance): FastifyInstance => fastify
.get(
  '/api/status/health',
  routeOptions,
  async (): Promise<FromSchema<typeof successResponseSchema>> => {
    let isDbConnected = false
    let dbTime = ''

    try {
      const serverStatus = await fastify.mainDB.client.connection.db.admin().serverStatus()
      dbTime = serverStatus.localTime
      isDbConnected = serverStatus.ok === 1
    } catch (error) {
      fastify.log.error(`Unable to ping DB: ${(error as Error).stack}`)
    }

    return {
      serverTime: new Date().toISOString(),
      isDbConnected,
      dbTime,
    }
  }
)
