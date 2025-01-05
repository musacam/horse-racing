import { createRouter, createWebHistory } from "vue-router";
import MainGame from "./views/MainGame.vue";
import NotFound from "./views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Main Game",
    component: MainGame,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
