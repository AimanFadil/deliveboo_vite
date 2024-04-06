import { reactive } from 'vue';
import useLocalStorage from './js/useLocalStorage';

export const store = reactive({

    Url: 'http://127.0.0.1:8000/api',

    photoUrl: 'http://127.0.0.1:8000',
    Menu: [],
    Chart: [],

    OrderProducts: [],
    OrderCustomer: [],

    formOrder: {
        name: '',
        mail: '',
        address: '',
        phone: '',
        products: [],
        price: 5
    },
    loading: true,

});