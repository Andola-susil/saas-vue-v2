// src/utils/api.js
import axios from 'axios';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  // baseURL: 'https://osbaseleaf-api.andolasoft.co.in/v1/',
  baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});

const time_instance = axios.create({
  // baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/logtimesapi/',
  baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});

const resource_instance = axios.create({
  // baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/resourceapi/',
  baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});
// Define functions for making API requests


//SignIn API

export const loginUser = async (username, password) => {
  try {
    const response = await instance.post('auth/jwt/login', {username,password,},
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//SignUp API

export const createUser = async (user_data) => {
  try {
    const response = await instance.post('auth/register', user_data,
    {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//LogOut API

export const signOut = async (user_data) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await instance.post('auth/jwt/logout', {}, {
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


//Get Time logs

export const getAllTimeLogs = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await time_instance.get('/log_times/', {
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

// You can define more API functions here


//Get all list of all Users

export const getResourceList = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await resource_instance.get('/resources/', {
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
