import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
import { checkPermission } from '../../services/authorization'
import { unauthorized } from '../../services/response'
export Favorites, { schema } from './model'

const router = new Router()
const { plateId, familyId } = schema.tree

/**
 * @api {post} /favorites Create favorite
 * @apiName CreateFavorites
 * @apiGroup Favorites
 *
 * @apiParam {String} plateId ID of the plate to be associated.
 * @apiParam {String} familyId ID of the family to which the plate will be associated.
 *
 * @apiHeader {String} X-HandOven-Service Service key for authentication.
 * @apiHeader {String} X-HandOven-User User key for authentication.
 * @apiHeader {String} X-HandOven-Family ID of the family performing the association.
 *
 * @apiPermission create Permission required to perform the association.
 *
 * @apiSuccess {Object} Favorites Favorites's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorites not found.
 */
router.post('/',
  body({ plateId, familyId }),
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'create'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  create)

/**
 * @api {get} /favorites Retrieve favorites
 * @apiName RetrieveFavorites
 * @apiGroup Favorites
 * @apiUse listParams
 *
 * @apiHeader {String} X-HandOven-Service Service key for authentication.
 * @apiHeader {String} X-HandOven-User User key for authentication.
 * @apiHeader {String} X-HandOven-Family ID of the family performing the association.
 *
 * @apiPermission create Permission required to perform the association.
 *
 * @apiSuccess {Object[]} favorites List of favorites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['Family']
    },
    plateId: {
      ...plateId,
      required: false
    },
    familyId: {
      ...familyId,
      required: false
    }
  }),
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'show'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  index)

/**
 * @api {get} /favorites/familyId/:familyId Retrieve favorites
 * @apiName RetrieveFavorite
 * @apiGroup Favorite
 *
 * @apiHeader {String} X-HandOven-Service Service key for authentication.
 * @apiHeader {String} X-HandOven-User User key for authentication.
 * @apiHeader {String} X-HandOven-Family ID of the family performing the association.
 *
 * @apiPermission create Permission required to perform the association.
 *
 * @apiSuccess {Object} Favorites Favorites's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorites not found.
 */
router.get('/familyId/:familyId',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'show'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  show)

/**
 * @api {delete} /favorites/familyId/:familyId/plateId/:plateId Delete plate from favorite
 * @apiName DeleteFavorites
 * @apiGroup Favorites
 *
 * @apiParam {String} id ID of the favorite to be deleted.
 *
 * @apiHeader {String} X-HandOven-Service Service key for authentication.
 * @apiHeader {String} X-HandOven-User User key for authentication.
 * @apiHeader {String} X-HandOven-Family ID of the family performing the deletion.
*
 * @apiPermission delete Permission required to perform the deletion.
 *
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Favorites not found.
 */
router.delete('/familyId/:familyId/plateId/:plateId',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'delete'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  destroy)

export default router
