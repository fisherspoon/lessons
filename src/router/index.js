import VueRouter from "vue-router";
import Registration from "@/components/pages/Registration";
import Authorization from "@/components/pages/Authorization";
import Todos from "@/components/pages/Todos";
import TodosCompleted from "@/components/pages/TodosCompleted";
import store from '@/store/index'

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/registration'
        },
        {
            path: '/registration',
            name: 'registration',
            components: {
                default: Registration
            },
        },
        {
            path: '/authorization',
            name: 'authorization',
            components: {
                default: Authorization
            },
        },
        {
            path: '/todos/:id',
            name: 'todos',
            // beforeEach: (to, from, next) => {
            //     console.log(store.state.todoByUser.currentUser.isAuthorized)
            //     if (!store.state.todoByUser.currentUser.isAuthorized) next({ name: 'Registration' })
            //     else next()
            // },
            components: {
                default: Todos
            },
        },
        {
            path: "/todos/:id/todos-completed",
            name: 'todos-completed',
            components: {
                default: TodosCompleted
            }
        }
    ]
})