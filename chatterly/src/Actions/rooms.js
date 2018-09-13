import database, {firebase} from '../Firebase/firebase'
// import {history} from '../routers/AppRouter'

export const createRoom = ({id, name, people, messages = []}) => ({
  type: 'CREATE_ROOM',
  room: {
    id,
    name,
    people: people,
    messages
  }
})

export const startCreateRoom = (roomper = {}) => {
  return(dispatch, getState) => {
    const room = {
      name: roomper.name
    }
    return database.ref('rooms').once('value', (snapshot) => {
      const rooms = []
      snapshot.forEach((childSnapshot) => {
        rooms.push({
          ...childSnapshot.val()
        })
      })
      if(!rooms.find((r) => r.name === room.name)) {
        return database.ref('rooms').push(room).then((ref) => {
          return database.ref('rooms/${ref.key}/people').push(roomper.people).then(() => {
            database.ref('users').once('value').then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().uid === roomper.people.id) {
                  database.ref('users/${childSnapshot.key}/rooms').push(ref.key)
                }
              })
          })
          dispatch(createRoom({
            id: ref.key,
              ...roomper,
              people: [roomper.people]
          }))
          this.context.history.push('/room/${room.name}')
        })
      })
    }
  })
 }
}

const isAlreadyAdded = (data, id) => {
  for (var key in data) {
    if(data[key].id === id) return true
  }
  return false
}

export const startJoinRoom = (data = {}) => {
  return (dispatch, getState) => {
    const state = getState()
    return database.ref('rooms').once('value', (snapshot) => {
      const rooms = []
      snapshot.forEach((childSnapshot) => {
        rooms.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })
      for(var i = 0; i < rooms.length; i ++){
        if(rooms[i].name === data.roomName){
          if(isAlreadyAdded(rooms[i].people, data.id)) {
            return console.log('Ur already in here lul')
          } else {
            const person = {
              name: data.name,
              id: data.id
            }
            return database.ref('rooms/${rooms[i].id}/people').push(person).then((ref) => {
              database.ref('users').once('value').then((usersnapshot) => {
                usersnapshot.forEach((childSnapshot) => {
                  if (childSnapshot.val().uid === data.id) {
                    database.ref('users/${childSnapshot.key}/rooms').push(rooms[i].id)
                  }
                })
              })
              dispatch(createRoom({
                people: [person],
                id: rooms[i].id,
                name: rooms[i].name
              }))
              this.context.history.push('room/${data.roomName}')
            })
          }
        }
      }
    })
  }
}

export const sendMessage = (message, roomName) => ({
  type: 'SEND_MESSAGE',
  message,
  roomName
})

export const startSendMessage = (text, roomName) => {
  return(dispatch, getState) => {
    const user = firebase.auth().currentUser
    if(user) {
      const uid = user.uid
      const displayName = user.displayName
      const message = {
        sender: {uid, displayName},
        text
      }
      return database.ref('rooms').once('value', (snapshot) => {
        const rooms = []
        snapshot.forEach((childSnapshot) => {
          rooms.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          })
        })
        for(var i = 0; i < rooms.length; i++) {
          if( rooms[i].name === roomName) {
            return database.ref('rooms/${rooms[i].id/messages}').push(message)
          }
        }
      })
    }
  }
}

export const startListening = () => {
  return( dispatch, getState) => {
    return database.ref('rooms').on('child_added', (snapshot) => {
      const roomName = snapshot.val().name
      return snapshot.ref.child('messages').on('child_added', (msgSnapshot) => {
        const message = msgSnapshot.val()
        dispatch(sendMessage({
          message,
          id: snapshot.key
        }, roomName))
        })
      })

  }
}

export const setStartState = () => {
  return (dispatch, getState) => {
  const user = firebase.auth().currentUser
  if(user) {
    const uid = user.uid
    let rooms = []
    database.ref('users').once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val.uid() === uid) {
          rooms.push(childSnapshot.val().rooms)
          rooms = rooms[0]
          for( var key in rooms) {
            database.ref('rooms/${rooms[key]}').once('value', (snapshot) => {
              const {name, people, messages} = snapshot.val()
              let peopleArray = [], messagesArray = []
              for(var peopleKey in people) {
                peopleArray.push(people[peopleKey])
              }
              for(var messageKey in messages) {
                messagesArray.push(messages[messageKey])
              }
              dispatch(createRoom({
                id: rooms[key],
                name,
                people: peopleArray,
                messages: messagesArray
              }))
            })
          }
        }
      })
    })
  }
  }
}
export const clearState = ({
  type: 'CLEAR_STATE'
})
