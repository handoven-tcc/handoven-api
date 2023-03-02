import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, indexLimit, showById, update, destroy, retrievePlatesWithName } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
import { checkPermission } from '../../services/authorization'
import { unauthorized } from '../../services/response'
export Plates, { schema } from './model'

const router = new Router()
const { nome, secao } = schema.tree

/**
 * @api {post} /plates Create plates
 * @apiName CreatePlates
 * @apiGroup Plates
 * @apiParam nome Plates's nome.
 * @apiParam secao Plates's secao.
 * @apiSuccess {Object} plates Plates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Plates not found.
 */
router.post('/',
  body({ nome, secao }),
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
 * @api {get} /plates/ Retrieve plates
 * @apiName RetrievePlates
 * @apiGroup Plates
 * @apiUse listParams
 * @apiSuccess {Object[]} plates List of plates.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['Plates']
    },
    nome: {
      ...nome,
      required: false
    },
    secao: {
      ...secao,
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
 * @api {get} /plates/:limit Retrieve plates
 * @apiName RetrievePlates
 * @apiGroup Plates
 * @apiUse listParams
 * @apiSuccess {Object[]} plates List of plates.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:limit',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['Plates']
    },
    nome: {
      ...nome,
      required: false
    },
    secao: {
      ...secao,
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
  indexLimit)

/**
 * @api {post} /plates/name Create plates
 * @apiName RetrievePlates
 * @apiGroup Plates
 * @apiParam filter Plates's filter.
 * @apiSuccess {Object} plates Plates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Plates not found.
 */
router.post('/name',
  body({ nome }),
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'show'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  retrievePlatesWithName)

/**
 * @api {get} /plates/plateId/:id Retrieve plates
 * @apiName RetrievePlates
 * @apiGroup Plates
 * @apiSuccess {Object} plates Plates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Plates not found.
 */
router.get('/plateId/:id',
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'show'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  showById)

/**
 * @api {put} /plates/:id Update plates
 * @apiName UpdatePlates
 * @apiGroup Plates
 * @apiParam name Plates's name.
 * @apiParam category Plates's category.
 * @apiParam ingredients Plates's ingredients.
 * @apiParam available Plates's available.
 * @apiSuccess {Object} plates Plates's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Plates not found.
 */
router.put('/:id',
  body({ nome, secao }),
  (req, res, next) =>
    checkPermission(
      req.header('X-HandOven-Service'),
      req.header('X-HandOven-User'),
      req.header('X-HandOven-Family'),
      'update'
    )
      .then(() => next())
      .catch((err) => unauthorized(res, err)),
  update)

/**
 * @api {delete} /plates/:id Delete plates
 * @apiName DeletePlates
 * @apiGroup Plates
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Plates not found.
 */
router.delete('/:id',
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
