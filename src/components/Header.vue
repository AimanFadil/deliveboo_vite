<script>
import {store} from '../store.js';
export default {
    name: 'Header',
    el: '#navbar',
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
                              <div class="fw-bold color_text_header">
                                <router-link :to="{ name: 'home' }" class="color_text_header">
                                    Home</router-link>
                              </div>
                          </div>  
                      </div>
                </div>
            </nav>
        </div>
      </header>
</template>

<style lang="scss" scoped>

@use '../styles/generals.scss' as*;
@use '../styles/partials/variables.scss' as*;

nav {
        position: fixed;
        width: 100%;
        height: 70px;
        background-color: transparent;
        display: flex;
        align-items: center;
        transition: all .2s ease-in-out;
        

        &.onScroll {
            box-shadow: 5px 5px 5px rgb(45, 74, 66);
            background-color: #fff;
            border-bottom: 2px solid rgba(189, 189, 189, 0.63);
        }
        .size_{
            width: 150px;
          }

        .color_text_header{
            color: $red-light;
            text-decoration: none;
        
          }
    }

</style>
