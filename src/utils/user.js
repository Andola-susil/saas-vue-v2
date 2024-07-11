// src/utils/user.js
import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://baseleaf.ossiba.com/usersapi/',
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/usersapi/',
    // baseURL: 'http://ossiba.com:8084/v1/',
  });

const file_instance = axios.create({
    // baseURL: 'http://baseleaf.ossiba.com/usersapi/',
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/filemetasapi/',
    // baseURL: 'http://ossiba.com:8084/v1/',
  });
const time_log_instance = axios.create({
  // baseURL: 'http://baseleaf.ossiba.com/usersapi/',
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/usersapi/',
  // baseURL: 'http://ossiba.com:8084/v1/',
});
  
//Get all tenantslist of all Users

export const getTenantsList = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/users/tenants', {
        params: { 'page': 1, 'size': 50, 'get_all': false},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  //Get current tenant info
  
  export const getCurrentTenant = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/users/tenant', {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-tenant-id': tenant_id,
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  //Get current tenant info
  
  export const getUserProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/users/profile', {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const getUserDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/users/profile', {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const uploadProfileImage = async (profileImage) => {
    try {
      const token = localStorage.getItem('accessToken'); 
      const formData = new FormData();
      formData.append('file', profileImage);
      const response = await instance.post('/users/profilephoto', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        }
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getUserProfilePhoto  = async (file_id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');

      const response = await file_instance.get(`/files/${file_id}/`, {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  
  export const updateUserDetails = async (user_data) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.put('/users/profile',user_data, {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getTimeZone = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/users/timezones', {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const createResourceInfo = async (resourceData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await time_log_instance.post( 'users/invite',resourceData,{
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-tenant-id': tenant_id,
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getUserRoles = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/users/role', {
        params: {},
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  