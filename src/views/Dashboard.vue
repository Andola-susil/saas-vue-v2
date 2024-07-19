<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <Loader :loading="isLoading" />
    <div v-if="!isLoading">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Dashboard</h1>
        </div>
      </div>
      <div class="mt-8 flow-root">
        <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3> -->
        <div v-if="startDate !== null">
        <DateRangePicker v-model="dateRange" @change="handleDateRangeChange" />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <DataCardOne
      v-for="(item, index) in cardItems"
      :key="index"
       
      :title="item.title"
      :total="item.total"
      :growthRate="item.growthRate"
      :totalHours="item.totalHours"
    />
    </div>
       
      </div>
      
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne :chartData="myDynamicChartData" :apexOptions="myDynamicApexOptions"  title="Monthly Timesheet Overview"/>
        <!-- <BarChat  :chartData="chartData" :chartOptions="apexOptions" title="Project Plans for week" />
        <BarChat  :chartData="chartData2" :chartOptions="apexOptions" title="Approved vs Rejected Timesheets"/> -->
        

        <BarChat  :chartData="chartData3" :chartOptions="apexOptions" title="Completed vs Planned Task Hours" />
        <PieChat :chartData="chartData5" :apexOptions="apexOptions" title="Project Hours Distribution"/>
        <BarChat  :chartData="chartData4" :chartOptions="apexOptions" title="Weekly Work Hours Overview"/>
        <TableOne :tableData="tableData"/>
        <PieChat :chartData="chartData6" :apexOptions="apexOptions" title="Project Overtime Analytics"/>
        
        
       
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/vue/24/outline';
import ChartOne from '../views/Charts/ChartOne.vue';
import BarChat from './Charts/BarChat.vue';
import PieChat from './Charts/PieChat.vue';
import Loader from '../components/Loader.vue';
import DataCardOne from '../views/Charts/DataCardOne.vue'
import TableOne from '../views/Charts/TableOne.vue'
import { computed,ref } from 'vue';
import DateRangePicker from 'vue3-daterange-picker';
export default {
  name: 'Dashboard',
  components: {
    DateRangePicker,
    ChartOne,
    BarChat,
    PieChat,
    Loader,
    DataCardOne,
    TableOne
  },
  data() {
    return {
      isLoading: true,
      dateRange: {
        startDate: null,
        endDate: null
      },
      
      chartData: {
        series: [
          {
            name: 'Project A',
            data: [8, 7.5, 8, 8, 7, 6.5, 0] // Hours worked on Project A each day of the week
          },
          {
            name: 'Project B',
            data: [2, 1, 1.5, 1, 2, 1, 0] // Hours worked on Project B each day of the week
          },
          {
            name: 'Meetings',
            data: [1, 1, 0.5, 2, 1.5, 0, 0] // Hours spent in meetings each day of the week
          }
        ],
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      },
      chartData2:{
        series: [
            {
              name: 'Approved Timesheets',
              data: [35, 50, 45, 60, 30, 40, 55] // Replace these values with your actual data
            },
            {
              name: 'Rejected Timesheets',
              data: [10, 5, 15, 7, 20, 3, 10] // Replace these values with your actual data
            }
        ],
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      },
       chartData3 : {
            series: [
              {
                name: 'Task Hours Completed',
                data: [6, 7, 8, 5, 6, 7, 7] // Replace these values with your actual task hours completed data
              },
              {
                name: 'Task Hours Planned',
                data: [8, 8, 8, 8, 8, 8, 8] // Replace these values with your actual task hours planned data
              }
            ],
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
          },
       chartData4 : {
            series: [
              {
                name: 'Weekly Working Hours Completed',
                data: [6, 7, 8, 5, 6, 7, 7] // Replace these values with your actual task hours completed data
              },
              {
                name: 'Weekly Working Hours Planned',
                data: [8, 8, 8, 8, 8, 8, 8] // Replace these values with your actual task hours planned data
              }
            ],
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
          },
      apexOptions: {
        colors: ['#3056D3', '#80CAEE'],
        chart: {
          type: 'bar',
          height: 335,
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        responsive: [
          {
            breakpoint: 1536,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 0,
                  columnWidth: '35%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '35%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last'
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          fontFamily: 'Satoshi',
          fontWeight: 500,
          fontSize: '14px',
          markers: {
            radius: 99
          }
        },
        fill: {
          opacity: 1
        }
      },
      myDynamicChartData: {
        series: [
        { name: 'Total timesheet number', data: [10, 20, 2, 15, 18, 25, 30] },
        { name: 'Total hour spent data', data: [5, 15, 8, 12, 20, 18, 22] }
        ]
      },
      myDynamicApexOptions: {
        legend: { /* your options */ },
        colors: ['#c9afed', '#69e1ff'],
        // other options
      },
      chartData5: {
        series: [45, 25, 15, 15],
        labels: ['Project A', 'Project B', 'Project C', 'Project D']
      },
      chartData6: {
        series: [30, 35, 20, 15],
        labels: ['Team A', 'Team B', 'Team C', 'Team D']
      },
      apexOptions: {
        colors: ['#287be0', '#28e0d1'],
        chart: {
          type: 'pie',
          width: 380
        },
        plotOptions: {
          pie: {
            donut: {
              size: '0%',
              background: 'transparent'
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          position: 'bottom'
        },
        responsive: [
          {
            breakpoint: 640,
            options: {
              chart: {
                width: 200
              }
            }
          }
        ]
      },
      cardItems : ref([
  
  {
    // icon: `/src/assets/images/dashboard11.png`,
    title: 'Total Spend Hour',
    total: '800hrs',
    growthRate: 70,
    totalHours: '1000hrs'
  },
  {
    // icon: ``,
    title: 'Task completed',
    total: '10',
    growthRate: 70,
    totalHours: '1000 tasks'
  },
  {
    // icon: ``,
    title: 'Total In progress',
    total: '7',
    growthRate: 30,
    totalHours: '1000 tasks'
  },
  {
    // icon: ``,
    title: 'Over Time',
    total: '40hrs',
    growthRate: 90,
    totalHours: '1000hrs'
  },
]),
tableData : [
  {
    totalTimesheet: '10',
    timesheetSubmitted: '7',
    timesheetNotSubmitted: '3',
    weekNo: '#3'

  },
  {
    totalTimesheet: '15',
    timesheetSubmitted: '10',
    timesheetNotSubmitted: '5',
    weekNo: '#2'
  },
  {
    totalTimesheet: '20',
    timesheetSubmitted: '18',
    timesheetNotSubmitted: '2',
    weekNo: '#1'
  }
]
    };
  },
  computed: {
    startDate() {
      return this.dateRange.startDate || null;
    }
  },
  methods: {
    handleDateRangeChange(value) {
      // Handle date range change here
      console.log('Selected Date Range:', value);
      // You can fetch data based on the selected date range
    }
  },
  mounted() {
    // Simulate data fetching
    setTimeout(() => {
      this.isLoading = false;
    }, 100); // Simulating a 2-second load time
  },
};
</script>
