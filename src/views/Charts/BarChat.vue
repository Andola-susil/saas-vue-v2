<!-- BarChat.vue -->
<template>
  <div class="col-span-12 rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
    <div class="mb-4 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-md font-bold text-black dark:text-white">{{ title }}</h4>
      </div>
      <!-- Additional HTML and select dropdown if needed -->
    </div>
    <div>
      <div id="chartTwo" class="-ml-5 -mb-9">
        <VueApexCharts
          type="bar"
          height="335"
          :options="chartOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  chartData: {
    series: Array<{ name: string; data: number[] }>;
    labels: string[];
  };
  chartOptions: any;
  title: string; // Define a prop for the title
}>();

const chart = ref(null);
</script>
