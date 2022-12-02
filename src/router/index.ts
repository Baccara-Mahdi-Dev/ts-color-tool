import { defineAsyncComponent } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LoaderFullScreen from "../components/misc/Loader-full-screen.vue";
import LoaderSm from "../components/misc/Loader-small.vue";
const MainView = defineAsyncComponent({
  loader: () => import("../views/New-Main.vue"),
  loadingComponent: LoaderFullScreen,
  delay: 300,
  errorComponent: LoaderSm,
  timeout: 6000,
});
const MixinView = defineAsyncComponent({
  loader: () => import("../views/Mixin-Colour.vue"),
  loadingComponent: LoaderFullScreen,
  delay: 300,
  errorComponent: LoaderSm,
  timeout: 6000,
});

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainView,
  },
  {
    path: "/mix",
    name: "mix",
    component: MixinView,
  },
  {
    path: "/:catchAll(.*)",
    name: "GenericErr",
    component: LoaderFullScreen,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
