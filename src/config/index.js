import express from 'express'
import endPoints from 'express-list-endpoints'
import bodyParser from 'body-parser'
import { PORT } from './constants.js'
import http from 'http'
import { Server } from 'socket.io'
import { formatMessage } from '../utils/message.js'
import cors from 'cors'
import {
  getCurrentUser,
  getUsersInRoom,
  userJoin,
  userLeaveChat,
} from '../utils/user.js'

const configure = app => {
  const server = http.createServer(app)
  const io = new Server(server)
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.set('port', PORT || 5000)
  app.use('/public', express.static('public'))

  app.get('/', (req, res) => {
    res.json({
      message: 'success',
      code: 200,
    })
  })

  // * Run when client connects
  io.on('connection', socket => {
    // * Run when a user disconnects
    socket.on('disconnect', () => {
      console.log(`User has id: ${socket.id} is out of the room`)
      const user = userLeaveChat(socket.id)
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(
            'ChatCord Bot',
            `${user.username} has left the chat`,
            user.room
          )
        )

        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getUsersInRoom(user.room),
        })
      }
    })

    // * Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id)
      if (user) {
        io.to(user.room).emit('message', formatMessage('User', msg, user.room))
      }
    })

    // * Join room
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room)
      if (user) {
        socket.join(user.room)
        io.to(user.room).emit(
          'message',
          formatMessage(
            'ChatCord Bot',
            `Wellcome ${username} to ChatCord !`,
            user.room
          )
        )

        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getUsersInRoom(user.room),
        })
      }
    })
  })
  server.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`)
    console.log(`See more above : http://localhost:5000/`)
    console.log(`ChatBox : http://localhost:5000/public/index.html`)
    console.log(endPoints(app))
  })
}

export default configure
