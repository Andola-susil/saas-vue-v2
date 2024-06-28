
<template>
 
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="../../assets/images/orange-nw-logo.svg" alt="Your Company" /> -->
      <h2 class="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">You are almost there !!</h2>
      <span class="mb-3 block font-medium text-center">Enter your new password. We'll reset your password.</span>
    </div>
    <form action="">
      
    </form>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" placeholder="Enter your password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" placeholder="Enter your confirm password" v-model="confirm_password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="mb-4">
          <button @click="resetPasswordMethod()" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 pl-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500 float-right">
        <RouterLink to="/sign-in" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Cancel</RouterLink>
      </p>
    </div>
    <Loader :loading="isLoading" />
  </div>
  
</template>

<script>
import { resetPassword } from '../../utils/api.js';
import Loader from '../Loader.vue';
import { toast } from 'vue3-toastify';
import '../../../node_modules/vue3-toastify/dist/index.css';

import axios from 'axios';
export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirm_password: '',
      error: null,
      errorMessages: [],
      isLoading: false,
    }
  },
  components:{
    Loader,
    toast
  },
  methods: {
    async resetPasswordMethod() {
      this.isLoading = true;
      this.error = null;
      try {
        if (this.validatePasswords()) {
          const user_data = {
            token: localStorage.getItem('reset_token'),
            password: this.password,
          }
          
          const response = await resetPassword(user_data);
          
          toast("Password reset successfully!!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true,
            "autoClose": 3000
          })
          this.isLoading = false;
          this.password = "";
          this.confirm_password = "";
          localStorage.removeItem('reset_token');
        }else{
          toast("Password mismatch. Try again.", {
            "theme": "colored",
            "type": "error",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true,
            "autoClose": 3000
          })
          this.password = "";
          this.confirm_password = "";
        }
      } catch (error) {
        // Handle login errors
        this.error = 'An error occurred. Please try again.';
      } finally {
        this.isLoading = false;
        this.$router.push('/sign-in'); // Redirect to another page
      }
    },
    validatePasswords() {
      if (this.password !== this.confirm_password) {
          return false;
      } else {
          return true;
      }
    }
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