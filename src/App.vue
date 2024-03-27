<script>
import { store } from './store.js';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
  components: {
    Header,
    Footer

  },
  data() {
    return {
      store
    }
  }
}
</script>

<template lang="">
<div>
    <Header/>
    <router-view></router-view>
    <Footer/>
</div>
</template>

<style lang="scss">
@use './styles/generals.scss';
</style>