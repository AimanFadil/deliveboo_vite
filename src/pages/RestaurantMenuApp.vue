<script>
import { store } from '../store.js';
import { router } from '../router.js';
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
            modalPrice: null,
            isLoading: true


        }

    },
    created() {
        this.GetMenuData();
        this.GetResData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            this.modalPrice = this.ChosenDish.price.replace('.', ',')
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



    <Loader v-if="isLoading"></Loader>
    <div v-else>
         <main>
            <div class="container d-block d-lg-none">
                <div class="row d-flex justify-content-end">
                    <div class="col-2 col-md-1 margin_top  text-center d-flex justify-content-end ">
                        <div class="chart-button p-3 mt-5" type="button"  data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                            <i class="fa-regular fa-cart-shopping fw-bold fa-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="container ">
                <div class="row ">

                    <!-- visulizzazione ristorante scelto -->
                        <div class="col-12 margin_top d-flex justify-content-center ">
                            
                            <img :src="restaurant.logo == null ? 'https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-1-580x348.jpg':`${store.photoUrl}/storage/${restaurant.logo}`" class="image_cover ">
                            
                            <div class="align-self-center mx-2">
                                <div class=" fw-semibold fs-2">
                                    {{ restaurant.business_name }}
                                </div>
                                <p class="card-text">{{ restaurant.address }}</p>
                            </div>  
                        </div>

                        <div class="col-12  d-flex " >

                            <!-- visulizzazione del menu -->
                            <div class="col-12 col-lg-7 mt-5">
                                <div  v-for="dish, index in store.Menu" :key="index" >
                               
                                    <!-- controllo che il piatto sia visibile -->
                                    <div class="bg-dish my-4 p-3 " v-if="(dish.visible==true)" >
                                        <!-- controllo che il piatto non sia eliminato -->
                                        <div v-if="(dish.is_delete==false)" class="col-12 d-flex align-items-center flex-wrap mb-3 justify-content-between">
                    
                                            <div class="col-12 col-lg-4 m-2">
                                                <img :src="dish.image == null ? 'https://www.leggimenu.it/wp-content/uploads/2023/02/menu-digitale-online-delivery.jpg':`${store.photoUrl}/storage/${dish.image}`" class="size_dishimage box_shadow rounded">
                                            </div>
                                            <div class="col-12  col-lg-5 d-flex flex-column ">
                                                <div>
                                                    <div class="fw-semibold text-capitalize fs-3">{{dish.name}}</div>
                                                    <div class="fs-6">{{dish.ingredients}}</div>
                                                    <div class="my-2">{{dish.description}}</div>
                                                </div>
                                                <div class="align-self-end my-1">
                                                    <div class="fw-bold me-5">€{{dish.price.replace(".",",")}}</div> 
                                                </div>
                                                
                                            </div>
                                            <div class="col-12 col-lg-2 d-flex justify-content-end d-lg-block ">
                                                <button type="button" class="btn btn-sm btn_add_  " data-bs-toggle="modal" data-bs-target="#modal-pieces" @click="addDish(dish)">
                                                    <div class="fw-semibold">Aggiungi all'ordine</div>
                                                </button>
                                            </div>
                                        
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        <!-- visualizzazzione del carrello -->
                            <div class="d-none d-lg-block col-5 ">
                                <div class="d-flex justify-content-end ">
                                    
                                    <div class="card p-3 border_carrello" style="width:80%;">
                                    <!--   <button @click="delete_storage()" class="btn_add_two btn-sm p-1">Svuota carrello</button> -->
                                        <h3 class="fs-4 text-center green_color fw-semibold my-2">Carrello</h3>
                                    
                                        <Chart :carrello='this.carrello'/> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>   
        </div> 
    <!-- modale -->
    <div class="modal" tabindex="-1" id="modal-pieces">

        <div v-if=" this.carrello.length == 0 ||  this.carrello[0].restaurant_id == ChosenDish.restaurant_id">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg_color_">
                <div class="modal-header">
                    <h5 class="modal-title  fw-semibold">Seleziona i pezzi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-between">
                    <div>
                        <div class="fw-semibold text-capitalize fs-3">{{ChosenDish.name}}</div>
                        <div class="fs-6">{{ChosenDish.ingredients}}</div>
                        <div class="fs-5">{{ChosenDish.description}}</div>     
                    </div>
                    <div>
                        <img :src="ChosenDish.image== null ? 'https://www.leggimenu.it/wp-content/uploads/2023/02/menu-digitale-online-delivery.jpg':`${store.photoUrl}/storage/${ChosenDish.image}`" alt="" class="size_dishimage">
                    </div>  
                </div>
                <div class="d-flex justify-content-end px-2">

                    <div class="fs-5 fw-bold">€{{modalPrice}}</div>

                </div>
                <div class="modal-footer">
                    <span>
                        <button type="button" class="btn btn_add_two" :class="(NumberofPieces == 1 ) ?  'disabled bg-white border-secondary': ''" @click="removepieces()" id="minusbtn"><i class="fa-solid fa-minus"></i></button>
                    </span>
                    <span>
                        <div class="mx-2">{{NumberofPieces}}</div>
                    </span>
                    <span>
                        <button type="button" class="btn btn_add_two" @click="addpieces()"><i class="fa-solid fa-plus"></i></button>
                    </span>
                    
                    <button type="button" id="empty_modal" class="btn btn_add_ ms-3" @click="addtoChart(ChosenDish)" data-bs-dismiss="modal">Aggiugi al carrello</button>
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
                        <button type="button" class="btn btn-success border" data-bs-dismiss="modal" @click="tornaAlRistoranteDelPrimoPiatto()">Torna al ristorante</button>
                         <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="delete_storage()">svuota carrello</button>                
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- offcanvas -->

    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"  data-bs-scroll="true"  data-bs-backdrop="false" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title fs-4 text-center green_color fw-semibold my-2" id="offcanvasExampleLabel">Carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body ">
            <div class="card p-3 border_carrello" style="width:100%;">
            <Chart :carrello='this.carrello'/> 
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

.image_cover {
    object-fit: cover;
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

.border_carrello {
    border-radius: 35px;
}

.size_dishimage {
    width: 200px;
    height: 150px;
    object-fit: cover;
}

/* .line {
    border: 2px solid rgb(48, 110, 92);
}
 */
.bg-dish {
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(194, 193, 193);
    border-radius: 10px;

}

.box_shadow {
    box-shadow: 10px 10px 5px rgb(45, 74, 66);
}

.chart-button {
    position: fixed;
    z-index: 1;
    color: rgb(255, 255, 255);
    background-color: rgb(249, 119, 119);
    border-radius: 50%;

    &:hover {
        background-color: rgb(254, 76, 76);
        border: 1px solid red;
    }
}
</style>