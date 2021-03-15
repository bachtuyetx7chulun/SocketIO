const cors = require('cors')
const bodyParser = require('body-parser')
const endPoints = require('express-list-endpoints')
const helmet = require('helmet')
const logger = require('morgan')
const { getError, handleError } = require('../middlewares/error.middleware')
const { HOST_PORT, ENV } = require('./index')

module.exports = app => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(logger('dev'))
  app.use(helmet())
  app.set('port', HOST_PORT || 5000)

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
    console.log(`Environment: ${ENV}`)
    console.log(`Server is running on port ${app.get('port')}`)
    console.log(`See more on http://localhost:5000`)
    console.table(endPoints(app))
  })

  const  io,{Server } = require('socket.io')
  const server =  
}
