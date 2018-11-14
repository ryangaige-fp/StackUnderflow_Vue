import Vue from "vue";
import Vuex from "vuex";
import router from "./router";




Vue.use(Vuex);

let stack = axios.create({
  baseURL:"https://localhost:5001/",
  timeout: 5000
});

export default new Vuex.Store({
  state: {
    user: {},
  },
  
  mutations: {},
  actions: {
    register({ commit, dispatch }, newUser) 
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(res => {
          commit("setUser", res);
          router.push({ name: "Dashboard" });
        })
        .catch(err => {
          console.error(err);
        });
    },
    login({ commit, dispatch }, creds) {
      firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then(res => {
          commit("setUser", res.user);
          router.push({ name: "Dashboard" });
        })
        .catch(err => {
          console.error(err);
        });
    },
    authenticate({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit("setUser", user);
          dispatch("getMyBlogs");
          // router.push({ name: 'Dashboard' })
        } else {
          commit("setUser", {});
          router.push({ name: "Login" });
        }
      });
    },
    logout({ commit, dispatch }) {
      firebase
        .auth()
        .signOut()
        .then(res => {
          commit("setUser", {});
          router.push({ name: "Login" });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
});
