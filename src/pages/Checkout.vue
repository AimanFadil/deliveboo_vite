<script>
import { store } from '../store.js';
import Chart from '../components/Chart.vue';
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
      store,
      TokenApi: '',
      formChart: {
        token: '',
        products: useLocalStorage(store.Chart, 'Chart').value
      }
    }
  },
  mounted() {
    this.TakeToken()
  },
  methods: {
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

            // This is where you would submit payload.nonce to your server
            alert('Submit your nonce to your server here!' + payload.nonce);
          });
        })
      });
    },
    buy() {
      this.formChart.token = "fake-valid-nonce"
      console.log(this.formChart)
      axios.post(`${this.store.Url}/orders/makePayment`, { ...this.formChart })
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

                    <form action="./HomeApp.vue" class="p-3 bg_color_header rounded w-50" method="post">

                      
                        <h5 class="fw-bold my-4">Dati di spedizione:</h5>
                      
                        <div class="my-4">
                          <label for="nome">Nome e Cognome</label>
                          <input type="text" class="form-control" name="nome" id="nome" required>
                        </div>
                      
                        <div class="my-4">
                          <label for="mail">Mail</label>
                          <input type="mail" class="form-control" name="mail" id="mail">
                        </div>
                      
                        <div class="my-4">
                          <label for="indirizzo">Indirizzo</label>
                          <input type="text" class="form-control" name="indirizzo" id="indirizzo" required>
                        </div>
                      
                        <div class="my-4">
                          <label for="cap">CAP</label>
                          <input type="text" class="form-control" name="cap" id="cap" required>
                        </div>
                      
                        <div class="my-4">
                          <label for="citta">Città</label>
                          <input type="text" class="form-control" name="citta" id="citta" required>
                        </div>

                        <div class="my-4">
                          <label for="telefono">Telefono</label>
                          <input type="text" class="form-control" name="telefono" id="telefono" required>
                        </div>

                        <h5 class="fw-bold">Metodi di pagamento:</h5>
                      
                        
                      </form>
                      <form action="#" method="post">

                      </form>
                      <div id="dropin-container"></div>
                      <button id="submit-button" class="button button--small button--green" @click="buy()">Purchase</button>

                      
                </div>  
            </div>

            <!-- carrello -->
            <div class="col-4 margin-top ">
                <div class="bg-white p-4 rounded border border-dark">
                    <!-- <Chart/> -->
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