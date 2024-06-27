
<template>
 
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="../../assets/images/orange-nw-logo.svg" alt="Your Company" /> -->
      <h2 class="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">Create your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" placeholder="Enter your email" v-model="user_email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" placeholder="Enter your password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div class="mb-4">
          <button @click="register()" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 pl-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <RouterLink to="/sign-in" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</RouterLink>
      </p>
    </div>
  </div>
  
</template>

<script>
import { createUser } from '../../utils/api.js';
import { toast } from 'vue3-toastify';
import '../../../node_modules/vue3-toastify/dist/index.css';

import axios from 'axios';
export default {
  name: 'SignUp',
  data() {
    return {
      user_email: '',
      password: '',
      error: null,
      errorMessages: []
    }
  },
  components:{
    toast
  },
  methods: {
    async register() {
      this.error = null;
      try {
        const user_data = {
          email: this.user_email,
          password: this.password,
          first_name: '',
          last_name: '',
          agree_term: null,
          is_active: true,
          is_superuser: false,
          is_verified: false,
        }
        const response = await createUser(user_data);
        const token = response.access_token;
        localStorage.setItem('accessToken', token); // Store the token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the headers
        toast("Registered Successfully!!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true,
          "autoClose": 3000
        })
        this.$router.push('/sign-in'); // Redirect to another page
      } catch (error) {
        // Handle login errors
        this.error = 'An error occurred. Please try again.';
      }
    },
  },
}
</script>

<style scoped>
/* Scoped styles for SignInForm component */
.sm\:text-title-xl2 {
    font-size: 33px;
    line-height: 45px;
}
</style>