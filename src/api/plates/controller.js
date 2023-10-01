import { success, notFound } from '../../services/response/'
import { Plates } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Plates.create(body)
    .then((plates) => plates.view(true))
    .then(success(res, 201))
    .catch(next)

export const retrievePlatesWithName = ({ bodymen: { body } }, res, next) =>
  Plates.find({ nome: { $regex: body.nome, $options: '-i' } })
    .then(notFound(res))
    .then((plates) => plates.map((plates) => plates.view()))
    .then(success(res, 200))
    .catch(next)

export const indexLimit = ({ querymen: { query, select, cursor }, params }, res, next) =>
  Plates.find(query, select, cursor).limit(parseInt(params.limit))
    .then((plates) => plates.map((plates) => plates.view()))
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Plates.find(query, select, cursor)
    .then((plates) => plates.map((plates) => plates.view()))
    .then(success(res))
    .catch(next)

export const showById = ({ params }, res, next) =>
  // eslint-disable-next-line no-undef
  Plates.findOne({ _id: params.id }).limit(1)
    .then(notFound(res))
    .then((plates) => plates ? plates.view() : null)
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Plates.findById(params.id)
    .then(notFound(res))
    .then((plates) => plates ? plates.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Plates.findById(params.id)
    .then(notFound(res))
    .then((plates) => plates ? Object.assign(plates, body).save() : null)
    .then((plates) => plates ? plates.view() : null)
    .then(success(res))
    .catch(next)

export const setPlateFavorite = ({ bodymen: { body }, params }, res, next) =>
  Plates.updateOne({ _id: params.id }, { $set: { favorited: body.favorited } })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Plates.findById(params.id)
    .then(notFound(res))
    .then((plates) => plates ? plates.remove() : null)
    .then(success(res, 204))
    .catch(next)
