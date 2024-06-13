
<template>    
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Time Sheet</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Time Log</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Task ID</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Task Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Time</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(val,key) in time_log" :key="key">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ val.id }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.task_name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.time_log_date }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.task_start_time }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.task_end_time }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.approval_status }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                      >Edit<span class="sr-only">, {{ val.id }}</span></a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <PaginationTemplate :paginationData="meta_data" @page-changed="getTimeLogs"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loader :loading="isLoading" />
</template>

<script>
import { getAllTimeLogs } from '../utils/api.js';
import PaginationTemplate from '../components/common/PaginationTemplate.vue';
import Loader from '../components/Loader.vue';
export default {
    name: 'TimeSheet',
    path: '/timesheet',
  components: {
    PaginationTemplate,
    Loader,
  },
  mounted() {
    this.getTimeLogs(this.paginationData.current_page);
  },
  created() {
    
  },
  data() {
    return {
      time_log : [],
      meta_data : [],
      paginationData: {
        total_items: 0,
        items_per_page: 10,
        current_page: 1,
      },
      isLoading: false,
    }
  },
  methods: {
    async getTimeLogs(page) {
      this.paginationData.current_page = page;
      this.error = null;
      this.isLoading = true;
      try {
        const response = await getAllTimeLogs(page);
        this.time_log = response.items;
        this.meta_data = response.meta;
      } catch (error) {
        this.error = 'An error occurred. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
  
};
</script>
