import React, {Component} from 'react'
import {firebase} from '../Firebase/firebase'
import {connect} from 'react-redux'
import {startCreateRoom, startJoinRoom} from '../Actions/rooms'

export class JoinRoom extends Component {
  onCreateRoom = (e) => {
    e.preventDefault()
    const user = firebase.auth().currentUser
    if(user) {
      const room = {
        name: e.target.rname.value,
        people: {
          id: user.uid,
          name: user.displayName
        }
      }
      this.props.startCreateRoom(room)
    }
  }

  onJoinRoom = (e) => {
    e.preventDefault()
    const user = firebase.auth().currentUser
    const data = {
      roomName: e.target.rname.value,
      id: user.uid,
      name: user.displayName
    }
    this.props.startJoinRoom(data)
  }

  render() {
    return (
      <div className="join">
      <div className="join2">
      <h1 className="title">Create Room</h1>
      <form onSubmit={this.onCreateRoom}>
      <input className = "text-input" placeholder = "Room Name" name = "rname"/>
      <button className="buttonjoin">Create</button>
      </form>
      </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startCreateRoom: (room) => dispatch(startCreateRoom(room)),
  startJoinRoom: (data) => dispatch(startJoinRoom(data))
})

export default connect(undefined, mapDispatchToProps)(JoinRoom)
