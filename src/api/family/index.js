import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
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
  destroy)

export default router
