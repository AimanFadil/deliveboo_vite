<script>
import { store } from '../store.js';
import axios from 'axios';
export default {
    name: 'HomeApp',
    data() {
        return {
            store,
            restaurants: [],
            SelectedRestaurants: [],
            typologies: [],
            SelectedTypologies: [],
            randomRestaurant: [],

        }
    },
    created() {
        this.getRestaurant();
        this.getTypology();
        this.GetRandomRes();

    },
    methods: {
        getRestaurant() {
            axios.get(`${this.store.Url}/restaurant`).then((response) => {

                this.restaurants = response.data.results;
                this.GetRandomRes();
                this.showRestaurant();
            })
        },
        getTypology() {
            axios.get(`${this.store.Url}/typology`).then((response) => {
                this.typologies = response.data.results;

            })
        },

        showRestaurant() {
            this.SelectedRestaurants = this.restaurants.filter((restaurant) => {
                return this.SelectedTypologies.every((typologyId) =>
                    restaurant.typologies.some((tipo) => tipo.id === typologyId)
                );
            });
        },


        GetRandomRes() {
            if (this.SelectedRestaurants.length === 0) {

                if (this.restaurants.length > 0) {
                    const allRestaurants = [...this.restaurants]; // Create a copy 
                    for (let i = 0; i < 5; i++) {
                        const randomI = Math.floor(Math.random() * allRestaurants.length);
                        const random = allRestaurants.splice(randomI, 1)[0];
                        this.randomRestaurant.push(random);
                    }
                }
            }

        }






    }
}
</script>
<template lang="">
    <div class="pt-5 jumbotron_">
      <div class="mt-5 col-md-4 col-sm-12 p-5">
        <div class="slogan_ fs-2 bg-sm-danger card_">
            Deliveboo, il tuo cibo preferito direttamente a casa tua in men che non si dica
        </div>

      </div>
    </div>
    <main>
        <div class="container ">
            <div class="row d-flex justify-content-center">
                <div class="col-12 text-center my-3"><h3 >Cerca i ristoranti per tipologie</h3></div>
                <div class="col-12 d-flex gap-3">
                <div class="typology  " v-for="(typology , index) in typologies" :key="index">
                <input type="checkbox" :name="typology.id" :id="typology.id" :value="typology.id" v-model="SelectedTypologies" v-on:change="showRestaurant()">
                <label :for="typology.id">{{typology.name}}</label>
                </div>
            </div>
            </div>
        </div>
            <div class="container text-white">
                <div class="row">
                    <div class="col-12 text-center  my-3"><h3 >Ristoranti:</h3></div>
                    <div class="col-12" v-for="(restaurant, index) in SelectedRestaurants">
                        <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-danger">
                            NOME ATTIVITA':{{ restaurant.business_name }}</router-link> <br>
                        <div><span v-for="(type, index) in restaurant.typologies"> {{type.name+' '}} </span> </div>
                        INDIRIZZO :{{ restaurant.address }} <br>
                        
                        <hr>
                    </div>
                </div>
                <div class="row" v-show="SelectedRestaurants.length == 0 && SelectedTypologies.length == 0">
        
                    <div class="col-12" v-for="(restaurant, index) in  randomRestaurant">
                        <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-danger">
                        NOME ATTIVITA':{{ restaurant.business_name }}</router-link> <br>
                        <div><span v-for="(type, index) in restaurant.typologies"> {{type.name+' '}} </span> </div>
                        INDIRIZZO :{{ restaurant.address }} <br>
                        
                        <hr>
                    </div>
                </div>
            </div>
    </main>


</template>

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;

.jumbotron_ {
    background-image: url('../assets/jumbotron-deliveboo.png');
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 80vh;

    .slogan_ {
        font-weight: bolder;
        color: rgb(254, 107, 107);
        text-shadow: 2px 2px rgb(57, 57, 57)
    }

    .card_ {
        background-color: green;
        padding: 5px;
    }
}
</style>