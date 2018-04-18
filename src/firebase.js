import firebase from 'firebase'
require('firebase/firestore')

firebase.initializeApp({
  apiKey: 'AIzaSyDJGzhHLQp8oW794Egqm7j1UToE4CmHpPk',
  authDomain: 'point-tracker18.firebaseapp.com',
  databaseURL: 'https://point-tracker18.firebaseio.com',
  projectId: 'point-tracker18',
  storageBucket: 'point-tracker18.appspot.com',
  messagingSenderId: '727305853236'
})

export default firebase
