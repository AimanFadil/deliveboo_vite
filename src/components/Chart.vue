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
        delete_local() {
            this.carrello.length = 0
        },
        remove_article(item, index) {
            if (item.quantity == 1) {

                this.carrello.splice(index, 1)

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
            return totalPrice.toFixed(2)
        },
        calc_price(item) {
            let price = item.price * item.quantity
            return price.toFixed(2)
        }


    }
}
</script>
<template lang="">
<div class="col-12">
    <div v-if="carrello.length > 0">
        <ul class="list-unstyled">

            <li v-for="(item, index) in carrello" :key='index' >
                <div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>

                            <div class="fw-semibold text-capitalize ">
                                 {{item.name}}  x{{item.quantity}}
                            </div>
                            <div v-if="calc_price(item) != item.price" class="chart_price ">
                                 Prezzo unitario: €{{item.price.replace(".",",")}}
                            </div>
                            <div class="chart_price fw-semibold">
                                Prezzo: €{{calc_price(item).replace(".",",")}}

                            </div>   
                        </div>
                        <div class="d-flex">
                            <div> <button class=" btn btn-sm btn btn_add_two" @click="remove_article(item, index)"><i class="fa-solid fa-minus fa-xs"></i></button></div>
                            <div class="mx-2 align-self-center"><strong>{{item.quantity}}</strong></div>
                            <div><button class="btn btn-sm btn btn_add_two" @click="add_article(item)"><i class="fa-solid fa-plus fa-xs"></i></button></div>  
                        </div>
                    </div>
                    <hr>
                </div>   

            </li>
        </ul>
        <!-- <ul class="list-unstyled text-center">
            <li>costi di consegna: €1.20</li>
            <li>ordine minimo: €20.00</li>
        </ul> -->
        <div class="col-12 text-center my-3">
            <div class="fw-semibold fs-5 text-capitalize">
                Totale: €{{totalPrice().replace(".",",")}}
                
            </div>
        </div>
        <div class="col-12 d-flex justify-content-center">
    
            <button  class="btn btn_add_two w-auto px-3">
                <router-link :to="{ name: 'checkout' }" class="text_dec_none text-white">Ordina </router-link>
            </button>
            <button @click="delete_local()" class="btn btn_add_ ms-3">Svuota </button>
        </div>    
    </div>
    <div v-else class="text-center">
        <hr>
        <h4>Non ci sono ancora piatti nel carrello</h4>
        <div class="green_color my-3"><i class="fa-regular fa-cart-shopping fw-bold fa-xl"></i></div>
    </div>
</div>    
            
</template>
<style lang="scss" scoped>
@use '../styles/generals.scss' as*;
@use '../styles/partials/variables.scss' as*;

.chart_price {
    font-size: 14px;
}
</style>