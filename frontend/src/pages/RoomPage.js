import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'

function RoomPage(props) {
  const [messages, setMessages] = useState([])
  const messageRef = useRef()
  const sendMessage = e => {
    e.preventDefault()
    if (props.socket) {
      props.socket?.emit('roomMessages', {
        roomId,
        message: messageRef.current.value,
      })

      messageRef.current.value = ''
    }
  }
  const roomId = props.match.params.id
  useEffect(() => {
    const getMessageRoom = async () => {
      const { data } = await axios.get(`http://localhost:5000/rooms/${roomId}`)
      if (data) {
        setMessages(data.chats)
      }
    }

    if (props.socket) {
      props.socket.emit('joinRoom', {
        roomId,
      })

      props.socket.on('newMessage', message => {
        const newMessages = [...messages, message]
        setMessages(newMessages)
      })
    }

    return () => {
      props.socket?.emit('leaveRoom', {
        roomId,
      })
      getMessageRoom()
    }
  }, [props.socket, roomId])

  console.log(messages)

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <Link to="/dashboard" id="leave-btn" className="btn">
          Leave Room
        </Link>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name"></h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users"></ul>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => {
            return (
              <div key={index} className="message">
                <p className="meta">{message.name}</p>
                <p className="text">{message.message}</p>
              </div>
            )
          })}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            ref={messageRef}
          />
          <button className="btn" onClick={sendMessage} type="button">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default withRouter(RoomPage)
