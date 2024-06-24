<template>
<div>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Settings</h1>
      <div>
        <div class="space-y-12">
          <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <!-- <div>
              <h2 class="text-base font-semibold leading-7 text-gray-900">Timesheet rules</h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
            </div> -->
            <div class="col-span-full">
              <SwitchGroup as="div" class="flex items-center">
                <span class="flex flex-grow flex-col">
                  <SwitchLabel as="span" class="text-sm font-medium leading-6 text-gray-900" passive>Available to hire</SwitchLabel>
                  <Switch v-model="enabled" :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-4 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                    <span aria-hidden="true" :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                  </Switch>
                </span>
                
              </SwitchGroup>
            </div>

            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div class="sm:col-span-4">
                <label for="website" class="block text-sm font-medium leading-6 text-gray-900">Work hour of your company</label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
  
              <div class="col-span-full">
                <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Weekend of your company</label>
                  <div class="flex">
                    <div class="flex h-6 items-center">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Monday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Tuesday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Wednesday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Thursday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Friday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Saturday</p>
                    </div>
                    <div class="flex h-6 items-center pl-2">
                      <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                      <p class="text-gray-500 text-sm pl-2">Sunday</p>
                    </div>
                  </div>
              </div>
              <div class="col-span-full">
                <div class="flex h-6 items-center">
                  <input id="comments" name="comments" type="checkbox" class="h-3 w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                  <p class="block text-sm font-medium leading-6 text-gray-900 pl-2">Mark 2nd and 4th Saturday as holiday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </div>
    </div>
    <Loader :loading="isLoading" /> 
    </div>
  </template>
  <script>
  import Loader from '../Loader.vue';
  import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
  
  export default {
    name: 'Settings',    
    components: {
        Loader,
    },
    data() {
      return {
        isLoading: true,
        enabled: true,
      };
    },
    method:{
        
    },
    mounted() {        
        this.isLoading = true;        
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
    }
  };
  </script>
  
  <style scoped>
  #example-table {
    margin: 20px;
  }
  </style>
  