import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
});

app
    .use(store)
    .use(router)
    .use(BootstrapVue3)
    .mount('#app')
