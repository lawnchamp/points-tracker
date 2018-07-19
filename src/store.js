import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase.js'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      name: {
        first: '',
        Last: ''
      },
      email: '',
      role: 'student',
      team: ''
    },
    error: null,
    weights: {},
    competitions: [],
    loading: false
  },
  mutations: {
    SET_USER_PROPERTIES (state, user) {
      state.user = {...state.user, ...user}
    },
    SIGN_OUT (state) {
      state.user = {
        name: {
          first: '',
          last: ''
        },
        email: '',
        role: 'student',
        team: ''
      }
    },
    SET_COMPETITIONS: (state, competitions) => {
      state.competitions = competitions
    },
    REMOVE_COMPETITION: (state, id) => {
      Vue.delete(state.competitions, state.competitions.findIndex(comp => comp.id === id))
    },
    ADD_COMPETITIONS: (state, newCompetition) => {
      state.competitions.unshift(newCompetition)
    },
    UPDATE_COMPETITION: (state, newCompetition) => {
      const index = state.competitions.findIndex(comp => comp.id === newCompetition.id)
      Vue.set(state.competitions, index, newCompetition)
    },
    SET_WEIGHTS: (state, weights) => {
      state.weights = Object.keys(weights).reduce((acc, weight) => {
        acc[weight] = weights[weight].value
        return acc
      }, {})
    },
    REMOVE_WEIGHT: (state, id) => {
      Vue.delete(state.weights, id)
    },
    ADD_WEIGHT: (state, newWeight) => {
      Vue.set(state.weights, newWeight.name, newWeight.value)
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    PUBLISH_ALL (state, newlyPublishedIds) {
      state.competitions.forEach(competition => {
        if (newlyPublishedIds.includes(competition.id)) {
          Vue.set(competition, 'approvalState', 'published')
        }
      })
    }
  },
  actions: {
    getAdditionUserProps ({commit}, email) {
      firebase.firestore().collection('users').doc(email).get()
        .then(function (user) {
          if (user.exists) {
            const {name, role, team} = user.data()
            commit('SET_USER_PROPERTIES', {name, role, team})
          } else {
            throw new Error(`Error: could not find user with email: ${email}`)
          }
        }).catch(function (error) {
          throw new Error('Error getting document:', error)
        })
    },
    userSignIn ({commit, dispatch}, {email, password}) {
      commit('SET_LOADING', true)
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(firebaseUser => {
          commit('SET_USER_PROPERTIES', { email: firebaseUser.email })
          dispatch('getAdditionUserProps', firebaseUser.email)
          commit('SET_LOADING', false)
          commit('SET_ERROR', null)
          router.push('/points')
        })
        .catch(error => {
          commit('SET_ERROR', error.message)
          commit('SET_LOADING', false)
        })
    },
    autoSignIn ({commit, dispatch}, user) {
      commit('SET_USER_PROPERTIES', {email: user.email})
      dispatch('getAdditionUserProps', user.email)
    },
    userSignOut ({ commit }) {
      firebase.auth().signOut()
      commit('SIGN_OUT')
      router.push('/points')
    },
    registerUser ({commit}, {email, password}) {
      commit('SET_LOADING', true)
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          commit('SET_USER_PROPERTIES', {email: firebaseUser.email})
          commit('SET_LOADING', false)
          commit('SET_ERROR', null)
          router.push('/points')
        })
        .catch((error) => {
          commit('SET_ERROR', error.message)
          commit('SET_LOADING', false)
        })
    },
    getCompetitions ({commit}) {
      return firebase.firestore().collection('competitions').get()
        .then((querySnapshot) => {
          const competitions = []
          querySnapshot.forEach((doc) => {
            const competition = { id: doc.id, ...doc.data() }
            if (!competition.approvalState) competition.approvalState = 'submitted'
            competitions.push(competition)
          })
          commit('SET_COMPETITIONS', competitions)
        })
    },
    addCompetition ({commit, state}, newCompetition) {
      newCompetition.approvalState = 'submitted'
      newCompetition.submittedBy = {email: state.user.email, name: state.user.name}

      if (newCompetition.tied) {
        const otherTeam = {...newCompetition, winner: newCompetition.loser, loser: newCompetition.winner}
        firebase.firestore().collection('competitions').add(otherTeam)
          .then((docRef) => {
            commit('ADD_COMPETITIONS', {...otherTeam, id: docRef.id})
          })
      }
      return firebase.firestore().collection('competitions').add(newCompetition)
        .then((docRef) => {
          commit('ADD_COMPETITIONS', {...newCompetition, id: docRef.id})
        })
    },
    removeCompetition ({commit}, id) {
      return firebase.firestore().collection('competitions').doc(id).delete()
        .then(() => {
          commit('REMOVE_COMPETITION', id)
        }).catch((error) => {
          console.error('Error removing document: ', error)
        })
    },
    updateCompetition ({ commit }, updatedCompetition) {
      return firebase.firestore().collection('competitions').doc(updatedCompetition.id)
        .set(updatedCompetition)
        .then(() => {
          commit('UPDATE_COMPETITION', updatedCompetition)
        })
    },
    getWeights ({commit}) {
      return firebase.firestore().collection('weights').get()
        .then((querySnapshot) => {
          let weights = {}
          querySnapshot.forEach((doc) => {
            weights[doc.id] = doc.data()
          })
          commit('SET_WEIGHTS', weights)
        })
    },
    addWeight ({ commit }, newWeight) {
      return firebase.firestore().collection('weights').doc(newWeight.name).set({value: newWeight.value})
        .then((docRef) => {
          commit('ADD_WEIGHT', newWeight)
        })
    },
    removeWeight ({ commit }, weightName) {
      return firebase.firestore().collection('weights').doc(weightName).delete()
        .then(() => {
          commit('REMOVE_WEIGHT', weightName)
        }).catch((error) => {
          console.error('Error removing weight: ', error)
        })
    },
    publishAll ({ commit, state }) {
      const db = firebase.firestore()
      const batch = db.batch()
      const approvedCompetitions = state.competitions.filter(comp => comp.approvalState === 'approved')
      approvedCompetitions.forEach(competition => {
        const compRef = db.collection('competitions').doc(competition.id)
        batch.update(compRef, { approvalState: 'published' })
      })
      batch.commit().then(() => {
        commit('PUBLISH_ALL', approvedCompetitions.map(comp => comp.id))
      })
    }
  },
  getters: {
    competitionNames: state => Object.keys(state.weights),
    currentUserTeam: state => state.user.team,
    isAdmin: state => state.user.role === 'admin',
    isLeader: state => state.user.role === 'leader',
    authenticatedUser: state => state.user.email
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
