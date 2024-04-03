import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from './pages/HomeApp.vue';
import Checkout from './pages/Checkout.vue';
import RestaurantMenuApp from './pages/RestaurantMenuApp.vue';
import ThanksYou from './pages/ThanksYou.vue';




const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeApp,
        },
        {
            path: '/restaurants/:id',
            name: 'menu-restaurant',
            component: RestaurantMenuApp
        },
        {
            path: '/ThanksYou',
            name: 'ThanksYou',
            component: ThanksYou
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },

    ]
});
export { router }