import Vue from 'vue'
import VueRouter from 'vue-router'
import applicationTable from "@/components/ApplicationTable";
import ApplicationPage from "@/pages/ApplicationPage";

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
        path: '/application',
        name: 'application',
        component: applicationTable
    },
    {
        path: '/application/view/:applicationID',
        name: 'applicationView',
        component: ApplicationPage
    },
    {
        path: '/student_page',
        name: 'student_page',
        component: StudentPage,
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
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router;
