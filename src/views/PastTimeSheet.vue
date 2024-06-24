
<template>    
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Past TimeSheet</h1>
        <!-- <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p> -->
      </div>
      <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" @click="showPopUp()" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Time Log</button>
      </div> -->
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">SL NO.</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Resource Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Week No.</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Hours Logged</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">                    
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(val,key) in time_log" :key="key" class="even:bg-gray-50">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ val.id }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{{ val.week_no }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.start_date }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.end_date }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.hour_logged }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <img src="/src/assets/images/circle-check.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Approved">
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <!-- <a href="#" class="text-indigo-600 hover:text-indigo-900"
                        >Edit<span class="sr-only">, {{ val.id }}</span></a
                        > -->
                        <button class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-400 shadow-sm hover:bg-indigo-100"><img src="/src/assets/images/eye.svg" alt="" class="h-5 w-5" @click="viewTimeSheetDetails(val)" v-b-tooltip.hover title="view"></button>
                  </td>
                </tr>
              </tbody>
            </table>
            <PaginationTemplate :paginationData="meta_data" @page-changed="getTimeLogs"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showPopup">
    <ModalPopup />
    </div>
  </div>
  
</template>

<script>
import { getAllTimeLogs } from '../utils/api.js';
import PaginationTemplate from '../components/common/PaginationTemplate.vue';
import ModalPopup from '../components/common/ModalPopup.vue';
export default {
    name: 'Past TimeSheet',
    path: '/past-time-sheet',
  components: {
    PaginationTemplate,
    ModalPopup
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
      showPopup : false,
    }
  },
  methods: {
    async getTimeLogs(page) {
    //   this.paginationData.current_page = page;
    //   this.error = null;
    //   try {
    //     const response = await getAllTimeLogs(page);
    //     this.time_log = response.items;
    //     this.meta_data = response.meta;
    //   } catch (error) {
    //     this.error = 'An error occurred. Please try again.';
    //   }
    this.time_log = this.generateMockData(5);
    },
    async showPopUp(){
      this.showPopup = true;
    },
    generateMockData(count) {
      const mockData = [];
      const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Lopez'];

      for (let i = 1; i <= count; i++) {
        const startDate = new Date(2024, 4, 25 + (i - 1) * 7); // May 25, 2024
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

        mockData.push({
          id: i,
          name: `${firstName} ${lastName}`,
          week_no: 52 - i + 1,
          start_date: startDate.toLocaleDateString('en-GB'),
          end_date: endDate.toLocaleDateString('en-GB'),
          hour_logged: Math.floor(Math.random() * 50),
          status: i % 3 === 0 ? 'Pending' : (i % 3 === 1 ? 'Approved' : 'Reject'),
        });
      }
      return mockData;
    },
    async viewTimeSheetDetails(val){
      var id = val.id;
      this.$router.push({ path: '/time-sheet', query: { id } });
    }
  },
  
};
</script>
