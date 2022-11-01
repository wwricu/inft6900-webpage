import Vue from 'vue'
import VueRouter from 'vue-router'
import {store, syncAutoLogin} from "@/global";

Vue.use(VueRouter)

const Login = () => import('@/components/LoginCard') // lazy load
const UserInfo = () => import('@/pages/UserInfoPage')
const UserManage = () => import('@/pages/UserManagePage')
const CourseManage = () => import('@/pages/CourseManagePage')
const CourseInfo = () => import('@/pages/CourseInfoPage')
const StudentPage = () => import('@/pages/StudentPage')
const ApplyDetails = () => import('@/components/student_components/ApplyDetails')
const ApplicationInfo = () => import('@/components/student_components/ApplicationInfo')
const AssessmentInfo = () => import('@/components/student_components/AssessmentInfo')
const PersonalDetail = () => import('@/components/student_components/PersonalDetail')
const ApplyPage = () => import('@/components/student_components/ApplyPage')
const ConfirmPage = () => import('@/components/student_components/ConfirmPage')
const applicationTable = () => import('@/components/ApplicationTable')
const ApplicationPage = () => import('@/pages/ApplicationPage')


const routes = [
    {
        path: '/',
        name: 'home',
        component: Login,
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
        meta: {
            roles: ['Admin']
        }
    },
    {
        path: '/course/:action/:courseID',
        name: 'edit_course',
        component: CourseInfo,
        meta: {
            roles: ['Admin']
        }
    },
    {
        path: '/user_manage',
        name: 'user_manage',
        component: UserManage,
        meta: {
            roles: ['Admin','Staff']
        }
    },
    {
        path: '/course_manage',
        name: 'course_manage',
        component: CourseManage,
        meta: {
            roles: ['Admin']
        }
    },
    {
        path: '/application',
        name: 'application',
        component: applicationTable,
        meta: {
            roles: ['Admin','Staff']
        }
    },
    {
        path: '/application/view/:applicationID',
        name: 'applicationView',
        component: ApplicationPage,
        meta: {
            roles: ['Admin','Staff']
        }
    },
    {
        path: '/student_page',
        name: 'student_page',
        component: StudentPage,
        meta: {
            roles: ['Student']
        },
        children: [
            {
                path: 'apply',
                component: ApplyPage,
                children: [
                    {
                        path: 'details',
                        component: PersonalDetail
                    },
                    {
                        path: 'info/:applicationID',
                        component: ApplyDetails
                    },
                    {
                        path: 'confirm/:applicationID',
                        component: ConfirmPage
                    },
                ]
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
    {
        path: '/403',
        name: '403',
        component: () => import('@/pages/UnauthorizedPage')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/pages/PageNotFound')
    },
    {
        path: '*',
        redirect: '/404'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

// router.beforeEach((to, from, next) => {
//     if (to.path === '/login') {
//         return next();
//     }
//     if (localStorage.getItem("JWT") == null) {
//         return next('/login')
//     }
//     next()
// })
router.beforeEach((to, from, next) => {
    if (to.path === '/login'
     || to.path === '/403'
     || to.path === '/404') {
        return next();
    }
    if (localStorage.getItem("JWT") == null) {
        return next({path: '/login'})
    }

    if (store.loginStatus !== true) {
        syncAutoLogin()
    }
    if (to.path === '/') {
        if (store.role === 'Admin') {
            return next({path: '/user_manage'})
        } else if (store.role === 'Staff') {
            return next({path: '/application'})
        } else if (store.role === 'Student') {
            return next({path: '/student_page/apply/details'})
        }
    }
    const roles = to.meta.roles
    if (roles != null) {
        for (const role of roles) {
            if (store.role === role) {
                return next()
            }
        }
        return next('/403')
    }
    return next()
})

export default router;
