import { createStore } from 'vuex'
import { auth } from './auth.module'
import { openapi } from './openapi.module'

const store = createStore({
  modules: {
    auth: auth,
    openapi: openapi,
  }
})

export default store
