import { success, notFound, emailIsInUse } from '../../services/response/'
import { User } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch(next)

export const checkUser = ({ bodymen: { body } }, res, next) =>
  User.findOne({ email: body.email, password: body.password })
    .then(notFound(res))
    .then((user) => user.logView(body))
    .then(success(res, 200))
    .catch(next)

export const checkEmail = ({ bodymen: { body } }, res, next) =>
  User.findOne({ email: body.email })
    .then((user) => user ? emailIsInUse(res) : User.create(body))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const findByFamilyId = ({ params }, res, next) =>
  User.find({ familyId: params.familyId })
    .then(notFound(res))
    .then((user) => user.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
