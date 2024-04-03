import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from './pages/HomeApp.vue';
import Checkout from './pages/Checkout.vue';
import RestaurantMenuApp from './pages/RestaurantMenuApp.vue';
import NotFound from './pages/NotFound.vue';




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
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        }

    ]
});
export { router }