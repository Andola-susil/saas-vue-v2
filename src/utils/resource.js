// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/resourceapi/',
    // baseURL: 'http://ossiba.com:8084/v1/',
    timeout: 1000, // Set a timeout for requests
  });

//Get all list of all Users

export const getResourceList = async (page) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await resource_instance.get('/resources', {
        params: { 'x-tenant-id': page },
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