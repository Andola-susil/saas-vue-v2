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
        <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="item in stats" :key="item.id" class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
            <dt>
              <div class="absolute rounded-md bg-indigo-500 p-3">
                <component :is="item.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ item.name }}</p>
            </dt>
            <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p class="text-2xl font-semibold text-gray-900">{{ item.stat }}</p>
              <p :class="[item.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                <ArrowUpIcon v-if="item.changeType === 'increase'" class="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                <ArrowDownIcon v-else class="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
                {{ item.change }}
              </p>
              <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div class="text-sm">
                  <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
                    >View all<span class="sr-only"> {{ item.name }} stats</span></a
                  >
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne :chartData="myDynamicChartData" :apexOptions="myDynamicApexOptions"  title="Monthly Timesheet Overview"/>
        <BarChat  :chartData="chartData" :chartOptions="apexOptions" title="Project Plans for week" />
        <BarChat  :chartData="chartData2" :chartOptions="apexOptions" title="Approved vs Rejected Timesheets"/>
        <BarChat  :chartData="chartData3" :chartOptions="apexOptions" title="Task Hours Completed vs Planned" />
        <PieChat :chartData="chartData5" :apexOptions="apexOptions" title="Hours spent per project"/>
        <BarChat  :chartData="chartData4" :chartOptions="apexOptions" title="Weekly working hours overview"/>
        <PieChat :chartData="chartData6" :apexOptions="apexOptions" title="Total Overtime"/>
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

export default {
  name: 'Dashboard',
  components: {
    ChartOne,
    BarChat,
    PieChat,
    Loader,
  },
  data() {
    return {
      isLoading: true,
      stats: [
        { id: 1, name: 'Total Resources', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
        { id: 2, name: 'Avg. Approved Timesheet Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
        { id: 3, name: 'Avg. Reject Timesheet Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
      ],
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
        { name: 'Department wise hour spent data', data: [5, 15, 8, 12, 20, 18, 22] }
        ]
      },
      myDynamicApexOptions: {
        legend: { /* your options */ },
        colors: ['#3C50E0', '#80CAEE'],
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
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
          type: 'pie',
          width: 380
        },
        plotOptions: {
          pie: {
            donut: {
              size: '10%',
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
      }
    };
  },
  mounted() {
    // Simulate data fetching
    setTimeout(() => {
      this.isLoading = false;
    }, 100); // Simulating a 2-second load time
  },
};
</script>
