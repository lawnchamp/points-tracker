import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '@/firebase.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    weights: {},
    competitions: []
  },
  mutations: {
    SET_COMPETITIONS: (state, competitions) => {
      state.competitions = competitions
    },
    REMOVE_COMPETITION: (state, id) => {
      Vue.delete(state.competitions, state.competitions.findIndex(comp => comp.id === id))
    },
    ADD_COMPETITIONS: (state, newCompetition) => {
      state.competitions.unshift(newCompetition)
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
    }
  },
  actions: {
    getCompetitions ({commit}) {
      return firebase.firestore().collection('competitions').get()
        .then((querySnapshot) => {
          const competitions = []
          querySnapshot.forEach((doc) => {
            competitions.push({id: doc.id, ...doc.data()})
          })
          commit('SET_COMPETITIONS', competitions)
        })
    },
    addCompetition ({commit}, newCompetition) {
      return firebase.firestore().collection('competitions').add(newCompetition)
        .then((docRef) => {
          commit('ADD_COMPETITIONS', {id: docRef.id, ...newCompetition})
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
    }
  },
  getters: {
    competitionNames: state => Object.keys(state.weights)
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
