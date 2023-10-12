import { success, notFound } from '../../services/response/'
import { Plates } from '../plates'
import { Favorites } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Favorites.create(body)
    .then((favorites) => favorites.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Favorites.find(query, select, cursor)
    .then((favorites) => favorites.map((favorite) => favorite.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Favorites.find({ familyId: params.familyId })
    .then(favorites => favorites.map(favorite => favorite.plateId))
    .then(favoritePlateIds => {
      console.log(favoritePlateIds)
      return Plates.find({ _id: { $in: favoritePlateIds } })
        .then(plates => plates.map(plate => plate.view()))
        .then(success(res))
        .catch(next)
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Favorites.findOne({ familyId: params.familyId, plateId: params.plateId })
    .then(notFound(res))
    .then((favorites) => favorites ? favorites.remove() : null)
    .then(success(res, 204))
    .catch(next)
