<template>
    <div class="d-flex justify-content-center align-items-center">
    <form class="shadow py-3 px-5 border border-0 rounded-3 bg-light">
      <div class="text-center mb-5">
        <p class="h4">Register</p>
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
      <div class="form-outline mb-4">
        <input type="password" id="loginPassword" class="form-control" />
        <label class="form-label" for="loginPassword">Repeat Password</label>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>

      <!-- Register buttons -->
      <div class="text-center">
        <p>Member? <router-link to="/login">Login</router-link></p>
      </div>
    </form>
    </div>
</template>