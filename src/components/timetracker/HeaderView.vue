<template>
    <div class="flex justify-between items-center border-b pb-2 mb-2 py-6 pl-4">
      <span class="text-muted-foreground font-medium">{{ title }}</span>
      <div class="flex items-center space-x-2">
        <span class="text-muted-foreground">{{ totalLabel }}:</span>
        <span class="text-foreground font-semibold font-medium">{{ totalTime }}</span>
        <!-- <button @click="copyToClipboard" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="copy-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📋" />
        </button> -->
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
  