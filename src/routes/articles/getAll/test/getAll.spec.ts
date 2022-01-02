import fastifyModule from 'fastify'
import 'fastify-swagger' // Importing Swagger here so we have the correct types installed
import { expect } from 'chai'

/* Import types for 'fastify.mainDB' */
import '@src/database/mainDB/models'
import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'

import { mockArticles } from '@src/test/mocks/articles'

import { addRoute } from '../index'


describe('Route: GET /api/articles', () => {
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
          articleModel: {
            paginate: () => ({
              totalDocs: mockArticles.length,
              docs: mockArticles,
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/articles',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(mockArticles.length)
    expect(body.records).to.deep.equal(mockArticles)
  })


  it('Verify response when objects are not found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          articleModel: {
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
      url: '/api/articles',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body.totalRecords).to.deep.equal(0)
    expect(body.records).to.deep.equal([])
  })
})
