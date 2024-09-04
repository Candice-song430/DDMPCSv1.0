import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import mynodes from './modules/mynodes'
import mylines from './modules/mylines'
import mydatabases from './modules/mydatabases'
import centertable from './modules/centertable'
import mymodel from './modules/mymodel'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    mynodes,
    mylines,
    mydatabases,
    centertable,
    mymodel
  },
  getters
})

export default store
