import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, destroyAll } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
import { checkPermission } from '../../services/authorization'
import { unauthorized } from '../../services/response'
export Family, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /family Create family
 * @apiName CreateFamily
 * @apiGroup Family
 * @apiParam name Family's name.
 * @apiSuccess {Object} family Family's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Family not found.
 */
router.post('/',
  body({ name }),
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service') || true,
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'create'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  create)

/**
 * @api {get} /family Retrieve families
 * @apiName RetrieveFamilies
 * @apiGroup Family
 * @apiUse listParams
 * @apiSuccess {Object[]} families List of families.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['Family']
    },
    name: {
      ...name,
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
 * @api {get} /family/:id Retrieve family
 * @apiName RetrieveFamily
 * @apiGroup Family
 * @apiSuccess {Object} family Family's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Family not found.
 */
router.get('/:id',
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
 * @api {put} /family/:id Update family
 * @apiName UpdateFamily
 * @apiGroup Family
 * @apiParam name Family's name.
 * @apiSuccess {Object} family Family's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Family not found.
 */
router.put('/:id',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'update'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  body({ name }),
  update)

/**
 * @api {delete} /family/:id Delete family
 * @apiName DeleteFamily
 * @apiGroup Family
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Family not found.
 */
router.delete('/:id',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service') || true,
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'delete'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  destroy)

/**
 * @api {delete} /family/:id Delete family
 * @apiName DeleteFamily
 * @apiGroup Family
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Family not found.
*/
router.delete('/destroyAll/:id',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service') || true,
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'deleteAll'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  destroyAll)

export default router
