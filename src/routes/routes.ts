import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/Auth/SignIn.vue';
import SignUp from '../views/Auth/SignUp.vue';
import ForgotPassword from '../views/Auth/ForgotPassword.vue';
import Verify from '../views/Auth/Verify.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import ClientDashboard from '../views/ClientDashboard/ClientDashboard.vue';
import Clients from '../views/Dashboard/Clients.vue';
import Product from '../views/Dashboard/Product/Product.vue';
import Service from '../views/Dashboard/Service/Service.vue';

const routes = [
    {
        path:'/',
        name: 'home',
        children: [
            {
                path:'/dashboard',
                name: 'home',
                component: Dashboard,
            },
            {
                path:'/clients',
                name: 'clients',
                component: Clients,
            },
            {
                path:'/product/:id',
                name: 'product',
                component: Product,
                props: true
            },
            {
                path:'/service/:id',
                name: 'service',
                component: Service,
                props: true
            },
        ]
    },

    {
        path:'/clientdashboard',
        name: 'clientdashboard',
        component: ClientDashboard
    },

    {
        path:'/auth',
        name: 'auth',
        children: [
            {
                path:'/signin',
                name: 'signin',
                component: SignIn
            },
            {
                path:'/signup',
                name: 'signup',
                component: SignUp
            },
            {
                path:'/forgot',
                name: 'forgot',
                component: ForgotPassword
            },
            {
                path:'/verify',
                name: 'verify',
                component: Verify
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
