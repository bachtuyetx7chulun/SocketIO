const cors = require('cors')
const bodyParser = require('body-parser')
const endPoints = require('express-list-endpoints')
const { getError, handleError } = require('../middlewares/error.middleware')
const { DEV_HOST_PORT, DEV_HOST_NAME } = require('./index')

module.exports = app => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.set('port', DEV_HOST_PORT || 5000)

  app.get('/', (req, res, next) => {
    res.status(200).json({
      message: 'successfully',
      code: 200,
    })
  })

  app.use('/', require('../routers/index'))

  app.use(getError)
  app.use(handleError)

  app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
    console.log(`See more on http://localhost:5000`)
    console.log(endPoints(app))
  })
}
