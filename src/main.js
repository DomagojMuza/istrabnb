import { createApp } from "vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  VueGoogleMaps from '@fawmi/vue-google-maps'
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAYdQMDw8fuXQa968AjcwpxXzw4D1QXaR0',
    },
})

app.mount("#app");
