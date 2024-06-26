<template>
  <div class="w-1/2 flex rounded-md shadow-sm float-right py-4 pl-4">
    <div class="relative flex flex-grow items-stretch">
      <Datepicker
        v-model="selectedWeek"
        :model-value="selectedDate"
        format="yyyy-MM-dd"
        class="week-input block w-full rounded-none rounded-l-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        @input="handleDateChange"
      />
    </div>
    <button type="button" @click="prevWeek" class="relative -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      <img src="/src/assets/images/angle-left.svg" alt="" class="h-5 w-5">
    </button>
    <button type="button" @click="nextWeek" class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      <img src="/src/assets/images/angle-right.svg" alt="" class="h-5 w-5">
    </button>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      selectedDate: new Date(),
      selectedWeek: [] // Array to store selected week dates
    };
  },
  mounted() {
    // Initialize selectedWeek with current week's dates
    this.initializeSelectedWeek();
  },
  methods: {
    handleDateChange(selectedDates) {
      // Update selectedWeek when date is manually changed
      if (selectedDates.length === 7) {
        this.selectedWeek = selectedDates;
      }
    },
    initializeSelectedWeek() {
      // Initialize selectedWeek with current week's dates
      let currentDate = new Date(this.selectedDate);
      let dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
      let startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek); // Start of the current week
      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6); // End of the current week
      
      let dates = [];
      for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      
      this.selectedWeek = dates;
    },
    prevWeek() {
        const today = new Date(this.selectedDate)
        const day = today.getDay(); 
        const diff = today.getDate() - day + (day == 0 ? -6 : 1); 
        const startOfWeek = new Date(today.setDate(diff));
        let newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() - 7);
        this.selectedDate = newDate;
        this.initializeSelectedWeek();
    },
    nextWeek() {
        const today = new Date(this.selectedDate)
        const day = today.getDay(); 
        const diff = today.getDate() - day + (day == 0 ? -6 : 1); 
        const startOfWeek = new Date(today.setDate(diff));
        let newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() + 7);
        this.selectedDate = newDate;
        this.initializeSelectedWeek();
    },
    isCurrentWeek(date) {
      // Check if date is in the current selected week
      return this.selectedWeek.some(selectedDate => selectedDate.getTime() === date.getTime());
    }
  },
  computed: {
    highlightedDates() {
      // Returns an array of dates to highlight in the current week
      return this.selectedWeek.filter(date => this.isCurrentWeek(date));
    }
  }
};
</script>

<style>
/* Add any additional styling here */
.highlighted {
  background-color: rgb(11, 144, 189); /* Example highlight color */
}
</style>
