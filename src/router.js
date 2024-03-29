import { createRouter, createWebHistory } from 'vue-router';
import HomeApp from './pages/HomeApp.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';


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
            name: 'single-restaurant',
            component: SingleRestaurant
        },

    ]
});
export { router }