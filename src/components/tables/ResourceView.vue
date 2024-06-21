<template>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p class="mt-2 text-sm text-gray-700"></p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Invite User</button>
        </div>
        </div>
        <div class="mt-8 flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                    <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Access Levels</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Skills</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Added</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="person in people" :key="person.email">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.access_levels }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.skills }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.status == "Active" ? "Active" : "Inactive" }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.date_added }}</td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ person.name }}</span></a>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    </div>
    <Loader :loading="isLoading" />
</template>
  <script>
  import Loader from '../../components/Loader.vue';
  import { getResourceList } from '../../utils/api.js';
  
  
  export default {
    name: 'Resource',
    
    components: {
        Loader,
    },
    data() {
      return {
        people: [
                    {"name": "Oliver Smith", "access_levels": "Member", "skills": "Full-stack Developer", "email": "oliver.smith@example.com", "date_added": "05/01/2024", "status": "Active"},
                    {"name": "Sophia Johnson", "access_levels": "Member", "skills": "UX Designer", "email": "sophia.johnson@example.com", "date_added": "06/01/2024","status": "InActive"},
                    {"name": "Mason Williams", "access_levels": "Admin", "skills": "Back-end Developer", "email": "mason.williams@example.com", "date_added": "07/01/2024","status": "Active"},
                    {"name": "Isabella Brown", "access_levels": "Member", "skills": "Product Manager", "email": "isabella.brown@example.com", "date_added": "08/01/2024","status": "InActive"},
                    {"name": "Liam Jones", "access_levels": "Member", "skills": "QA Engineer", "email": "liam.jones@example.com", "date_added": "09/01/2024","status": "Active"},
                    {"name": "Amelia Garcia", "access_levels": "Admin", "skills": "Data Scientist", "email": "amelia.garcia@example.com", "date_added": "10/01/2024","status": "InActive"},
                    {"name": "Noah Martinez", "access_levels": "Member", "skills": "DevOps Engineer", "email": "noah.martinez@example.com", "date_added": "11/01/2024","status": "Active"},
                    {"name": "Mia Davis", "access_levels": "Member", "skills": "Technical Writer", "email": "mia.davis@example.com", "date_added": "12/01/2024","status": "InActive"},
                    {"name": "Ethan Rodriguez", "access_levels": "Admin", "skills": "Software Engineer", "email": "ethan.rodriguez@example.com", "date_added": "01/02/2024","status": "Active"},
                    {"name": "Ava Wilson", "access_levels": "Member", "skills": "System Administrator", "email": "ava.wilson@example.com", "date_added": "02/02/2024","status": "InActive"}
                ],
        isLoading: true,
        paginationData: {
          total_items: 0,
          items_per_page: 10,
          current_page: 1,
        },
      };
    },
    mounted() {
        this.getAllResources(98);        
        // this.isLoading = true;
        // setTimeout(() => {
        //     this.isLoading = false;
        // }, 500);
    },
    methods:{
        async getAllResources(page) {
            this.paginationData.current_page = page;
            this.error = null;
            try {
                const response = await getResourceList(page);
                console.warn(response);
            } catch (error) {
                this.error = 'An error occurred. Please try again.';
            }
        },
    },    
  };
  </script>
  
  <style scoped>
  #example-table {
    margin: 20px;
  }
  </style>
  