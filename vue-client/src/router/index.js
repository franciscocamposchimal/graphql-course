import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SessionUser from "@/hocs";

Vue.use(VueRouter);

const sessionHome = SessionUser(Home);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/home",
    name: "home",
    component: sessionHome
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
