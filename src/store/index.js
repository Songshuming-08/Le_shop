import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import createisitate from "vuex-persistedstate"


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
  },
  plugins: [createisitate({
    storage: window.localStorage
  })],
  getters
})

export default store
