import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

//optional imports
import naive from "naive-ui";
// General Font
import "vfonts/Lato.css";
// Monospace Font
import "vfonts/FiraCode.css";

import "@/assets/tailwind.css"; // useless? maybe but it's comfy
import "@/assets/style/app.css"; // useless? maybe but it's comfy
import router from "./router";

const app = createApp(App); /* .mount("#app"); */
app.use(naive).use(router).mount("#app");
