<script>
import { store } from './store.js';
import axios from 'axios';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';


export default {
  components: {
    Header,
    Footer


  },
  data() {
    return {
      store,
      typologies: [],
    }
  },
  created(){
    this.getTypology()
  },
  methods: {
    getTypology(){
      axios.get(`${this.store.Url}/typology`).then((response) => {
        this.typologies = response.data.results;
        console.log(this.typologies);
      })
    }
  }
}
</script>

<template lang="">
<div>

    <Header/>
    <router-view></router-view>
    <Footer/>

  
  <!-- <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="typology" v-for="typology in typologies" :key="index">
          <input type="checkbox" name="typology" id="typology">
          <label for="typology">{{typology.name}}</label>
        </div>
      </div>
    </div>
  </div> -->

</template>

<style lang="scss">
@use './styles/generals.scss';
</style>