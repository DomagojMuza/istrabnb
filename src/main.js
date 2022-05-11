import { createApp } from "vue";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// app.use(bootstrap);
app.use(router);

app.mount("#app");