<script>
import { store } from '../store.js';
import { ref, watch } from "vue";
export default {
    name: 'Cart',
    data() {
        return {
            store,
            cart: ref(
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
            )

        }
    },
    mounted() {
        this.storage()
    },
    methods: {
        storage() {
            const my_storage = window.localStorage.getItem('myItem')
            this.cart.value = JSON.parse(my_storage)


            watch(this.cart, val => {
                // console.log(item)
                window.localStorage.setItem('myItem', JSON.stringify(val))
            }, { deep: true })
        }

    }
}
</script>
<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div v-for="(item, index) in cart" :key='index'>
                    {{item.name}}
                    <input type="text" v-model="item.name">
                    {{item.quantity}}
                    {{item.price}}
                </div> 
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>