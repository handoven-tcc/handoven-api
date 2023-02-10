import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Family } from '.'

const app = () => express(apiRoot, routes)

let family

beforeEach(async () => {
  family = await Family.create({})
})

test('POST /family 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
})

test('GET /family 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /family/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${family.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(family.id)
})

test('GET /family/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /family/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${family.id}`)
    .send({ name: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(family.id)
  expect(body.name).toEqual('test')
})

test('PUT /family/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test' })
  expect(status).toBe(404)
})

test('DELETE /family/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${family.id}`)
  expect(status).toBe(204)
})

test('DELETE /family/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
