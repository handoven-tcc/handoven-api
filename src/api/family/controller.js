import { success, notFound } from '../../services/response/'
import { Family } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Family.create(body)
    .then((family) => family.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Family.find(query, select, cursor)
    .then((families) => families.map((family) => family.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => family ? family.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => family ? Object.assign(family, body).save() : null)
    .then((family) => family ? family.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => family ? family.remove() : null)
    .then(success(res, 204))
    .catch(next)
