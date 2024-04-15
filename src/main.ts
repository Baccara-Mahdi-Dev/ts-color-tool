import "./registerServiceWorker";
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import "@/assets/tailwind.css"; // useless? maybe but it's comfy
import "@/assets/style/app.css"; // useless? maybe but it's comfy

import App from "./App.vue";
import { createApp } from "vue";
import naive from "naive-ui";
import router from "./router";

//optional imports

// General Font

// Monospace Font






const app = createApp(App); /* .mount("#app"); */
app.use(naive).use(router).mount("#app");
