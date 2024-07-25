<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <Loader :loading="isLoading" />
    <div v-if="!isLoading">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
    <h1 class="text-base font-semibold leading-6 text-gray-900">Dashboard</h1> 
    <!-- <label for="time-period" class="block text-sm font-medium text-gray-700 mt-4">Select Time Period:</label> -->
        <!-- <select id="time-period" name="time-period" class="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" v-model="selectedPeriod" @change="handlePeriodChange">
        <option value="30days">30 Days List</option>
        <option value="15days">15 Days List</option>
    </select> -->
</div>
      </div>
      <div class="mt-8 flow-root">
        <!-- <h3 class="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3> -->
        <div >
          <DateRangePicker v-model="dateRange"  :dateRange="dateRange" @update:modelValue="handleDateRangeChange" />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <!-- <DataCardOne
            v-for="(item, index) in cardItems"
            :key="index"
            :title="item.title"
            :total="item.total"
            :growthRate="item.growthRate"
            :totalHours="item.totalHours"
          /> -->
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat :chartData="chartData_pie2" :apexOptions="apexOptions_pie2" :chartWidth="250" title="Total Hour Spend"/>
          </div>
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat :chartData="chartData_pie4" :apexOptions="apexOptions_pie3" :chartWidth="250" title="Time Sheet Status"/>
          </div>
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat :chartData="chartData_pie3" :apexOptions="apexOptions_pie2" :chartWidth="250" title="Billable Vs NonBillable"/>
          </div>
          <!-- <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <div class="flex h-11.5 w-11.5 py-2 px-2 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <h4 class="text-title-md font-bold text-black dark:text-white">156 hrs</h4>
            </div>
            <div class="flex justify-center"><span class="text-sm font-medium">Over Time</span></div>
            <div className="p-4 sm:p-6 xl:p-10">
              <div className="flex max-w-[470px] flex-col gap-10 pt-5 xl:pt-4">
                <div className="relative h-2.5 w-full rounded-full bg-indigo-100 dark:bg-indigo-100">
                  <div className="absolute left-0 h-full w-9/12 rounded-full bg-indigo-800">
                    <span className="absolute bottom-full -right-4 z-1 mb-2 inline-block rounded-sm bg-indigo-800 px-2 py-1 text-xs font-bold text-white">
                      <span className="absolute -bottom-1 left-1/2 -z-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-indigo-800"></span>
                      75%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat :chartData="chartData_pie" :apexOptions="apexOptions1" title="Total Over Time"/>
          </div>
        </div>
        
       
      </div>
      
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne :chartData="myDynamicChartData" :apexOptions="myDynamicApexOptions"  title="Total Hours Worked Per Day"/>
        <!-- <BarChat  :chartData="chartData" :chartOptions="apexOptions" title="Project Plans for week" />
        <BarChat  :chartData="chartData2" :chartOptions="apexOptions" title="Approved vs Rejected Timesheets"/> --><!-- <BarChat  :chartData="chartData3" :chartOptions="apexOptions" title="Completed vs Planned Task Hours" />
        <PieChat :chartData="chartData5" :apexOptions="apexOptions" title="Project Hours Distribution"/> -->
        <BarChat  :chartData="chartData4" :chartOptions="apexOptions" title="Weekly Work Hours Overview"/>
        <TableOne :tableData="tableData"/>
        <TableTwo :tableData="tableData"/>
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
import TableTwo from '../views/Charts/TableTwo.vue'
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
    TableOne,
    TableTwo
  },
  data() {
    return {
      isLoading: true,
      selectedPeriod: '30days',
      dateRange: {
        startDate: null,
        endDate: null
      },
      
      chartData: {
        series: [
          {
            name: 'TaskSync',
            data: [8, 7.5, 8, 8, 7, 6.5, 0] // Hours worked on Project A each day of the week
          },
          {
            name: 'ProjectFlow',
            data: [2, 1, 1.5, 1, 2, 1, 0] // Hours worked on Project B each day of the week
          },
          {
            name: 'MilestoneMaster',
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
                  columnWidth: '20%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '20%',
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
      apexOptions1: {
        colors: ['#37CDCB', '#D55281'],
        chart: {
          type: 'bar',
          height: 200,
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
                  columnWidth: '0%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '0%',
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
      apexOptions_pie: {
        colors: ['#3056D3', '#80CAEE'],
        chart: {
          type: 'bar',
          height: 80,
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
                  columnWidth: '15%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '15%',
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
            radius: 90
          }
        },
        fill: {
          opacity: 1
        }
      },
      apexOptions_pie3: {
        colors: ['#64AB07','#37CDCB','#4F5F92',],
        chart: {
          type: 'bar',
          height: 80,
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
                  columnWidth: '15%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '15%',
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
            radius: 90
          }
        },
        fill: {
          opacity: 1
        }
      },
      apexOptions_pie2: {
        colors: ['#37CDCB','#4F5F92'],
        chart: {
          type: 'bar',
          height: 80,
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
                  columnWidth: '15%'
                }
              }
            }
          }
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '15%',
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
            radius: 90
          }
        },
        fill: {
          opacity: 1
        }
      },
      myDynamicChartData: {
        series: [
        { name: 'Expected Time', data: [10, 20, 2, 15, 18, 25, 30] },
        { name: 'Actual Time', data: [5, 15, 8, 12, 20, 18, 22] }
        ]
      },
      myDynamicApexOptions: {
        legend: { /* your options */ },
        colors: ['#c9afed', '#69e1ff'],
        // other options
      },
      chartData5: {
        series: [45, 25, 15, 15],
        labels: ['TaskSync', 'ProjectFlow', 'MilestoneMaster', 'AgileTrack']
      },
      chartData6: {
        series: [30, 35, 20, 15],
        labels: ['Team A', 'Team B', 'Team C', 'Team D']
      },
      chartData_pie: {
        series: [75, 25],
        labels: ['Working Hours', 'Over Time']
      },
      chartData_pie2: {
        series: [65, 25],
        labels: ['Total Hours', 'Hours Spend']
      },
      chartData_pie3: {
        series: [65, 25],
        labels: ['Billable', 'Non-billable']
      },
      chartData_pie4: {
        series: [65, 25,10],
        labels: ['Approved', 'Pending', 'Rejected']
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
          growthRate: 80,
          totalHours: '1000hrs'
        },
        // {
        //   // icon: ``,
        //   title: 'Timesheet Submitted',
        //   total: '10',
        //   growthRate: 70,
        //   totalHours: '400'
        // },
        // {
        //   // icon: ``,
        //   title: 'Total In progress',
        //   total: '7',
        //   growthRate: 30,
        //   totalHours: '17 tasks'
        // },
        // {
        //   // icon: ``,
        //   title: 'Over Time',
        //   total: '40hrs',
        //   growthRate: 90,
        //   totalHours: '1000hrs'
        // },
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
    formattedRange() {
      if (this.selectedRange.length === 2) {
        return {
          startDate: this.formatDate(this.selectedRange[0]),
          endDate: this.formatDate(this.selectedRange[1])
        };
      }
      return {};
    }
  },
  methods: {
    handleDateRangeChange(value) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 100);
    },
    formatDate(date) {
      const d = new Date(date);
      
      d.setUTCHours(6, 30, 0, 0);
      return d.toISOString();
    },
    calculateCurrentTwoWeeks(){
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay() - 1); 
      const end = new Date(start);
      end.setDate(start.getDate() + 13);  
      
      return [start, end];
    }

  },
  mounted() { 
    setTimeout(() => {
      this.isLoading = false;
    }, 100);  
    const [start, end] = this.calculateCurrentTwoWeeks();
    this.dateRange = { "startDate": start, "endDate": end };

  },
};
</script>
