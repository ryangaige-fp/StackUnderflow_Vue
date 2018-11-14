import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from "@/components/Register";
import Login from "@/components/Login";
import Auth from "@okta.okta-Vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    Vue.use(Auth, {
      issuer: "https://dev-893797.oktapreview.com/oauth2/default",
      client_id: "0oahg40zg6V0JiTAn0h7",
      redirect_uri: "http://localhost:8080/implicit/callback",
      scope: "openid profile email"
    })
  ]
});
