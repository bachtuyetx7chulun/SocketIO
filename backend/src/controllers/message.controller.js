const { Message, User } = require('../database/models')

const getChatsInRoom = async (req, res, next) => {
  const { roomId } = req.query
  if (roomId) {
    const chats = await Message.findAll({
      where: {
        room: roomId,
      },
      include: {
          model: User,
          required: true
      }
    })

    return res.status(200).json({
      chats,
      code: 200,
    })
  }

  const chats = await Message.findAll({})

  return res.status(200).json({
    chats,
    code: 200,
  })
}

module.exports = {
  getChatsInRoom,
}
