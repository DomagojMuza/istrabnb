<script setup>
    import { RouterLink } from "vue-router";
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-light" :class="navbar">
  <div class="container-fluid">
    <button class="navbar-toggler" @click="navCollapseEvent()" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <RouterLink class="nav-link" to="/">Home</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/about">About</RouterLink>
            </li>
            <li class="nav-item" v-if="this.$store.token">
                <RouterLink class="nav-link" to="/my">My posts</RouterLink>
            </li>
        </ul>  
      <form class="d-flex">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="!this.$store.token">
                <RouterLink class="nav-link" to="/login">Login</RouterLink>
            </li>
            <li class="nav-item" v-if="!this.$store.token">
                <RouterLink class="nav-link" to="/register">Register</RouterLink>
            </li>
            <li class="nav-item pointer" v-if="this.$store.token" @click="logout">
                <a class="nav-link" >Logout</a>
            </li>
        </ul>  
      </form>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            navbar: '',
        }
    },
    methods: {
    async logout() 
    {
        localStorage.removeItem('token');
        this.$store.token = null;
        this.$router.go({ path: '/' });
    },
    navCollapseEvent()
    {
        this.navbar = this.navbar ? '' : 'opened'; 
    },
    computed: {
        $store () {
            console.log(this.$store.token)
        }
    }
  }
}
</script>

<style scoped>
.navbar{
    padding: 0;
}

@media (max-width: 991.98px) { 
    .opened {
        position: absolute;
        height: 100vh;
        display: block;
        background-color: white;
        transition: all 0.5s;
    }
}

.navbar {
    transition: all 0.5s;
}

.navbar-toggler {
    background-color: transparent;
    border-color: transparent;
}

</style>