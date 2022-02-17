import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: localStorage.getItem("username"),
    permissions: localStorage.getItem("permissions"),
    token: localStorage.getItem("token")
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem("token", token)
    },
    SET_USERNAME: (state, username) => {
      state.username = username
      localStorage.setItem("username", username)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      localStorage.setItem("permissions", permissions)
    },
    REMOVE_INFO: (state) => {
      state.username = '',
      state.permissions = [],
      state.token = '',
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      localStorage.setItem("permissions", [])
    }
  },
  // getters: {
  //   getUsername: state => {
  //     return localStorage.getItem("username")
  //   },
  //   getPermissions: state => {
  //     return localStorage.getItem("permissions") 
  //   }
  // },
  actions: {
  },
  modules: {
  }
})
