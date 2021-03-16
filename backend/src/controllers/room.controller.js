const { Room, Message } = require('../database/models/index')
const { v4: uuidv4 } = require('uuid')

const getRooms = async (req, res, next) => {
  const rooms = await Room.findAll({})
  return res.status(200).json({
    rooms: rooms,
    code: 200,
  })
}

const createRoom = async (req, res, next) => {
  const { roomName, roomLimit } = req.body
  const room = await Room.create({
    id: uuidv4(),
    roomName,
    roomLimit,
  })

  return res.status(201).json({
    message: "Room's created",
    code: 201,
  })
}

module.exports = {
  getRooms,
  createRoom,
}
