import VueRouter from "vue-router";
import HomePage from "@/components/pages/HomePage";
import About from "@/components/pages/About";
import Contacts from "@/components/pages/Contacts";
import Item from "@/components/pages/Item";
import List from "@/components/pages/List";
import Posts from "@/components/pages/Posts";
import SinglePost from "@/components/pages/SinglePost";
import Author from "@/components/pages/Author";
import SubNav from "@/components/SubNav";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            components: {
                default: HomePage,
                SubNav: SubNav
            },
        },
        {
            path: '/about',
            name: 'About',
            components: {
                default: About,
                SubNav: SubNav
            },
        },
        {
            path: '/contacts',
            name: 'Contacts',
            components: {
                default: Contacts,
                SubNav: SubNav
            },
        },
        {
            path: '/list',
            name: 'List',
            components: {
                default: List,
                SubNav: SubNav
            },
        },
        {
            path: '/list/:itemid',
            name: 'Item',
            components: {
                default: Item,
                SubNav: SubNav
            },
        },
        {
            path: '/posts',
            name: 'Posts',
            components: {
                default: Posts,
                SubNav: SubNav
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