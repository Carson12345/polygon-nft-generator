import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './components/HomePage.vue';

const app = createApp(App);

const router = createRouter({
history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
  ]
});

app.use(router);

app.mount('#app')
