<script setup>

</script>

<template>
  <div class=" min-h-screen flex items-center justify-center">

    <div class="lg:flex">
      <!-- First div -->
      <div class="lg:w-1/2p-4">
        <img class="-ml-7 w-64 h-auto" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook">
        <h2 class="text-2xl font-medium w-5/6">Facebook helps you connect and share with the people in your life.</h2>
      </div>

      <!-- Second div -->
      <div class="lg:w-1/2 p-4 mt-4 lg:mt-0 bg-white shadow-2xl rounded-lg">
        <form @submit.prevent="login">
          <div class="mb-4">
            <input type="text" id="email" name="email"
              class="w-full h-12 p-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Email address"
              v-model="email">
          </div>
          <div class="mb-4">
            <input type="password" id="password" name="password" size="10" v-model="password"
              class="w-full h-12 p-2 border rounded focus:outline-none focus:border-blue-500" placeholder="Password">
          </div>
          <button type="submit"
            class="w-full h-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-600  font-semibold text-xl">Log
            In</button>
          <div class="text-center mt-4">
            <a href="#" class="text-blue-500">Forgot Password?</a>
          </div>
          <div class="mt-4 border"></div>
          <div class="mt-4 text-center">
            <button class="bg-btn-green p-3 text-white font-semibold rounded-md text-xl">Create new account</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const authStore = useAuthStore();
      const success = await authStore.login(this.email, this.password);
      if(success){
          this.$router.push('/')
      }else{
        // handel login fail
      }
    }
  }
}
</script>