<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
    <form class="shadow py-3 px-5 border border-0 rounded-3 bg-light">
      <div class="text-center mb-5">
        <p class="h4">Register</p>
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
      <div class="form-outline mb-4">
        <input v-model="passwordRepeat" type="password" id="loginPassword2" class="form-control" />
        <label class="form-label" for="loginPassword2">Repeat Password</label>
      </div>

      <!-- Submit button -->
      <button @click.prevent="registerUser" class="btn btn-primary btn-block mb-4">Register</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Member? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
    </div>
</template>


<script>
import { register } from '@/middleware/axios.js'

export default {
  data() {
    return {
      body: {
        email: null,
        password: null,
      },
      passwordRepeat: null
    }
  },
  methods: {
    async registerUser() 
    {
      try {
        if (this.body.password === this.passwordRepeat)
        {
          let response = await register(this.body)
          this.$store.token = response.token
          localStorage.setItem('token', this.$store.token);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>