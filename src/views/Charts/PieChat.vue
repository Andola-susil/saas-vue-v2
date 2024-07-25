<script setup lang="js">
import { ref, defineProps } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  apexOptions: {
    type: Object,
    required: true
  },
  width: {
    type: String,
    default: '340'
  },
  title:{
    type: String,
    default: 'Pie chart'
  }
})

const chart = ref(null)
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5 h-full"
  >
    <div class="mb-3 justify-between gap-4 sm:flex py-3.5">
      <div>
        <h4 class="text-md font-bold text-black dark:text-white mt-4">{{ props.title }}</h4>
      </div>
    </div>
    <div class="mb-2">
      <div id="chartThree" class="mx-auto flex justify-center">
        <VueApexCharts
          type="donut"
          :width="width"
          :options="apexOptions"
          :series="chartData.series"
          ref="chart"
        />
      </div>
    </div>
    <div class="-mx-8 items-center justify-center gap-y-3">
      <template v-for="(label, index) in chartData.labels" :key="index">
        <div class="w-full px-8 sm:w-1/2">
          <div class="flex w-full items-center">
            <span :class="'mr-2 block h-3 w-full max-w-3 rounded-full bg-' + apexOptions.colors[index]"></span>
            <div class="whitespace-nowrap pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              <span>{{ label }}</span> <span class="pl-2">{{ chartData.series[index] }}%</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
