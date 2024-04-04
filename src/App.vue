<script>
import { store } from './store.js';
import Loader from './components/Loader.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
  components: {

    Header,
    Footer,
    Loader

  },

  data() {
    return {
      store,
      isLoading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }
}
</script>

<template lang="">
<div calss="d-flex flex-column ">

  <Header/>
  <Loader v-if="isLoading"/>
  <router-view></router-view>
  
  <Footer/>

</div>
</template>

<style lang="scss">
@use './styles/generals.scss';
</style>