<script>
import { store } from '../store.js';
import useLocalStorage from '../js/useLocalStorage';
export default {
    data() {
        return {
            store,
            OrderCustomer: [],
            OrderProducts: []

        }
    },
    mounted() {
        this.OrderCustomer = useLocalStorage(store.OrderCustomer, 'OrderCustomer'),
            this.OrderProducts = useLocalStorage(store.OrderProducts, 'OrderProducts').value
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    },
    computed: {
        totalPrice() {
            return this.OrderProducts.reduce((total, product) => total + product.price * product.quantity, 0);
        },
    },
}
</script>
<template lang="">

        <div class="container padding-top-75">
            <div class="row">
                <div class="col-12">
                    <div class="text-center fw-bold border-none">
                        <h1>Grazie per averci scelto!</h1>
                        <h3>Il tuo ordine sarà pronto a breve.</h3>
                    </div>
                    <div>
                    <ul class="list-unstyled border-start  border-danger p-3 mt-3">
                            <li><strong>Cliente:</strong> {{OrderCustomer.name}}</li>
                            <li><strong>Indirizzo:</strong> {{OrderCustomer.address}}</li>
                            <li><strong>Email:</strong> {{OrderCustomer.mail}}</li>
                            <li v-if="store.OrderCustomer.phone !=''"><strong>Telefono:</strong> {{OrderCustomer.phone}}</li>
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
                                                <tr v-for="product, index in OrderProducts" :key="index">
                                                    <td>{{product.name}}</td>
                                                    <td>{{product.quantity}} pz</td>
                                                    <td>{{product.price}}€</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th scope="row">Totale</th>
                                                    <td></td>
                                                    <th>{{totalPrice}}€</th>
                                                </tr>
                                            </tfoot>
                                        </table>
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