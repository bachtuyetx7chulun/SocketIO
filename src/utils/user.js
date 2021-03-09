const users = []

// * Join user to chat
const userJoin = (id, username, room) => {
  const user = { id, username, room }
  users.push(user)
  return user
}

// * Get current user
const getCurrentUser = id => {
  return users.find(user => user.id === id)
}

const userLeaveChat = id => {
  const index = users.findIndex(user => user.id === id)
  let user
  if (index !== -1) {
    user = users[index]
    users.splice(index, 1)
  }
  return user
}

const getUsersInRoom = room => {
  return users.filter(user => user.room === room)
}

export { userJoin, users, getCurrentUser, userLeaveChat, getUsersInRoom }
