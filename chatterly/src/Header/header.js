import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {startLogout} from '../Actions/auth'

export const Header = ({startLogout}) => {
  <header className = "header">
  <div className="container">
  <div className = "content">
  <Link className = "title" to='/join'>
  <h1>Chatterly</h1>
  </Link>
  <button className="button" onClick = {startLogout}>Logout</button>
  </div>
  </div>
  </header>
}

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)
