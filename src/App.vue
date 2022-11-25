<script setup>
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div class="position-relative grad">
    <Navbar class="comp-navbar" />
    <RouterView class="wrapper" />
  </div>

</template>

<script>
import { tokenValidation } from '@/middleware/axios.js'

export default {
  async created()
  {
    try {
      this.$store.token = localStorage.getItem('token') ?? '';
      if (this.$store.token)
      {
        let valid = await tokenValidation(this.$store.token);
        if (! valid.data) {
          localStorage.removeItem('token');
          this.$store.token = null;
        }
      }
    } catch (error) {
    }
  }
}
</script>

<style>
@import "@/assets/base.css";


* { 
  padding: 0; 
  margin: 0; 
  --main-bg-color: #EAEAEA;
  font-family: 'Roboto', sans-serif;
}

#app {
  font-family: 'Roboto', sans-serif;
  /* height: 100vh;
  min-height: 100vh; */
  color: black;
  background-color: whitesmoke;
}

.comp-navbar{
  position: absolute;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 2;
  font-size: 22px;
}

/* .comp-navbar .navbar-nav .nav-link{
  color: whitesmoke;
}

.navbar-light .navbar-nav .nav-link:hover{
  color:aliceblue !important;
} */



@media only screen and (max-width: 1024px) {

}

.navbar-toggler{
  background-color: black;
}

.pointer {
  cursor: pointer ;
}
/* .router-link-active, .router-link-exact-active{
  color: whitesmoke !important;
} */


</style>
