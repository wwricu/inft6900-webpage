import Vue from 'vue';
import {reactive} from "vue";

export const store = reactive({
    loginStatus: false,
    role: '',
    permission: 0,
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
    AVN: 'WW'
})

export function autoLogin() {
    let jwt = localStorage.getItem("JWT");
    Vue.prototype.$axios({
        method: "POST",
        url: "http://localhost:5094/auth/token",
        data: jwt
    }).then(res => {
        if (res.data.status !== "success") {
            Vue.prototype.$router.push('/login').then();
        }
        changeLoginStatus(res);
    }).catch(function (err) {
        console.log(err);
        Vue.prototype.$router.push('/login').then();
    })
}

export function changeLoginStatus(res) {
    localStorage.setItem("JWT", res.data.obj[1]);
    store.loginStatus = true;
    store.role = store.roles[res.data.obj[0].permission];
    const nameArray = res.data.obj[0].userName.split(' ');
    console.log(nameArray)
    store.name = nameArray[0];
    store.AVN = nameArray[0].substring(0,1);

    for (let i = 1; i < nameArray.length; i++) {
        store.name = store.name.concat(' ').concat(nameArray[i]);
        store.AVN = store.AVN.concat(' ')
            .concat(nameArray[i].substring(0,1));
    }
}

