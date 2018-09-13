import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startSendMessage} from '../Actions/rooms'
import Messages from '../Messages/messages'


export class RoomsPage extends Component {

  roomName = this.props.location.pathname.split('/')

  onSubmit = (e) => {
    e.preventDefault()
    const message = e.target.message.value

    this.props.startSendMessage(message, this.roomName)
    e.target.reset()
  }

  render() {
    return(
      <div className = "messages">
      <Messages roomName={this.roomName} />

      <form onSubmit={this.onSubmit} id = "message-form">
      <input type = "text" name = "message" className = "input"/>
      <button className = "login">Send</button>
      </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startSendMessage: (message, roomName) => dispatch(startSendMessage(message, roomName))
});

export default connect(undefined, mapDispatchToProps)(RoomsPage);
