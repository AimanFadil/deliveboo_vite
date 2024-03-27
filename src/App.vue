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
    <div class="pt-5 jumbotron_">
      <div class="mt-5 col-md-4 col-sm-12 p-5">
        <div class="slogan_ fs-2 bg-sm-danger card_">
            Deliveboo, il tuo cibo preferito direttamente a casa tua in men che non si dica
        </div>
        </div>
    </div>
    <main>
       <router-view></router-view>
    </main>
    <Footer/>
</div>
</template>

<style lang="scss">
@use './styles/generals.scss';

.jumbotron_{
  background-image: url('./assets/jumbotron-deliveboo.png');
  background-size:cover;
  background-position:center;
  width: 100vw;
  height: 80vh;
  .slogan_{
    font-weight: bolder;
    color:rgb(254,107,107) ;
    text-shadow: 2px 2px rgb(57, 57, 57)
  }
  .card_{
    background-color: green;
    padding: 5px;
  }
}

main{
background: rgb(254,107,107);
background: linear-gradient(0deg, rgba(254,107,107,1) 0%, rgba(131,225,202,1) 89%); 
width: 100vw;
height: 100vh;
}

</style>