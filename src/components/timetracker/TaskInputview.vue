<template>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center">
          <span>{{ taskId }}</span>
        </div>
        <input type="text" placeholder="Add description" class="bg-input text-foreground border border-border rounded p-1" />
        <span class="text-destructive-foreground">{{ project }}</span>
      </div>
      <div class="flex items-center space-x-4">
        <button @click="showTagModal" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="tag-icon" src="https://openui.fly.dev/openui/24x24.svg?text=🏷️" />
        </button>
        <button @click="showDollarModal" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="dollar-icon" src="https://openui.fly.dev/openui/24x24.svg?text=$" />
        </button>
        <div class="text-muted-foreground">{{ timeRange }}</div>
        <button @click="showCalendarModal" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="calendar-icon" src="https://openui.fly.dev/openui/24x24.svg?text=📅" />
        </button>
        <div class="text-foreground font-semibold">{{ elapsedTime }}</div>
        <button @click="startTimer" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="play-icon" src="https://openui.fly.dev/openui/24x24.svg?text=▶️" />
        </button>
        <button @click="showMoreOptions" class="text-muted-foreground hover:text-foreground">
          <img aria-hidden="true" alt="more-icon" src="https://openui.fly.dev/openui/24x24.svg?text=⋮" />
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { sharedClasses } from '../../assets/js/sharedClasses.js';
  
  export default {
    props: {
      taskId: {
        type: Number,
        required: true
      },
      project: {
        type: String,
        default: ''
      },
      timeRange: {
        type: String,
        default: ''
      },
      elapsedTime: {
        type: String,
        default: ''
      }
    },
    methods: {
      showTagModal() {
        // Show tag modal
      },
      showDollarModal() {
        // Show dollar modal
      },
      showCalendarModal() {
        // Show calendar modal
      },
      startTimer() {
        // Start timer functionality
      },
      showMoreOptions() {
        // Show more options
      }
    }
  }
  </script>
  
  <style>
  /* Add your component-specific styles here */
  </style>
  