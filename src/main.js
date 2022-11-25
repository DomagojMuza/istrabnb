import { createApp } from "vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import App from "./App.vue";
import router from "./router";
import store from '@/store.js'

const app = createApp(App);
app.config.globalProperties.$store = store
app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: '',
    },
})

app.mount("#app");
