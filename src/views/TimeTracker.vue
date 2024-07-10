<template>
    <div>
        <div class="border border-gray-200 shadow-md">
            <div class="p-4 flex space-x-2">
  <div class="relative mt-2 rounded-md shadow-sm w-[80%]">
    <select name="account-number" id="account-number" class="block w-full rounded-md border-0 p-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      <option value="" disabled selected>Please select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
      <!-- Add more options as needed -->
    </select>
  </div>
  <a href="#" class="w-2/10 flex items-center w-[10%] cursor-pointer">
    <div class="flex">
      <div @click="toggleDropdown" class="flex items-center cursor-pointer">
        <span class="text-sm font-medium text-gray-500">+</span>
        <h2 class="text-sm font-medium text-gray-500">Project</h2>
      </div>
      <div class="flex items-center cursor-pointer sm:ml-8">
        <span class="text-sm font-medium text-gray-500">{{ formattedTime }}</span>
      </div>
      <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-none">
          <button v-if="!timerRunning" @click="startTimer" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start</button>
          <button v-if="timerRunning" @click="stopTimer" type="button" class="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Stop</button>
      </div>
    <!-- Dropdown menu -->
    <div v-if="dropdownOpen" class="absolute mt-2 right-0 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div class="py-2 px-3" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div class="relative">
          <input type="text" v-model="searchQuery" placeholder="Search..." class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2 border border-gray-200">
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M15.293 14.707a1 1 0 0 1-1.414 1.414l-3.002-3.002a5.5 5.5 0 1 1 1.414-1.414l3.002 3.002zM11.5 10.5a4 4 0 1 0-8 0 4 4 0 0 0 8 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="min-h-[100px] flex items-center justify-center">
             <p>No projects yet</p>
        </div>
        <div class="flex items-center space-x-2 cursor-pointer p-2 border-t-2 border-gray-200">
    <span class="text-sm font-medium text-blue-500">+</span>
    <h2 class="text-sm font-medium text-blue-500">Create New Project</h2>
  </div>
        <!-- Add more options as needed -->
      </div>
    </div>
  </div>
  </a>
</div>

      <hr class="border-gray-200">
      <div class="p-4 border-gray-200">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-gray-900"> </h1>
                <p class="mt-2 text-sm text-gray-700"></p>
            </div>
      </div>
    </div>

    </div>
</div>
<div v-for="(record, index) in timerRecords" :key="index">
  <div class="bg-card p-4 rounded-lg shadow-md">
    <Header title="Today" totalLabel="Total" :totalTime="formattedTotalTime" />
    <TaskInput :taskId="2" project="My Project" timeRange="12:11PM - 12:20PM" elapsedTime="00:00:21" />
  </div>
</div>

</template>

<script>
import Header from '../components/timetracker/HeaderView.vue';
import TaskInput from '../components/timetracker/TaskInputview.vue';

export default {
  components: {
    Header,
    TaskInput
  },
  data() {
    return {
      timerRecords: [],
      dropdownOpen: false,
      startStopBtnStatus: true,
      startTime: 0, // Timestamp when the timer started
      elapsedTime: 0, // Time in milliseconds
      timer: null, // Interval ID
      timerRunning: false // Timer state
    };
  },
  computed: {
    // Formats elapsed time as HH:MM:SS.sss
    formattedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((this.elapsedTime % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((this.elapsedTime % 60000) / 1000)).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleStartStopButton() {
      this.startStopBtnStatus = !this.startStopBtnStatus;
    },
    // Starts the timer
    startTimer() {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.startTime = Date.now() - this.elapsedTime; // Adjust start time to account for paused duration
        this.timer = setInterval(() => {
          this.elapsedTime = Date.now() - this.startTime;
        }, 1);
      }
    },
    // Stops the timer
    stopTimer() {
      if (this.timerRunning) {
        clearInterval(this.timer);
        this.timerRunning = false;
      }
    },
    stopTimer() {
      this.endTime = new Date().toLocaleString();
      clearInterval(this.timerId);
      this.timerRecords.push({
        startTime: this.startTime,
        endTime: this.endTime
      });
      this.saveRecords();
    },
    // Resets the timer
    resetTimer() {
      this.stopTimer();
      this.elapsedTime = 0;
    },
    saveRecords() {
      localStorage.setItem('timerRecords', JSON.stringify(this.timerRecords));
    },
  },
  beforeDestroy() {
    // Ensure timer is stopped when component is destroyed
    this.stopTimer();
  }
};
</script>