import VueRouter from "vue-router";
import Registration from "@/pages/Registration";
import Authorization from "@/pages/Authorization";
import Todos from "@/pages/Todos";
import TodosCompleted from "@/pages/TodosCompleted";

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
            components: {
                default: Todos
            },
            beforeEnter: (to, from, next) => {
                let idActiveUser = localStorage.getItem('authenticate_id_user');
                console.log(idActiveUser)
                if (to.matched.some(record => record.meta.requiresAuth)) {
                    if (idActiveUser === null || to.params.id != idActiveUser) {
                        next({ name: 'registration' });
                    } else {
                        next()
                    }
                } else {
                    next()
                }
                next()
            },
            meta: { requiresAuth: true }
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