<script setup>
    import { RouterLink } from "vue-router";
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/about">About</RouterLink>
            </li>
        </ul>  
      <form class="d-flex">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
        </ul>  
      </form>
    </div>
  </div>
</nav>
</template>

<style scoped>
.navbar{
    padding: 0;
}
</style>