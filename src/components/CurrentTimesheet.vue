<template>
    <div class="container mx-auto mt-8">
      <div class="bg-blue-600 text-white rounded-lg shadow-lg">
        <div class="bg-blue-700 p-4 rounded-t-lg">
          <div class="grid grid-cols-10 gap-2 text-center">
            <div class="col-span-3">
              <h4>Project-Task</h4>
            </div>
            <div><h4>Mon</h4></div>
            <div><h4>Tue</h4></div>
            <div><h4>Wed</h4></div>
            <div><h4>Thur</h4></div>
            <div><h4>Fri</h4></div>
            <div><h4>Sat</h4></div>
            <div><h4>Sun</h4></div>
            <div><h4>Total</h4></div>
            <div class="mt-2">
              <span class="glyphicon glyphicon-wrench more-toolbar" aria-hidden="true"></span>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-10 gap-2 mb-2" v-for="(entry, index) in timesheetEntries" :key="index">
            <div class="col-span-3">
              <button
                class="w-full bg-gray-200 text-gray-800 rounded-lg p-2 focus:outline-none focus:ring"
                type="button"
                @click="selectProjectTask(entry)"
              >
                {{ entry.projectTask }}
                <span class="caret"></span>
              </button>
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.mon"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.tue"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.wed"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.thur"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.fri"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.sat"
                placeholder="8.00"
              />
            </div>
            <div>
              <input
                type="text"
                class="form-control w-full p-2 border rounded-lg"
                v-model="entry.hours.sun"
                placeholder="8.00"
              />
            </div>
            <div>
              <button class="w-full bg-green-500 text-white rounded-lg p-2 focus:outline-none">
                {{ calculateTotal(entry.hours) }}
              </button>
            </div>
            <div>
              <button
                class="w-full bg-gray-200 text-gray-800 rounded-lg p-2 focus:outline-none"
                @click="removeEntry(index)"
              >
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
  
        <div class="p-4">
          <div class="grid grid-cols-10 gap-2 mb-2 text-center">
            <div class="col-span-1">
              <button
                class="btn btn-info"
                @click="addNewEntry"
              >
                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"> New</span>
              </button>
            </div>
            <div class="col-span-1">
              <button
                class="btn btn-info"
                @click="saveTimesheet"
              >
                <span class="glyphicon glyphicon-floppy-open" aria-hidden="true"> Save</span>
              </button>
            </div>
            <div class="col-span-6"></div>
            <div class="col-span-1">
              <button
                class="w-full bg-blue-500 text-white rounded-lg p-2 focus:outline-none"
                v-for="day in weekDays"
                :key="day"
              >
                {{ calculateDailyTotal(day) }}
              </button>
            </div>
            <div class="col-span-1">
              <button
                class="w-full bg-green-500 text-white rounded-lg p-2 focus:outline-none"
              >
                {{ calculateWeeklyTotal() }}
              </button>
            </div>
            <div class="col-span-1">
              <button
                class="w-full bg-red-500 text-white rounded-lg p-2 focus:outline-none"
                @click="removeAllEntries"
              >
                <span class="glyphicon glyphicon-trash" aria-hidden="true"> All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        timesheetEntries: [
          {
            projectTask: 'Select Project and Task',
            hours: {
              mon: '',
              tue: '',
              wed: '',
              thur: '',
              fri: '',
              sat: '',
              sun: ''
            }
          }
        ],
        weekDays: ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun']
      };
    },
    methods: {
      selectProjectTask(entry) {
        // Implementation for project task selection
      },
      calculateTotal(hours) {
        return Object.values(hours).reduce((total, hour) => total + parseFloat(hour || 0), 0);
      },
      addNewEntry() {
        this.timesheetEntries.push({
          projectTask: 'Select Project and Task',
          hours: {
            mon: '',
            tue: '',
            wed: '',
            thur: '',
            fri: '',
            sat: '',
            sun: ''
          }
        });
      },
      removeEntry(index) {
        this.timesheetEntries.splice(index, 1);
      },
      saveTimesheet() {
        // Implementation for saving the timesheet
      },
      calculateDailyTotal(day) {
        return this.timesheetEntries.reduce((total, entry) => total + parseFloat(entry.hours[day] || 0), 0);
      },
      calculateWeeklyTotal() {
        return this.timesheetEntries.reduce((total, entry) => total + this.calculateTotal(entry.hours), 0);
      },
      removeAllEntries() {
        this.timesheetEntries = [];
      }
    }
  };
  </script>
  
  <style scoped>
  .more-toolbar {
    margin-top: 10px;
  }
  .more {
    margin-top: 3px;
  }
  .more:last-child {
    margin-bottom: 0px;
  }
  .more p {
    font-weight: 350;
  }
  .p {
    text-align: center;
  }
  </style>
  