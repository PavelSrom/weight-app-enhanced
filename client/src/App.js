// REACT
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUser } from './store/actions/auth'
import { setAxiosToken } from './utils/setAxiosToken'
import PrivateRoute from './hoc/PrivateRoute'
// ROUTES
import NotFound from './routes/404'
import Home from './routes/Home'
import Register from './routes/Register'
import Login from './routes/Login'
import Dashboard from './routes/Dashboard'
import CreateProfile from './routes/CreateProfile'
import UpdateProfile from './routes/UpdateProfile'
import Logs from './routes/Logs'
import Exercises from './routes/Exercises'

if (localStorage.token) setAxiosToken(localStorage.token)

const App = () => {
  const dispatch = useDispatch()

  // whenever the user revisits the page, we want to check their auth status
  useEffect(() => {
    dispatch(loadUser())
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/update-profile" component={UpdateProfile} />
        <PrivateRoute exact path="/logs" component={Logs} />
        <PrivateRoute exact path="/exercises" component={Exercises} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
