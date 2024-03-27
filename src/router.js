import { createRouter, createWebHistory } from 'vue-router';
import Typology from './pages/Typology.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Typology,
        },


    ]
});
export { router }