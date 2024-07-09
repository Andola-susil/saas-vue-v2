<template>
  <div>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Settings</h1>
      <div>
        <div class="space-y-12">
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div class="col-span-full">
              <span class="text-sm font-medium leading-6 text-gray-900">Available to hire</span><br>
              <Switch
                v-model="enabled"
                class="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none"
              > 
                <span class="sr-only">Use setting</span>
                <span aria-hidden="true" class="pointer-events-none absolute h-full w-full rounded-md bg-white"></span>
                <span
                  aria-hidden="true"
                  :class="[
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                  ]"
                ></span>
                <span
                  aria-hidden="true"
                  :class="[
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out',
                  ]"
                ></span>
              </Switch>
            </div>
            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
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
              <div class="col-span-full">
                <div class="flex h-6 items-center">
                  <input id="holiday-saturday" name="holiday-saturday" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <p class="block text-sm font-medium leading-6 text-gray-900 pl-2">Mark 2nd and 4th Saturday as holiday</p>
                </div>
              </div>
              <div class="col-span-full">
                <p class="text-gray-500 text-sm">Set the holiday list for 2024</p>
                <ul role="list" class="divide-y divide-gray-100">
                  <li v-for="holiday in holidays" :key="holiday.id" class="flex justify-between gap-x-6 py-5">
                    <div class="flex w-2/4 gap-x-4">
                      <div class="min-w-0 flex-auto">
                        <p class="text-sm leading-6 text-gray-900">{{ holiday.description }}</p>
                      </div>
                    </div>
                    <div class="hidden w-1/4 shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p class="text-sm leading-6 text-gray-900">{{ holiday.holiday }}</p>
                    </div>
                    <div class="hidden w-1/4 shrink-0 sm:flex sm:flex-col sm:items-end">
                      <span class="text-sm leading-6 text-gray-900 cursor-pointer" @click="removeHoliday(holiday.id)">Remove</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-span-full">
              <label for="holiday" class="block text-sm font-medium leading-6 text-gray-900">Add Holiday</label>
              <div v-for="(holiday, index) in newHolidays" :key="index" class="mt-2 flex items-center">
                <div class="flex rounded-md shadow-sm sm:max-w-md">
                  <input
                    type="text"
                    :name="'newHoliday' + index"
                    :id="'newHoliday' + index"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6"
                    placeholder="Holiday Name"
                    v-model="holiday.name"
                  />
                  <input
                    type="date"
                    :name="'newDate' + index"
                    :id="'newDate' + index"
                    class="ml-2 block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    v-model="holiday.date"
                  />
                </div>
                <button @click="removeNewHoliday(index)" class="ml-2 bg-white-600 text-white px-2 py-1 rounded">
                  <img src="/src/assets/images/minus.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Remove">
                </button>
                <button @click="addHoliday" class="ml-2 bg-white-600 text-white px-2 py-1 rounded flex items-center">
                  <img src="/src/assets/images/circle-plus.svg" alt="" class="h-5 w-5" v-b-tooltip.hover title="Add">
                </button>
              </div>
              <button @click="saveHolidays" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Save Holidays</button>
            </div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
      <button @click="addWorkingHour" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
      </div>
    </div>
    <Loader :loading="isLoading" /> 
  </div>
</template>

<script>
import Loader from '../Loader.vue';
import { ref } from 'vue';
import { Switch } from '@headlessui/vue';
import { toast } from 'vue3-toastify';

import { addHolidayList ,getHolidayList, addWorkHourList,getWorkingHourList} from '../../utils/setting.js' ;

export default {
  data() {
    return {
      workHours: '',
      weekStartDays: [],
      weekendDays: [],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      isLoading: ref(false),
    };
  },
  name: 'Settings',
  components: {
    Loader,
    Switch,
  },
  setup() {
    const enabled = ref(false);
    const isLoading = ref(true);
    const holidays = ref([]);
    const newHolidays = ref([{ name: '', date: '' }]);

    const fetchHolidays = async () => {
      
      try {
        const response = await getHolidayList();
        console.warn(response);
        holidays.value = response.items; // assuming response.data contains the holiday list
      } catch (error) {
        console.error('Error fetching holidays:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const removeHoliday = async (id) => {
      try {
        // Add your API call to delete the holiday here
        // await deleteHoliday(id);
        holidays.value = holidays.value.filter(holiday => holiday.id !== id);
      } catch (error) {
        console.error('Error removing holiday:', error);
      }
    };
     

    const addHoliday = () => {
      newHolidays.value.push({ name: '', date: '' });
    };
    const removeNewHoliday = (index) => {
      newHolidays.value.splice(index, 1);
    };

    const saveHolidays = async () => {
      isLoading.value = true;
      try {
        for (const holiday of newHolidays.value) {
          const holidayData = {
            holiday: holiday.date,
            description: holiday.name,
            is_second_fourth: 0  
          };

          const response = await addHolidayList(holidayData); 
          toast("holiday added successfully", {
          theme: "colored",
          type: "success",
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
        clearForm();
        }
        // Optionally, reset the form or show a success message
      } catch (error) {
        toast("An error occurred. Please try again.", {
          theme: "colored",
          type: "error",
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
      }finally {
        isLoading.value = false;
      }
    };
    fetchHolidays();

    


    // const removeHoliday = (id) => {
    //   holidays.value = holidays.value.filter(holiday => holiday.id !== id);
    // };

    return {
      enabled,
      isLoading,
      holidays,
      newHolidays,
      addHoliday,
      saveHolidays,
      // removeHoliday,
      removeNewHoliday,
    };
     
  },
  methods: {
    async fetchWorkingHours() {
      this.isLoading = true;
      try {
        const data = await getWorkingHourList();
        console.warn(data.items[0].work_hours,'jgkjfhbjkf');
      
          this.workHours = data.items[0].work_hours; // Adjust based on the structure of the response data
     
      } catch (error) {
        toast('An error occurred while fetching work hours. Please try again.', {
          theme: 'colored',
          type: 'error',
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
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
    this.fetchWorkingHours();
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
