<template>
  <div class="rounded-sm border border-stroke bg-white py-2 px-2 shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
    <div class="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
      <h4 class="text-title-md font-bold text-black dark:text-white">{{ total }}</h4>
    </div>

    <div class="mt-0">
      <div class="flex justify-center">
        <span class="text-sm font-medium">{{ title }}</span>
      </div>
      <VueApexCharts
        type="radialBar"
        width="100%" 
        :options="apexOptions"
        :series="chartData.series"
        ref="chart"
      />
      <div class="flex justify-between mt-2">
        <div class="text-sm font-medium" style="font-size: 11px">
          {{ growthRate }}%
        </div>
        <div class="text-sm font-medium" style="font-size: 11px">
          {{ totalHours }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  icon: string;
  title: string;
  total: string;
  growthRate: number;
  totalHours: string;
}>();

const chartData = ref({
  series: [props.growthRate],
});

const apexOptions = ref({
  chart: {
    height: 100,
    type: 'radialBar',
  },
  colors: ['#20E647'],
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#333',
        startAngle: -90,
        endAngle: 90,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          fontSize: '14px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      gradientToColors: ['#87D4F9'],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'butt',
  },
  labels: ['Progress'],
});
</script>

<style scoped>
/* Add your styles here */
</style>
