import { reactive } from 'vue';
// import { ref } from "vue";


export const store = reactive({

    Url: 'http://127.0.0.1:8000/api',
    cart:
        [
            {
                name: 'pizza',
                quantity: 2,
                price: 12.34
            },
            {
                name: 'pizza',
                quantity: 2,
                price: 12.32
            },
        ],



});