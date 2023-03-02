export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const emailIsInUse = (res) => {
  return res.status(401).json({
    type: 'internal',
    message: 'This email is in use, please, use another or contact the administrator'
  })
}

export const notFound = (res) => (entity) => {
  if (entity) {
    return entity
  }
  res.status(404).end()
  return null
}

export const errorHandler = (err, req, res, next) => {
  console.log('[errorHandler]', err)

  if (err.type === 'internal') {
    return res.status(500).json(err)
  } else if (err.type === 'invalid') {
    return res.status(400).json(err)
  } else if (err.type === 'unauthorized') {
    return res.status(401).json(err)
  } else if (err.type === 'notfound') {
    return res.status(404).json(err)
  } else if (err.type === 'unabletoconnect') {
    return res.status(401).json(err)
  } else if (err.type === 'notinitialized') {
    return res.status(500).json(err)
  }

  return res.status(500).json({
    type: 'internal',
    subtype: 'unknown',
    message: `an unknown error occurred: ${err.toString()}`
  })
}

export const unauthorized = (res, err) => {
  res.status(401).json(err).end()
}

export const authorOrAdmin = (res, user, userField) => (entity) => {
  if (entity) {
    const isAdmin = user.role === 'admin'
    const isAuthor = entity[userField] && entity[userField].equals(user.id)
    if (isAuthor || isAdmin) {
      return entity
    }
    res.status(401).end()
  }
  return null
}
