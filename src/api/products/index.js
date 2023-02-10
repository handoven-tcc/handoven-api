import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, findByFamilyId, findByProductName } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
export Products, { schema } from './model'

const router = new Router()
const { name, type, validity, category, cost, amount, familyId } = schema.tree

/**
 * @api {post} /products Create products
 * @apiName CreateProducts
 * @apiGroup Products
 * @apiParam id Products's id.
 * @apiParam name Products's name.
 * @apiParam type Products's type.
 * @apiParam validity Products's validity.
 * @apiParam storageLocation Products's storageLocation.
 * @apiParam category Products's category.
 * @apiParam cost Products's cost.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.post('/',
  body({ name, type, validity, category, cost, amount, familyId }),
  create)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['Products']
    },
    name: {
      ...name,
      required: false
    },
    type: {
      ...type,
      required: false
    },
    validity: {
      ...validity,
      required: false
    },
    category: {
      ...category,
      required: false
    },
    cost: {
      ...cost,
      required: false
    },
    amount: {
      ...amount,
      required: false
    },
    familyId: {
      ...familyId,
      required: false
    }
  }),
  index)

/**
 * @api {get} /products/:id Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Products
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.get('/:id',
  show)

/**
* @api {get} /products/:familyId Retrieve products
* @apiName RetrieveProducts
* @apiGroup Products
* @apiSuccess {Object} products Products's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Products not found.
*/
router.get('/familyId/:familyId',
  findByFamilyId)

/**
* @api {post} /products/name/familyId/:familyId Retrieve products
* @apiName RetrieveProducts
* @apiGroup Products
* @apiSuccess {Object} products Products's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Products not found.
*/
router.post('/name/familyId/:familyId',
  body({ name }),
  findByProductName)

/**
 * @api {put} /products/:id Update products
 * @apiName UpdateProducts
 * @apiGroup Products
 * @apiParam id Products's id.
 * @apiParam name Products's name.
 * @apiParam type Products's type.
 * @apiParam validity Products's validity.
 * @apiParam storageLocation Products's storageLocation.
 * @apiParam category Products's category.
 * @apiParam cost Products's cost.
 * @apiSuccess {Object} products Products's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Products not found.
 */
router.put('/:id',
  body({ name, type, validity, category, cost, amount, familyId }),
  update)

/**
 * @api {delete} /products/:id Delete products
 * @apiName DeleteProducts
 * @apiGroup Products
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Products not found.
 */
router.delete('/:id',
  destroy)

export default router
