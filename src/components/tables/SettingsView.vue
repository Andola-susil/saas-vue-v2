
<template>
  <div>
    <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold text-center text-gray-900 mb-2">Settings</h1>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" href="#" @click.prevent="selectTab(tab)" :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium']" :aria-current="tab.current ? 'page' : undefined">
            <span>{{ tab.name }}</span>
          </a>
        </nav>
      </div>
    </div>

    <div v-if="selectedTab === 'Working Hours'">
      <div class="space-y-12 mt-10">
      
        <div class="sm:col-span-4">
         <label for="work-hours" class="block text-sm font-medium leading-6 text-gray-900">Work hour of your company</label>
         <div class="mt-2">
        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="text"
            v-model="workHours"
            id="work-hours"
            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="e.g., 9-5"
          />
        </div>
      </div>
      </div>
      <div class="col-span-full">
      <label for="week-start-day" class="block text-sm font-medium leading-6 text-gray-900">
        Week start day of your company
      </label>
      <div class="flex flex-wrap">
        <div v-for="day in days" :key="day" class="flex h-6 items-center pl-2">
          <input :id="day" v-model="weekStartDays" :value="day" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          <p class="text-gray-500 text-sm pl-2">{{ day }}</p>
        </div>
      </div>
    </div>
    <div class="col-span-full">
      <label for="weekend-days" class="block text-sm font-medium leading-6 text-gray-900">
        Weekend of your company
      </label>
      <div class="flex flex-wrap">
        <div v-for="day in days" :key="day" class="flex h-6 items-center pl-2">
          <input :id="`weekend-${day}`" v-model="weekendDays" :value="day" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
          <p class="text-gray-500 text-sm pl-2">{{ day }}</p>
        </div>
      </div>
    </div>
      <hr>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button @click="addWorkingHour" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
     
    </div>
  </div>
  
    <div v-if="selectedTab === 'Holidays'">
      <div class="space-y-12 mt-10">
       
              <div class="col-span-full">
                <p class="text-gray-500 text-sm">Set the holiday list for 2024</p>
                <ul role="list" class="divide-y divide-gray-100">
                  <li v-for="holiday in holidays" :key="holiday.id" class="flex justify-center gap-x-6 py-5">
                    <div class="flex w-1/3 gap-x-4">
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm leading-6 text-gray-900">{{ holiday.description }}</p>
                      </div>
                    </div>
                    <div class="hidden w-1/3 shrink-0 sm:flex sm:flex-col sm:items-center">
                      <p class="text-sm leading-6 text-gray-900">{{ holiday.holiday }}</p>
                    </div>
                    <div class="hidden w-1/3 shrink-0 sm:flex sm:flex-col sm:items-end">
                      <span class="text-sm leading-6 text-gray-900 cursor-pointer" @click="removeHoliday(holiday.id)"><img src="/src/assets/images/trash-can-gray.svg" alt="" class="h-5 w-5" onmouseover="this.src='/src/assets/images/trash-can.svg'" onmouseout="this.src='/src/assets/images/trash-can-gray.svg'"></span>
                    </div>
                  </li>
                </ul>
                <PaginationTemplate :paginationData="meta_data" @page-changed="fetchHolidays"/>
              </div>
              <div class="col-span-full">
                <div class="flex h-6 items-center">
                  <input id="holiday-saturday" name="holiday-saturday" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <p class="block text-sm font-medium leading-6 text-gray-900 pl-2">Mark 2nd and 4th Saturday as holiday</p>
                </div>
              </div>
              <div class="col-span-full">
              <label for="holiday" class="block text-sm font-medium leading-6 text-gray-900">Add Holiday</label>
              <div v-for="(holiday, index) in newHolidays" :key="index" class="mt-2 flex items-center">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    :name="'newHoliday' + index"
                    :id="'newHoliday' + index"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                    placeholder="Holiday Name"
                    v-model="holiday.name"
                  /></div>
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ml-2">
                  <input
                    type="date"
                    :name="'newDate' + index"
                    :id="'newDate' + index"
                    class="block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400  "
                    v-model="holiday.date"
                  />
                </div>
                <button @click="removeNewHoliday(index)" class="ml-2 bg-white-600 text-white px-2 py-1 rounded">
                  <img src="/src/assets/images/circle-x.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Remove">
                </button>
                <button @click="addHoliday" class="bg-white-600 text-white px-2 py-1 rounded flex items-center">
                  <img src="/src/assets/images/circle-plus.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Add">
                </button>
                
              </div>


              <hr class="mt-6">
              <div class="flex">
                
              <div class="mt-6 flex items-center justify-end gap-x-6" style="margin-left: 19.5rem;">
              <button @click="saveHolidays" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2 ">Save Holidays</button>
            </div>
            </div>
            </div>
    </div>
  </div>
  </div>
  </div>
  <Loader :loading="isLoading" /> 
</template>

<script>
import Loader from '../Loader.vue';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { addHolidayList, getHolidayList, addWorkHourList, getWorkingHourList } from '../../utils/setting.js';
import PaginationTemplate from '../common/PaginationTemplate.vue';


export default {
  name: 'Settings', 
  components: {
    Loader, 
    PaginationTemplate,
  },

  data() {
    return {
      meta_data : [],
      paginationData: {
        total_items: 0,
        items_per_page: 10,
        current_page: 1,
      },
      selectedTab: 'Working Hours',
      tabs: [
        { name: 'Working Hours', current: true },
        { name: 'Holidays', current: false },
      ],
      enabled: true,
      isLoading: true,
      holidays: [],
      newHolidays: [{ name: '', date: '' }],
      workHours: '',
      weekendDays: [],
      weekStartDays: [],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    };
  },
  methods: {
    selectTab(tab) {
      this.tabs.forEach(t => {
        t.current = t.name === tab.name;
      });
      this.selectedTab = tab.name;
    },

    async fetchHolidays(page) {
      this.paginationData.current_page = page;
      try {
        const response = await getHolidayList(page);
        console.warn(response);
        this.holidays = response.items;
        this.meta_data = response.meta;
       
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        this.isLoading = false;
      }
    },
    async removeHoliday(id) {
      try {
        // Add your API call to delete the holiday here
        // await deleteHoliday(id);
        this.holidays = this.holidays.filter((holiday) => holiday.id !== id);
      } catch (error) {
        console.error('Error removing holiday:', error);
      }
    },
    addHoliday() {
      this.newHolidays.push({ name: '', date: '' });
    },
    removeNewHoliday(index) {
      this.newHolidays.splice(index, 1);
    },
    async saveHolidays() {
      try {
        for (const holiday of this.newHolidays) {
          const holidayData = {
            holiday: holiday.date,
            description: holiday.name,
            is_second_fourth: 0,
          };

          const response = await addHolidayList(holidayData);
          toast('holiday added successfully', {
            theme: 'colored',
            type: 'success',
            hideProgressBar: true,
            dangerouslyHTMLString: true,
          });
          this.fetchHolidays();
        }
      } catch (error) {
        toast('An error occurred. Please try again.', {
          theme: 'colored',
          type: 'error',
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
      } finally {
        this.isLoading = false;
      }
    },
    async fetchWorkingHours() {
  try {
    const response = await getWorkingHourList(); 
    const sortedItems = response.items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const workingHourData = sortedItems[0];  
    this.workHours = workingHourData.work_hours;
    this.weekendDays = workingHourData.week_ends.split(',');
    this.weekStartDays = workingHourData.week_starts.split(',');
  } catch (error) {
    console.error('Error fetching working hours:', error);
  } finally {
    this.isLoading = false;
  }
},

    async addWorkingHour() {
      this.isLoading = true;
      try {
        const workingHourData = {
          work_hours: this.workHours,
          week_ends: this.weekendDays.join(','),
          week_starts: this.weekStartDays.join(','),
        };

        const response = await addWorkHourList(workingHourData);
        toast('Working hours added successfully', {
          theme: 'colored',
          type: 'success',
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
        this.workHours = workingHourData.work_hours; // Update the workHours with the saved value
      } catch (error) {
        toast('An error occurred. Please try again.', {
          theme: 'colored',
          type: 'error',
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.isLoading = false;
    this.fetchHolidays();
    this.fetchWorkingHours();
    this.fetchHolidays(this.paginationData.current_page);
  },
};
</script>

<style scoped>
/* Add your scoped styles here */
</style> 











