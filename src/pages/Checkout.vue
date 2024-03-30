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
  }
}
</script>
<template lang="">
    <div class="container-fluid">
        <div class="row">
            <!-- lista metodi di pagamento -->
            <div class="col-8 mt-5">
                <div class="bg-white p-4 rounded">

                    <form action="URL_AZIONE" class="p-3 bg_color_header rounded w-50" method="post">

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
                      
                        <button type="submit" class="btn btn-primary w-100">Conferma ordine</button>
                      
                      </form>
                      



                </div>
            </div>
            <!-- carrello -->
            <div class="col-4 mt-5">
                <div class="bg-white p-4 rounded">
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
</style>