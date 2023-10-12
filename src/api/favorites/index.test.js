import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Favorites } from '.'

const app = () => express(apiRoot, routes)

let favorites

beforeEach(async () => {
  favorites = await Favorites.create({})
})

test('POST /favorites 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ plateId: '111111111111111111111111', familyId: '111111111111111111111111' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.plateId).toEqual('111111111111111111111111')
  expect(body.familyId).toEqual('111111111111111111111111')
})

test('GET /favorites 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /favorites/familyId/:familyId 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/familyId/${favorites.familyId}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.familyId).toEqual(favorites.familyId)
})

test('DELETE /favorites/familyId/:familyId/plateId/:plateId 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/familyId/${favorites.familyId}/plateId/${favorites.plateId}`)
  expect(status).toBe(204)
})

test('DELETE /favorites/familyId/:familyId/plateId/:plateId 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
