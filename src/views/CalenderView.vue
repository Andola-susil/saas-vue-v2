
<template>    
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold leading-6 text-gray-900">Calender</h1>
      </div>
    </div>
    <div class="mt-1 flow-root">
     <!-- <CalenderView /> -->
     <FullCalender/>
    </div>
  </div>
  
</template>

<script>
import { getAllTimeLogs } from '../utils/timelog.js';
import CalenderView from '../components/common/CalenderView.vue';
import FullCalender from '../components/common/FullCalender.vue';
export default {
    name: 'Calender',
    path: '/calender',
  components: {
    // CalenderView
    FullCalender
  },
  mounted() {
   
  },
  created() {
    
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  
};
</script>
