
<template>
 
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="../../assets/images/orange-nw-logo.svg" alt="Your Company" /> -->
      <h2 class="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">Not a problem, sometimes it happens with all of us.</h2>
      <span class="mb-3 block font-medium text-center">Enter the email id registered with Orangescrum. We'll send you the link to reset your password.</span>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" placeholder="Enter your email" v-model="user_email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="mb-4">
          <button @click="forgetPasswordMethod" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 pl-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
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
import { forgetPassword } from '../../utils/api.js';
import Loader from '../../components/Loader.vue';
import { toast } from 'vue3-toastify';
import '../../../node_modules/vue3-toastify/dist/index.css';

export default {
  name: 'SignUp',
  data() {
    return {
      user_email: '',
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
    async forgetPasswordMethod() {
      this.isLoading = true;
      this.error = null;
      try {
        
        const email = {"email": this.user_email} 
        
        const response = await forgetPassword(email);

        toast("Password Reset Email Sent Successfully. Please Check Your inbox!!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true,
        })

      } catch (error) {
        this.error = 'An error occurred. Please try again.';
      } finally {
        this.user_email = null;
        this.isLoading = false;
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