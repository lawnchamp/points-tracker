import firebase from 'firebase'
require('firebase/firestore')

const app = firebase.initializeApp({
  apiKey: 'AIzaSyDJGzhHLQp8oW794Egqm7j1UToE4CmHpPk',
  authDomain: 'point-tracker18.firebaseapp.com',
  databaseURL: 'https://point-tracker18.firebaseio.com',
  projectId: 'point-tracker18',
  storageBucket: 'point-tracker18.appspot.com',
  messagingSenderId: '727305853236',
})

export const googleAuthProviderId = firebase.auth.GoogleAuthProvider.PROVIDER_ID
export const emailAuthProviderId = firebase.auth.EmailAuthProvider.PROVIDER_ID
export const auth = app.auth()
export const firestore = app.firestore()
