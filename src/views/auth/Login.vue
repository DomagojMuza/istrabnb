<template>
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh !important;">
    <form class="shadow py-3 px-5 border border-0 rounded-3 bg-light" style="margin-top: 100px;">
      <div class="text-center mb-5">
        <p class="h4">Log in</p>
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input type="email" id="loginName" class="form-control" />
        <label class="form-label" for="loginName">Email or username</label>
      </div>

      <!-- Password input -->
      <div class="form-outline mb-4">
        <input type="password" id="loginPassword" class="form-control" />
        <label class="form-label" for="loginPassword">Password</label>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Not a member? <router-link to="/register">Register</router-link></p>
      </div>
    </form>
    </div>

    
</template>