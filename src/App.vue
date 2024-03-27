<script>
import { store } from './store.js';
import axios from 'axios';
export default {
  components: {
  

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
  <router-view></router-view>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="typology" v-for="typology in typologies" :key="index">
          <input type="checkbox" name="typology" id="typology">
          <label for="typology">{{typology.name}}</label>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss">
@use './styles/generals.scss';
</style>