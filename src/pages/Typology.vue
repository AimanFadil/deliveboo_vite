<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    name: 'Restaurant',
    data() {
        return {
            store,
            restaurants: [],
            SelectedRestaurants: [],
            typologies: [],
            SelectedTypologies: []
        }
    },
    created() {
        this.getRestaurant(),
            this.getTypology()

    },
    methods: {
        getRestaurant() {
            axios.get(`${this.store.Url}/restaurant`).then((response) => {
                console.log(response.data.results)
                this.restaurants = response.data.results;

            })
        },
        getTypology() {
            axios.get(`${this.store.Url}/typology`).then((response) => {
                this.typologies = response.data.results;
                console.log(this.typologies);
            })
        },
        showRestaurant() {
            this.SelectedRestaurants = []
            // let select = document.querySelectorAll('input:checked')
            // this.SelectedTypologies = [...select]

            for (let i = 0; i < this.restaurants.length; i++) {
                let tipologie = this.restaurants[i].typologies
                tipologie.forEach((tipo) => {
                    if (this.SelectedTypologies.includes(tipo.id)) {
                        if (!this.SelectedRestaurants.includes(this.restaurants[i])) {

                            this.SelectedRestaurants.push(this.restaurants[i])
                        }
                    }

                })

            }

        }


    },

}
</script>
<template lang="">
<div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="typology" v-for="typology in typologies" :key="index">
          <input type="checkbox" name="typology" id="typology" :value="typology.id" v-model="SelectedTypologies" v-on:change="showRestaurant()">
          <label for="typology">{{typology.name}}</label>
        </div>
      </div>
    </div>
</div>
<div class="container">
    <div class="row">
        
        <div class="col-12" v-for="(restaurant, index) in SelectedRestaurants">
            NOME ATTIVITA':{{ restaurant.business_name }} <br>
            INDIRIZZO :{{ restaurant.address }} <br>
            P.IVA :{{ restaurant.vat_number }} <br>
            SLUG:{{ restaurant.slug }} <br>
            <hr>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;
</style>