import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import Navbar from "@/components/Navbar.vue";

createApp(App)
    .use(router)
    .use(store)
    .component('navbar', Navbar)
    .mount('#app')
