import { SET_CURRENT_USER, SET_TODO_FOR_USER, REMOVE_TODO, EDIT_TODO, GET_TODOS_BY_USER_ID, MARK_DONE_TODO } from '@/types/mutations'
import globState from '@/store/index'

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
            let id = payload.id;
            let currentUser = globState.state.users.filter(item => item.id == id);
            currentUser[0].todos.push(payload.task);
            localStorage.setItem('users', JSON.stringify(globState.state.users));
        },
        [REMOVE_TODO](state, payload){
            state.todos.splice(payload.indexTask, 1)
            localStorage.setItem('users', JSON.stringify(globState.state.users));
        },
        [EDIT_TODO](state, payload){
            state.todos.splice(payload.indexTask, 1, payload.changedTask)
            localStorage.setItem('users', JSON.stringify(globState.state.users));
        },
        [MARK_DONE_TODO](state, payload){

        },
        [GET_TODOS_BY_USER_ID](state, payload){
            let todosByCurrentUser = globState.state.users.filter(item => item.id == payload);
            state.todos = todosByCurrentUser[0].todos
        }
    },
}