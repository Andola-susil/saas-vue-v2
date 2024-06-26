
<template>    
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">TimeSheet Approval Requests</h1>
      </div>
      <nav class="flex float-right" v-if="selectedRows.length > 0">
        <div class="hidden py-2 md:flex md:items-center">
          <Menu as="div" class="relative">
            <button @click="approveTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Approve TimeSheet
            </button>
          </Menu>
          <Menu as="div" class="relative pl-3.5">
            <button @click="rejectTimeSheet()" type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Reject TimeSheet
            </button>
          </Menu>
          <WeekFilter />
        </div>
      </nav>
    </div>
    
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
             <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      <input type="checkbox" class="cursor-pointer" v-model="selectAll" @change="toggleSelectAll">
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">SL NO.</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Resource Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Week No.</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Start Date</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">End Date</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(val, key) in time_log" :key="key">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      <input type="checkbox" class="cursor-pointer" v-model="selectedRows" :value="val.id" @click="selectTimeSheet(val.id)">
                    </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ key+1 }}</td>
                    <td @click="viewTimeSheetDetails(val)" class="cursor-pointer underline underline-offset-1 whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.resource_name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{{ val.week_number }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.start_date }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ val.end_date }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <img v-if="val.status == 'pending'" src="/src/assets/images/pending.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Pending">
                      <img v-else-if="val.status == 'reject'" src="/src/assets/images/ban.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Rejected">
                      <img v-else src="/src/assets/images/circle-check.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Approved">
                    </td>
                  </tr>
                </tbody>
              </table>
            <PaginationTemplate :paginationData="meta_data" @page-changed="getTimeLogs"/>
          </div>
        </div>
      </div>
    </div>
    <Loader :loading="isLoading" />
    <div v-if="showPopup">
    <ModalPopup  
      :open="isModalOpen"
      :title="modalContent.title"
      :description="modalContent.description"
      :confirmLabel="modalContent.confirmLabel"
      :cancelLabel="modalContent.cancelLabel"
      :showInputField="modalContent.showInputField"
      @closePopup="handleClosePopup"
      @confirmPopup="handleConfirmation"
    />
    </div>
  </div>
  
</template>

<script>
import { getAllTimeSheets,reviewTimeSheet } from '../utils/timelog.js';
import PaginationTemplate from '../components/common/PaginationTemplate.vue';
import ModalPopup from '../components/common/ModalPopup.vue';
import Loader from '../components/Loader.vue';
export default {
    name: 'Approvals',
    path: '/time-sheet-approvals',
  components: {
    PaginationTemplate,
    ModalPopup,
    Loader
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
      selectedRows: [],
      selectAll: false,
      isLoading: false,
      isModalOpen: false,
      modalContent: {
        title : '',
        description: '',
        confirmLabel: '',
        cancelLabel: '',
        showInputField: false,
      },
    }
  },
  methods: {
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
          status: i % 3 === 0 ? 'Pending' : (i % 3 === 1 ? 'Approved' : 'Reject'),
        });
      }
      return mockData;
    },
    toggleSelectAll() {
      if (this.selectAll) {
        // Select all rows
        this.selectedRows = this.time_log.map(val => val.id);
      } else {
        // Deselect all rows
        this.selectedRows = [];
      }
    },
    selectTimeSheet(id){
      const index = this.selectedRows.indexOf(id);
      if (index === -1) {
        this.selectedRows.push(id);
      } else {
        this.selectedRows.splice(index, 1);
      }
      if(this.time_log.length == this.selectedRows.length){
        this.selectAll = true;
      }else{
        this.selectAll = false;
      }
    },
    async getTimeLogs(page) {
      this.paginationData.current_page = page;
      this.error = null;
      this.isLoading = true;
      try {
        const response = await getAllTimeSheets(page);
        this.time_log = response.items;
        this.meta_data = response.meta;
        this.isLoading = false;
      } catch (error) {
        this.error = 'An error occurred. Please try again.';
      }
    },
    async showPopUp(){
      this.showPopup = true;
    },
    async viewTimeSheetDetails(val){
        var id = val.id;
        this.$router.push({ path: '/time-sheet', query: { id } });
    },
    approveTimeSheet(){
      this.modalContent.title="Are you sure? You want to approve the selected ("+ this.selectedRows.length +") timeSheets!";
      this.modalContent.description="";
      this.modalContent.confirmLabel="Yes";
      this.modalContent.cancelLabel="No";
      this.modalContent.showInputField = false;
      this.showPopup = true;
      this.openPopup();
    },
    rejectTimeSheet(){
      this.modalContent.title="Are you sure? You want to reject the selected ("+ this.selectedRows.length +") timeSheets!";
      this.modalContent.description="";
      this.modalContent.confirmLabel="Yes";
      this.modalContent.cancelLabel="No";
      this.modalContent.showInputField = false;
      this.showPopup = true;
      this.openPopup();
    },
    openPopup(){
      this.isModalOpen = true;
    },
    handleClosePopup(){
      this.isModalOpen = false;
      this.selectedRows = [];
      this.selectAll = false;
    },
    handleConfirmation(inputValue){
      if(inputValue != ''){
        var timesheet_status = 'reject';
      }else{
        var timesheet_status = 'approve';
      }
      this.isLoading = true;
      const res = reviewTimeSheet(this.timeSheetId,timesheet_status,inputValue).then((data) => {
        this.isLoading = false;
        toast("Timesheet reviewed successfully!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true
        })
      })
      .catch((error) => {

      });
      
      this.isModalOpen = false;
    },
  },
  
};
</script>
