<script>
import { store } from './store.js';

export default {
  components: {
    

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
  <router-view></router-view>
</div>
</template>

<style lang="scss">
@use './styles/generals.scss';
</style>