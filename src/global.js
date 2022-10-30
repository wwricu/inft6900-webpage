// import Vue from 'vue';
// import router from './route/index'
import Vue, {reactive} from "vue";
// import axios from "axios";

export const store = reactive({
    loginStatus: false,
    role: '',
    permission: 0,
    sysUserID: 0,
    userNumber: '',
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
    host: 'http://localhost:80'
})

export function syncAutoLogin() {
    const xhr = new XMLHttpRequest();
    const url = `${store.host}/auth/token?token=${localStorage.getItem("JWT")}`
    xhr.open('POST', url, false)
    xhr.send()
    const res = JSON.parse(xhr.responseText)
    console.log('login')
    console.log(JSON.stringify(res))
    changeLoginStatus(res);
}

export function autoLogin() {
    Vue.prototype.$axios({
        method: "POST",
        url: `${store.host}/auth/token?token=${localStorage.getItem("JWT")}`,
    }).then(res => {
        if (res.data.status !== "success") {
            console.log(localStorage.getItem("JWT"))
            return
        }
        changeLoginStatus(res.data);
    }).catch(function (err) {
        console.log(err);
    })
}

export function changeLoginStatus(res) {
    localStorage.setItem("JWT", res.obj[1]);
    store.permission = res.obj[0].permission;
    store.role = store.roles[res.obj[0].permission];
    store.sysUserID = res.obj[0].sysUserID;
    store.userNumber = res.obj[0].userNumber;
    const nameArray = res.obj[0].userName.split(' ');
    store.name = nameArray[0];
    store.AVN = nameArray[0].substring(0,1);

    for (let i = 1; i < nameArray.length; i++) {
        store.name = store.name.concat(' ').concat(nameArray[i]);
        store.AVN = store.AVN.concat(nameArray[i].substring(0,1));
    }
    store.loginStatus = true;
    console.log('login')
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function waitForLogin() {
    if (store.loginStatus === true) {
        return
    }
    await sleep(500);
    await waitForLogin()
}



