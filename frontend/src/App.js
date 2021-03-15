import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { IndexPage } from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import DashBoardPage from './pages/DashBoardPage'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route path="/login" component={LoginPage} exact />
          <Route path="/dashboard" component={DashBoardPage} exact />
          <Route path="/room/:id" component={RoomPage} exact />
        </Switch>
      </Router>
    </div>
  )
}

export default App
