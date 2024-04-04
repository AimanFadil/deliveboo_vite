<script>
import { store } from '../store.js';
import Chart from "../components/Chart.vue";
import axios from 'axios';
import useLocalStorage from '../js/useLocalStorage';
import Loader from '../components/Loader.vue';

export default {
    name: 'RestaurantMenuApp',
    components: {
        Chart,
        Loader
    },
    data() {
        return {
            store,
            NumberofPieces: 1,
            showModal: false,
            carrello: useLocalStorage(store.Chart, 'Chart'),
            ChosenDish: [],
            restaurant: [],
            isLoading: true

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

        /* metodo che genera il menu del ristorante scelto in home */
        GetMenuData() {
            axios.get(`${this.store.Url}/restaurant/menu/${this.$route.params.id}`).then((response) => {
                this.store.Menu = response.data.results;
                this.isLoading = false
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
    }
}
</script>
<template lang="">
    <Loader v-if="isLoading"/>
    <div v-else>
        <main>
           <div class="container ">
               <div class="row ">
               <!-- visulizzazione ristorante scelto -->
                   <div class="col-12 margin_top">
                       <img :src="restaurant.logo == null ? 'https://www.google.com/url?sa=i&url=https%3A%2F%2Faprireunbar.com%2F2022%2F04%2F22%2Fidee-originali-per-menu-di-bar-e-locali%2F&psig=AOvVaw2v7Bi49MwcL_jb99Edq4O0&ust=1711878721894000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOjX1anbm4UDFQAAAAAdAAAAABAE':`${restaurant.photoUrl}/storage/${restaurant.logo}`" style="width:200px">
                           <div>{{restaurant.business_name}}</div>
                           <div>{{restaurant.address}}</div>
                           <div></div>
                           <div></div>

                       </div>
                   <div class="col-12 margin_top" >

                       <!-- visulizzazione del menu -->
                       <div class="col-8 mt-5">
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
                   </div>
                    <!-- visualizzazzione del carrello -->
                   <div class="col-4">
                       <h3>Carrello</h3>
                       <Chart :carrello='this.carrello'/>
                       <button @click="delete_storage()">svuota carrello</button>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
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
</style>