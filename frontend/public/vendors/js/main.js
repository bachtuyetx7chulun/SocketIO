const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const userList = document.querySelector('#users')
const socket = io()

// * Message from server
socket.on('message', message => {
  console.log(message)

  outputMessage(message)
  chatMessages.scrollTop = chatMessages.scrollHeight
  // * Scroll down
})

// * Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault()

  // TODO: Get message value
  const msg = e.target.elements.msg.value

  // TODO: Emit message to server
  socket.emit('chatMessage', msg)

  // TODO: Clear input
  e.target.elements.msg.value = ''
})

// * Listent message and render to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')

  div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>
  `

  document.querySelector('.chat-messages').appendChild(div)
}

const getQuerys = str => {
  let arr = []
  let array = str.replace('?', '').split('&')
  for (let i = 0; i < array.length; i++) {
    arr.push(array[i].split('=')[1])
  }
  return {
    username: arr[0],
    room: arr[1],
  }
}

const { room, username } = getQuerys(location.search)
socket.emit('joinRoom', { username, room })

socket.on('roomUsers', res => {
  roomName.innerHTML = res.room
  userList.innerHTML = ''
  res.users.map(user => {
    var item = document.createElement('li')
    item.innerHTML = user.username
    userList.appendChild(item)
  })
})
