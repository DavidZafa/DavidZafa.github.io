import React from 'react'
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom'
import Login from '../Login/login'
import JoinRoom from '../JoinRoom/joinroom'
import createHistory from 'history/createBrowserHistory'
import ShowRoom from '../ShowRoom/showroom'
import RoomsPage from '../RoomsPage/roomspage'
import LoggedIn from './LoggedIn'
import Nah from './Nah'

export const history = createHistory()

const AppRouter = () => (
  <Router history={history}>
  <div>
  <Switch>
  <Nah path = "/" component = {Login} exact = {true}/>
  <LoggedIn path = "/join" component = {JoinRoom}/>
  <LoggedIn path = "/room/:id" component = {RoomsPage}/>
  </Switch>
  </div>
  </Router>
)

export default AppRouter
