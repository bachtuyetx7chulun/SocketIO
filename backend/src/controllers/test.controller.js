const {
  generateTokens,
  refreshToken,
  verifyToken,
} = require('../utils/token.util')

const login = async (req, res, next) => {
  tokens = await generateTokens({
    userId: '48810000116841',
    userName: 'Trung Hieu',
  })

return res.status(200).json({
    data: tokens,
    code: 200,
  })
}

const check = (req, res, next) => {
  const payload = req.payload

  return res.status(200).json({
    data: payload,
    code: 200,
  })
}

module.exports = {
  login,
  check,
}
