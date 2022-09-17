import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/components/LoginCard') // lazy load
const HelloWorld = () => import('@/components/HelloWorld')
const ManageUser = () => import('@/components/ManageUserCard')

const routes = [
    {
        path: '/',
        name: 'home',
        component: HelloWorld,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/manage_staff',
        name: 'manage_staff',
        component: ManageUser,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;
