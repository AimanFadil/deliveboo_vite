<script>
import { store } from '../store.js';
import Loader from '../components/Loader.vue';

import axios from 'axios';
export default {
    name: 'HomeApp',
    components: {
        Loader
    },
    data() {
        return {
            store,
            restaurants: [],
            SelectedRestaurants: [],
            typologies: [],
            SelectedTypologies: [],
            randomRestaurant: [],
            isLoading: true

        }
    },
    created() {
        this.getRestaurant();
        this.getTypology();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    methods: {
        getRestaurant() {
            axios.get(`${this.store.Url}/restaurant`).then((response) => {

                this.restaurants = response.data.results;
                this.isLoading = false;
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
    <Loader v-if="isLoading"/>
    <div v-else>
        <div class="pt-5 jumbotron_ p-0 ">
        </div>
        <main>
            <div class="container ">
                <div class="row d-flex justify-content-center">
                    <div class="col-12">
                        <div>
                            <div class="slogan_color text-center " >
                                Deliveboo porta il tuo cibo preferito direttamente a casa tua.
                            </div>
                        </div>    
                    </div>
                    <div class="col-12 text-center my-3 ">
                        <h3 class="fw-semibold mt-2 fs-5"> Seleziona la tipologia in base a cosa vuoi mangiare e scegli il locale dal quale vuoi ordinare</h3>
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
                    <div class="col-12 text-center  my-3">
                        <h3  v-if="SelectedTypologies.length != 0" class="fw-semibold">Locali che soddisfano la tua richiesta:</h3>
                        <h3  v-if="SelectedTypologies.length == 0" class="fw-semibold ">I nostri locali consigliati:</h3>
                    </div>
                    <div class="col-12 d-flex justify-content-center pb-5 mb-5 " v-if="SelectedRestaurants.length != 0 && SelectedTypologies.length != 0">

                        <!-- card dei ristoranti selezionati -->
                        
                        <div class="card col-3 m-2 restaurant_card_hover" v-for="(restaurant, index) in SelectedRestaurants" >
                        
                                <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-black text_dec_none">
                                    <img :src="restaurant.logo == null ? 'https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-1-580x348.jpg':`${store.photoUrl}/storage/${restaurant.logo}`" class="card-img-top" alt="...">
                                    <div class="card-body  p-2">
                                        <div class=" fw-semibold fs-5">
                                            {{ restaurant.business_name }}
                                        </div>
                                        <p class="card-text">{{ restaurant.address }}</p>
                                        <div class="d-flex justify-content-end mt-4 mb-4">
                                            <span v-for="(type, index) in restaurant.typologies" class="badge rounded-pill background-green me-1"> {{type.name+' '}} </span> 
                                        </div>
                                    </div>
                                </router-link>
                        </div>
                    </div>
                    <div class="col-12 text-center text-danger" v-else-if="SelectedRestaurants.length == 0 && SelectedTypologies.length != 0">
                        <h1> Ci dispiace :( ma non è stato trovato nessun ristorante con le preferenze da te scelte.</h1>
                    </div>
                    <div class="row d-flex justify-content-center z_index pb-5  mb-5" v-else>

                    <!-- card dei ristoranti consigliati -->
                        <div class="card col-3 m-2 restaurant_card_hover" v-for="(restaurant, index) in  randomRestaurant">

                                    <router-link :to="{ name: 'menu-restaurant', params: {id: restaurant.id} }" class="text-black  text_dec_none">
                                        <img :src="restaurant.logo == null ? 'https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-1-580x348.jpg':`${store.photoUrl}/storage/${restaurant.logo}`" class="card-img-top" alt="...">
                                        <div class="card-body p-2">
                                            <div class=" fw-semibold fs-5">
                                                {{ restaurant.business_name }}
                                            </div>
                                            <p class="card-text">{{ restaurant.address }}</p>
                                            <div class="d-flex justify-content-end mt-4 mb-4">
                                                <span v-for="(type, index) in restaurant.typologies" class="badge rounded-pill background-green me-1"> {{type.name+' '}} </span> 
                                            </div>
                                        </div>
                                    </router-link> 

                        </div>
                    </div> 

                </div>
        
                
            </div>
        </main>
    </div>
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

/* hover restaurant card */
.restaurant_card_hover {
    color: #18272F;
    position: relative;
    text-decoration: none;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background-color: rgb(254, 107, 107);
        bottom: 0;
        left: 0;
        transform-origin: right;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
    }

    &:hover::before {
        transform-origin: left;
        transform: scaleX(1);
    }


}
</style>
