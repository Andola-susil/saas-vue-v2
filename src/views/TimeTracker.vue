<template>
    <div>
        <div class="sm:flex-auto py-4">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Log your time</h1>
        </div>
        <div class="border border-gray-200 shadow-md">
            <div class="p-4 flex space-x-2">
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">Project</h2>
              <SelectInput :options="project_list" placeholder="Select project" :initialSelected="project_info" @handleSelector="handleProjectSelect"/>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">Task</h2>
              <SelectInput :options="task_list" placeholder="Select task" :initialSelected="task_info" @handleSelector="handleTaskSelect"/>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">Start time</h2>
              <div><input type="time" v-model="startTime" class="block w-full rounded-md border-0 py-1 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mt-2" /></div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-2/6">
              <h2 class="text-sm font-medium text-gray-500">End time</h2>
              <div><input type="time" v-model="endTime" @input="calculateDuration()" class="block w-full rounded-md border-0 py-1 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 mt-2" /></div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="flex pt-[38px] px-2">
                <input  v-model="is_billable" :value="day" type="checkbox" class="relative top-1 h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <h2 class="text-sm font-medium text-gray-500 ml-2">Is Billable</h2>
              </div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="pt-[38px]">
                <span class="text-foreground font-semibold mx-2">
                {{ duration }}
                </span>
                </div>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="pt-[30px] px-3">
                <button v-if="log_id == null" @click="saveDailyTimeSheet" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                <button v-else @click="updateTimeLog" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
              </div>
            </div>
            <!-- <div class="relative mt-2 rounded-md shadow-sm w-1/4">
              <div class="pt-8">
                <button v-if="!timerRunning" @click="startTimer" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start</button>
                <button v-if="timerRunning" @click="stopTimer" type="button" class="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Stop</button>
              </div>
            </div> -->
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
      <Header :title="'Today(' + new Date().toISOString().slice(0, 10) + ')'" :totalLabel="'Total'" :totalTime="total_time_logged_for_current_date" />
      <!-- <h2 class="font-medium py-6 pl-4">Today({{new Date().toISOString().slice(0, 10)}})</h2> -->
      <TimetrackerHeaderView />
      <div v-for="(record, index) in timerRecords" :key="index">
        <div class="bg-card p-4 rounded-lg shadow-md">
          <TaskInput @editTimeLog="editLoggedTime" @deleteTimeLog="deleteLogTime" :duration="record.total_time" :time_log_date="record.time_log_date" :is_billable="record.is_billable" :task_id="record.task_id" :project_id="record.project_id" :log_id="record.id" :project="record.project_name" :elapsedTime="record.total_time" :task="record.task_name" :startTime="record.startTime" :endTime="record.endTime" />
        </div>
      </div>
      <PaginationTemplate :paginationData="meta_data" @page-changed="getTodayTimeLogs"/>
    </div>
     <Loader :loading="isLoading" />
     <div v-if="showCreateProjectPopup">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          @closePopup="handleClosePopup"
          @confirmPopup="createProject"
        />
      </div>
      <div v-if="showCreateTaskPopup">
        <ModalPopup  
          :open="isModalOpen"
          :title="modalContent.title"
          :description="modalContent.description"
          :confirmLabel="modalContent.confirmLabel"
          :cancelLabel="modalContent.cancelLabel"
          :showInputField="modalContent.showInputField"
          @closePopup="handleClosePopup"
          @confirmPopup="createTask"
        />
      </div>
</div>


</template>

<script>
import Header from '../components/timetracker/HeaderView.vue';
import TimetrackerHeaderView from '../components/timetracker/TimetrackerHeaderView.vue';
import TaskInput from '../components/timetracker/TaskInputview.vue';
import { getProjectList,createProject } from '../utils/project.js';
import { geTaskList ,createTask} from '../utils/task.js';
import { saveTimelog,fetchTodayTimeLogs,deleteTimeLogs,updateTimelogs} from '../utils/timelog.js';
import SelectInput from '../components/common/SelectInput.vue';
import { toast } from 'vue3-toastify';
import Loader from '../components/Loader.vue';
import PaginationTemplate from '../components/common/PaginationTemplate.vue';
import ModalPopup from '../components/common/ModalPopup.vue';

export default {
  components: {
    Header,
    TaskInput,
    SelectInput,
    TimetrackerHeaderView,
    Loader,
    PaginationTemplate,
    ModalPopup
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
      project_name: '',
      task_name: '',
      duration: '00:00:00',
      project_info: {},
      task_info: {},
      log_id: null,
      time_log_date: '',
      isLoading: false,
      meta_data : [],
      paginationData: {
        total_items: 0,
        items_per_page: 2,
        current_page: 1,
      },
      total_time_logged_for_current_date: '00:00:00',
      showCreateProjectPopup: false,
      showCreateTaskPopup: false,
      showPopup : false,
      modalContent: {
        title : '',
        description: '',
        confirmLabel: '',
        cancelLabel: '',
        showInputField: false,
      },
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
    this.getTodayTimeLogs(this.paginationData.current_page);
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
      this.project_list.push({name: "Create new project", value: -1, id: "create_new"});
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
    fetchTaskList(){
      this.task_list = [];
      try {
        this.task_list.push({ name: "Create new task", value: -1, id: "" });
        const data = geTaskList(this.project_id).then((data) => {
          if (data.items && data.items.length > 0) {
            data.items.forEach(task => {
              this.task_list.push({ name: task.task_title, value: task.id, id: task.id });
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
      if(project_info.value == -1){
        this.modalContent.title="Enter project name";
        this.modalContent.description="";
        this.modalContent.confirmLabel="Submit";
        this.modalContent.cancelLabel="Cancel";
        this.modalContent.showInputField = true;
        this.showCreateProjectPopup = true;
        this.openPopup();
      }
      this.project_id = project_info.value;
      this.project_name = project_info.name;
      this.fetchTaskList();
      // this.startTimer();
    },
    handleTaskSelect(task_info){
      if(task_info.value == -1){
          this.modalContent.title="Enter task name";
          this.modalContent.description="";
          this.modalContent.confirmLabel="Submit";
          this.modalContent.cancelLabel="Cancel";
          this.modalContent.showInputField = true;
          this.showCreateTaskPopup = true;
          this.openPopup();
      }
      this.task_id = task_info.value;
      this.task_name = task_info.name;
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
    timeToMilliseconds(time) {
      // Parse the hours and minutes from the time string
      const [hours, minutes] = time.split(':').map(Number);

      // Convert hours and minutes to milliseconds
      const hoursInMilliseconds = hours * 60 * 60 * 1000;
      const minutesInMilliseconds = minutes * 60 * 1000;

      // Calculate the total milliseconds
      const totalMilliseconds = hoursInMilliseconds + minutesInMilliseconds;

      return totalMilliseconds;
    },
    calculateDuration(){
      const start_time = this.timeToMilliseconds(this.startTime)
      const end_time = this.timeToMilliseconds(this.endTime);
     let diffMilliseconds = end_time - start_time;
      if (diffMilliseconds < 0) {
        diffMilliseconds += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
      }

      // Convert the difference to hours, minutes, and seconds
      const diffSeconds = Math.floor(diffMilliseconds / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const remainingMinutes = diffMinutes % 60;
      const remainingSeconds = diffSeconds % 60;

      // Format the result as "HH:MM:SS"
      const formattedDuration = `${String(diffHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

      this.duration = formattedDuration;
    },
    saveDailyTimeSheet(){
      this.isLoading = true;
      const time_log_date = new Date().toISOString().slice(0, 10);
      const start_time = this.timeToMilliseconds(this.startTime)
      const end_time = this.timeToMilliseconds(this.endTime);
      const data = {
        project_id: this.project_id,
        task_id: this.task_id,
        time_log_date: time_log_date,
        task_start_time: this.getFormatedTime(start_time),
        task_end_time: this.getFormatedTime(end_time),
        is_billable: this.is_billable,
        approval_status: "pending",
        project_name: this.project_name,
        task_name: this.task_name,
      };
      const res = saveTimelog(data).then((data) => {
        this.timerRecords = [];
        this.getTodayTimeLogs();
        clearInterval(this.timerId);
        this.clearFields();
        this.isLoading = false;
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
    formatSecondsToHHMMSS(seconds) {
      // Calculate hours, minutes, and seconds
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      // Pad single digit numbers with a leading zero
      const paddedHours = String(hours).padStart(2, '0');
      const paddedMinutes = String(minutes).padStart(2, '0');
      const paddedSeconds = String(secs).padStart(2, '0');

      // Format the time as HH:MM:SS
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    },
    getTodayTimeLogs(page){
      this.paginationData.current_page = page;
      var total_time = 0;
      const res = fetchTodayTimeLogs(page).then((data) => {
        data.items.forEach(log => {
          total_time = total_time + log.total_time;
          this.timerRecords.push(
            { 
              startTime: log.task_start_time, 
              endTime: log.task_end_time, 
              id: log.id,
              project_name: log.project_name,
              task_name: log.task_name, 
              is_billable: log.is_billable,
              total_time: log.total_time != null ? this.formatSecondsToHHMMSS(log.total_time) : '00:00:00',
              task_id: log.task_id,
              project_id: log.project_id,
              time_log_date: log.time_log_date,
            }
            );
        });
        this.meta_data = data.meta;
        this.total_time_logged_for_current_date = this.formatSecondsToHHMMSS(total_time);
      })
      .catch((error) => {

      });
    },
    deleteLogTime(id){
      const res = deleteTimeLogs(id).then((data) => {

      })
      .catch((error) => {

      });
    },
    editLoggedTime(data){
      this.task_id = data.task_id;
      this.project_id = data.project_id;
      this.startTime = data.startTime;
      this.endTime = data.endTime;
      this.is_billable = data.is_billable;
      this.project_info = { name: data.project_name, value: data.project_id, id: data.log_id };
      this.task_info = { name: data.task_name, value: data.task_id, id: data.log_id };
      this.log_id = data.log_id;
      this.time_log_date = data.time_log_date;
      this.project_name = data.project_name;
      this.task_name = data.task_name;
      this.duration = data.duration;
      this.getTaskList();
    },
    updateTimeLog(){
      this.isLoading = true;
      const start_time = this.timeToMilliseconds(this.startTime)
      const end_time = this.timeToMilliseconds(this.endTime);
      const data = {
        project_id: this.project_id,
        task_id: this.task_id,
        time_log_date: this.time_log_date,
        task_start_time: this.getFormatedTime(start_time),
        task_end_time: this.getFormatedTime(end_time),
        is_billable: this.is_billable,
        approval_status: "pending",
        project_name: this.project_name,
        task_name: this.task_name,
      };
      const res = updateTimelogs(data,this.log_id).then((data,) => {
        this.timerRecords = [];
        this.clearFields();
        this.getTodayTimeLogs();
        this.isLoading = false;
        toast("Time log updated successfully!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true
        });
      })
      .catch((error) => {

      });
    },
    clearFields(){
      this.task_id = '';
      this.project_id = '';
      this.startTime = '';
      this.endTime = '';
      this.is_billable = false;
      this.project_info = {};
      this.task_info = {};
      this.log_id = null;
      this.time_log_date = '';
      this.project_name = '';
      this.task_name = '';
      this.duration = '00:00:00';
    },
    openPopup(){
      this.isModalOpen = true;
    },
    createProject(input){
        this.isLoading = true;
        const res = createProject(input).then((data) => {
          toast("Project created successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
          
        })
        .catch((error) => {

        });
        setTimeout(() => {
          this.fetchProjectList();
          this.project_info = { name: null, value: null, id: null };
          this.isModalOpen = false;
          this.isLoading = false;
        }, 500);
      
      },
      createTask(input){
        this.isLoading = true;
        const res = createTask(input, this.project_id).then((data) => {
          toast("Task created successfully!", {
            "theme": "colored",
            "type": "success",
            "hideProgressBar": true,
            "dangerouslyHTMLString": true
          })
        })
        .catch((error) => {

        });
        setTimeout(() => {
          this.fetchTaskList();
          this.task_info = { name: null, value: null, id: null };
          this.isModalOpen = false;
          this.isLoading = false;
        }, 500);
        
      },
  },
  beforeDestroy() {
    // Ensure timer is stopped when component is destroyed
    // this.stopTimer();
  },
  
};
</script>