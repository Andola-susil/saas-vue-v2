// src/utils/api.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const auth_instance = axios.create({
  baseURL: 'https://osbaseleaf-api.andolasoft.co.in/v1/',
  // baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});





//SignIn API

export const loginUser = async (username, password) => {
  try {
    const response = await auth_instance.post('auth/jwt/login', {username,password},
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
    const response = await auth_instance.post('auth/register', user_data,
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
    const response = await auth_instance.post('auth/jwt/logout', {}, {
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