
<template>    
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">TimeSheet Reports</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
      </div>
      <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" @click="showPopUp()" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Time Log</button>
      </div> -->
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { getAllTimeLogs } from '../utils/api.js';
export default {
    name: 'TimeSheet Reports',
    path: '/time-sheet-reports',
  components: {
  },
  mounted() {
   
  },
  created() {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  
};
</script>
