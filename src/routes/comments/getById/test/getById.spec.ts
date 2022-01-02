import fastifyModule from 'fastify'
import 'fastify-swagger' // Importing Swagger here so we have the correct types installed
import { expect } from 'chai'

/* Import types for 'fastify.mainDB' */
import '@src/database/mainDB/models'
import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'

import { mockComment } from '@src/test/mocks/comments'

import { addRoute } from '../index'


describe('Route: GET /api/comments/:id', () => {
  let fastify

  beforeEach(() => {
    fastify = fastifyModule()
    preValidationSelectorHook(fastify)
  })

  afterEach(() => {
    fastify.close()
  })


  it('Verify response when object is found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          commentModel: {
            findById: () => ({
              populate: () => mockComment,
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: `/api/comments/${mockComment._id}`,
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body).to.deep.equal(mockComment)
  })


  it('Verify response when object is not found in DB', async () => {
    fastify = addRoute({
      ...fastify,
      mainDB: {
        models: {
          commentModel: {
            findById: () => ({
              populate: () => null,
            }),
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: `/api/comments/${mockComment._id}`,
    })

    const body = response.json()

    expect(response.statusCode).to.equal(404)
    expect(body.id).to.be.a('string')
    expect(body.code).to.equal('COMMENT_NOT_FOUND')
    expect(body.message).to.be.a('string')
  })
})
