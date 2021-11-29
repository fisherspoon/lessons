import { SET_CURRENT_USER, SET_TODO_FOR_USER, REMOVE_TODO, EDIT_TODO } from '@/types/mutations'
import { GET_TODOS_BY_USER_ID_FROM_STORAGE } from '@/types/actions'

export default {
    namespaced: true,
    state: () => ({
        currentUser: {},
        todos: []
    }),
    mutations:{
        [SET_CURRENT_USER](state, payload){
            state.currentUser = payload
        },
        [SET_TODO_FOR_USER](state, payload) {
            if(Array.isArray(payload)){
                state.todos = payload
            }else {
                state.todos.push(payload)
            }
        },
        [REMOVE_TODO](state, payload){
            state.todos.splice(payload, 1)
        },
        [EDIT_TODO](state, payload){
            console.log(payload)
            // state.todos.splice(payload, 1)
        },
    },
    actions:{
        [GET_TODOS_BY_USER_ID_FROM_STORAGE]( { commit, state, dispatch, getters }, id ){
            let users = JSON.parse(localStorage.getItem('users'));
            for(let i = 0; i < users.length; i++){
                let parseItem = JSON.parse(users[i]);
                if(parseItem.id == id){
                    commit('SET_CURRENT_USER', { login: parseItem.login, isAuthorized: parseItem.isAuthorized })
                    if(parseItem.todos.length){
                        commit('SET_TODO_FOR_USER', parseItem.todos)
                    }
                }
            }
        }
    }
}