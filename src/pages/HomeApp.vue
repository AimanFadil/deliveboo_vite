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
                    if (this.restaurants.length < 5) {
                        for (let i = 0; i < this.restaurants.length; i++) {
                            const randomI = Math.floor(Math.random() * allRestaurants.length);
                            const random = allRestaurants.splice(randomI, 1)[0];
                            this.randomRestaurant.push(random);
                        }
                    }

                    else {
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
}
</script>
<template lang="">
    <div class="pt-5 jumbotron_ p-0 ">
    </div>
    <main>
        <div class="container ">
            <div class="row d-flex justify-content-center">
                <div class="col-12">
                    <div>
                        <div class="slogan_color text-center" >
                            Deliveboo porta il tuo cibo preferito direttamente a casa tua.
                        </div>
                    </div>    s
                </div>
                <div class="col-12 text-center my-3 fw-bold">
                    <h3> Seleziona la tipologia in base a cosa vuoi mangiare e scegli il locale dal quale vuoi ordinare</h3>
                </div>
                <ul class="ks-cboxtags d-flex gap-3 flex-wrap justify-content-center">
                    <div class="typology  " v-for="(typology , index) in typologies" :key="index">
                        <li>
                            <input type="checkbox" :name="typology.id" :id="typology.id" :value="typology.id" v-model="SelectedTypologies" v-on:change="showRestaurant()">
                            <label :for="typology.id">
                                <img :src="typology.type_image" alt="" class="tipology_img" >
                                {{typology.name}}
                            </label>
                        </li>
                    </div>
                </ul>
            </div>
        </div>

        <div class="container text-black">
            <div class="row">
                <div class="col-12 text-center  my-3"><h3 >Locali che soddisfano la tua richiesta:</h3></div>
                <div class="col-12" v-if="SelectedRestaurants.length != 0 && SelectedTypologies.length != 0">

                    <div class="col-12" v-for="(restaurant, index) in SelectedRestaurants" >
                        <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-danger">
                             NOME ATTIVITA':{{ restaurant.business_name }}</router-link> <br>
                        <div><span v-for="(type, index) in restaurant.typologies"> {{type.name+' '}} </span> </div>
                        INDIRIZZO :{{ restaurant.address }} <br>
                        <hr>
                    </div>
                </div>
                <div class="col-12 text-center text-danger" v-else-if="SelectedRestaurants.length == 0 && SelectedTypologies.length != 0">
                    <h1>Nessun ristorante trovato con le tue preferenze.</h1>
                </div>
                <div class="row" v-else>
                    <div class="col-12" v-for="(restaurant, index) in  randomRestaurant">
                        <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-danger">
                            NOME ATTIVITA':{{ restaurant.business_name }}
                        </router-link>
                         <br>
                        <div>
                            <span v-for="(type, index) in restaurant.typologies"> {{type.name+' '}} </span> 
                        </div>
                        INDIRIZZO :{{ restaurant.address }} <br>
                        <hr> 
                    </div>
    
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

    .card_ {
        background-color: rgba(255, 255, 255, 0.253);
        padding: 5px;
    }
}

/* slogan style */
.slogan_color {
    color: #f5f5f5;
    text-transform: uppercase;
    /* font-family: verdana; */
    font-size: 40px;
    font-weight: 700;
    text-shadow: 1px 1px 1px #919191,
        2px 2px 1px #919191,
        2px 3px 1px #919191,
        2px 4px 1px #919191,
        2px 5px 1px #919191,
        2px 5px 1px #919191,
        2px 5px 1px #919191,
        2px 5px 1px #919191,
        2px 5px 1px #919191,
        2px 5px 1px #919191,
        7px 7px 6px rgba(40, 40, 40, 0.4),
        7px 7px 6px rgba(40, 40, 40, 0.4),
        7px 7px 6px rgba(40, 40, 40, 0.4),
        7px 7px 6px rgba(40, 40, 40, 0.4);
}

.tipology_img {
    width: 30px;
    height: 30px;
    object-fit: cover;
}

/* stile per quanto riguarda le checkbox */
ul.ks-cboxtags {
    list-style: none;
    padding: 20px;
}

ul.ks-cboxtags li {
    display: inline;
}

ul.ks-cboxtags li label {
    display: inline-block;
    background-color: rgba(255, 255, 255, .9);
    border: 2px solid rgba(139, 139, 139, .3);
    color: #adadad;
    border-radius: 25px;
    white-space: nowrap;
    margin: 3px 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition: all .2s;
}

ul.ks-cboxtags li label {
    padding: 8px 12px;
    cursor: pointer;
}

ul.ks-cboxtags li label::before {
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    font-size: 12px;
    padding: 2px 6px 2px 2px;
    content: "\f067";
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked+label::before {
    content: "\f00c";
    transform: rotate(-360deg);
    transition: transform .3s ease-in-out;
}

ul.ks-cboxtags li input[type="checkbox"]:checked+label {
    border: 2px solid rgb(255, 57, 57);
    background-color: rgb(254, 107, 107);
    color: #fff;
    transition: all .2s;
}

ul.ks-cboxtags li input[type="checkbox"] {
    display: absolute;
}

ul.ks-cboxtags li input[type="checkbox"] {
    position: absolute;
    opacity: 0;
}

ul.ks-cboxtags li input[type="checkbox"]:focus+label {
    border: 2px solid #e9a1ff;
}
</style>
