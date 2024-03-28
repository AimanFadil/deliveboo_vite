<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            restaurant: [],

        }
    },
    created() {
        this.GetResData()

    },
    methods: {
        GetResData() {
            axios.get(`${this.store.Url}/restaurant/${this.$route.params.id}`).then((response) => {
                this.restaurant = response.data.results;

            })
        },

    }
}
</script>
<template lang="">
        <div class="container" >
            <div class="row ">
               <div class="col-12">
                    <div class="card" style="width: 18rem;">
                        <div class="card-body">
                        <h5 class="card-title">menu</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{{ restaurant.business_name }}</h6>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{{ restaurant.address }}</h6>
                        
                        </div>
                    </div>
               </div>
            </div>
        </div>
</template>
<style lang="scss" scoped></style>