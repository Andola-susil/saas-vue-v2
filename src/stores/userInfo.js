// import { defineStore } from 'pinia';

// export const userInfo = defineStore('main', {
//   state: () => ({
//     count: 0,
//     current_page: '',
//     name: 'Pinia Store',
//     accessToken: '',
//     layout: '',
//     is_admin: false,
//     is_approver: false,
//     is_resource: false,
//     tenant_id: '',
//     user_name: '',
//     resource_id : '',
//     profile_image : '',
//     user_type : '',
//   }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++;
//     },
//     updateUserInfo(data){
//       // console.log(data);
//       this.accessToken = data.accessToken;
//       this.layout = data.layout;
//       this.is_admin = data.is_admin;
//       this.is_approver = data.is_approver;
//       this.is_resource = data.is_resource;
//       this.tenant_id = data.tenant_id;
//       this.user_name = data.user_name;
//       this.resource_id = data.resource_id;
//       this.profile_image = data.profile_image;
//       this.user_type = data.user_type;
//     },
//   },
// });
