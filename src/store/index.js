import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
    SET_USERS_TO_LOCALSTORAGE,
    SET_ACTIVE_USER_TO_STATE,
    SET_VALUE_BY_SEARCH,
    SET_TYPE_PRIORITY,
    SET_USERS_ACTIVITY_TO_STATE,
    SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE,
    CHANGE_MODE
} from '@/types/mutations'
import { GET_USERS_FROM_LOCALSTORAGE, GET_USERS_ACTIVITY_FROM_LOCALSTORAGE } from '@/types/actions'
import { GET_TASKS_FILTERED, GET_COMPLETED_TASKS } from '@/types/getters'

export default new Vuex.Store({
    state: {
        isShowModal: true,
        activeUser: {},
        usersActivity: [],
        searchVal: '',
        priority: false,
        isShowSidebar: false,
        activeMode: 'light',
        modes: [
            'light',
            'dark'
        ],
    },
    mutations: {
        ['SET_USERS_TO_LOCALSTORAGE'](state, payload){
            localStorage.setItem('users', JSON.stringify(payload));
        },
        ['SET_USERS_ACTIVITY_TO_LOCALSTORAGE_AND_STATE'](state, payload){
            let activity = JSON.parse(localStorage.getItem('activity'));
            !activity ? activity = [payload] : activity.push(payload)
            localStorage.setItem('activity', JSON.stringify(activity));
            state.usersActivity = activity
        },
        ['SET_ACTIVE_USER_TO_STATE'](state, payload){
            state.activeUser = payload
        },
        ['SET_USER_AUTHENTICATE_ID_TO_LOCALSTORAGE'](state, payload){
            localStorage.setItem('authenticate_id_user', JSON.stringify(payload));
        },
        ['SET_VALUE_BY_SEARCH'](state, payload){
            state.searchVal = payload
        },
        ['SET_TYPE_PRIORITY'](state, payload){
            state.priority === payload ? state.priority = false : state.priority = payload
        },
        ['SHOW_SIDE_BAR'](state, payload){
            state.isShowSidebar = payload
        },
        ['SET_USERS_ACTIVITY_TO_STATE'](state, payload){
            state.usersActivity = payload
        },
        ['CHANGE_MODE'](state, payload){
            state.activeMode = payload
        }
    },
    actions: {
        ['GET_USERS_FROM_LOCALSTORAGE']({ commit, state, dispatch, getters }, idActiveUser){
            let users = JSON.parse(localStorage.getItem('users'));
            if(users){
                let activeUser = users[idActiveUser];
                commit('SET_ACTIVE_USER_TO_STATE', activeUser)
            }
        },
        ['GET_USERS_ACTIVITY_FROM_LOCALSTORAGE']({ commit, state, dispatch, getters }){
            let activity = JSON.parse(localStorage.getItem('activity'));
            commit('SET_USERS_ACTIVITY_TO_STATE', activity)
        }
    },
    getters: {
        ['GET_TASKS_FILTERED'](state){
            return state.activeUser.todos.filter(item => {
                return (item.header.toLowerCase().includes(state.searchVal.toLowerCase()) ||
                    item.description.toLowerCase().includes(state.searchVal.toLowerCase())) &&
                    (item.priority.value === state.priority || state.priority === false)
            });
        },
        ['GET_COMPLETED_TASKS'](state){
            return state.activeUser.todos.filter(item => item.done);
        }
    },
    modules: {

    },
})
