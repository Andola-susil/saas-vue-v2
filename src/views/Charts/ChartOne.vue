<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5"
  >
  <div>
        <h4 class="text-md font-bold text-black dark:text-white">{{ title }}</h4>
      </div>
    <div class="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
      <div class="flex w-full max-w-45 justify-end">
        <div class="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
          <button
            class="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark"
          >
            Day
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Week
          </button>
          <button
            class="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
          >
            Month
          </button>
        </div>
      </div>
    </div>
    <div>
      <div id="chartOne" class="-ml-5">
        <VueApexCharts
          type="area"
          height="350"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  chartData: {
    type: Object,
    required: true
  },
  apexOptions: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
/* Add your custom styles here */
</style>
