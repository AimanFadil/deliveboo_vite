<script>
import {store} from '../store.js';
export default {
    name: 'Footer',
  data(){
    return{
      store,
    }   
    },

}
</script>
<template lang="">
  <footer class="mt-5">
        <div class="content background-green-footer">
            <svg viewBox="0 0 500 100">
                <path d="M 0 70 C 150 100 280 0 500 70 L 500 0 L 0 0" fill="rgb(255, 255, 255)"></path>
            </svg>
            <div class="row d-flex flex-wrap">
                <div class="col-12">
                    <h3 class="fw-semibold fs-3 text-white px-5 text-center "> Grazie per aver scelto Deliveboo. Per informazioni o assistenza contattateci ai recapiti sottostanti. Buon
                        appetito! </h3>

                </div>

                <div class="row d-flex justify-content-between px-5">
                   <!--  {{-- contacts  --}} -->
                    <div class="col-md-4 col-sm-12 p-4 text-white ">
                        <h5 class=" fw-bold">Contatti:</h5>

                        <div class="my-4 red-hover">
                            <i class="fa-solid fa-phone "></i> <span>+39 346 471 4065</span>
                        </div>

                        <div class="my-4 red-hover">
                            <i class="fa-solid fa-envelope  "> <span
                                    class="text-decoration-none">Deliveboo@delivery.com</span></i>
                        </div>

                        <div class="my-4">
                            <a href="" class="text-decoration-none text-white"><i
                                    class="fa-brands fa-square-facebook fa-xl me-2 red-hover"></i>
                            </a>
                            <a href="" class="text-decoration-none text-white"><i
                                    class="fa-brands fa-brands fa-instagram fa-xl me-2 red-hover"></i>
                            </a>
                            <a href="" class="text-decoration-none text-white"><i
                                    class="fa-brands fa-tiktok fa-lg me-2 red-hover"></i></a>
                            <a href="" class="text-decoration-none text-white"> <i
                                    class="fa-brands fa-square-x-twitter fa-xl me-2 red-hover"></i>
                            </a>
                            <a href="" class="text-decoration-none text-white"><i
                                    class="fa-brands fa-linkedin fa-lg me-2 red-hover"></i>
                            </a>
                        </div>
                    </div>

                    <!-- {{-- partner section --}} -->
                    <div class="col-md-3 col-sm-12 p-4 d-flex flex-wrap text-white">
                        <div class="col-12">
                            <h5 class=" fw-bold">Alcuni dei nostri partner:</h5>
                        </div>
                        <div class="col-6">
                            <img src="https://centrolecupole.com/wp-content/uploads/2021/02/BAR_CUPOLE5.png" alt=""
                                class="w-100 bg-orange">
                        </div>
                        <div class="col-6">
                            <img src="https://www.rundesign.it/wp-content/uploads/2023/08/kfc.jpg" alt=""
                                class="w-100 h-100">
                        </div>
                        <div class="col-6">
                            <img src="https://img.freepik.com/premium-vector/japanese-sushi-restaurant-logo-design-inspiration_500223-504.jpg"
                                alt="" class="w-100">
                        </div>
                        <div class="col-6">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMF73iboJ_swOO9cEnjqV7HtcqMjUNT7mKUPKpGBu_A&s"
                                alt="" class="w-100  ">
                        </div>
                    </div>

                    <div class="col-12">
                        <hr class="text-white fw-bolder">
                    </div>

                </div>

                <!-- {{-- copyrigth section --}} -->
                <div class="col-12 text-white p-5">
                    © 2023 Deliveboo. Tutti i diritti riservati. Il contenuto di questo
                    sito web, compresi testi, grafica, loghi, icone, immagini, è di proprietà esclusiva
                    di Deliveboo o dei suoi fornitori di contenuti e sono protetti dalle leggi sul copyright
                    internazionale. È vietata la riproduzione, la distribuzione, la modifica o l'utilizzo non autorizzato di
                    qualsiasi parte del contenuto di questo sito, salvo previa autorizzazione scritta da parte di Deliveboo.
                    Per richieste di utilizzo o informazioni aggiuntive, si prega di contattare
                    Deliveboo@delivery.com.

                    Alcuni materiali presenti su questo sito possono essere soggetti a diritti d'autore di terze parti, e
                    l'uso non autorizzato di tali materiali può costituire una violazione dei diritti di tali terze parti.

                    Tutte le marche registrate utilizzate su questo sito sono di proprietà dei rispettivi proprietari.
                </div>
            </div>
        </div>
    </footer>

</template>

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;

.background-green-footer {
    background-color: rgb(12, 41, 45);
    .text-shadow {
    text-shadow: 3px 3px rgb(160, 160, 160)
  }
  .red-hover {
    &:hover {
        color: rgb(249, 119, 119);
        transition-duration: 0.6s;
    }

}    .bg-orange {
    background-color: #F5962A;
}
}



    
</style>