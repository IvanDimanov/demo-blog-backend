import fastifyModule from 'fastify'
import 'fastify-swagger' // Importing Swagger here so we have the correct types installed
import { expect } from 'chai'

/* Import types for 'fastify.mainDB' */
import '@src/database/mainDB/models'
import preValidationSelectorHook from '@src/hooks/preValidationSelectorHook'

import { addRoute } from '../index'


describe('Route: GET /api/status/health', () => {
  let fastify

  beforeEach(() => {
    fastify = fastifyModule()
    preValidationSelectorHook(fastify)
  })

  afterEach(() => {
    fastify.close()
  })


  it('Verify response types', async () => {
    const localTime = '2021-11-01T16:23:25.453Z'
    fastify = addRoute({
      ...fastify,
      mainDB: {
        client: {
          connection: {
            db: {
              admin: () => ({
                serverStatus: () => ({
                  localTime,
                  ok: 1,
                }),
              }),
            },
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/status/health',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)
    expect(body).to.be.an('object')
    expect(body.serverTime).to.be.a('string')
    expect(body.isDbConnected).to.be.a('boolean')
    expect(body.dbTime).to.be.a('string')
  })


  it('Verify response values when DB is connected', async () => {
    const localTime = '2021-11-01T16:23:25.453Z'
    fastify = addRoute({
      ...fastify,
      mainDB: {
        client: {
          connection: {
            db: {
              admin: () => ({
                serverStatus: () => ({
                  localTime,
                  ok: 1,
                }),
              }),
            },
          },
        },
      },
    })

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/status/health',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)

    /* Make sure data is in range */
    const dateDiff = Date.now() - new Date(body.serverTime).getTime()
    expect( dateDiff ).to.be.lessThan(500)

    expect(body.isDbConnected).to.be.true
    expect(body.dbTime).to.equal(localTime)
  })


  it('Verify response values when DB is not connected', async () => {
    fastify = addRoute(fastify)

    const response = await fastify.inject({
      method: 'GET',
      url: '/api/status/health',
    })

    const body = response.json()

    expect(response.statusCode).to.equal(200)

    /* Make sure data is in range */
    const dateDiff = Date.now() - new Date(body.serverTime).getTime()
    expect( dateDiff ).to.be.lessThan(500)

    expect(body.isDbConnected).to.be.false
    expect(body.dbTime).to.be.empty
  })
})
