<script>
import { store } from '../store.js';
import Chart from '../components/Chart.vue';
export default {
    name: 'Checkout',
    components: {
        Chart,
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        
        mounted() {
            var button = document.querySelector('#submit-button');
                            
                            braintree.dropin.create({
                            // Insert your tokenization key here
                            authorization: '<use_your_tokenization_key>',
                            container: '#dropin-container'
                            }, function (createErr, instance) {
                            button.addEventListener('click', function () {
                                instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                                // When the user clicks on the 'Submit payment' button this code will send the
                                // encrypted payment information in a variable called a payment method nonce
                                $.ajax({
                                    type: 'POST',
                                    url: '/checkout',
                                    data: {'paymentMethodNonce': payload.nonce}
                                }).done(function(result) {
                                    // Tear down the Drop-in UI
                                    instance.teardown(function (teardownErr) {
                                    if (teardownErr) {
                                        console.error('Could not tear down Drop-in UI!');
                                    } else {
                                        console.info('Drop-in UI has been torn down!');
                                        // Remove the 'Submit payment' button
                                        $('#submit-button').remove();
                                    }
                                    });
                        
                                    if (result.success) {
                                    $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
                                    } else {
                                    console.log(result);
                                    $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
                                    }
                                });
                                });
                            });
                            });
        },
    }

    }
    </script>
    <template lang="">
    <div class="container-fluid bg-white">
        <div class="row">
            <!-- lista metodi di pagamento -->
            <div class="col-8 margin-top">
                <div class="bg-white p-4 rounded border border-dark">

                    <form action="" class="p-3 bg_color_header rounded w-50" method="post">

                      
                        <h5 class="fw-bold my-4">Dati di spedizione:</h5>
                      
                        <div class="my-4">
                          <label for="nome">Nome e Cognome</label>
                          <input type="text" class="form-control" name="nome" id="nome" required>
                        </div>
                      
                        <div class="my-4">
                          <label for="citofono">Citofono (se presente)</label>
                          <input type="text" class="form-control" name="citofono" id="citofono">
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
                          <label for="provincia">Provincia</label>
                          <select name="provincia" id="provincia" class="form-select" required>
                            <option value="">Seleziona...</option>
                            <option value="AG">Agrigento</option>
                            <option value="AL">Alessandria</option>
                            </select>
                        </div>

                        <h5 class="fw-bold">Metodi di pagamento:</h5>
                      
                        <div class="d-flex text-center my-4 justify-content-between align-items-center">
                          <input type="radio" name="pagamento" id="carta_credito" value="carta_credito" checked>
                          <label for="carta_credito" class="ms-2">Carta di credito</label>
                      
                          <i class="fa-brands fa-cc-visa me-3 fs-1"></i>
                          <i class="fa-brands fa-cc-mastercard me-3 fs-1"></i>
                        </div>

                        <div class="d-flex text-center my-3 justify-content-between align-items-center">
                            <span>
                                <input type="radio" name="pagamento" id="paypal" value="paypal">
                                <label for="paypal" class="ms-2">Paypal</label>
                            </span>

                            <span>
                                <i class="fa-brands fa-cc-paypal me-3 fs-1"></i>
                            </span>
                        </div>
                      
                        <div class="d-flex text-center my-4 align-items-center">
                          <input type="radio" name="pagamento" id="contanti" value="contanti">
                          <label for="contanti" class="ms-2">Contanti</label>
                        </div>
                      
                        <div id="dropin-wrapper">
                            <div id="checkout-message"></div>
                            <div id="dropin-container"></div>
                            <button id="submit-button" class="btn btn-success">Submit payment</button>
                          </div>
                      </form>

                </div>
            </div>
            <!-- carrello -->
            <div class="col-4 margin-top ">
                <div class="bg-white p-4 rounded border border-dark">
                    <Chart/>
                </div>
            </div>
        </div>
    </div>
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