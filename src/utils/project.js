// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/projectsapi/',
    // baseURL: 'http://timelog.ossiba.com/resourceapi/',
  });

//Get all list of all Users

export const getResourceList = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await instance.get('/projectsapi', {
      params: { },
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





