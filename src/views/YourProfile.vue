

<template>
    <div class="space-y-12">
        <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">User Profile</h2>
            </div>
        </div>
        <div class="grid grid-cols-5 gap-8">
            <div class="col-span-5 xl:col-span-3">
                <div
                    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div class="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <h3 class="font-medium text-black dark:text-white">Personal Information</h3>
                    </div>
                    <div class="p-7">
                        <form>
                            <div class="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div class="w-full  ">
                                    <div
                                        class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
                                        <div class="sm:col-span-3">
                                            <label for="first-name"
                                                class="block text-sm font-medium leading-6 text-gray-900">First
                                                name</label>
                                            <div class="mt-2">
                                                <input type="text" name="first-name" id="first-name" v-model="form.first_name" autocomplete="given-name"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div class="sm:col-span-3">
                                            <label for="last-name"
                                                class="block text-sm font-medium leading-6 text-gray-900">Last
                                                name</label>
                                            <div class="mt-2">
                                                <input type="text" name="last-name" id="last-name" v-model="form.last_name"
                                                    autocomplete="family-name"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                        <div class="col-span-full">
                                            <label for="phoneNumber"
                                                class="block text-sm font-medium leading-6 text-gray-900">Phone
                                                Number</label>
                                            <div class="mt-2">
                                                <input id="phoneNumber" name="phoneNumber" type="tel" autocomplete="tel" v-model="form.phone_number"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div class="col-span-full">
                                            <label for="email"
                                                class="block text-sm font-medium leading-6 text-gray-900">Email
                                                address</label>
                                            <div class="mt-2">
                                                <input id="email" name="email" type="email" autocomplete="email" v-model="form.email"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>

                                        <div class="col-span-full">
                                            <label for="role"
                                                class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                            <div class="mt-2">
                                                <input id="role" name="role" type="text"
                                                    autocomplete="organization-title" v-model="form.user_type"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>


                                        <div class="col-span-full">
                                            <label for="skill"
                                                class="block text-sm font-medium leading-6 text-gray-900">Skills</label>
                                            <div class="mt-2">
                                                <select id="skill" name="skill" autocomplete="skill-name"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <option> </option>
                                                    <option> </option>
                                                    <option> </option>
                                                </select>
                                            </div>
                                        </div>



                                        <div class="sm:col-span-3 sm:col-start-1">
                                            <label for="time-zone" class="block text-sm font-medium leading-6 text-gray-900">Time Zone</label>
                                            <div class="mt-2">
                                              <select v-model="form.time_zone" name="time-zone" id="time-zone" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                <option value="">Select...</option>
                                                <option v-for="timezone in timezones" :key="timezone.code" :value="timezone.id">{{ timezone.id }}</option>
                                              </select>
                                            </div>
                                          </div>

                                        <div class="sm:col-span-3">
                                            <label for="time-format"
                                                class="block text-sm font-medium leading-6 text-gray-900">Time
                                                Format</label>
                                            <div class="mt-2">
                                                <select v-model="form.time_format" name="time-format" id="time-format"
                                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <option value="">Select...</option>
                                                    <option value="12-hour">12 Hour Format</option>
                                                    <option value="24-hour">24 Hour Format</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </form>
                        <div class="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button   @click="updateProfile"
                                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
                        </div>
                    </div>

                </div>
            </div>

            <div class="col-span-5 xl:col-span-2">
  <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
    <div>
      <h2 class="text-base font-semibold leading-7 text-gray-900">Your Photo</h2>
      <div v-if="profilePhotoUrl">
        <img :src="profilePhotoUrl" alt="Profile Photo" class="rounded-full h-20 w-20 object-cover">
      </div>
    </div>
  </div>
  <div
    id="FileUpload"
    class="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
  >
    <input
      type="file"
      accept="image/*"
      class="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
      @change="handleFileChange"
    />
    <div class="flex flex-col items-center justify-center space-y-3">
      <span
        class="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
            fill="#3C50E0"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
            fill="#3C50E0"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
            fill="#3C50E0"
          />
        </svg>
      </span>
      <p class="text-sm font-medium">
        <span class="text-primary">Click to upload</span> or drag and drop
      </p>
      <p class="mt-1.5 text-sm font-medium">SVG, PNG, JPG or GIF</p>
      <p class="text-sm font-medium">(max, 800 X 800px)</p>
    </div>
  </div>
  <div class="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
    <button @click="updateProfileImage" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
  </div>
</div>

            
        </div>
    </div>
</template>
  
<script>
import { getUserDetails,getUserProfilePhoto,uploadProfileImage,updateUserDetails,getTimeZone  } from '../utils/user.js';
import Loader from '../components/Loader.vue';
import { toast } from 'vue3-toastify';
import '../../node_modules/vue3-toastify/dist/index.css';


export default {
  name: 'Your Profile',
  data() {
    return {
        form: {
            first_name: null,
            last_name: null,
            email:'',
            phone_number :null,
            user_type:null,
            time_format:null,
            time_zone:null,
            file_id:null,
        },
        user_email: '',
        error: null,
        errorMessages: [],
        isLoading: false,
        profilePhoto: null,
        profilePhotoUrl: null,
        timezones: []
    }
  },
  components:{
    Loader,
    toast
  },
  methods: {
    async getUserDetailsMethod() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await getUserDetails();
        console.warn(response);
        this.form.first_name = response.first_name;
        this.form.last_name = response.last_name;
        this.form.phone_number = response.phone_number;
        this.form.email = response.email;
        this.form.user_type = response.user_type;
        this.form.time_format = response.time_format;
        this.form.time_zone = response.time_zone;
        localStorage.setItem('file_id', response.file_id); // Store the file_id
        // localStorage.setItem('time_zone', response.time_zone); // Store the file_id
        // localStorage.setItem('time_format', response.time_format); // Store the file_id

      } catch (error) {
        this.error = 'An error occurred. Please try again.';
      } finally {
        this.user_email = null;
        this.isLoading = false;
      }
    },
    async updateProfileImage() {
        this.isLoading = true;
        this.error = null;
        console.warn(11111);
        try {
          if (!this.profilePhoto) {
            throw new Error('No file selected.');
          }
          const response = await uploadProfileImage(this.profilePhoto);
          this.profilePhotoUrl = response.profilePhotoUrl; 
          //localstorage
          const file_id = localStorage.getItem(response.file_id);
          this.fetchUserProfilePhoto(file_id); 
          toast("Profile image updated successfully", {
            theme: "colored",
            type: "success",
            hideProgressBar: true,
            dangerouslyHTMLString: true,
          });

          
          
    } catch (error) {
      this.error = error.message || 'An error occurred. Please try again.';
      toast(this.error, {
        theme: "colored",
        type: "error",
        hideProgressBar: true,
        dangerouslyHTMLString: true,
      });
    } finally {
      this.isLoading = false;
    }
  },
  handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      this.profilePhoto = file;
    }
  },

  async fetchUserProfilePhoto() {
    try {
      const file_id = localStorage.getItem('file_id');
      const response = await getUserProfilePhoto(file_id);
      this.profilePhotoUrl = response.url;  
    } catch (error) {
      console.error('Failed to fetch profile photo:', error);
    }
  },
  async updateProfile(){
    this.isLoading = true;
    this.error = null;
    try{
      const user_data = {
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          time_zone: this.form.time_zone,
          time_format: this.form.time_format,
          phone_number: this.form.phone_number,
          language: null
        };
        const response = await updateUserDetails(user_data);

        toast("Successfully.!!", {
          "theme": "colored",
          "type": "success",
          "hideProgressBar": true,
          "dangerouslyHTMLString": true,
        })

    }catch(error){
      this.error = error.message || 'An error occurred. Please try again.';
      toast(this.error, {
        theme: "colored",
        type: "error",
        hideProgressBar: true,
        dangerouslyHTMLString: true,
      });
    }finally {
      this.isLoading = false;
    }
  },
  
  async fetchTimeZones() {
      try {
        const data = await getTimeZone();
        
        if (data && Array.isArray(data)) {
          this.timezones = this.transformTimeZones(data); // Assuming the response has a 'timezones' array
        } else {
          // console.error('Unexpected API response format:', data);
        }
        // console.warn(this.timezones);
      } catch (error) {
        console.error('Failed to fetch time zones:', error);
      }
    },
  transformTimeZones(timeZones) {
      return timeZones.map(timeZone => {
        return {
          id: timeZone.code,
          value: `${timeZone.name}`
        };
      });
    }
  
  },
  mounted() {
      this.getUserDetailsMethod();
      this.fetchUserProfilePhoto();
      this.fetchTimeZones();
    },
    computed: {
      
    }
}
</script>
  