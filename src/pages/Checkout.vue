<script>
import { store } from '../store.js';
import Chart from '../components/Chart.vue';
import { router } from '../router.js'
import dropin from 'braintree-web-drop-in';
import useLocalStorage from '../js/useLocalStorage';
// import checkout from '../checkout';
import axios from 'axios';
export default {
  name: 'Checkout',
  components: {
    Chart,
  },
  data() {
    return {
      isPaymentVisible: false,
      valid: false,
      correctForm: false,
      store,
      TokenApi: '',
      formChart: {
        token: '',
        products: useLocalStorage(store.Chart, 'Chart').value
      },
      formOrder: {
        name: '',
        mail: '',
        address: '',
        phone: '',
        products: useLocalStorage(store.Chart, 'Chart').value,
        price: 5
      }
    }
  },
  mounted() {
    this.TakeToken()
  },
  methods: {
    validateCampi() {
      if (this.formOrder.name && this.formOrder.mail && this.formOrder.address != '') {

        this.isPaymentVisible = true;

      }
    },
    TakeToken() {
      axios.get(`${this.store.Url}/orders/generate`).then((response) => {
        let token = response.data.token;
        this.TokenApi = token
        this.makeDropin(token)
      })
    },
    makeDropin(token) {
      let button = document.querySelector('#submit-button');
      braintree.dropin.create({
        authorization: token,
        selector: '#dropin-container'
      }, function (err, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {


            if (err) {
              console.error(err);
              return;
            }
            this.valid = true
            // This is where you would submit payload.nonce to your server
            console.log('ciao')



          });

        })
      });
    },
    buy() {
      if (this.validateCampi()) {
        this.isPaymentVisible = true;

        this.formChart.token = "fake-valid-nonce"
        console.log(this.formChart)
        axios.post(`${this.store.Url}/orders/makePayment`, { ...this.formChart })
        store.OrderCustomer = this.formOrder
        store.OrderProducts = this.formChart.products
        axios.post(`${this.store.Url}/orders/customer`, { ... this.formOrder })
        localStorage.clear()
        router.push({ path: '/ThanksYou' })
      }
    },


  },
  computed: {
    checkoutProducts() {
      return useLocalStorage(store.Chart, 'Chart').value;
    }
  }

}
</script>
<template lang="">

  <main>
    <div class="container-fluid bg-white">
        <div class="row">
            <!-- lista metodi di pagamento -->
            <div class="col-8 margin-top">
                <div class="bg-white p-4 rounded border border-dark">
                  <div v-show="!isPaymentVisible">

                    <h5 class="fw-bold my-4">Dati di spedizione:</h5>
                  
                    <div class="my-4">
                      <label for="nome">Nome e Cognome</label>
                      <input type="text" class="form-control" name="nome" id="nome" required v-model='formOrder.name'>
                    </div>
                  
                    <div class="my-4">
                      <label for="mail">Mail</label>
                      <input type="mail" class="form-control" name="mail" id="mail" required v-model='formOrder.mail'>
                    </div>
                  
                    <div class="my-4">
                      <label for="address">Indirizzo</label>
                      <input type="text" class="form-control" name="address" id="address" required v-model='formOrder.address'>
                    </div>
                  
                    <!-- <div class="my-4">
                      <label for="cap">CAP</label>
                      <input type="text" class="form-control" name="cap" id="cap" required>
                    </div>
                  
                    <div class="my-4">
                      <label for="citta">Città</label>
                      <input type="text" class="form-control" name="citta" id="citta" required>
                    </div> -->

                    <div class="my-4">
                      <label for="phone">Telefono</label>
                      <input type="text" class="form-control" name="phone" id="phone" v-model='formOrder.phone'>
                    </div>
                    

                      <button  class="button button--small button--green" @click="validateCampi()" >Mannala</button>
                  </div>
                        

                        <div v-show="isPaymentVisible">

                          <h5 class="fw-bold" >Prosegui con il pagamento:</h5>
                          <div id="dropin-container" ></div>
                          <button id="submit-button" class="button button--small button--green" @click="buy()" >Purchase</button>
                        </div>
                      

      
                      
                </div>  
            </div>

            <!-- carrello -->
            <div class="col-4 margin-top ">
                <div class="bg-white p-4 rounded border border-dark">
                    <!-- <Chart/> -->
                    <div class="row">
                      <div class="col-12">
                        <h5 class="fw-bold my-4">Riepilogo ordine:</h5>
                        <table class="table table-striped table-hover">
                          <thead>
                            <tr>
                              <th>Nome</th>
                              <th>Quantità</th>
                              <th>Prezzo</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(product, index) in checkoutProducts" :key="index">
                              <td>{{ product.name }}</td>
                              <td>{{ product.quantity }}pz</td>
                              <td>{{ product.price }}€</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@use '../styles/generals.scss' as*;

.bg-white {
  background-color: white;
}

.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}

.margin-top {
  margin-top: 90px;
}
</style>