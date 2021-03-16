const cors = require('cors')
const bodyParser = require('body-parser')
const endPoints = require('express-list-endpoints')
const helmet = require('helmet')
const logger = require('morgan')
const { getError, handleError } = require('../middlewares/error.middleware')
const { HOST_PORT, ENV } = require('./index')
const http = require('http')
const { Server } = require('socket.io')
const { verifyToken } = require('../utils/token.util')
const { Message, Room, User } = require('../database/models/index')
const { v4: uuidv4 } = require('uuid')

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

  const server = http.createServer(app)
  const io = new Server(server)

  io.use(async (socket, next) => {
    try {
      const access_token = socket.handshake.query.token
      const payload = await verifyToken(access_token)
      socket.userId = payload.id
      next()
    } catch (error) {}
  })

  io.on('connect', socket => {
    console.log(`User has id: ${socket.userId}`)

    socket.on('joinRoom', ({ roomId }) => {
      socket.join(roomId)
    })

    socket.on('leaveRoom', ({ roomId }) => {
      console.log(`A user has leave ${roomId}`)
    })

    socket.on('roomMessages', async ({ roomId, message }) => {
      if (message.trim().length > 0) {
        const user = await User.findByPk(socket.userId)
        // await Message.create({
        //   id: uuidv4(),
        //   message,
        //   owner: socket.userId,
        //   room: roomId,
        // })

        console.log(roomId)
        console.log(message)
        console.log(user.fullName)

        io.to(roomId).emit('newMessage', {
          message,
          name: user.fullName,
          userId: socket.userId,
        })
      }
    })

    socket.on('disconnect', () => {
      console.log(`User has id: ${socket.userId} out the room`)
    })
  })

  server.listen(app.get('port'), () => {
    console.log(`Environment: ${ENV}`)
    console.log(`Server is running on port ${app.get('port')}`)
    console.log(`See more on http://localhost:5000`)
    console.table(endPoints(app))
  })
}
