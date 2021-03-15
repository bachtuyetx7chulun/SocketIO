const jwt = require('jwt-then')
const { verifyToken } = require('../utils/token.util')

const authorization = async (req, res, next) => {
  try {
    const access_token = req.get('access_token')
    // const refresh_token = req.get('refres_token') // Deprecated
    const payload = await verifyToken(access_token)

    req.payload = payload
    return next()
  } catch (error) {
    return res.status(403).json({
      message: 'Forbidden',
      code: 403,
    })
  }
}

module.exports = {
  authorization,
}
