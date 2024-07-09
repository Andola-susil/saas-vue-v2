
<template>
<div>
  <div class="space-y-10 divide-y divide-gray-900/10">
    <h2 class="text-base font-semibold leading-7 text-gray-900">Create new resource</h2>
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10">
      <div class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <div class="px-4 py-6 sm:p-8">
          <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
              <div class="mt-2">
                <input type="text" v-model="user_info.first_name"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
              <div class="mt-2">
                <input type="text" v-model="user_info.last_name"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" v-model="user_info.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Access Level</label>
                <div class="mt-2">
                    <select v-model="user_info.role" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <div v-for="(role,rk) in user_roles" :key="rk"><option>admin</option></div>
                    </select>
                </div>
            </div>

             <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Select approver</label>
                <div class="mt-2">
                    <select v-model="user_info.approver" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <div v-for="(approver,ak) in approver_list" :key="ak"><option>admin</option></div>
                    </select>
                </div>
            </div>

            <div class="sm:col-span-3">
                <div class="relative flex items-start pt-8">
                    <div class="flex h-6 items-center">
                        <input v-model="user_info.is_timesheet_approver" aria-describedby="comments-description" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                        <span id="comments-description" class="font-medium text-gray-900">Is TimeSheet Approver</span>
                    </div>
                </div>
            </div>

            <!-- <div class="col-span-full">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div class="mt-2">
                <input type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->

            <!-- <div class="sm:col-span-2 sm:col-start-1">
              <label for="city" class="block text-sm font-medium leading-6 text-gray-900">City</label>
              <div class="mt-2">
                <input type="text" name="city" id="city" autocomplete="address-level2" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->

            <!-- <div class="sm:col-span-2">
              <label for="region" class="block text-sm font-medium leading-6 text-gray-900">State / Province</label>
              <div class="mt-2">
                <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->

            <!-- <div class="sm:col-span-2">
              <label for="postal-code" class="block text-sm font-medium leading-6 text-gray-900">ZIP / Postal code</label>
              <div class="mt-2">
                <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->
          </div>
        </div>
        <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button @click="clearForm()" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button @click="saveResource()" type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
      </div>
    </div>
  </div>
  <Loader :loading="isLoading" />
  </div>
</template>

<script>
import { createResourceInfo,getApproverList,getUserRoles } from '../../utils/user.js' ;
import { ref } from 'vue';
import Loader from '../../components/Loader.vue';
import { toast } from 'vue3-toastify'; 


export default {
  name: 'CreateResource',
  components: {
    Loader,
  },
  setup() {
    const user_info = ref({
      first_name: '',
      last_name: '',
      email: '',
      role: 'admin',
      is_timesheet_approver: false,
      approver: '', 
    });
    const approver_list = ref([]);
    const user_roles = ref([]);
    const isLoading = ref(false);

    const saveResource = async () => {
      isLoading.value = true;
      try {
        // const resource_name = `${user_info.value.first_name} ${user_info.value.last_name}`;

        const data = {
          invite_email: user_info.value.email,
          invite_role:  user_info.value.role,
          invite_first_name: user_info.value.first_name,
          invite_last_name: user_info.value.last_name,
          tenant_id: localStorage.getItem('tenant_id'),
           
        };

        const response = await createResourceInfo(data);
        toast("Resource created successfully", {
          theme: "colored",
          type: "success",
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });

        clearForm();
      } catch (error) {
        console.error('Error while saving resource:', error);
        toast("An error occurred. Please try again.", {
          theme: "colored",
          type: "error",
          hideProgressBar: true,
          dangerouslyHTMLString: true,
        });
      } finally {
        isLoading.value = false;
      }
    };

    const clearForm = () => {
      user_info.value.first_name = '';
      user_info.value.last_name = '';
      user_info.value.email = '';
      user_info.value.role = '';
      user_info.value.is_timesheet_approver = false;
    };


    const getApproverList = async () => {
      try {
        const response = await getApproverList(data);
      
      } catch (error) {
        
      } finally {
      }
    };

    const getUserRoles = async () => {
      try {
        const response = await getUserRoles(data);
      
      } catch (error) {
        
      } finally {
      }
    };
    
    return {
      user_info,
      saveResource,
      clearForm,
      isLoading,
     
    };
  },
};
// const isLoading = ref(false);
// const user_info = ref({
//   first_name: '',
//   last_name: '',
//   email: '',
//   is_timesheet_approver: false,
//   role: '',
// });

// const clearForm = () => {
//   user_info.value.first_name = '';
//   user_info.value.last_name = '';
//   user_info.value.email = '';
//   user_info.value.is_timesheet_approver = false;
//   user_info.value.role = '';
// };

// const saveResource = () => {
//     isLoading.value = true;
//     setTimeout(() => {
//           isLoading.value = false;
//           toast("Resource submitted successfully!", {
//             "theme": "colored",
//             "type": "success",
//             "hideProgressBar": true,
//             "dangerouslyHTMLString": true
//           });
          
//         }, 1000);
//   console.log(user_info.value, 'here');
// };
</script>