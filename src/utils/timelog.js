// src/utils/timelog.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/logtimesapi/',
  // baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});

//Get Time logs

export const getAllTimeLogs = async (page) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await instance.get('/log_times/', {
        params: { page: page },
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };