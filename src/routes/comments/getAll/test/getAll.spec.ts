import fastifyModule from 'fastify'
import 'fastify-swagger' // Importing Swagger here so we have the correct types installed
import { expect } from 'chai'

/* Import types for 'fastify.mainDB' */
import '@src/database/mainDB/models'
import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'

import { mockComments } from '@src/test/mocks/comments'

import { addRoute } from '../index'


describe('Route: GET /api/comments', () => {
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
          commentModel: {
            paginate: () => ({
              totalDocs: mockComments.length,
              docs: mockComments,
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/comments',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(mockComments.length)
    expect(body.records).to.deep.equal(mockComments)
  })


  it('Verify response when objects are not found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          commentModel: {
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
      url: '/api/comments',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(0)
    expect(body.records).to.deep.equal([])
  })
})
