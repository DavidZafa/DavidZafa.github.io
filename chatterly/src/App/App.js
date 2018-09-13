// import React from 'react'
// import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import AppRouter, {history} from '../Routers/approuter'
// import Store from '../Store/store'
// import {login, logout} from '../Actions/auth'
// import {sendMessage} from '../Actions/rooms'
// import database, {firebase} from '../Firebase/firebase'
// import {setStartState, clearState} from '../Actions/rooms'
//
// const store = Store()
// const jsx = (
//   <Provider store = {store}>
//   <AppRouter />
//   </Provider>
// )
// let hasRendered = false
//
// const renderApp = () => {
//   if(!hasRendered) {
//     ReactDOM.render(jsx, document.getElementByID('app'))
//     hasRendered= true
//   }
// }
//
// ReactDOM.render(document.getElementByID('app'))
//
// firebase.auth().onAuthStateChanged((user) => {
//   if(user) {
//     const name = user.displayName ? user.displayName: user.email
//     store.dispatch(login(user.uid,name))
//     store.dispatch(setStartState())
//     renderApp()
//     if(history.location.pathname == '/') {
//       history.push('/join')
//     }
//   } else {
//     store.dispatch(logout())
//      store.dispatch(clearState)
//      renderApp()
//      history.push('/')
//    }
//  })
