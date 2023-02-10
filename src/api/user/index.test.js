import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { User } from '.'

const app = () => express(apiRoot, routes)

let user

beforeEach(async () => {
  user = await User.create({})
})

test('POST /user 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', birthDate: 'test', cpf: 'test', cell: 'test', email: 'test', password: 'test', familyId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.birthDate).toEqual('test')
  expect(body.cpf).toEqual('test')
  expect(body.cell).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.familyId).toEqual('test')
})

test('GET /user 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /user/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${user.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user.id)
})

test('GET /user/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /user/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${user.id}`)
    .send({ name: 'test', birthDate: 'test', cpf: 'test', cell: 'test', email: 'test', password: 'test', familyId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user.id)
  expect(body.name).toEqual('test')
  expect(body.birthDate).toEqual('test')
  expect(body.cpf).toEqual('test')
  expect(body.cell).toEqual('test')
  expect(body.email).toEqual('test')
  expect(body.password).toEqual('test')
  expect(body.familyId).toEqual('test')
})

test('PUT /user/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', birthDate: 'test', cpf: 'test', cell: 'test', email: 'test', password: 'test', familyId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /user/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${user.id}`)
  expect(status).toBe(204)
})

test('DELETE /user/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
