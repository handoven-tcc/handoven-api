import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, findByFamilyId, checkUser, checkEmail } from './controller'
import { schema } from './model'
import { Schema } from 'mongoose'
export User, { schema } from './model'

const router = new Router()
const { name, birthDate, cell, email, password, familyId } = schema.tree

/**
 * @api {post} /user Create's user.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.post('/',
  body({ name, birthDate, cell, email, password, familyId }),
  create)

/**
* @api {post} /user/addUser Add User.
* @apiSuccess {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 User not found.
*/
router.post('/addUser',
  body({ name, birthDate, cell, email, password, familyId }),
  checkEmail)

/**
* @api {post} /user/login Create user
* @apiName CheckUser
* @apiGroup User
* @apiParam email User's email.
* @apiParam password User's password.
* @apiSuccess {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 User not found.
*/
router.post('/login',
  body({ email, password }),
  checkUser)

/**
 * @api {get} /user Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    _id: {
      type: [Schema.ObjectId],
      paths: ['User']
    },
    name: {
      ...name,
      required: false
    },
    birthDate: {
      ...birthDate,
      required: false
    },
    cell: {
      ...cell,
      required: false
    },
    email: {
      ...email,
      required: false
    },
    password: {
      ...password,
      required: false
    },
    familyId: {
      ...familyId,
      required: false
    }
  }),
  index)

/**
 * @api {get} /user/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.get('/:id',
  show)

/**
* @api {get} /user/:familyId Retrieve products
* @apiName RetrieveUserByFamilyId
* @apiGroup User
* @apiSuccess {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 User not found.
*/
router.get('/familyId/:familyId',
  findByFamilyId)

/**
 * @api {put} /user/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiParam name User's name.
 * @apiParam birthDate User's birthDate.
 * @apiParam cpf User's cpf.
 * @apiParam cell User's cell.
 * @apiParam email User's email.
 * @apiParam password User's password.
 * @apiParam familyId User's familyId.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 */
router.put('/:id',
  body({ name, birthDate, cell, email, password, familyId }),
  update)

/**
 * @api {delete} /user/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  destroy)

export default router
