import VueRouter from "vue-router";
import Counter from "@/components/pages/Counter";
import Posts from "@/components/pages/Posts";
import SinglePost from "@/components/pages/SinglePost";
import Author from "@/components/pages/Author";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Counter',
            components: {
                default: Counter,
            },
        },
        {
            path: '/posts',
            name: 'Posts',
            components: {
                default: Posts,
            },
        },
        {
            path: '/posts/post/:id',
            name: 'SinglePost',
            component: SinglePost
        },
        {
            path: '/posts/author/:id',
            name: 'Author',
            component: Author
        },
    ]
})