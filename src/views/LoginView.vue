<template>
  <div class=" min-h-screen flex items-center justify-center">
    <loading v-if="isLoading"></loading>
    <div class="lg:flex">
      <!-- First div -->
      <div class="lg:w-1/2p-4">
        <img class="-ml-6 w-64 h-auto" src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="Facebook">
        <h2 class="text-2xl font-medium w-5/6">Facebook helps you connect and share with the people in your life.</h2>
      </div>

      <!-- Second div -->
      <div class="lg:w-1/2 p-4 mt-4 lg:mt-0 bg-white shadow-2xl rounded-lg root items-center justify-center">
        <div class="flex items-center justify-center">
          <div v-if="errorMessage"
            class="block text-center w-full p-2 mb-8 bg-red-100 border-solid border-2 border-red-400">
            <p class="text-base font-bold">Wrong Credentials!</p>
            <p>Invalid email or password</p>
          </div>
        </div>
        <form @submit.prevent="login">
          <div class="mb-4">
            <input type="text" id="email" name="email"
              class="w-full h-12 p-2 border rounded focus:outline-none focus:border-blue-500"
              :class="{ error: v$.email.$errors.length || externalResults?.email?.length }" :style="{
                borderColor: v$.email.$errors.length || externalResults?.email?.length ? 'red' : '',
                color: v$.email.$errors.length || externalResults?.email?.length ? 'rgb(239 68 68 / 1)' : '',
              }" placeholder="Email address" v-model="v$.email.$model">
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div class="input-errors" v-for="(error, index) of externalResults.email" :key="index">
              <div class="error-msg">{{ error }}</div>
            </div>
          </div>
          <div class="mb-4">
            <input type="password" id="password" name="password" size="10" v-model="v$.password.$model"
              class="w-full h-12 p-2 border rounded focus:outline-none focus:border-blue-500"
              :class="{ error: v$.password.$errors.length || externalResults?.password?.length }" :style="{
                borderColor: v$.password.$errors.length || externalResults?.password?.length ? 'red' : '',
                color: v$.password.$errors.length || externalResults?.password?.length ? 'rgb(239 68 68 / 1)' : '',
              }" placeholder="Password">
            <!-- error message -->
            <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div class="input-errors" v-for="(error, index) of externalResults.password" :key="index">
              <div class="error-msg">{{ error }}</div>
            </div>
          </div>
          <button type="submit"
            class="w-full h-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-600  font-semibold text-xl">
            Log In
          </button>
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
import { ref, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router'

export default {
  setup() {
    const isLoading = ref(false);
    const errorMessage = ref(false);
    const externalResults = ref({})
    const form = reactive({
      email: '',
      password: '',
    })
    const rules = {
      email: { required: helpers.withMessage('The email is required', required), email: helpers.withMessage('Please enter a valid email address.', email) },
      password: { required: helpers.withMessage('The password is required.', required), minLength: helpers.withMessage('The password must be at least 8 characters.', minLength(8)) },
    }
    const v$ = useVuelidate(rules, form, { externalResults })
    const router = useRouter()

    const login = async () => {
      if (!v$.value.$error) {
        isLoading.value = true;
        const authStore = useAuthStore();
        const res = await authStore.login(form.email, form.password);

        if (res.status === 200) {
          errorMessage.value = false;
          isLoading.value = false;
          router.push('/');
        } else {
          isLoading.value = false;
          if (res.response.status == 422) {
            externalResults.value = res.response.data.errors;
          } else {
            errorMessage = true
          }
        }
      }
    };

    return { isLoading, errorMessage, v$, login, externalResults };
  }
}
</script>


<style scoped>
.error-msg {
  @apply text-red-500;
}
</style>