<template>
    <div>
        <div class="border border-gray-200 shadow-md">
            <div class="p-4 flex space-x-2">
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">Project</h2>
              <SelectInput :options="project_list" placeholder="Select project" :initialSelected="project_id" @handleSelector="handleProjectSelect"/>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">Task</h2>
              <SelectInput :options="task_list" placeholder="Select task" :initialSelected="task_id" @handleSelector="handleTaskSelect"/>
            </div>
            <!-- <div class="relative mt-2 rounded-md shadow-sm w-1/6">
              <h2 class="text-sm font-medium text-gray-500">Start time</h2>
              <div><input type="time" v-model="startTime" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /></div>
            </div> -->
            <!-- <div class="relative mt-2 rounded-md shadow-sm w-1/6">
              <h2 class="text-sm font-medium text-gray-500">End time</h2>
              <div><input type="time" v-model="end_time" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /></div>
            </div> -->
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="flex pt-8">
                <input :id="day" v-model="is_billable" :value="day" type="checkbox" class="relative top-1 h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <h2 class="text-sm font-medium text-gray-500">Is Billable</h2>
              </div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="pt-8"><span class="text-sm font-medium text-gray-500">{{ formattedTime }}</span></div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="pt-8">
                <button v-if="!timerRunning" @click="startTimer" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start</button>
                <button v-if="timerRunning" @click="stopTimer" type="button" class="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Stop</button>
              </div>
            </div>
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
    <div>
      <Header title="Today" totalLabel="Total" :totalTime="formattedTotalTime" />
      <div v-for="(record, index) in timerRecords" :key="index">
        <div class="bg-card p-4 rounded-lg shadow-md">
          
          <TaskInput :taskId="record.id" project="My Project" :timeRange="`${record.startTime}-${record.endTime}`" elapsedTime="00:00:21" />
        </div>
      </div>
    </div>
</div>


</template>

<script>
import Header from '../components/timetracker/HeaderView.vue';
import TaskInput from '../components/timetracker/TaskInputview.vue';
import { getProjectList,createProject } from '../utils/project.js';
import { geTaskList ,createTask} from '../utils/task.js';
import { saveTimelog,fetchTodayTimeLogs} from '../utils/timelog.js';
import SelectInput from '../components/common/SelectInput.vue';
import { toast } from 'vue3-toastify';

export default {
  components: {
    Header,
    TaskInput,
    SelectInput
  },
  data() {
    return {
      timerRecords: [],
      dropdownOpen: false,
      startStopBtnStatus: true,
      startTime: 0, // Timestamp when the timer started
      elapsedTime: 0, // Time in milliseconds
      timer: null, // Interval ID
      timerRunning: false, // Timer state
      end_time: 0,
      task_list: [],
      project_list: [],
      project_id: '',
      task_id: '',
      is_billable: false,
    };
  },
  computed: {
    // Formats elapsed time as HH:MM:SS.sss
    formattedTime() {
      const hours = String(Math.floor(this.elapsedTime / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((this.elapsedTime % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((this.elapsedTime % 60000) / 1000)).padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    },
  },
  mounted() {
    this.fetchProjectList();
    this.getTodayTimeLogs();
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
    // stopTimer() {
    //   if (this.timerRunning) {
    //     clearInterval(this.timer);
    //     this.timerRunning = false;
    //   }
    // },
    stopTimer() {
      this.endTime = new Date().toLocaleString();
      this.saveDailyTimeSheet();
      this.saveRecords();
      if (this.timerRunning) {
        clearInterval(this.timer);
        this.timerRunning = false;
        this.elapsedTime = 0;
      }
    },
    // Resets the timer
    resetTimer() {
      this.stopTimer();
      this.elapsedTime = 0;
    },
    saveRecords() {
      localStorage.setItem('timerRecords', JSON.stringify(this.timerRecords));
    },
    fetchProjectList(){
      this.project_list.push({name: "<strong>Create new project</strong>", value: -1, id: "create_new"});
      const res = getProjectList().then((data) => {
        if(data.items.length > 0){
          data.items.forEach(pobj => {
            this.project_list.push({name:pobj.project_name, value: pobj.id, id: pobj.id});
          });
        }
      })
      .catch((error) => {

      });
    },
    getTaskList(){
      try {
        this.task_list.push({ name: "<strong>Create new task</strong>", value: 0, id: "" });
        const data = geTaskList(this.project_id).then((data) => {
          if (data.items && data.items.length > 0) {
            data.items.forEach(task => {
              this.task_list.push({ name: task.task_title, value: task.id, id: task.id });
            });
            table.updateColumnDefinition("task_name", {
              editorParams: {
                values: taskList.value,
              }
            });
          }
        })
        .catch((error) => {

        });
      } catch (error) {
        console.error("Error fetching task list:", error);
      }
    },
    handleProjectSelect(project_info){
      this.project_id = project_info.value;
      this.getTaskList();
      this.startTimer();
    },
    handleTaskSelect(task_info){
      this.task_id = task_info.value;
    },
    getFormatedTime(time){
      const date = new Date(time);
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      return formattedTime;
    },
    saveDailyTimeSheet(){
      const time_log_date = new Date().toISOString().slice(0, 10);
      const data = {
        project_id: this.project_id,
        task_id: this.task_id,
        time_log_date: time_log_date,
        task_start_time: this.getFormatedTime(this.startTime),
        task_end_time: this.getFormatedTime(this.endTime),
        is_billable: this.is_billable,
        approval_status: "pending",
      };
      const res = saveTimelog(data).then((data) => {
        this.getTodayTimeLogs();
        clearInterval(this.timerId);
        toast("Time logged successfully!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true
        });
        this.project_id = null;
        this.task_id = null;
        this.is_billable = false;
        })
      .catch((error) => {

      });
    },
    getTodayTimeLogs(){
      const res = fetchTodayTimeLogs().then((data) => {
        data.items.forEach(log => {
          this.timerRecords.push({ startTime: log.task_start_time, endTime: log.task_end_time, id: log.id });
        });
      })
      .catch((error) => {

      });
    },
  },
  beforeDestroy() {
    // Ensure timer is stopped when component is destroyed
    this.stopTimer();
  },
  
};
</script>