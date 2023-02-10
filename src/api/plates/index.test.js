import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Plates } from '.'

const app = () => express(apiRoot, routes)

let plates

beforeEach(async () => {
  plates = await Plates.create({})
})

test('POST /plates 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', category: 'test', ingredients: 'test', available: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.ingredients).toEqual('test')
  expect(body.available).toEqual('test')
})

test('GET /plates 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /plates/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${plates.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(plates.id)
})

test('GET /plates/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /plates/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${plates.id}`)
    .send({ name: 'test', category: 'test', ingredients: 'test', available: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(plates.id)
  expect(body.name).toEqual('test')
  expect(body.category).toEqual('test')
  expect(body.ingredients).toEqual('test')
  expect(body.available).toEqual('test')
})

test('PUT /plates/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', category: 'test', ingredients: 'test', available: 'test' })
  expect(status).toBe(404)
})

test('DELETE /plates/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${plates.id}`)
  expect(status).toBe(204)
})

test('DELETE /plates/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
