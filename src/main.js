import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/bootstrap.css'
import BackToHomeButton from './components/BackToHomeButton.vue'

const app = createApp(App)
app.component('BackToHomeButton', BackToHomeButton)
app.use(router)
app.mount('#app')