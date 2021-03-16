import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import './App.css'
import { IndexPage } from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashBoardPage from './pages/DashBoardPage'
import RoomPage from './pages/RoomPage'
import { useEffect, useState } from 'react'

function App() {
  const [socket, setSocket] = useState(null)
  const setupSocket = () => {
    const access_token = Cookies.get('AS')
    const newSocket = io('http://localhost:5000', {
      transports: ['websocket'],
      query: {
        token: access_token,
      },
    })

    newSocket.on('connect', () => {
      setSocket(newSocket)
    })

    newSocket.on('disconnect', () => {
      console.log(`Socket is disconnected !`)
      setSocket(null)
      setTimeout(setupSocket, 3000)
    })
  }

  useEffect(() => {
    setupSocket()
  }, [])
  
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route
            path="/login"
            render={() => <LoginPage setupSocket={setupSocket} />}
            exact
          />
          <Route
            path="/dashboard"
            render={() => <DashBoardPage socket={socket} />}
            exact
          />
          <Route
            path="/room/:id"
            render={() => <RoomPage socket={socket} />}
            exact
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
