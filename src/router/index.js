import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/Register.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../views/objects/Add.vue"),
    },
    {
      path:'/accommodation/:_id',
      name : 'object-details',
      component: () => import("../views/details/details.vue"),
    },
    {
      path:'/my',
      name : 'my-objects',
      component: () => import("../views/Edit_list.vue"),
    },
    {
      path:'/my_object/:_id',
      name : 'my-object',
      component: () => import("../views/Object_edit.vue"),
    },
  ],
});

export default router;
