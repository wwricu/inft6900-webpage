import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@/components/LoginCard') // lazy load
const HelloWorld = () => import('@/components/HelloWorld')
const UserInfo = () => import('@/pages/UserInfoPage')
const UserManage = () => import('@/pages/UserManagePage')
const CourseManage = () => import('@/pages/CourseManagePage')
const CourseInfo = () => import('@/pages/CourseInfoPage')
const StudentPage = () => import('@/pages/StudentPage')
const ApplyPage = () => import('@/components/student_components/ApplyPage')
const ApplicationInfo = () => import('@/components/student_components/ApplicationInfo')
const AssessmentInfo = () => import('@/components/student_components/AssessmentInfo')
const PersonalDetail = () => import('@/components/student_components/PersonalDetail')
const ConfirmPage = () => import('@/components/student_components/ConfirmPage')

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
        path: '/user/:action/:role/:userNumber',
        name: 'edit_user',
        component: UserInfo,
    },
    {
        path: '/course/:action/:courseID',
        name: 'edit_course',
        component: CourseInfo,
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
        path: '/student_page',
        name: 'student_page',
        component: StudentPage,
        children: [
            {
                path: 'details',
                component: PersonalDetail
            },
            {
                path: 'apply',
                component: ApplyPage
            },
            {
                path: 'confirm',
                component: ConfirmPage
            },
            {
                path: 'applications',
                component: ApplicationInfo
            },
            {
                path: 'assessments',
                component: AssessmentInfo
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;
