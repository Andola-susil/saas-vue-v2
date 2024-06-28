<template>
  <div class="w-full flex rounded-md shadow-sm float-right py-4 pl-4">
    <div class="relative flex flex-grow items-stretch">
      <DateRangePicker
        v-model="selectedWeekRange"
        :model-value="selectedDateRange"
        format="yyyy-MM-dd"
        range
        :numberOfMonths="2"
        class="week-input block w-full rounded-none rounded-l-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        @input="handleDateRangeChange"
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
import DateRangePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    DateRangePicker
  },
  data() {
    return {
      selectedDateRange: [new Date(), new Date()], // Initialize with current date range
      selectedWeekRange: [] // Array to store selected week dates
    };
  },
  mounted() {
    // Initialize selectedWeekRange with current week's dates
    this.initializeSelectedWeekRange();
  },
  methods: {
    handleDateRangeChange(selectedDates) {
    
      // Update selectedWeekRange when date range is manually changed
      if (selectedDates.length === 2) {
        this.selectedWeekRange = this.getWeekRange(selectedDates[0], selectedDates[1]);
      }
    },
    initializeSelectedWeekRange() {
      // Initialize selectedWeekRange with current week's dates starting from Monday
      let currentDate = new Date();
      let startOfWeek = new Date(currentDate);
      startOfWeek.setDate(startOfWeek.getDate() - (currentDate.getDay() + 6) % 7); // Start of the current week (Monday)
      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6); // End of the current week (Sunday)
      
      this.selectedWeekRange = this.getWeekRange(startOfWeek, endOfWeek);
      this.selectedDateRange = [startOfWeek, endOfWeek];
    },
    prevWeek() {
      let startOfWeek = new Date(this.selectedDateRange[0]);
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      this.selectedDateRange = [startOfWeek, endOfWeek];
      this.selectedWeekRange = this.getWeekRange(startOfWeek, endOfWeek);
      this.$emit('handleWeekChange', startOfWeek);
    },
    nextWeek() {
      let startOfWeek = new Date(this.selectedDateRange[0]);
      startOfWeek.setDate(startOfWeek.getDate() + 7);
      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      
      this.selectedDateRange = [startOfWeek, endOfWeek];
      this.selectedWeekRange = this.getWeekRange(startOfWeek, endOfWeek);
      this.$emit('handleWeekChange', startOfWeek);
    },
    getWeekRange(startDate, endDate) {
      let dates = [];
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
      }
      return dates;
    },
    isCurrentWeek(date) {
      // Check if date is in the current selected week
      return this.selectedWeekRange.some(selectedDate => selectedDate.getTime() === date.getTime());
    }
  },
  computed: {
    highlightedDates() {
      // Returns an array of dates to highlight in the current week
      return this.selectedWeekRange.filter(date => this.isCurrentWeek(date));
    }
  }
};
</script>

<style>
/* Add any additional styling here */
.highlighted {
  background-color: rgb(11, 144, 189); /* Example highlight color */
}
/* Hide the time button in the date picker */
.dp__action_row {
  display: none !important;
}

/* Hide the cancel select button in the date picker */
.dp--tp-wrap {
  display: none !important;
}
</style>
