<script>
import { store } from '../store.js';
export default {
    name: 'RestaurantMenuApp',
    data() {
        return {
            store,
            NumberofPieces:0,
            showModal: false,
            ChosenDish:[],
        }
      
    }, 
     methods: {
        addpieces(){
            this.NumberofPieces= this.NumberofPieces+1
        },
        removepieces(){
            if(this.NumberofPieces>0){
                this.NumberofPieces= this.NumberofPieces-1
            }
        },
        addDish(dish){
            this.ChosenDish=[];
            this.ChosenDish=dish;
        },
        addtoChart(ChosenDish){
            let flag= false;
                this.store.Chart.forEach((elem)=> {
                    if(elem.id==ChosenDish.id){
                        flag=true;
                       elem.quantity= elem.quantity+this.NumberofPieces
                        }         
                    });
                    if(!flag){
                        let item={
                        quantity: this.NumberofPieces,
                        id: ChosenDish.id,
                        name: ChosenDish.name,
                        prezzo: ChosenDish.price,
                        id_ristorante: ChosenDish.restaurant_id,  
                
                        }
                        this.store.Chart.push(item); 
                    };
               this.NumberofPieces=0;
        }
    }        
}
</script>
<template lang="">
    <div>
         <main>
            <div class="container ">
                <div class="row ">
                    <div class="col-12 margin_top" >
                        <!-- visulizzazione del menu -->
                        <div class="col-8 mt-5">
                            <div  v-for="dish, index in store.Menu" :key="index">
                                <!-- controllo che il piatto sia visibile -->
                                <div v-if="(dish.visible==true)">
                                    <!-- controllo che il piatto non sia eliminato -->
                                    <div v-if="(dish.is_delete==false)" class="col-12 d-flex">
                                        <div class="col-4">
                                            <img :src="dish.image" alt="" style="width:200px">
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
                    <!-- visualizzazzione del carrello -->
                            <div class="col-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>   
    </div>
    <!-- modale -->
    <div class="modal" tabindex="-1" id="modal-pieces">
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
                    <button type="button" class="btn btn-warning" :class="(NumberofPieces ==0 ) ?  'disabled bg-secondary': ''" @click="removepieces()" id="minusbtn"><i class="fa-solid fa-minus"></i></button>
                </span>
                <span>
                    <button type="button" class="btn btn-warning">{{NumberofPieces}}</button>
                </span>
                <span>
                    <button type="button" class="btn btn-warning" @click="addpieces()"><i class="fa-solid fa-plus"></i></button>
                </span>
                
                <button type="button" class="btn btn-success" @click="addtoChart(ChosenDish)" data-bs-dismiss="modal">Aggiugi al carrello</button>
            </div>
            </div>
        </div>
    </div>

</template>s

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;
@use '../styles/partials/variables.scss' as*;
.bg_color_{
 background-color:white;
}
</style>