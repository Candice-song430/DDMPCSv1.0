import axios from 'axios'
const state = {
  databases: null,
}

const mutations = {
  GET_ALL_DATABASES(state, payload){
    state.databases = payload;
  }

}

const actions = {
  reloadDatabases({commit, state}){
    axios.get('/all-databases/getInfoByDatabaseName').then(res => {
      commit('GET_ALL_DATABASES', res.data);
    }).catch(err => {
      throw Error('GET DATABASES ERROR', err);
    })
  },
  getAllDatabases({
    commit
  }) {
    axios.get('/all-databases').then(res => {
      commit('GET_ALL_DATABASES', res.data);
    })
  },
  addField({commit}, payload){

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
