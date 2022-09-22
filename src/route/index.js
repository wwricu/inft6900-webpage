import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/components/LoginCard') // lazy load
const HelloWorld = () => import('@/components/HelloWorld')
const UserInfo = () => import('@/pages/UserInfoPage')
const UserManage = () => import('@/pages/UserManagePage')
const CourseManage = () => import('@/pages/CourseManagePage')
const CourseInfo = () => import('@/pages/CourseInfoPage')

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
        path: '/add_user',
        name: 'add_user',
        component: UserInfo,
    },
    {
        path: '/edit_user',
        name: 'edit_user',
        component: UserInfo,
    },
    {
        path: '/user/:action/:role/:userNumber',
        name: 'edit_user',
        component: UserInfo,
    },
    {
        path: '/user_manage',
        name: 'user_manage',
        component: UserManage,
    },
    {
        path: '/course_manage',
        name: 'course_manage',
        component: CourseManage
    },
    {
        path: '/edit_course',
        name: 'edit_course',
        component: CourseInfo
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;
