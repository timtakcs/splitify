import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';

import NewTransaction from './views/NewTransaction.vue'
import AllTransactions from './views/AllTransactions.vue'
import SignUp from './views/SignUp.vue'
import LogIn from './views/LogIn.vue'

const routes = [
    { path: '/', component: AllTransactions, meta : { requiresAuth: true } },
    { path: '/new-transaction', component: NewTransaction, props: true, meta : { requiresAuth: true }},
    { path: '/signup', component: SignUp },
    { path: '/login', component: LogIn }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('userToken');

    console.log(to);

    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/login');
    } else {
        next();
    }
});


createApp(App).use(router).mount('#app')

