import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function LoginPage() {
  const history = useHistory()
  const [username, setUsername] = useState('emvaodoi')
  const [password, setPassword] = useState('Th@tisl0ve')
  const onSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/users/login', {
        username,
        password,
      })

      const access_token = data.data.access_token
      const refresh_token = data.data.refresh_token

      Cookies.set('AS', access_token, {
        secure: true,
        expires: 5,
      })

      Cookies.set('RS', refresh_token, {
        secure: true,
        expires: 7,
      })

      history.push('/dashboard', { login: true })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form action="" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="username">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Enter password..."
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <Link to="/register">
            <div
              style={{
                textAlign: 'center',
                marginTop: 30,
                color: 'whitesmoke',
              }}
            >
              If you dont have account, click to register
            </div>
          </Link>
        </form>
      </main>
    </div>
  )
}

export default LoginPage
