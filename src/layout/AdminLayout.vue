<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4" style="background-color: rgb(208, 213, 247);">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-8 w-auto" src="../assets/images/orange-nw-logo.svg" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a :href="item.href" :class="[item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" />
                            {{ item.name }}
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li v-if="is_admin == true || is_approver == true">
                      <div class="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                      <ul role="list" class="-mx-2 mt-2 space-y-1">
                        <li v-for="team in settings" :key="team.name">
                          <a :href="team.href" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">{{ team.initial }}</span>
                            <span class="truncate">{{ team.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <!-- <li class="mt-auto">
                      <a href="#" class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                        <Cog6ToothIcon class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" aria-hidden="true" />
                        Settings
                      </a>
                    </li> -->
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="../assets/images/orange-nw-logo.svg" alt="Your Company" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="(item,key) in navigation" :key="key">
                  <a  @click.prevent="manageRoute(item,key)" href="#" :class="[item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    <!-- <component :is="item.icon" :class="[item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']" aria-hidden="true" /> -->
                    <div class="h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        <img aria-hidden="true" alt="" :src="item.icon" class="h-5 w-5" />
                      </div>
                    {{ item.name }}
                  </a>
                </li>
                <Disclosure as="li" v-slot="{ open }" v-if="is_admin == 'true'">
                <DisclosureButton class="text-indigo-200 hover:bg-indigo-700 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full">
                    <div class="flex items-center">
                      <div class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"><img aria-hidden="true" alt="" src="/src/assets/images/settings.png" class="h-5 w-5" /></div>
                      <span class="mr-3">Settings</span>
                      <ChevronRightIcon :class="[open ? 'rotate-90 text-gray-500' : 'text-gray-400', 'h-5 w-5 shrink-0']" aria-hidden="true" /></div>
                </DisclosureButton>
                <DisclosurePanel as="ul" class="mt-1 space-y-1 ml-6">
                  <li v-for="team in settings" :key="team.name">
                    <!-- <DisclosureButton as="a" @click.prevent="manageRoute(subItem,skey)"  >{{ subItem.name }}</DisclosureButton> -->
                    <a href="#"  @click.prevent="manageRoute(team,skey)" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    
                    <!-- <div class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        <img aria-hidden="true" alt="" :src="team.initial" class="h-5 w-5" />
                    </div> -->
                    <span class="truncate">{{ team.name }}</span>
                  </a>
                  </li>
                </DisclosurePanel>
              </Disclosure>
              </ul>
            <!-- </li>
            <li v-if="is_admin == 'true'"> -->
              <!-- <div class="text-xs font-semibold leading-6 text-indigo-200">Settings</div> -->
              <!-- <ul role="list" class="-mx-2 mt-2 space-y-1">
                <li v-for="(team,skey) in settings" :key="skey">
                  <a href="#"  @click.prevent="manageRoute(team,skey)" :class="[team.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                    
                    <div class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500">
                        <img aria-hidden="true" alt="" :src="team.initial" class="h-5 w-5" />
                      </div>
                    <span class="truncate">{{ team.name }}</span>
                  </a>
                </li>
              </ul> -->
            
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="relative flex flex-1" action="#" method="GET"></form>
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{user_name}}</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a @click="manageLogOut(item)" :href="item.href" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.name }}</a>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-4">
        <div class="px-4 sm:px-6 lg:px-8">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { signOut } from '../utils/api.js'
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { userInfo } from '../stores/userInfo.js';
import {
  Dialog,
  Menu,
  DialogPanel,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
  Disclosure, 
  DisclosureButton, 
  DisclosurePanel,
} from '@headlessui/vue'

import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon, 
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const navigation = ref([]);
const settings = ref([]);
console.log(localStorage);
// const userStore = userInfo();
// console.log(userStore, 'Here64654');
// Navigation data
const navigation_for_admin = [
  { name: 'Dashboard', href: '/dashboard', icon: '/src/assets/images/dashboard11.png', current: false },
  { name: 'Time Sheet', href: '/time-sheet', icon:'/src/assets/images/time-management.png', current: false }, 
  { name: 'Time Tracker', href: '/time-tracker', icon: '/src/assets/images/timetrack.png', current: false },
  // { name: 'Past Time Sheet', href: '/past-time-sheet', icon: DocumentDuplicateIcon, current: false },
  { name: 'Approvals', href: '/time-sheet-approvals', icon: '/src/assets/images/approval.png', current: false },
  { name: 'Reports', href: '/time-sheet-reports', icon: '/src/assets/images/report.png', current: false },
  { name: 'All TimeSheets', href: '/all-time-sheets', icon: '/src/assets/images/alltime-sheet.png', current: false },
]
const navigation_for_resource = [
  { name: 'Dashboard', href: '/dashboard', icon: '/src/assets/images/dashboard11.png', current: false },
  { name: 'Time Sheet', href: '/time-sheet', icon: '/src/assets/images/time-management.png', current: false },
  // { name: 'Past Time Sheet', href: '/past-time-sheet', icon: DocumentDuplicateIcon, current: false },
  { name: 'Time Tracker', href: '/time-tracker', icon: '/src/assets/images/timetrack.png', current: false },
]
const navigation_for_auditors = [
  { name: 'Dashboard', href: '/dashboard', icon: '/src/assets/images/dashboard11.png', current: false },
  { name: 'Time Sheet', href: '/time-sheet', icon: '/src/assets/images/time-management.png', current: false },
  { name: 'Time Tracker', href: '/time-tracker', icon: '/src/assets/images/timetrack.png', current: false },
  { name: 'Approvals', href: '/time-sheet-approvals', icon: '/src/assets/images/approval.png', current: false },
]
const settings_for_admin = [
  { id: 1, name: 'Resource', href: '/resource', initial: '/src/assets/images/resource.png', current: false },
  { id: 2, name: 'Calendar', href: '/calender-view', initial: '/src/assets/images/calendar.png', current: false }, 
  { id: 3, name: 'Rules', href: '/time-sheet-rules', initial: '/src/assets/images/folder.png', current: false},
]
const settings_resource = [
  // { id: 1, name: 'Calendar', href: '/calender-view', initial: '/src/assets/images/calendar.png', current: false },
  // { id: 2, name: 'Rules', href: '/time-sheet', initial: '/src/assets/images/folder.png', current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '/your-profile' },
  { name: 'Sign out', href: '#' },
]

const sidebarOpen = ref(false)
const router = useRouter()
const error = ref(null)
const showAdminLayout = ref(true);
const route = useRoute();
const is_admin = ref(false);
const is_approver = ref(false);
const is_resource = ref(false);
const user_name = ref('');
const user_profile_img = ref('');
onMounted(() => {
    // console.log(userStore);
  is_admin.value = localStorage.getItem('is_admin');
  if(is_admin.value == 'true'){
    navigation.value = navigation_for_admin;
    settings.value = settings_for_admin;
  }
  is_approver.value = localStorage.getItem('is_approver');
  if(is_approver.value == 'true'){
    navigation.value = navigation_for_auditors;
  }
  is_resource.value = localStorage.getItem('is_resource');
  if(is_resource.value == 'true'){
    navigation.value = navigation_for_resource;
    settings.value = settings_resource;
  }
  user_name.value = localStorage.getItem('user_name');
  user_profile_img.value = localStorage.getItem('user_nameprofile_image');
});

// The async function to handle log out
const manageLogOut = async (item) => {
  if (item.name === 'Sign out') {
    try {
      await signOut()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('layout')
      localStorage.removeItem('tenant_id')

      localStorage.removeItem('is_admin')
      localStorage.removeItem('is_resource')
      localStorage.removeItem('is_approver')

      delete axios.defaults.headers.common['Authorization']
      toast("Logout Successfully!!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true,
          "autoClose": 3000
        })
      router.push('/sign-in')
    } catch (err) {
      error.value = 'An error occurred. Please try again.'
    }
  }
}
const manageRoute = (item) => {
  navigation.value.forEach(navItem => {
    navItem.current = navItem.href === item.href;
  });
  settings.value.forEach(setting => {
    setting.current = setting.href === item.href;
  });
  router.push(item.href);
}
</script>
<style scoped>
.bg-indigo-600{background-color: rgb(208, 213, 247) !important;}
.bg-indigo-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(137 146 215 / var(--tw-bg-opacity));
}
.hover\:bg-indigo-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(137 146 215 / var(--tw-bg-opacity));
}
.text-indigo-200 {
  --tw-text-opacity: 0.1;
  color: #363535;
}
</style>