<script>
import { store } from '../store.js';
import useLocalStorage from '../js/useLocalStorage';
export default {
    name: 'Cart',
    data() {
        return {
            store,
            my_cart: useLocalStorage(store.cart, 'items')
        }
    },
    mounted() {


    },
    methods: {


    }
}
</script>
<template lang="">

                <div class="p-5">
                    <ul class="list-unstyled">
                        <li v-for="(item, index) in my_cart" :key='index' class="d-flex justify-content-around">
                            {{item.name}}
                            <div>quantità: {{item.quantity}}</div> 
                            prezzo: €{{item.price*item.quantity}}
                            <input type="text" v-model='item.name'>
                        </li>
                    </ul>
                </div> 
            
</template>
<style lang="scss" scoped></style>