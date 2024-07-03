<template>
    <div class="flex justify-center items-center bg-gray-100">
      <div class="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Add Event</h3>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="holidayName" class="block text-sm font-medium text-gray-700">Holiday Name:</label>
            <input type="text" id="holidayName" v-model="holidayName" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" required>
          </div>
          <div class="mb-4">
            <label for="holidayDate" class="block text-sm font-medium text-gray-700">Date:</label>
            <input type="date" id="holidayDate" v-model="holidayDate" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50" required>
          </div>
          <div class="flex justify-end space-x-4">
            <button type="button" @click="cancelForm" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        holidayName: '',
        holidayDate: ''
      };
    },
    methods: {
      submitForm() {
         
        const event = {
          holidayName: this.holidayName,
          holidayDate: this.holidayDate
        };
        localStorage.setItem('event', JSON.stringify(event)); 
        this.holidayName = '';
        this.holidayDate = ''; 
      },
      cancelForm() { 
        this.holidayName = '';
        this.holidayDate = '';
  
        
      }
    }
  };
  </script>
  