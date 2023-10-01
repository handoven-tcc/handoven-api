import mongoose from 'mongoose'

export async function checkPermission (isService, user, family, permission) {
  const User = mongoose.model('User')
  const Family = mongoose.model('Family')
  // eslint-disable-next-line eqeqeq
  if (isService === true || isService === 'true') {
    return await Promise.resolve()
  }

  if (permission === 'deleteAll' && family) {
    return await Family.findOne({ _id: family })
      .then(() => Promise.resolve())
      .catch(() =>
      // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject({
          type: 'unauthorized',
          subtype: `handoven-api.${permission}`,
          message: 'Cannot access from outside of a service.'
        })
      )
  }

  if (user && family) {
    return await User.findOne({ _id: user, familyId: family })
      .then(async (res) => await Promise.resolve())
      .catch(
        async () =>
        // eslint-disable-next-line prefer-promise-reject-errors
          await Promise.reject({
            type: 'unauthorized',
            subtype: `handoven-api.${permission}`,
            message: 'Cannot access from outside of a service.'
          })
      )
  }

  // eslint-disable-next-line prefer-promise-reject-errors
  return await Promise.reject({
    type: 'unauthorized',
    subtype: `handoven-api.${permission}`,
    message: 'Cannot access from outside of a service.'
  })
}
