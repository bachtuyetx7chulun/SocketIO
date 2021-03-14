const jwt = require('jwt-then')

const authorization = (req, res, next) => {
  try {
    const token = req.get('access_token')
      
    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  authorization,
}
