import { success, notFound } from '../../services/response'
import { Products } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Products.create(body)
    .then((products) => products.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Products.find(query, select, cursor)
    .then((products) => products.map((products) => products.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then((products) => products ? products.view() : null)
    .then(success(res))
    .catch(next)

export const findByFamilyId = ({ params }, res, next) =>
  Products.find({ familyId: params.familyId })
    .then(notFound(res))
    .then((products) => products.map((products) => products.view()))
    .then(success(res))
    .catch(next)

export const findByProductName = ({ bodymen: { body }, params }, res, next) =>
  // eslint-disable-next-line no-undef
  Products.find({ name: { $regex: body.name, $options: '-i' }, familyId: params.familyId })
    .then(notFound(res))
    .then((products) => products.map((products) => products.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then((products) => products ? Object.assign(products, body).save() : null)
    .then((products) => products ? products.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Products.findById(params.id)
    .then(notFound(res))
    .then((products) => products ? products.remove() : null)
    .then(success(res, 204))
    .catch(next)
