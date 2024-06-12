<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white border border-zinc-200">
      <thead>
        <tr class="bg-blue-500 text-white">
          <th v-for="header in headers" :key="header.key" class="py-2 px-4">{{ header.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index" class="border-t">
          <td v-for="day in days" :key="day" class="py-2 px-4">
            <template v-if="day === 'Project-Task'">
              <select class="border rounded p-2 w-full">
                <option>Select Project and Task</option>
              </select>
            </template>
            <template v-else>
              <input type="number" class="border rounded p-2 w-full" v-model="task[day.toLowerCase()]">
            </template>
          </td>
          <td class="py-2 px-4 text-center bg-green-500 text-white">{{ calculateTotal(task) }}</td>
          <td class="py-2 px-4 text-center">
            <button @click="removeTask(index)" class="text-red-500">
              <img aria-hidden="true" alt="delete" src="https://placehold.co/20x20/delete.png" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const headers = [
  { key: 'project-task', label: 'Project-Task' },
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thur', label: 'Thur' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
  { key: 'total', label: 'Total' },
  { key: 'actions', label: '' },
];

export default {
  props: ['tasks'],
  data() {
    return {
      headers,
      days: headers.map(header => header.key),
    };
  },
  methods: {
    calculateTotal(task) {
      return this.days.slice(1, -2).reduce((acc, day) => acc + task[day.toLowerCase()], 0);
    },
    removeTask(index) {
      this.$emit('removeTask', index);
    },
  },
};
</script>