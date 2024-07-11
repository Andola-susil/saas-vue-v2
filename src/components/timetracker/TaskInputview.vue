<template>
    <div class="flex items-center justify-between">
      <div class="flex w-1/2 items-center space-x-2">
        <span class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-normal text-black w-full shadow-sm hover:bg-indigo-100">{{ project }}</span>
        <span class="rounded-md bg-indigo-50 px-2.5 py-1.5 text-sm font-normal text-black w-full shadow-sm hover:bg-indigo-100">{{ task }}</span>
      </div>
      <div class="flex items-center space-x-4 w-1/2">
        <button class="text-muted-foreground hover:text-foreground w-1/5 pl-12">
          <span v-if="is_billable"><img aria-hidden="true" alt="" src="/src/assets/images/square-check2.svg" class="h-5 w-5" /></span>
          <span v-else><img aria-hidden="true" alt="" src="/src/assets/images/square-check1.svg" class="h-5 w-5" /></span>
        </button>
        <div class="text-muted-foreground pl-6">{{ startTime }} - {{endTime}}</div>
        <div class="text-foreground font-semibold w-1/5 pl-12">{{ elapsedTime }}</div>
        <div class="pl-6">
          <Menu as="div" class="relative inline-block text-left">
            <div>
              <!-- Bind click event to toggleDropdown method -->
              <MenuButton @click="toggleDropdown" class="inline-flex items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                <!-- Replace with your icon -->
                <img aria-hidden="true" alt="more-icon" src="https://openui.fly.dev/openui/24x24.svg?text=⋮" />
              </MenuButton>
            </div>

            <!-- Use Vue transition to animate dropdown -->
            <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
              <MenuItems v-if="isOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <!-- Dynamically generate menu items based on options data -->
                <div v-for="(option, index) in options" :key="index" class="py-1">
                  <MenuItem>
                    <a href="#" @click="handleAction(option)" :class="[option.active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'group flex items-center px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900']">
                      <!-- Dynamic icon based on option type -->
                      <div class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        <img aria-hidden="true" alt="" :src="option.icon" class="h-5 w-5" />
                      </div>
                      {{ option.name }}
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { sharedClasses } from '../../assets/js/sharedClasses.js';
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import {
    ArchiveBoxIcon,
    ArrowRightCircleIcon,
    ChevronDownIcon,
    DocumentDuplicateIcon,
    HeartIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
  } from '@heroicons/vue/20/solid'
  export default {
    props: {
      log_id: {
        type: Number,
        required: true
      },
      project_id: {
        type: Number,
        default: ''
      },
      task_id: {
        type: Number,
        default: ''
      },
      project: {
        type: String,
        default: ''
      },
      task: {
        type: String,
        default: ''
      },
      startTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: String,
        default: ''
      },
      elapsedTime: {
        type: String,
        default: ''
      },
      is_billable: {
        type: Boolean,
        default: false
      },
      time_log_date:{
        type: String,
        default: ''
      },
      duration:{
        type: String,
        default: ''
      },
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
      },
      toggleDropdown(){
        this.isOpen = !this.isOpen;
      },
      handleAction(option){
        switch (option.name) {
          case 'Edit':
            this.editAction(option);
            break;
          case 'Delete':
            this.deleteAction(option);
            break;
          default:
            break;
        }
        this.isOpen = false;
      },
      editAction(data){
        const log_info = {
          'log_id' : this.log_id,
          'startTime': this.startTime,
          'endTime': this.endTime,
          'project_name' : this.project,
          'project_id' : this.project_id,
          'task_name' : this.task,
          'task_id' : this.task_id,
          'is_billable' : this.is_billable,
          'time_log_date' : this.time_log_date,
          'duration': this.duration,
        };
        this.$emit('editTimeLog', log_info);
      },
      deleteAction(data){
        this.$emit('deleteTimeLog', this.log_id);
      }
    },
    data(){
      return{
        active: true,
        isOpen: false,
        options: [
        { name: 'Edit', icon: '/src/assets/images/pen-to-square.svg', active: false },
        { name: 'Delete', icon: '/src/assets/images/trash-can-black.svg', active: false },
        // Add more options as needed
      ],
      }
    }
    
  }
  </script>
  
  <style>
  /* Add your component-specific styles here */
  </style>
  