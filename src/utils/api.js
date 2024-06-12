// src/utils/api.js
import axios from 'axios';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  baseURL: 'https://osbaseleaf-api.andolasoft.co.in/v1/',
  timeout: 5000, // Set a timeout for requests
});

// Define functions for making API requests
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

// You can define more API functions here
