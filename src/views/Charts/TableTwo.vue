<template>
  <div class="col-span-12 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
    <div class="flex h-11.5 w-11.5 items-center justify-left rounded-full bg-meta-2 dark:bg-meta-4">
      <h4 class="text-title-md font-bold text-black dark:text-white">Project Overview</h4>
    </div>
    <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <div class="max-h-64 overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-300">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Project Name</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Resources</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Total working hours</th>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Avg. working hours</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.project_name }}</td>
              <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{item.totalTimesheet}}</td>
              <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.timesheetSubmitted }}</td>
              <td class="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-left">{{ item.timesheetNotSubmitted }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationTemplate :paginationData="meta_data" @page-changed="getTimeLogs"/>
    </div>
  </div>
</template>
  
<script setup>
  import { defineProps, ref} from 'vue';
  import PaginationTemplate from '../../components/common/PaginationTemplate.vue';
  const props = defineProps({
    tableData: {
      type: Array,
      required: true
    },
  })
  const meta_data = ref([]);
  const paginationData = ref({
    total_items: 0,
    items_per_page: 10,
    current_page: 1,
  });
  const handleAction = (item) => {
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
  