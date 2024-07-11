<template>
    <div class="flex justify-between items-center border-b pb-2 mb-2">
        <div class="w-1/2 flex">
            <div class="text-muted-foreground w-full font-medium pl-6">Project</div>
            <div class="text-muted-foreground w-full font-medium pl-6">Task</div>
        </div>
        <div class="w-1/2 flex">
            <div class="text-muted-foreground font-medium w-1/5 pl-6">Is billable</div>
            <div class="text-muted-foreground font-medium pl-6">Start time - End time</div>
            <div class="text-muted-foreground font-medium w-1/5 pl-12">Duration</div>
        </div>
    </div>
  </template>
  
  <script>
  import { sharedClasses } from '../../assets/js/sharedClasses.js';
  
  export default {
    props: {
      title: {
        type: String,
        default: 'Today'
      },
      totalLabel: {
        type: String,
        default: 'Total'
      },
      totalTime: {
        type: String,
        default: '00:00:00'
      }
    },
    methods: {
      copyToClipboard() {
        // Implement copy to clipboard functionality
      }
    }
  }
  </script>
  
  <style>
  /* Add your component-specific styles here */
  </style>
  