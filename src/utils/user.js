// src/utils/user.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://baseleaf.ossiba.com/usersapi/',
    // baseURL: 'https://osbaseleaf-api.andolasoft.co.in/usersapi/',
    // baseURL: 'http://ossiba.com:8084/v1/',
    timeout: 1000, // Set a timeout for requests
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