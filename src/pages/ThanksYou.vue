<script>
import { store } from '../store.js';
import Loader from '../components/Loader.vue';
import axios from 'axios';

export default {
    data() {
        return {
            store,
            loader: true,

        }
    },
    components: {
        Loader,
    },
    mounted() {
        setTimeout(() => {
            this.loader = false;
        }, 2000);
    },
}
</script>
<template lang="">
    <Loader v-if="loader" />
    <div v-else>
        <div class="container padding-top-75">
            <div class="row">
                <div class="col-12">
                    <div class="text-center fw-bold border-none">
                        <h1>Grazie per averci scelto!</h1>
                        <h3>Il tuo ordine sarà pronto a breve.</h3>
                    </div>
                    <div>
                    <ul class="list-unstyled border-start  border-danger p-3 mt-3">
                            <li><strong>Cliente:</strong> {{store.OrderCustomer.name}}</li>
                            <li><strong>Indirizzo:</strong> {{store.OrderCustomer.address}}</li>
                            <li><strong>Email:</strong> {{store.OrderCustomer.mail}}</li>
                            <li v-if="store.OrderCustomer.phone !=''"><strong>Telefono:</strong> {{store.OrderCustomer.phone}}</li>
                    </ul>
                        <h5>Ordine</h5>
                        <ul class="list-unstyled border-start  border-danger p-3 mt-3">
                            <li v-for="product, index in store.OrderProducts" :key="index">
                                {{product.name}}
                                {{product.quantity}}
                                {{product.price}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.padding-top-75 {
    padding-top: 75px;
}
</style>