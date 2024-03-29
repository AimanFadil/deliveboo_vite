import { reactive } from 'vue';


export const store = reactive({

    Url: 'http://127.0.0.1:8000/api',
    Menu: [
        {
            id: 1,
            restaurant_id: 1,
            name: "pizza margherita",
            ingredients: "mozzarela,pomodoro, olio, origano",
            description: "lievitata 24 ore",
            price: 4.50,
            visible: true,
            is_delete: false,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/640px-Eq_it-na_pizza-margherita_sep2005_sml.jpg",
        },
        {
            id: 2,
            restaurant_id: 1,
            name: "Arancino",
            ingredients: "mozzarela, pomodoro, ragu, panatura, riso",
            description: "Arancini siciliani",
            price: 2,
            visible: true,
            is_delete: false,
            image: "https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2022/11/arancini-di-riso-1-1200x675.jpg",
        },
        {
            id: 3,
            restaurant_id: 1,
            name: "Pizza 4 stagioni",
            ingredients: "mozzarela, olio, origano, pomodoro, carciofi, olive, prosciutto, funghi",
            description: "lievitata 24 ore",
            price: 7.50,
            visible: true,
            is_delete: false,
            image: "https://primochef.it/wp-content/uploads/2020/04/SH_pizza_quattro_stagioni.jpg",
        },
        {
            id: 4,
            restaurant_id: 1,
            name: "Diavola",
            ingredients: "mozzarela,pomodoro, olio, origano, salame piccante, nduja",
            description: "lievitata 24 ore",
            price: 8,
            visible: true,
            is_delete: false,
            image: "https://www.lucianopignataro.it/wp-content/uploads/2023/02/Elementi-Pizzeria-Diavola-480x480.png",
        },
        {
            id: 5,
            restaurant_id: 1,
            name: "Patatine Fritte",
            ingredients: "patete",
            description: "porzione da 50g",
            price: 1.50,
            visible: true,
            is_delete: false,
            image: "https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2023/09/Patatine-fritte.jpg",
        },
    ],
    Chart: [],


});