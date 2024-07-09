<template>
<div>
    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p class="mt-2 text-sm text-gray-700"></p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button @click="addResource()" type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+ Invite User</button>
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
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Approver</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">is Approver</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Added</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span class="sr-only">Edit</span>
                    </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="person in people" :key="person.invite_email">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.invite_first_name }} {{ person.invite_last_name }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.invite_role }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{  }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{  }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{  }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.invite_status == "accepted" ? "Accepted" : "Pending" }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {{ new Date(person.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) }}
                                    </td>

                                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit<span class="sr-only">, {{ person.invite_first_name }} {{ person.invite_last_name }}</span></a>
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
    </div>
</template>
  <script>
  import Loader from '../../components/Loader.vue';
  import { getResourceInfo } from '../../utils/resource.js' ;
  import { ref } from 'vue'; 
  
  export default {
    name: 'Resource',
    
    components: {
        Loader,
    },
    data() {
        return {
            people: [],
            isLoading: true,
            paginationData: {
                total_items: 0,
                items_per_page: 10,
                current_page: 1,
            },
        };
    },
    mounted() {
        this.getAllResources(this.paginationData.current_page);
    },
    methods:{
        addResource(){
            this.$router.push({ path: '/create-resource'});
        },
        async getAllResources(page) {
            this.paginationData.current_page = page;
            this.isLoading = true;
            try {
                const response = await getResourceInfo(page);
                console.warn(response);
                this.people = response.items.map(item => ({
                    invite_first_name: item.invite_first_name,
                    invite_last_name: item.invite_last_name,
                    invite_email: item.invite_email,
                    invite_role: item.invite_role,
                    invite_status: item.invite_status,
                    created_at: item.created_at
                }));
                this.isLoading = false;
            } catch (error) {
                this.error = 'An error occurred. Please try again.';
                this.isLoading = false;
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