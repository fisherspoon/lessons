import Vue from 'vue'
import Vuex from 'vuex'
import counter from "@/store/counter";
import posts from "@/store/posts";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        counter,
        posts
    }
})
