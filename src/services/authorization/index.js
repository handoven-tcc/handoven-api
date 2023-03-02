import mongoose from 'mongoose'

export const checkPermission = (isService, user, family, permission) => {
  const User = mongoose.model('User')
  const Family = mongoose.model('Family')
  // eslint-disable-next-line eqeqeq
  if (isService === true || isService === 'true') {
    return Promise.resolve()
  }

  if (permission === 'deleteAll' && family) {
    return Family.findOne({ _id: family })
      .then(() => Promise.resolve())
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch(() => Promise.reject({
        type: 'unauthorized',
        subtype: `handoven-api.${permission}`,
        message: 'Cannot access from outside of a service.'
      }))
  }

  if (user && family) {
    return User.findOne({ _id: user, familyId: family })
      .then(res =>
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.resolve()
      )
      // eslint-disable-next-line prefer-promise-reject-errors
      .catch(Promise.reject({
        type: 'unauthorized',
        subtype: `handoven-api.${permission}`,
        message: 'Cannot access from outside of a service.'
      }))
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({
    type: 'unauthorized',
    subtype: `handoven-api.${permission}`,
    message: 'Cannot access from outside of a service.'
  })
}
