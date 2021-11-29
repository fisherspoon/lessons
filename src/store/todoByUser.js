import { SET_CURRENT_USER, SET_TODO_FOR_USER } from '@/types/mutations'

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
            let users = JSON.parse(localStorage.getItem('users'));
            for(let i = 0; i < users.length; i++){
                let parseItem = JSON.parse(users[i]);
                if(parseItem.login === state.currentUser.login){
                    parseItem.todos.push(payload)
                    localStorage.setItem(name, JSON.stringify(parseItem));
                }
            }

            state.todos.push(payload)
        },
    },
    actions:{

    }
}