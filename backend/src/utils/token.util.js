const jwt = require('jwt-then')
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = require('../config')

const generateTokens = async payload => {
  const access_token = await jwt.sign(
    {
      // tokenType: 'access-token',
      ...payload,
    },
    JWT_ACCESS_KEY,
    {
      expiresIn: '24h',
    }
  )
  const refresh_token = await jwt.sign(
    {
      // tokenType: 'refresh-token',
      ...payload,
    },
    JWT_REFRESH_KEY,
    {
      expiresIn: '24h',
    }
  )

  return {
    access_token,
    refresh_token,
  }
}

const verifyToken = async access_token => {
  const payload = await jwt.verify(access_token, JWT_ACCESS_KEY)
  if (!payload) return null
  return payload
}

const refreshToken = async (access_token, refresh_token) => {
  const payload = await jwt.verify(access_token, JWT_ACCESS_KEY)
  if (!payload) return null
  return payload
}

module.exports = {
  generateTokens,
  verifyToken,
  refreshToken,
}
