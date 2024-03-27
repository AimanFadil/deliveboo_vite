<script>
import {store} from '../store.js';
import axios from 'axios';

export default {
    
}
</script>
<template lang="">
    <div>
        
    </div>
</template>
<style lang="">
    
</style>
<script>
import {store} from '../store.js';
import axios from 'axios';
export default {
    name: 'Restaurant',
  data(){
        return{
            store,
            restaurants : [],
            SelectedRestaurants: []
        }
    },
    created() {
        this.getRestaurant()

    },
    methods: {
        getRestaurant() {
            axios.get(`${this.store.Url}api/restaurant`).then((response) => {
                console.log(response.data.results)
                this.restaurants = response.data.results;
                
            })
        }
        

    },

}
</script>
<template lang="">
<div class="container">
    <div class="row">
        
        <div class="col-12" v-for="(restaurant, index) in restaurants">
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