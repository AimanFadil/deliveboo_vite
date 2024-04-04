<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            store
        }
    }
}
</script>
<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center">
                    <h1>Grazie per aver scelto noi</h1>
                    <h3>Il tuo ordine sarà pronto a breve.</h3>
                </div>
                <div>
                   <ul>
                        <li>nome e cognome: {{store.OrderCustomer.name}}</li>
                        <li>indirizzo: {{store.OrderCustomer.address}}</li>
                        <li>e-mail: {{store.OrderCustomer.mail}}</li>
                        <li v-if="store.OrderCustomer.phone !=''">telefono: {{store.OrderCustomer.phone}}</li>
                   </ul>
                    <h5>Ordine</h5>
                    <ul>
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
</template>
<style lang="">

</style>