<script>
import { store } from '../store.js';
import Chart from '../components/Chart.vue';
import { router } from '../router.js'
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
      if (store.formOrder.name && store.formOrder.mail && store.formOrder.address != '') {

        this.isPaymentVisible = true;

      }
    },
    TakeToken() {
      axios.get(`${this.store.Url}/orders/generate`).then((response) => {
        let token = response.data.token;
        this.TokenApi = token
        this.makeDropin(token, store)
      })
    },
    
    TotalPrice() {
      let price = 0;
      this.checkoutProducts.forEach(element => {
        price += element.price * element.quantity

      });
      return price.toFixed(2)
    },
    makeDropin(token, store) {
      // let form = document.getElementById('cardForm');
      var form = $('form');

      braintree.client.create({
        authorization: token
      }, function(err, clientInstance) {
        if (err) {
            console.error(err);
            return;
        }

        braintree.hostedFields.create({
          preventAutofill: false,
          client: clientInstance,
          styles: {
            input: {
              'font-size': '1rem',
              color: '#495057'
            }
          },
          fields: {
            number: {
              selector: '#cc-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cc-cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#cc-expiration',
              placeholder: 'MM / YY'
            }
          }
          }, function(err, hostedFieldsInstance) {
          if (err) {
            console.error(err);
            return;
          }
          function createInputChangeEventListener(element) {
            return function () {
              validateInput(element);
            }
          }

          function setValidityClasses(element, validity) {
            if (validity) {
              element.removeClass('is-invalid');
              element.addClass('is-valid');  
            } else {
              element.addClass('is-invalid');
              element.removeClass('is-valid');  
            }    
          }
          
          function validateInput(element) {

            if (!element.val().trim()) {
              setValidityClasses(element, false);

              return false;
            }

            setValidityClasses(element, true);

            return true;
          }
          hostedFieldsInstance.on('validityChange', function(event) {
            var field = event.fields[event.emittedBy];

            // Remove any previously applied error or warning classes
            $(field.container).removeClass('is-valid');
            $(field.container).removeClass('is-invalid');

            if (field.isValid) {
              $(field.container).addClass('is-valid');
            } else if (field.isPotentiallyValid) {
              // skip adding classes if the field is
              // not valid, but is potentially valid
            } else {
              $(field.container).addClass('is-invalid');
            }
          });

          hostedFieldsInstance.on('cardTypeChange', function(event) {
            var cardBrand = $('#card-brand');
            var cvvLabel = $('[for="cc-cvv"]');

            if (event.cards.length === 1) {
              var card = event.cards[0];

              // change pay button to specify the type of card
              // being used
              cardBrand.text(card.niceType);
              // update the security code label
              cvvLabel.text(card.code.name);
            } else {
              // reset to defaults
              cardBrand.text('Card');
              cvvLabel.text('CVV');
            }
          });

          form.submit(function(event) {
            event.preventDefault();

            var formIsInvalid = false;
            var state = hostedFieldsInstance.getState();

            Object.keys(state.fields).forEach(function(field) {
              if (!state.fields[field].isValid) {
                $(state.fields[field].container).addClass('is-invalid');
                formIsInvalid = true;
              }
            });

            if (formIsInvalid) {
              return;
            }

            hostedFieldsInstance.tokenize(function(err, payload) {
              if (err) {
                console.error(err);
                return;
              }

              // This is where you would submit payload.nonce to your server
              try{
                  let formChart = {
                  token: '',
                  products: useLocalStorage(store.Chart, 'Chart').value
                  }
                  formChart.token = payload.nonce
                  console.log(formChart)
                  axios.post(`${store.Url}/orders/makePayment`, { ...formChart })
                  store.formOrder.products = useLocalStorage(store.Chart, 'Chart').value
                  store.OrderCustomer = store.formOrder
                  store.OrderProducts = formChart.products
                  axios.post(`${store.Url}/orders/customer`, { ... store.formOrder })
                  store.formOrder =[]
                  localStorage.clear()
                  router.push({ path: '/ThanksYou' })
                }
                catch(err){
                  console.log(err)
                }
                
              })
            })
        })
      })
    }
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
    <div class="container-fluid bg-white z_index">
        <div class="row">
            <!-- lista metodi di pagamento -->
            <div class="col-12 col-lg-8 margin-top">
                <div class="bg-white p-4 rounded border border-dark">
                  <div v-show="!isPaymentVisible">

                    <h5 class="fw-bold my-4">Dati di spedizione:</h5>
                  
                    <div class="my-4">
                      <label for="nome">Nome e Cognome</label>
                      <input type="text" class="form-control" name="nome" id="nome" required v-model='store.formOrder.name'>
                    </div>
                  
                    <div class="my-4">
                      <label for="mail">Mail</label>
                      <input type="mail" class="form-control" name="mail" id="mail" required v-model='store.formOrder.mail'>
                    </div>
                  
                    <div class="my-4">
                      <label for="address">Indirizzo</label>
                      <input type="text" class="form-control" name="address" id="address" required v-model='store.formOrder.address'>
                    </div>
                  

                    <div class="my-4">
                      <label for="phone">Telefono</label>
                      <input type="text" class="form-control" name="phone" id="phone" v-model='store.formOrder.phone'>
                    </div>
                    

                      <button  class="button button--small button--green" @click="validateCampi()" >Mannala</button>
                  </div>

                    <div v-show="isPaymentVisible">
                      <div class="bootstrap-basic">
                        <form class="needs-validation m-5 p-5" novalidate="">     
                          <div class="row">
                            <div class="col-sm-6 mb-3">
                              <label for="cc-number">Credit card number</label>
                              <div class="form-control" id="cc-number"></div>
                              <div class="invalid-feedback">
                                  Credit card number is required
                              </div>
                            </div>
                            <div class="col-sm-3 mb-3">
                                <label for="cc-expiration">Expiration</label>
                                <div class="form-control" id="cc-expiration"></div>
                                <div class="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>
                            <div class="col-sm-3 mb-3">
                                <label for="cc-expiration">CVV</label>
                                <div class="form-control" id="cc-cvv"></div>
                                <div class="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                          </div>

                          <hr class="mb-4">
                          <div class="text-center">
                              <button class="btn btn-primary btn-lg" type="submit">Pay with <span id="card-brand">Card</span></button>
                          </div>
                        </form>
                      </div>
                      <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
                          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
                              <div class="toast-header">
                                  <strong class="mr-auto">Success!</strong>
                                  <small>Just now</small>
                                  <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                  </button>
                              </div>
                          <div class="toast-body">
                              Next, submit the payment method nonce to your server.
                          </div>
                        </div>
                      </div>
                    </div>     
                  </div>  
                </div>

            <!-- carrello -->
            <div class="col-12 col-lg-4 margin-top ">
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
                              <td>{{ (product.price *product.quantity).toFixed(2)  }}€</td>
                            </tr>
                          </tbody>
                            <tr>
                              <td colspan="2"><strong>Totale</strong></td>
                              <td>{{TotalPrice()}}€</td>
                            </tr>
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

.toast {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 9999;
}

.bootstrap-basic {
  background: white;
}

/* Braintree Hosted Fields styling classes*/
.braintree-hosted-fields-focused {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.braintree-hosted-fields-focused.is-invalid {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
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