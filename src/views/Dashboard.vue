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
        <div >
          <DateRangePicker v-model="dateRange" :ranges="false" :autoApply='true' :dateRange="dateRange" @input="onDateChange" @update:modelValue="handleDateRangeChange" />
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat  :chartData="donutChartData1" :apexOptions="donutApexOptions1" width="220" title="Total hours spent"/>
          </div>
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat  :chartData="donutChartData2" :apexOptions="donutApexOptions2" width="220" title="Time Sheet Status"/>
          </div>
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat  :chartData="donutChartData3" :apexOptions="donutApexOptions3" width="220" title="Billable Vs Non-Billable"/>
          </div>
        
          <div class="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
            <PieChat  :chartData="donutChartData4" :apexOptions="donutApexOptions4" width="220" title="Total Over Time"/>
          </div>
        </div>
        
       
      </div>
      
      <div class="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne :chartData="myDynamicChartData" :apexOptions="myDynamicApexOptions"  title="Average Daily Work Hours"/>
        <!-- <BarChat  :chartData="chartData" :chartOptions="apexOptions" title="Project Plans for week" />
        <BarChat  :chartData="chartData2" :chartOptions="apexOptions" title="Approved vs Rejected Timesheets"/> --><!-- <BarChat  :chartData="chartData3" :chartOptions="apexOptions" title="Completed vs Planned Task Hours" />
        <PieChat :chartData="chartData5" :apexOptions="apexOptions" title="Project Hours Distribution"/> -->
        <BarChat  :chartData="chartData4" :chartOptions="apexOptions" title="Weekly Work Hours Overview"/>
        <TableOne :tableData="tableData"/>
        <div class="flex">
          <TableTwo :tableData="tableData2"/>
          <PieChat :chartData="chartData6" :apexOptions="apexOptions5" width="340" title="Project Overtime Analytics"/>
        </div>
        
       
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
import { startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { toast } from 'vue3-toastify';
import { getBillableHours, getTotalOt, getTotalSpentTime, getTimeSheetApprovalStatus, getTimeSheetOverView, getProjectOverView } from '../utils/dashboard.js';

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
      errorMessage: '',
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
      apexOptions5: {
        colors: ['#3056D3', '#c9afed', '#80CAEE','#69e1ff', '#6577F3'],
        labels: ['Project'],
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
      donutChartData1: {
        series: [75, 25],
        labels: ['Spent Hours', 'Excepted Time']
      },
      donutChartData2: {
        series: [65, 25,10],
        labels: ['Approved', 'Pending', 'Rejected']
      },
      donutChartData3: {
        series: [65, 25],
        labels: ['Billable', 'Non-billable']
      },
      donutChartData4: {
        series: [75, 25],
        labels: ['Working Hours', 'Over Time']
      },
      donutApexOptions1: {
        chart: {
          type: 'donut',
          width: 380
        },
        colors: ['#6577F3',  '#69e1ff'],
        labels: ['Spent Hours', 'Excepted Time'],
        legend: {
          show: false,
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              background: 'transparent'
            }
          }
        },
        dataLabels: {
          enabled: false
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
      donutApexOptions2: {
        chart: {
          type: 'donut',
          width: 380
        },
        colors: ['#69e1ff', '#6577F3', '#c9afed'],
        labels: ['Approved', 'Pending', 'Rejected'],
        legend: {
          show: false,
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              background: 'transparent'
            }
          }
        },
        dataLabels: {
          enabled: false
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
      donutApexOptions3: {
        chart: {
          type: 'donut',
          width: 380
        },
        colors: [ '#c9afed', '#69e1ff'],
        labels: ['Billable', 'Non-billable'],
        legend: {
          show: false,
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              background: 'transparent'
            }
          }
        },
        dataLabels: {
          enabled: false
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
      donutApexOptions4: {
        chart: {
          type: 'donut',
          width: 380
        },
        colors: ['#69e1ff','#6577F3'],
        labels: ['Working Hours', 'Over Time'],
        legend: {
          show: false,
          position: 'bottom'
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              background: 'transparent'
            }
          }
        },
        dataLabels: {
          enabled: false
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
      tableData : [],
      tableData2 : [],
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
    handleDateRangeChange(value) {
      if (this.isValidWeek(value.startDate, value.endDate)) {
        this.errorMessage = '';
        const start_date = new Date(value.startDate);
        const formattedStartDate = start_date.toISOString().split('T')[0];
        const end_date = new Date(value.endDate);
        const formattedEndDate = end_date.toISOString().split('T')[0];
        this.getDashboardAnalyticsData(formattedStartDate,formattedEndDate);
      } else {
        this.errorMessage = 'Please select a full week from Sunday to Saturday.';
        toast(this.errorMessage, {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true
        });
        const [start, end] = this.calculateCurrentWeeks();
        this.dateRange = { "startDate": start, "endDate": end };
      }
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
    calculateCurrentWeeks(){
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay()); // Set to the start of the week (Sunday)
      const end = new Date(start);
      end.setDate(start.getDate() + 6); // Set to the end of the week (Saturday)
      return [start, end];

    },
    isValidWeek(startDate, endDate) {
      const startOfWeekDate = startOfWeek(startDate, { weekStartsOn: 0 }); // Sunday
      const endOfWeekDate = endOfWeek(startDate, { weekStartsOn: 0 }); // Saturday
      return isSameDay(startDate, startOfWeekDate) && isSameDay(endDate, endOfWeekDate);
    },
    async getDashboardAnalyticsData(start, end) {
      this.getBillableNonBillableHours(start, end);
      this.getTotalOverTime(start, end);
      this.getTotalTimeSpent(start, end);
      this.getTimesheetStatus(start, end);
      this.getTimesheetData(start, end);
      this.getProjectData(start, end);
    },
    async getBillableNonBillableHours(start, end) {
      try {
        const response = await getBillableHours(start, end);
        this.donutChartData3.series = [response[0].billable_hours,response[0].non_billable_hours];
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
    async getTotalOverTime(start, end) {
      try {
        const response = await getTotalOt(start, end);
        this.donutChartData4.series = [response[0].exp_total_hrs,response[0].over_time];
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
    async getTotalTimeSpent(start, end) {
      try {
        const response = await getTotalSpentTime(start, end);
        this.donutChartData1.series = [response[0].time_spent,response[0].exp_total_hrs];
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
    async getTimesheetStatus(start, end) {
      try {
        const response = await getTimeSheetApprovalStatus(start, end);
        this.donutChartData2.series = [response[0].approved_timesheet_count,response[0].pending_timesheet_count,response[0].rejected_timesheet_count];
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
    async getTimesheetData(start, end) {
      try {
        const response = await getTimeSheetOverView(start, end);
        this.tableData = response;
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
    async getProjectData(start, end) {
      try {
        const response = await getProjectOverView(start, end);
        this.tableData2 = response;
        this.chartData6.series = [];
        this.chartData6.labels = [];
        this.apexOptions5.labels = [];
        response.forEach(data => {
          this.chartData6.series.push(data.total_spent_hours);
          this.chartData6.labels.push(data.project_name);
          this.apexOptions5.labels.push(data.project_name);
          // console.log(this.apexOptions5.labels);
        });
      } catch (error) {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
      }
    },
  },
  mounted() { 
    setTimeout(() => {
      this.isLoading = false;
    }, 100); // Simulating a 2-second load time
    const [start, end] = this.calculateCurrentWeeks();
    this.dateRange = { "startDate": start, "endDate": end };
    const start_date = new Date(start);
    const formattedStartDate = start_date.toISOString().split('T')[0];
    const end_date = new Date(end);
    const formattedEndDate = end_date.toISOString().split('T')[0];
    this.getDashboardAnalyticsData(formattedStartDate,formattedEndDate);
  },
};
</script>
