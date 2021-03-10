const getError = (req, res, next) => {
  const error = new Error('Not found !')
  error.status = 404
  next(error)
}

const handleError = (err, req, res, next) => {
  const status = err.status || 500
  return res.status(status).json({
    error: {
      message: err.message || 'Internal server error',
      code: status,
    },
  })
}

module.exports = {
  getError,
  handleError,
}
