import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Products } from '.'

const app = () => express(apiRoot, routes)

let products

beforeEach(async () => {
  products = await Products.create({
    id: '632462ecc69bdde2a58265fd',
    name: 'Molho de Tomate',
    type: 'notRefrigerated',
    validity: '2022-10-29T00:00:00.000Z',
    category: 'Canned',
    cost: 3.95,
    amount: 3
  })
})

test('POST /products 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}/`)
    .send({
      name: 'Molho de Tomate',
      type: 'notRefrigerated',
      validity: '2022-10-29T00:00:00.000Z',
      category: 'Canned',
      cost: 3.95,
      amount: 3
    })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('Molho de Tomate')
  expect(body.type).toEqual('notRefrigerated')
  expect(body.validity).toEqual('2022-10-29T00:00:00.000Z')
  expect(body.category).toEqual('Canned')
  expect(body.cost).toEqual('3.95')
  expect(body.amount).toEqual(3)
})

test('GET /products 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/products`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /products/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${products.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual('632462ecc69bdde2a58265fd')
})

test('GET /products/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/632462ecc69bdde2a58265fd')
  expect(status).toBe(404)
})

test('PUT /products/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${products.id}`)
    .send({
      name: 'Molho de Tomate',
      type: 'notRefrigerated',
      validity: '2022-10-29T00:00:00.000Z',
      category: 'Canned',
      cost: '3.95',
      amount: 3
    })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('Molho de Tomate')
  expect(body.type).toEqual('notRefrigerated')
  expect(body.validity).toEqual('2022-10-29T00:00:00.000Z')
  expect(body.category).toEqual('Canned')
  expect(body.cost).toEqual('3.95')
  expect(body.amount).toEqual(3)
})

test('PUT /products/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/632462ecc69bdde2a58265fd')
    .send({ name: 'Molho de Tomate', type: 'notRefrigerated', validity: '2022-10-29T00:00:00.000Z', category: 'Canned', cost: '3.95', amount: 3 })
  expect(status).toBe(404)
})

test('DELETE /products/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/products/${products.id}`)
  expect(status).toBe(204)
})

test('DELETE /products/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/aa')
  expect(status).toBe(404)
})
