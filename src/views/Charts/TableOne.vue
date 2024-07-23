<template>
    <div class="col-span-12 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <h4 class="text-title-md font-bold text-black dark:text-white">Timesheet Data</h4>
        </div>
        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
              <!-- <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Sl No</th> -->
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Resource</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Total hours</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Over time (OT)</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Avg. hours</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(item, index) in tableData" :key="index">
                <!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ index + 1 }}</td> -->
                <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.resource_name }}</td>
                <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{item.totalTimesheet}}</td>
                <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.timesheetSubmitted }}</td>
                <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.timesheetNotSubmitted }}</td>
                <!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <button @click="handleAction(item)"></button>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
    </div>
   
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    tableData: Array<{
      totalTimesheet: string;
      timesheetSubmitted: string;
      timesheetNotSubmitted: string;
      weekNo: string;
      resource_name: string;
    }>;
  }>();
  
  const handleAction = (item: any) => {
    // Handle the action here
    console.log('Action clicked for item:', item);
  };
  </script>
  
  <style scoped>
  /* table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    text-align: left;
    padding: 8px;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  } */
  </style>
  