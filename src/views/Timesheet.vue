<template>
  <div class="container mx-auto p-4">
    <h1 class="text-center text-2xl font-bold mb-4">Timesheet</h1>
    <TimesheetTable :tasks="tasks" @removeTask="removeTask" @calculateTotal="calculateTotal" />
    <div class="flex justify-between mt-4">
      <button @click="addTask" class="button-blue">New</button>
      <button @click="saveTasks" class="button-green">Save</button>
      <div class="flex space-x-2">
        <div v-for="day in 7" :key="day" class="day-cell">{{ 8.00 }}</div>
        <div class="total-cell">{{ calculateGrandTotal() }}</div>
        <button @click="removeAllTasks" class="button-red">All</button>
      </div>
    </div>
  </div>
</template>

<script>
import TimesheetTable from '../components/TimesheetTable.vue'; // Importing sub-component

const BUTTON_CLASSES = 'bg-blue-500 text-white py-2 px-4 rounded flex items-center';
const DAY_CELL_CLASSES = 'bg-blue-500 text-white py-2 px-4 rounded';
const TOTAL_CELL_CLASSES = 'bg-green-500 text-white py-2 px-4 rounded';

export default {
    name: 'Timesheet',
    path: '/timesheet',
  components: {
    TimesheetTable,
  },
  data() {
    return {
      tasks: [
        { mon: 8, tue: 8, wed: 8, thur: 8, fri: 8, sat: 8, sun: 8 },
        { mon: 8, tue: 8, wed: 8, thur: 8, fri: 8, sat: 8, sun: 8 },
      ],
    };
  },
  methods: {
    addTask() {
      this.tasks.push({ mon: 8, tue: 8, wed: 8, thur: 8, fri: 8, sat: 8, sun: 8 });
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
    calculateTotal(task) {
      return task.mon + task.tue + task.wed + task.thur + task.fri + task.sat + task.sun;
    },
    calculateGrandTotal() {
      return this.tasks.reduce((acc, task) => acc + this.calculateTotal(task), 0);
    },
    saveTasks() {
      // Save tasks logic
    },
    removeAllTasks() {
      this.tasks = [];
    },
  },
};
</script>