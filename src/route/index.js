import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/components/LoginCard') // lazy load
const HelloWorld = () => import('@/components/HelloWorld')
const ManageUser = () => import('@/components/UserTable')
const UserInfo = () => import('@/pages/UserInfoPage')
const UserManage = () => import('@/pages/UserManagePage')

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
    {
        path: '/user_info',
        name: 'user_info',
        component: UserInfo,
    },
    {
        path: '/user_manage',
        name: 'user_manage',
        component: UserManage,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;
