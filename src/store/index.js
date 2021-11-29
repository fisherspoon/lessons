import Vue from 'vue'
import Vuex from 'vuex'
import todoByUser from "@/store/todoByUser";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isShowModal: true,
    },
    mutations: {

    },
    actions: {

    },
    getters: {

    },
    modules: {
        todoByUser
    }
})
