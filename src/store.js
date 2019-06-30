import Vue from 'vue'
import Vuex from 'vuex'
import {auth, firestore} from '@/firebase'
import router from '@/router'
import unsubscribe from './main'

Vue.use(Vuex)

export const TEAM_NAMES = [
  'black', 'blue', 'brown',
  'green', 'grey', 'lime',
  'orange', 'pink', 'purple',
  'red', 'turquoise', 'yellow',
]

const store = new Vuex.Store({
  state: {
    user: {
      displayName: '',
      email: '',
      photoURL: '',
      role: 'guest',
      team: '',
    },
    error: null,
    weights: {},
    competitions: [],
    users: [],
    loading: false,
  },
  mutations: {
    SET_USER_PROPERTIES(state, user) {
      state.user = {...state.user, ...user}
    },
    SIGN_OUT(state) {
      state.user = {
        displayName: '',
        email: '',
        photoURL: '',
        role: 'guest',
        team: '',
      }
    },
    ADD_USERS: (state, users) => {
      Vue.set(state, 'users', users)
    },
    ADD_USER: (state, newUserId) => {
      state.users.push({id: newUserId, role: null, team: null})
    },
    SET_USER_RESONSIBILITY: (state, {userId, role, teamName}) => {
      const index = state.users.findIndex(user => user.id === userId)
      Vue.set(state.users, index, {
        id: userId,
        team: teamName,
        role: role,
      })
    },
    REMOVE_USER: (state, id) => {
      Vue.delete(state.users, state.users.findIndex(user => user.id === id))
    },
    ADD_COMPETITIONS: (state, competitions) => {
      state.competitions.push(...competitions)
    },
    REMOVE_COMPETITION: (state, id) => {
      Vue.delete(state.competitions, state.competitions.findIndex(comp => comp.id === id))
    },
    ADD_COMPETITION: (state, newCompetition) => {
      state.competitions.unshift(newCompetition)
    },
    UPDATE_APPROVAL_STATE: (state, {id, newApprovalState}) => {
      const index = state.competitions.findIndex(comp => comp.id === id)
      Vue.set(state.competitions[index], 'approvalState', newApprovalState)
    },
    // set weights shouldn't be called multiple times
    SET_WEIGHTS: (state, weights) => {
      Vue.set(state, 'weights', Object.keys(weights).reduce((acc, weight) => {
        acc[weight] = weights[weight].value
        return acc
      }, {}))
    },
    REMOVE_WEIGHT: (state, id) => {
      Vue.delete(state.weights, id)
    },
    ADD_WEIGHT: (state, newWeight) => {
      Vue.set(state.weights, newWeight.name, newWeight.value)
    },
    UPDATE_WEIGHT: (state, {weightName, updatedWeight}) => {
      Vue.set(state.weights, weightName, updatedWeight)
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    PUBLISH_ALL(state, newlyPublishedIds) {
      state.competitions.forEach((competition) => {
        if (newlyPublishedIds.includes(competition.id)) {
          Vue.set(competition, 'approvalState', 'published')
        }
      })
    },
  },
  actions: {
    getAdditionUserProps({commit}, email) {
      return firestore.collection('users').doc(email).get()
        .then(function(user) {
          if (user.exists) {
            const {role, team} = user.data()
            commit('SET_USER_PROPERTIES', {role, team})
          } else {
            commit('SET_ERROR', `user with ${email} does not exist`)
            throw new Error(`user with the following email does not exist: ${email}`)
          }
        })
    },
    getUsers({commit}) {
      return firestore.collection('users').get()
        .then((querySnapshot) => {
          const users = []
          querySnapshot.forEach((doc) => {
            users.push({id: doc.id, ...doc.data()})
          })
          commit('ADD_USERS', users)
        })
    },
    setUserResponsibility({commit}, {userId, role, teamName}) {
      return firestore.collection('users').doc(userId).update({
        'role': role,
        'team': teamName,
      }).then(() => {
        commit('SET_USER_RESONSIBILITY', {userId, role, teamName})
      })
    },
    removeUser({commit}, userId) {
      return firestore.collection('users').doc(userId).delete()
        .then(() => commit('REMOVE_USER', userId))
        .catch(error => commit('SET_ERROR', error))
    },
    addUser({commit}, newUserId) {
      return firestore.collection('users').doc(newUserId).set({role: null, team: null})
        .then((docRef) => {
          commit('ADD_USER', newUserId)
        })
    },
    autoSignIn({commit, dispatch}, {email, photoURL, displayName}) {
      commit('SET_USER_PROPERTIES', {email, photoURL, displayName})
      dispatch('getAdditionUserProps', email)
    },
    userSignOut({commit}) {
      auth.signOut()
      unsubscribe()
      commit('SIGN_OUT')
      router.push('/points')
    },
    getAllCompetitions({commit}) {
      return firestore.collection('competitions').get()
        .then((querySnapshot) => {
          const competitions = []
          querySnapshot.forEach((doc) => {
            const competition = {id: doc.id, ...doc.data()}
            if (!competition.approvalState) competition.approvalState = 'submitted'
            competitions.push(competition)
          })
          commit('ADD_COMPETITIONS', competitions)
        })
    },
    addCompetition({commit, state}, newCompetition) {
      newCompetition.approvalState = 'submitted'
      newCompetition.submittedBy = {email: state.user.email, displayName: state.user.displayName}

      if (newCompetition.tied) {
        const otherTeam = {...newCompetition, winner: newCompetition.loser, loser: newCompetition.winner}
        firestore.collection('competitions').add(otherTeam)
          .then((docRef) => {
            commit('ADD_COMPETITION', {...otherTeam, id: docRef.id})
          })
      }
      return firestore.collection('competitions').add(newCompetition)
        .then((docRef) => {
          commit('ADD_COMPETITION', {...newCompetition, id: docRef.id})
        })
    },
    removeCompetition({commit}, id) {
      return firestore.collection('competitions').doc(id).delete()
        .then(() => {
          commit('REMOVE_COMPETITION', id)
        }).catch((error) => {
          commit('SET_ERROR', error)
        })
    },
    getWeights({commit}) {
      return firestore.collection('weights').get()
        .then((querySnapshot) => {
          const weights = {}
          querySnapshot.forEach((doc) => {
            weights[doc.id] = doc.data()
          })
          commit('SET_WEIGHTS', weights)
        })
    },
    addWeight({commit}, newWeight) {
      return firestore.collection('weights').doc(newWeight.name).set({value: newWeight.value})
        .then((docRef) => {
          commit('ADD_WEIGHT', newWeight)
        })
    },
    changeWeight({commit}, {weightName, updatedWeight}) {
      return firestore.collection('weights').doc(weightName).update({
        'value': updatedWeight,
      }).then(() => {
        commit('UPDATE_WEIGHT', {weightName, updatedWeight})
      })
    },
    removeWeight({commit}, weightName) {
      return firestore.collection('weights').doc(weightName).delete()
        .then(() => commit('REMOVE_WEIGHT', weightName))
        .catch(error => commit('SET_ERROR', error))
    },
    publishAll({commit, state}) {
      const db = firestore
      const batch = db.batch()
      const approvedCompetitions = state.competitions.filter(comp => comp.approvalState === 'approved')
      approvedCompetitions.forEach((competition) => {
        const compRef = db.collection('competitions').doc(competition.id)
        batch.update(compRef, {approvalState: 'published'})
      })
      batch.commit().then(() => {
        commit('PUBLISH_ALL', approvedCompetitions.map(comp => comp.id))
      })
    },
    updateApprovalState({commit}, {id, newApprovalState}) {
      return firestore.collection('competitions').doc(id)
        .set({approvalState: newApprovalState}, {merge: true})
        .then(() => commit('UPDATE_APPROVAL_STATE', {id, newApprovalState}))
        .catch(error => commit('SET_ERROR', error))
    },
  },
  getters: {
    authenticatedUser: state => state.user.email,
    competitionNames: state => Object.keys(state.weights),
    currentUserTeam: state => state.user.team,
    isAdmin: state => state.user.role === 'admin',
    isLeader: state => state.user.role === 'leader',
  },
  strict: process.env.NODE_ENV !== 'production',
})

export default store
