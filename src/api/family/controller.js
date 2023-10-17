import { success, notFound } from '../../services/response/'
import { Family } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Family.create(body)
    .then((family) => family.view(true))
    .then(success(res, 201))
    .catch(next)

export const addPlateToFavorite = ({ params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => {
      if (family) {
        family.plates_favorites.push(params.plateId)
        return family.save()
      } else {
        return null
      }
    })
    .then((family) => family ? family.view(true) : null)
    .then(success(res))
    .catch(next)

export const removePlateToFavorite = ({ params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => {
      if (family) {
        family.plates_favorites.splice(family.plates_favorites.indexOf(params.plateId))
        return family.save()
      } else {
        return null
      }
    })
    .then((family) => family ? family.view(true) : null)
    .then(success(res))
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

export const destroyAll = ({ params }, res, next) =>
  Family.findById(params.id)
    .then(notFound(res))
    .then((family) => family.destroyAll())
    .then(success(res, 204))
    .catch(next)
