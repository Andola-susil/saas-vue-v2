// src/utils/tenants.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/tenantsapi/',
    // baseURL: 'http://baseleaf.ossiba.com/tenantsapi/',
    // baseURL: 'http://ossiba.com:8084/v1/',
  });

//Get Time logs

export const getSubscription = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/tenants/subscription', {
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

export const getActiveUser = async (id,user_id ,data) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.patch(`/tenants/${id}/users/${user_id }`,data, {
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