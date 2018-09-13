import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDCZiT8mEQFjnAqqLQxQh24iUTpM4mjYkI",
    authDomain: "chatterly-cb064.firebaseapp.com",
    databaseURL: "https://chatterly-cb064.firebaseio.com",
    projectId: "chatterly-cb064",
    storageBucket: "chatterly-cb064.appspot.com",
    messagingSenderId: "431496697135"
};

firebase.initializeApp(config)

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleAuthProvider, database as default }
