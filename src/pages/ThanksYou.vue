<script>
import Loader from '../components/Loader.vue';
import { store } from '../store.js';

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
                        <h5 class="margin-top-75">Ordine</h5>
                        <!-- <ul class="list-unstyled border-start  border-danger p-3 mt-3">
                            <li v-for="product, index in store.OrderProducts" :key="index">
                                {{product.name}}
                                {{product.quantity}}
                                {{product.price}}
                            </li>
                        </ul> -->
                        <div class="col-4">
                            <div class="bg-white p-4 border-start border-danger">
                                <div class="row">
                                    <div class="col-12">
                                        <table class="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Prodotto</th>
                                                    <th scope="col">Quantità</th>
                                                    <th scope="col">Prezzo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="product, index in store.OrderProducts" :key="index">
                                                    <td>{{product.name}}</td>
                                                    <td>{{product.quantity}}</td>
                                                    <td>{{product.price}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
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

.bg-white {
    background-color: white;
}

.margin-top {
    margin-top: 90px;
}

.margin-top-75 {
    margin-top: 75px;
}
</style>