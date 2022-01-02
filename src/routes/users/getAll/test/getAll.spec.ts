import fastifyModule from 'fastify'
import 'fastify-swagger' // Importing Swagger here so we have the correct types installed
import { expect } from 'chai'

/* Import types for 'fastify.mainDB' */
import '@src/database/mainDB/models'
import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'

import { mockUsers } from '@src/test/mocks/users'

import { addRoute } from '../index'


describe('Route: GET /api/users', () => {
  let fastify

  beforeEach(() => {
    fastify = fastifyModule()
    preValidationSelectorHook(fastify)
  })

  afterEach(() => {
    fastify.close()
  })


  it('Verify response when objects are found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          userModel: {
            paginate: () => ({
              totalDocs: mockUsers.length,
              docs: mockUsers,
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(mockUsers.length)
    expect(body.records).to.deep.equal(mockUsers)
  })


  it('Verify response when objects are not found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          userModel: {
            paginate: () => ({
              totalDocs: 0,
              docs: [],
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(0)
    expect(body.records).to.deep.equal([])
  })
})
