import Vue from 'vue';
import router from './route/index'
import {reactive} from "vue";

export const store = reactive({
    loginStatus: false,
    role: '',
    permission: 0,
    userNumber: '3362554',
    name: '',
    roles: [
        'User',
        'Student',
        'Staff',
        'Admin'
    ],
    rolesMap: {
        User: 0,
        Student: 1,
        Staff: 2,
        Admin: 3,
    },
    AVN: 'WW',
    devHost: 'http://localhost:5094',
    // https://inft6900.wwr-blog.com
    host: 'http://localhost:5094'
})

export function autoLogin() {
    Vue.prototype.$axios({
        method: "POST",
        url: `${store.host}/auth/token?token=${localStorage.getItem("JWT")}`,
    }).then(res => {
        if (res.data.status !== "success") {
            router.push('/login').then();
        }
        changeLoginStatus(res);
    }).catch(function (err) {
        console.log(err);
        // router.push('/login').then();
    })
}

export function changeLoginStatus(res) {
    localStorage.setItem("JWT", res.data.obj[1]);
    store.loginStatus = true;
    store.role = store.roles[res.data.obj[0].permission];
    store.userNumber = res.data.obj[0].userNumber;
    const nameArray = res.data.obj[0].userName.split(' ');
    console.log(nameArray)
    store.name = nameArray[0];
    store.AVN = nameArray[0].substring(0,1);

    for (let i = 1; i < nameArray.length; i++) {
        store.name = store.name.concat(' ').concat(nameArray[i]);
        store.AVN = store.AVN.concat(nameArray[i].substring(0,1));
    }
}

