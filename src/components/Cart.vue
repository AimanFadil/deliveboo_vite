<script>
import { store } from '../store.js';
import useLocalStorage from '../js/useLocalStorage';
export default {
    name: 'Chart',
    data() {
        return {
            store,
            my_Chart: useLocalStorage(store.Chart, 'items')
        }
    },
    methods: {
        delete_storage() {
            localStorage.removeItem("items")
        },
        remove_article(index) {

            this.my_Chart.splice(index, 1)

        },
        numberItems() {
            let totalItem = 0
            this.my_Chart.forEach((item) => {
                totalItem += item.quantity
            })
            return totalItem
        },
        totalPrice() {
            let totalPrice = 0
            this.my_Chart.forEach((item) => {
                totalPrice += item.price * item.quantity
            })
            return totalPrice
        }


    }
}
</script>
<template lang="">

                <div class="p-5">
                    <ul class="list-unstyled">
                        <li v-for="(item, index) in my_Chart" :key='index' class="d-flex justify-content-around">
                            <strong>{{item.name}}</strong>
                            <div>quantità: {{item.quantity}}</div> 
                            prezzo: €{{item.price*item.quantity}}

                            <button class="delete" @click="remove_article(index)">-</button>
                            <button>+</button>
                        </li>
                        <li>costi di consegna: €1,20</li>
                        <li>ordine minimo: €20,00</li>
                        <li>
                            <button @click="delete_storage()">svuota carrello</button>
                            <button>Ordinane {{numberItems()}} a €{{totalPrice()}}</button>
                        </li>
                    </ul>
                </div> 
            
</template>
<style lang="scss" scoped></style>