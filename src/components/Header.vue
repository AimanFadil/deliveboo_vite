<script>
import { store } from '../store.js';
import Chart from './Chart.vue';
export default {
    name: 'Header',
    el: '#navbar',
    components: {
        Chart,
    },
    data() {
        return {
            view: {
                topOfPage: true,
            },
            store,
        }
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            if (window.pageYOffset > 50) {
                if (this.view.topOfPage) this.view.topOfPage = false
            } else {
                if (!this.view.topOfPage) this.view.topOfPage = true
            }
        }
    },
}
</script>
<template lang="">
    <header class="color_header">
        <div id="navbar">
            <nav :class="{ 'onScroll': !this.view.topOfPage}">
                <div class="container p-2 ">
                    <div class="row d-flex justify-content-between flex-wrap">
                        <div class='w-auto'>
                            <img src="../assets/logo-deliveboo-removedbg.png" alt="" class="size_">
                        </div>

                        <div class="w-auto d-flex align-items-center">

                            <div class="hover-navitem">
                                <a  v-if="$route.path === '/'" class="color_text_header fw-bold pe-3" href="http://127.0.0.1:8000/login/" >
                                    Accedi al Ristorante</a>
                            </div>


                            <div class="fw-bold ">
                                <router-link :to="{ name: 'home' }" class="hover-navitem">
                                    <i class="fa-solid fa-house"></i> Home</router-link>
                            </div>

                            <!-- <button class="btn ps-3 fw-bold d-block d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                <div class="hover-navitem">
                                    <span class="me-1" ><i class="fa-regular fa-cart-shopping fw-bold"></i></span>Carrello
                                </div>
                            </button> -->
                        </div>


<!--                           <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExample">
                            <div class="offcanvas-header bg_color_header text-white">
                                  <h3 class="offcanvas-title fw-bold" id="offcanvasExample">Carrello</h3>
                                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div class="offcanvas-body color_text_header">
                                  <Chart/>

                                  
                                  <router-link :to="{ name: 'checkout' }" class="color_text_header" @click="navigateTCheckout"  >
                                   <button data-bs-dismiss="offcanvas">Vai al checkout</button></router-link>

                            </div>
                        </div>   -->
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../styles/generals.scss' as*;
@use '../styles/partials/variables.scss' as*;

a{
    text-decoration: none;
    color: inherit;
    color : $red-light

}

nav {
    position: fixed;
    width: 100%;
    height: 70px;
    background-color: transparent;
    display: flex;
    align-items: center;
    transition: all .2s ease-in-out;
    z-index: 1;


    &.onScroll {
        box-shadow: 5px 5px 5px rgb(45, 74, 66);
        background-color: #fff;
        border-bottom: 2px solid rgba(189, 189, 189, 0.63);
    }

    .size_ {
        width: 150px;
    }

    .hover-navitem {
        --b: 0.1em;
        /* the thickness of the line */
        --c: rgb(21, 131, 100);
        /* the color */

        color: rgb(249, 119, 119);
        padding-block: var(--b);
        background:
            linear-gradient(var(--c) 50%, #000 0) 0% calc(100% - var(--_p, 0%))/100% 200%,
            linear-gradient(var(--c) 0 0) 0% var(--_p, 0%)/var(--_p, 0%) var(--b) no-repeat;
        -webkit-background-clip: text, padding-box;
        background-clip: text, padding-box;
        transition: .3s var(--_s, 0s) linear, background-size .3s calc(.3s - var(--_s, 0s));
        text-decoration: none;
    }

    .hover-navitem:hover {
        color: rgb(21, 131, 100);
        --_p: 100%;
        --_s: .3s;
    }



    .bg_color_header {
        background-color: $red-light;
    }

}
</style>
