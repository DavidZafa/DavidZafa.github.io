import React from 'react'
import {connect} from 'react-redux'
import {startLogin} from '../Actions/auth'

export const LoginPage = ({startLogin}) => (

  <div className = "layout">
  <h1>Chatterly</h1>
  <p>Talk to all your friends! Share memes!</p>
  <button className = "login" onClick={startLogin}>Login With Google(And more soon)</button>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  startLogin:() => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)
