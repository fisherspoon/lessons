import Vue from 'vue'
import Vuex from 'vuex'
import todoByUser from "@/store/todoByUser";

Vue.use(Vuex)

import { SET_TO_ALL_USERS, RETURN_USERS_FROM_STORAGE } from '@/types/mutations'

export default new Vuex.Store({
    state: {
        isShowModal: true,
        users: []
    },
    mutations: {
        ['SET_TO_ALL_USERS'](state, payload){
            state.users.push(payload)
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        ['RETURN_USERS_FROM_STORAGE'](state, payload){
            if(payload) state.users = payload
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {
        todoByUser
    },
})
