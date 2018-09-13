import database, {firebase, googleAuthProvider as provider} from '../Firebase/firebase'

export const login = (uid) => ({
  type: 'LOGIN',
  uid
})
  export const startLogin = () => {
    return () => {

      return firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken

        var user = result.user
        database.ref('users').once('value', (snapshot) => {
          const users = []
          snapshot.forEach((childSnapshot) => {
            users.push({...childSnapshot.value()})
          })
        })

          if(!user.find((u) => u.id === user.uid)) {
            database.ref('users').push({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
              rooms: [],
              token
            })
          }
        })
  }
}
export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  }
}
