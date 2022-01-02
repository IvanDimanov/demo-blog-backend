import fs from 'fs'
import path from 'path'
import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifySwagger from 'fastify-swagger'

import { FromSchema } from 'json-schema-to-ts'
import { envVarSchema, envConfigKey } from '@src/plugins/fastifyEnv'


const dbModelsDefinitionSchemas = {}

const basePath = path.join(__dirname, '../database/mainDB/models')
fs.readdirSync(basePath, { withFileTypes: true }).forEach((itemPath) => {
  const { name } = itemPath
  /* Ignore test files and folders */
  if (name === 'test' || name.includes('.spec.') || name.includes('index.')) {
    return
  }

  const dbModelPath = path.join(basePath, name)
  if (!itemPath.isDirectory()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dbModel = require(dbModelPath)
    const swaggerDefinitionSchema = dbModel.swaggerDefinitionSchema

    if (swaggerDefinitionSchema) {
      dbModelsDefinitionSchemas[swaggerDefinitionSchema.title] = swaggerDefinitionSchema
    }
  }
})


const plugin = fastifyPlugin(async (
  fastify: FastifyInstance,
  options,
  done: () => void,
) => {
  const {
    ENABLE_SWAGGER,
    SWAGGER_HOST,
    SWAGGER_DEFAULT_SCHEME,
  } = (fastify as unknown as { [envConfigKey]: FromSchema<typeof envVarSchema> })[envConfigKey]

  if (ENABLE_SWAGGER) {
    const routePrefix = '/swagger'

    fastify.log.info(
      { actor: 'Swagger' },
      `Swagger documentation is available at: ${SWAGGER_DEFAULT_SCHEME}://${SWAGGER_HOST}${routePrefix}`,
    )

    await fastify.register(
      fastifySwagger,
      {
        exposeRoute: true,
        routePrefix,
        swagger: {
          info: {
            title: 'Demo Blog BackEnd',
            version: '3.0.0',
            description:
              'This Swagger Doc is meant to be used for testing fastify APIs using the predefined validation rules.<br />' +
              'The DB relation schema and migration data can be found [here](https://github.com/IvanDimanov/demo-blog-db-migrations)',
          },

          externalDocs: {
            url: 'https://github.com/IvanDimanov/demo-blog-backend',
            description: 'BackEnd repo can be found here',
          },

          host: SWAGGER_HOST,
          schemes: SWAGGER_DEFAULT_SCHEME === 'HTTP' ? ['HTTP', 'HTTPS'] : ['HTTPS', 'HTTP'],

          consumes: ['application/json5', 'application/json'],
          produces: ['application/json'],

          tags: [
            {
              name: 'Status',
              description: `APIs used to check server health, connection, and availability`,
            },
          ],

          definitions: dbModelsDefinitionSchemas,
        },
      },
    )
  }

  done()
})


export default plugin
