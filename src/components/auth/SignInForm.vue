
<template>
 <div>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" src="../../assets/images/orange-nw-logo.svg" alt="Your Company" /> -->
      <h2 class="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">Welcome !</h2>
    </div>
    <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="space-y-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" v-model="username" placeholder="Enter your email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" placeholder="Enter your password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-4 pl-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
          <div class="my-1 text-end">
            <a href="/forgot_password" class=" text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
        </div>
        <div class="mb-4">
          <button @click="login()" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-4 pl-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Don’t have any account?
        <RouterLink to="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign Up</RouterLink>
      </p>
    </div>
  </div>
  <Loader :loading="isLoading" />
  </div>
</template>

<script>
import { loginUser } from '../../utils/api.js';
import { getTenantsList,getUserProfile,getCurrentTenant } from '../../utils/user.js';
import { getSubscription } from '../../utils/tenants.js';

import Loader from '../../components/Loader.vue';
import axios from 'axios';
// import { userInfo } from '../../stores/userInfo.js';
import { toast } from 'vue3-toastify';
import '../../../node_modules/vue3-toastify/dist/index.css';

export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: '',
      error: null,
      errorMessages: [],
      isLoading: false,
      user_info: [],
    }
  },
  components: {
    Loader,
    toast
  },
  setup() {
    // const userStore = userInfo();
   
    // return { userStore };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await loginUser(this.username, this.password);
        const token = response.access_token;
        toast("Login Successfull!!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true
        })
        // console.log(this.userStore, 'here');
        localStorage.setItem('accessToken', token); // Store the token
        localStorage.setItem('layout', 'Admin');
         
        localStorage.setItem('is_approver', false); 
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Set the token in the headers
         
        //Response for tenant list
        const usersapi_response = await getTenantsList();

        if(usersapi_response.tenants[0].id){
          localStorage.setItem('tenant_id', usersapi_response.tenants[0].id); // Store the usersapi_response
        }

        const current_tenant_info = await getCurrentTenant();
        const user_profile_info = await getUserProfile();
        const subscription_info = await getSubscription();
        
        // console.warn(current_tenant_info);
        // console.warn(user_profile_info);
        // console.warn(subscription_info);

        localStorage.setItem('loggedin_user_id', user_profile_info.id);

        var user_data = {
          accessToken: token,
          layout: 'Admin',
          is_admin: user_profile_info.user_type == "owner" ? true : false,
          is_approver: false,
          is_resource: false,
          'tenant_id': usersapi_response.tenants[0].id,
          'user_name': user_profile_info.first_name+' '+user_profile_info.last_name,
          'resource_id' : user_profile_info.resource_id,
          'profile_image' : user_profile_info.profile_image,
          'user_type' : user_profile_info.user_type,
        };
        // await this.userStore.updateUserInfo(user_data);
        localStorage.setItem('user_name', user_profile_info.first_name+' '+user_profile_info.last_name);
        localStorage.setItem('resource_id', user_profile_info.resource_id);
        localStorage.setItem('profile_image', user_profile_info.profile_image);
        localStorage.setItem('user_type', user_profile_info.user_type);
        localStorage.setItem('is_admin', user_profile_info.user_type == "owner" ? true : false);
        localStorage.setItem('is_resource', user_profile_info.user_type == "owner" ? false : true); 
        this.$router.push('/dashboard'); // Redirect to another page
        
      } catch (error) {
        // Handle login errors
        this.error = 'An error occurred. Please try again.';
      } finally {
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