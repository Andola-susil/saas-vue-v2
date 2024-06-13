<template>
    <div class="container mx-auto py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Weekly Timesheet</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-6 text-left">Project / Task</th>
              <th class="py-3 px-6 text-center">Mon</th>
              <th class="py-3 px-6 text-center">Tue</th>
              <th class="py-3 px-6 text-center">Wed</th>
              <th class="py-3 px-6 text-center">Thu</th>
              <th class="py-3 px-6 text-center">Fri</th>
              <th class="py-3 px-6 text-center">Sat</th>
              <th class="py-3 px-6 text-center">Sun</th>
              <th class="py-3 px-6 text-center">Total</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr v-for="(row, index) in rows" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <input type="text" v-model="row.project">
                </div>
              </td>
              <td v-for="(day, i) in row.days" :key="i" class="py-3 text-center">
                <input type="number" v-model="row.days[i]">
              </td>
              <td class="py-3 px-6 text-center font-medium">
                <input type="text" v-model="row.total" readonly>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-8">
        <button @click="addRow" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New</button>
        <button @click="save" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        rows: [
          {
            project: "Select Project and Task▾",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40"
          },
          {
            project: "Select Project and Task▾",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40"
          },
          {
            project: "M New",
            days: ["8.00", "8.00", "8.00", "8.00", "8.00", "8.00", "8.00"],
            total: "40.00"
          }
        ]
      };
    },
    methods: {
      addRow() {
        this.rows.push({
          project: "",
          days: ["0", "0", "0", "0", "0", "0", "0"],
          total: "0"
        });
      },
      save() {
        // Add save logic here
        console.log("Saved", this.rows);
      }
    },
    watch: {
      rows: {
        handler(val) {
          val.forEach(row => {
            row.total = row.days.reduce((acc, day) => acc + parseFloat(day), 0).toFixed(2);
          });
        },
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>
  