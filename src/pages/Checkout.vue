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
      },
      mailError: true
    }
  },
  mounted() {
    this.TakeToken()

  },
  methods: {
    validateCampi() {
      if (store.formOrder.name && store.formOrder.mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) && store.formOrder.address != '') {
        this.isPaymentVisible = true;
      } else {
        this.mailError = false;

      }
      return;
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
      }, function (err, clientInstance) {
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
        }, function (err, hostedFieldsInstance) {
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
          hostedFieldsInstance.on('validityChange', function (event) {
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

          hostedFieldsInstance.on('cardTypeChange', function (event) {
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

          form.submit(function (event) {
            event.preventDefault();

            var formIsInvalid = false;
            var state = hostedFieldsInstance.getState();

            Object.keys(state.fields).forEach(function (field) {
              if (!state.fields[field].isValid) {
                $(state.fields[field].container).addClass('is-invalid');
                formIsInvalid = true;
              }
            });

            if (formIsInvalid) {
              return;
            }

            hostedFieldsInstance.tokenize(function (err, payload) {
              if (err) {
                console.error(err);
                return;
              }

              // This is where you would submit payload.nonce to your server
              try {
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
                axios.post(`${store.Url}/orders/customer`, { ...store.formOrder })
                store.formOrder = []
                localStorage.clear()
                router.push({ path: '/ThanksYou' })
              }
              catch (err) {
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

                      <label for="nome">Nome e Cognome
                        <span class="text-danger fw-bold">*</span>
                      </label>
                      <input type="text" class="form-control" name="nome" id="nome" required v-model='store.formOrder.name'>
                    </div>
                  
                    <div class="my-4">
                      <label for="mail">Mail
                        <span class="text-danger fw-bold">*</span>
                      </label>
                      <input type="mail" class="form-control" name="mail" id="mail" required v-model='store.formOrder.mail'>

                      <div class="error-message" v-show=" !mailError ">
                        Inserisci la mail valida
                      </div>
                    </div>
                    
                  
                    <div class="my-4">
                      <label for="address">Indirizzo
                        <span class="text-danger fw-bold">*</span>
                      </label>
                      <input type="text" class="form-control" name="address" id="address" required v-model='store.formOrder.address'>

                    </div>

                    <div class="my-4">
                      <label for="phone">Telefono</label>
                      <input type="text" class="form-control" name="phone" id="phone" v-model='store.formOrder.phone'>
                    </div>
                    
                    <div class="col-12 d-flex justify-content-between align-items-center">
                      <button  class="button button--small button--green p-1" @click="validateCampi()" >Procedi al Pagamento</button>
                      <div>
                        i campi contrassegnati con " <strong class="text-danger">*</strong> " sono obbligatori
                      </div>
                  </div>

                  </div>

                    <div v-show="isPaymentVisible">
                      <div class="bootstrap-basic">
                        <form class="needs-validation" novalidate="">     
                          <div class="row flex-column">
                            <div class="col-sm-6 mb-3">
                              <label for="cc-number">Numero Carta di Credito</label>
                              <div class="d-flex justify-content-between">
                                <div class="form-control mt-2 height-35" id="cc-number"></div>
                                <span class="d-flex justify-content-around align-items-center ms-4">
                                  <i class="fa-brands fa-cc-visa font-30"></i>
                                  <i class="fa-brands fa-cc-mastercard font-30 p-2"></i>
                                  <i class="fa-brands fa-cc-jcb font-30"></i>
                                </span>
                              </div>
                              <div class="invalid-feedback">
                                  Numero carta di credito richiesto
                              </div>
                            </div>
                            <div class="col-sm-3 mb-3">
                                <label for="cc-expiration">Scadenza</label>
                                <div class="form-control mt-2 height-35" id="cc-expiration"></div>
                                <div class="invalid-feedback">
                                    Data di scadenza richiesta
                                </div>
                            </div>
                            <div class="col-sm-3 mb-3">
                                <label for="cc-expiration">CVV</label>
                                <div class="form-control mt-2 height-35" id="cc-cvv"></div>
                                <div class="invalid-feedback">
                                    Codice di sicurezza richiesto
                                </div>
                            </div>
                          </div>

                          <hr class="mb-4">
                          <div class="text-start">
                              <button class="button button--small button--green p-1" type="submit">Paga con <span id="card-brand"></span></button>
                          </div>
                        </form>
                      </div>
                      <!-- <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
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
                      </div> -->
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
                              <td>{{ (product.price *product.quantity).toFixed(2).replace(".",",")  }}€</td>
                            </tr>
                          </tbody>
                            <tr>
                              <td colspan="2"><strong>Totale</strong></td>
                              <td>{{TotalPrice().replace(".",",")}}€</td>
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

.error-message {
  color: #dc3545;
  font-size: 12px;
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

.height-35 {
  height: 35px;
}

.font-30 {
  font-size: 30px
}
</style>