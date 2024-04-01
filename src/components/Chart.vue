<script>
import { store } from '../store.js';
export default {
    name: 'Chart',
    props: {
        carrello: Array
    },

    data() {
        return {
            store,
        }
    },
    methods: {

        remove_article(item, index) {
            if (item.quantity == 1) {
                this.my_Chart.splice(index, 1)
            }
            else {
                item.quantity -= 1
            }

        },
        add_article(item) {
            item.quantity += 1
        },
        numberItems() {
            let totalItem = 0
            this.carrello.forEach((item) => {
                totalItem += item.quantity
            })
            return totalItem
        },
        totalPrice() {
            let totalPrice = 0
            this.carrello.forEach((item) => {
                totalPrice += item.price * item.quantity
            })
            return totalPrice
        }


    }
}
</script>
<template lang="">

<div v-if="carrello.length > 0">
    <div class="p-5">
        <ul class="list-unstyled">
            <li v-for="(item, index) in carrello" :key='index' class="d-flex justify-content-around">
                <strong>{{item.name}}</strong>
                <div>quantità: {{item.quantity}}</div> 
                prezzo: €{{item.price*item.quantity}}
                <button class="delete" @click="remove_article(item, index)">-</button>
                <button @click="add_article(item)">+</button>
            </li>
            <li>costi di consegna: €1,20</li>
            <li>ordine minimo: €20,00</li>
            <li>
                <button>Ordinane {{numberItems()}} a €{{totalPrice()}}</button>
            </li>
        </ul>
    </div> 
</div>
<div v-else>
    <h4>non ci sono ancora piatti nel carrello</h4>
    <div>SBRIGATI A ORDINARE ALTRIMENTI CHIUDE E MUORI DI FAME, SAI QUANTO COSTANO I FUNERALI DI QUESTI TEMPI?</div>
</div>
            
</template>
<style lang="scss" scoped></style>