// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    // baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/resourceapi/',
    baseURL: 'http://timelog.ossiba.com/resourceapi/',
    timeout: 1000, // Set a timeout for requests
  });

//Get all list of all Users

export const getResourceList = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await instance.get('/resources', {
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

export const getResourceInfoById = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await instance.get(`/resources/${id}`, {
      params: {},
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': '171',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
