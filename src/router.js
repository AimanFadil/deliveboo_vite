import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from './pages/HomeApp.vue';
import RestaurantMenuApp from './pages/RestaurantMenuApp.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: RestaurantMenuApp,
        },


    ]
});
export { router }