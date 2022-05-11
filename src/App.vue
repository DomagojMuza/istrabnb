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

<style>
@import "@/assets/base.css";

* { padding: 0; margin: 0; }
#app {
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  color: black;
}

.comp-navbar{
  min-height: 4vh;
  position: absolute;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 2;
  font-size: 22px;
}

.comp-navbar .navbar-nav .nav-link{
  color: whitesmoke;
}

.navbar-light .navbar-nav .nav-link:hover{
  color:aliceblue !important;
}

.wrapper{
  min-height: 100vh;
}
@media only screen and (max-width: 1024px) {
  .comp-navbar{
    position: inherit;
    min-height: 2vh !important;
    padding: 1vh !important;
  }

  .wrapper{
  min-height: 96vh;
}
}

.navbar-toggler{
  background-color: black;
}

.grad{
  background-image: linear-gradient(90deg, #ff0084, #33001b);
}

.router-link-active, .router-link-exact-active{
  color: whitesmoke !important;
}

</style>
