import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

let api = axios.create({
  baseURL: "https://localhost:5001/",
  timeout: 5000
});

export default new Vuex.Store({
  state: {
    user: {}
  },

  mutations: {
    setQuestions(state, questions) {}
  },
  actions: {
    editQuestion({ commmit, dispatch }, question) {
      api
        .put("houses/" + questions._id, question)
        .then(res => {
          dispatch("getAllHouses");
        })
        .catch(err => {
          console.error(err.response.data.message);
        });
    }
  }
});
