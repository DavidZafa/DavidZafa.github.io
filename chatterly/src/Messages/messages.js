import React, {Component} from 'react'
import {connect} from 'react-redux'
import selectMessages from '../Selectors/messages'


class Messages extends Component {


  displayMessages = (messages) => {
    if(typeof messages == 'string') {
      return <li>{messages}</li>
    }

    let a = []
    for (var key in messages) {
      const name = <p className = "name">{messages[key].sender.displayName}</p>
      const text = <p className = "message_text">{messages[key].text}</p>
      a.push(<li className = "list">{name}{text}</li>)
    }
    return a
  }

  render() {
    return (
      <div className = "messages">
      <ul>{this.displayMessages(this.props.messages)}
      </ul>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
  messages: selectMessages(state.rooms, props.roomName)
})

export default connect(mapStateToProps)(Messages)
