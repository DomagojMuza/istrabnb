<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
    <form class="shadow py-3 px-5 border border-0 rounded-3 bg-light" style="margin-top: 100px;">
      <div class="text-center mb-5">
        <p class="h4">Log in</p>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input v-model="body.email" type="email" id="loginName" class="form-control" />
        <label class="form-label" for="loginName">Email or username</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input v-model="body.password" type="password" id="loginPassword" class="form-control" />
        <label class="form-label" for="loginPassword">Password</label>
      </div>

      <!-- Submit button -->
      <button type="button" @click.prevent="logIn" class="btn btn-primary btn-block mb-4">Sign in</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Not a member? <router-link to="/register">Register</router-link></p>
      </div>
    </form>
    </div>

    
</template>

<script>
import { login } from '@/middleware/axios.js'
export default {
  data() {
    return {
      body: {
        email: 'a@a.com',
        password: '12345678'
      }
    }
  },
  methods: {
    async logIn() 
    {
      try {
        let response = await login(this.body)
        console.log(response.data);
        this.$store.token = response.data.token;
        localStorage.setItem('token', this.$store.token)
        this.$router.go({ path: '/' });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>