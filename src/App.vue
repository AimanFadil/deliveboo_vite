<script>
import { store } from './store.js';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Chart from './components/Chart.vue';


export default {
  components: {
    Chart,
    Header,
    Footer


  },

  data() {
    return {
      store,
    }
  },
}
</script>

<template lang="">
<div>

  <Header/>
  <router-view></router-view>
  <Chart />
  <Footer/>

</div>
</template>

<style lang="scss">
@use './styles/generals.scss';
</style>