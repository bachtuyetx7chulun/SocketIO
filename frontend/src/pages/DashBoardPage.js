import React, { useEffect, useState } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

function DashBoardPage(props) {
  const [rooms, setRooms] = useState([])
  const history = useHistory()

  useEffect(() => {
    const checkLogin = () => {
      if (!Cookies.get('AS') && !Cookies.get('RS'))
        return history.push('/login')
    }

    const getRooms = async () => {
      const { data } = await axios.get('http://localhost:5000/rooms')
      setRooms(data.rooms)
    }

    getRooms()
    checkLogin()
  }, [history])


  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <div>
          <div className="form-control">
            <label htmlFor="username">Create new room</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter room name ..."
            />
            <button type="submit" className="btn">
              Create
            </button>
          </div>
        </div>
      </main>
      <main
        style={{ backgroundColor: 'whitesmoke', color: '#7386ff' }}
        className="join-main"
      >
        <div className="form-control">
          <label style={{ fontWeight: 'bold' }} htmlFor="room">
            Rooms
          </label>
          <div className="rooms">
            {rooms.map(room => {
              return (
                <div
                  key={room.id}
                  className="room"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: '#7386ff',
                    padding: '10px',
                    marginBottom: '5px',
                  }}
                >
                  <span style={{ color: '#f1f1f1' }}>{room.roomName}</span>
                  <Link to={'/room/' + room.id}>
                    <button
                      style={{
                        padding: '5px',
                        border: 'none',
                        color: '#7386ff',
                      }}
                    >
                      Join
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default withRouter(DashBoardPage)
