import { createStore } from 'vuex'
import { auth } from './auth.module'

const store = createStore({
  modules: {
    auth: auth,
  }
})

export default store