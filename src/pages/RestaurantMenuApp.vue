<script>
import { store } from '../store.js';
import { router } from '../router.js';
import Chart from "../components/Chart.vue";
import axios from 'axios';
import useLocalStorage from '../js/useLocalStorage';

export default {
    name: 'RestaurantMenuApp',
    components: {
        Chart
    },
    data() {
        return {
            store,
            NumberofPieces: 1,
            showModal: false,
            carrello: useLocalStorage(store.Chart, 'Chart'),
            ChosenDish: [],
            restaurant: []

        }

    },
    created() {
        this.GetMenuData();
        this.GetResData();

    },
    mounted() {
        useLocalStorage(store.Chart, 'Chart');

    },
    methods: {

        tornaAlRistoranteDelPrimoPiatto() {
            let primoPiattoRestaurantId = this.carrello[0].restaurant_id;

            router.push({ path: `/restaurants/${primoPiattoRestaurantId}` })


            if (this.$route.fullPath != (`/restaurants/${primoPiattoRestaurantId}`)) {
                window.location.replace(`/restaurants/${primoPiattoRestaurantId}`)


            }


        },

        /* metodo che genera il menu del ristorante scelto in home */
        GetMenuData() {
            axios.get(`${this.store.Url}/restaurant/menu/${this.$route.params.id}`).then((response) => {
                this.store.Menu = response.data.results;
            })
        },
        GetResData() {
            axios.get(`${this.store.Url}/restaurant/${this.$route.params.id}`).then((response) => {
                this.restaurant = response.data.results;

            })
        },
        addpieces() {
            this.NumberofPieces = this.NumberofPieces + 1
        },
        removepieces() {
            if (this.NumberofPieces > 1) {
                this.NumberofPieces = this.NumberofPieces - 1
            }
        },
        addDish(dish) {
            // this.ChosenDish = [];
            this.ChosenDish = dish;
        },
        set_carrello() {
            this.carrello = JSON.parse(localStorage.getItem('Chart'))
        },
        delete_storage() {
            localStorage.clear()
            this.carrello = []


        },
        addtoChart(ChosenDish) {
            let flag = false;
            this.carrello.forEach((elem) => {
                if (elem.id == ChosenDish.id) {
                    flag = true;
                    elem.quantity = elem.quantity + this.NumberofPieces

                }
            });
            if (!flag) {
                let item = {
                    quantity: this.NumberofPieces,
                    id: ChosenDish.id,
                    name: ChosenDish.name,
                    price: ChosenDish.price,
                    restaurant_id: ChosenDish.restaurant_id,

                }
                this.carrello.push(item);

            };

            this.NumberofPieces = 1;


        },
    },


}
</script>
<template lang="">
    <div>
         <main>
            <div class="container ">
                <div class="row ">

                <!-- visulizzazione ristorante scelto -->
                    <div class="col-12 margin_top d-flex justify-content-center ">
                        <div class="rounded-circle restaurant_image" >
                            <img :src="restaurant.logo == null ? 'https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-1-580x348.jpg':`${restaurant.photoUrl}/storage/${restaurant.logo}`" class="image_cover">
                        </div>
                        
                        <div class="align-self-center mx-2">
                            <div class=" fw-semibold fs-5">
                                {{ restaurant.business_name }}
                            </div>
                            <p class="card-text">{{ restaurant.address }}</p>
                        </div>  
                    </div>

                    <div class="col-12 margin_top d-flex" >

                        <!-- visulizzazione del menu -->
                        <div class="col-7 mt-5">
                            <div  v-for="dish, index in store.Menu" :key="index">
                                <!-- controllo che il piatto sia visibile -->
                                <div v-if="(dish.visible==true)">
                                    <!-- controllo che il piatto non sia eliminato -->
                                    <div v-if="(dish.is_delete==false)" class="col-12 d-flex">
                                        <div class="col-4">
                                            <img :src="dish.image == null ? 'https://www.leggimenu.it/wp-content/uploads/2023/02/menu-digitale-online-delivery.jpg':`${store.photoUrl}/storage/${dish.image}`" style="width:200px">
                                        </div>
                                        <div class="col-6">
                                            <div>{{dish.name}}</div>
                                            <div>{{dish.ingredients}}</div>
                                            <div>{{dish.description}}</div>
                                            <div>{{dish.price}}</div> 
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal-pieces" @click="addDish(dish)">
                                                Aggiungi all ordine
                                            </button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     <!-- visualizzazzione del carrello -->
                        <div class="col-4">
                            <h3>Carrello</h3>
                            <Chart :carrello='this.carrello'/>
                            <button @click="delete_storage()">svuota carrello</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </main>   
    </div>
    <!-- modale -->
    <div class="modal" tabindex="-1" id="modal-pieces">

        <div v-if=" this.carrello.length == 0 ||  this.carrello[0].restaurant_id == ChosenDish.restaurant_id">
            <div class="modal-dialog modal-lg ">
                <div class="modal-content bg_color_">
                <div class="modal-header">
                    <h5 class="modal-title">Seleziona i pezzi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                      <img :src="ChosenDish.image" alt="">
                    <div>{{ChosenDish.name}}</div>
                    <div>{{ChosenDish.description}}</div>
                    <div>{{ChosenDish.ingredients}}</div>
                    <div>{{ChosenDish.price}}</div>
                </div>
                <div class="modal-footer">
                    <span>
                        <button type="button" class="btn btn-warning" :class="(NumberofPieces == 1 ) ?  'disabled bg-secondary': ''" @click="removepieces()" id="minusbtn"><i class="fa-solid fa-minus"></i></button>
                    </span>
                    <span>
                        <button type="button" class="btn btn-warning">{{NumberofPieces}}</button>
                    </span>
                    <span>
                        <button type="button" class="btn btn-warning" @click="addpieces()"><i class="fa-solid fa-plus"></i></button>
                    </span>
                    
                    <button type="button" id="empty_modal" class="btn btn-success" @click="addtoChart(ChosenDish)" data-bs-dismiss="modal">Aggiugi al carrello</button>
                </div>
                </div>

            </div>
        </div>
        <div v-else>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Attenzione</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Nel carrello è già presente uno o più prodotti di un altro ristorante, per poter procedere svuotare prima il carrello</p>
                    </div>
                    
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="tornaAlRistoranteDelPrimoPiatto()">Torna al ristorante</button>
                            
                            
                           

                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="delete_storage()">svuota carrello</button>                
                        </div>
                    </div>
            </div>
        </div>
    </div>

    

</template>

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;
@use '../styles/partials/variables.scss' as*;

.bg_color_ {
    background-color: white;
}
.restaurant_image{
    width: 200px;
    height: 200px;
}
.image_cover{
    object-fit: cover;
    width: 100%;
    height: 100%;
}
</style>