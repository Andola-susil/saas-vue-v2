// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/tasksapi/',
    // baseURL: 'http://timelog.ossiba.com/resourceapi/',
  });

//Get all list of all Users

export const geTaskList = async (project_id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await instance.get('/tasks/', {
      params: {'project_id': project_id },
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

export const createTask = async (task_name, project_id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const task_info = {
        project_id : project_id,
        task_priority : "low",
        task_state : "todo",
        task_title :  task_name,
        task_type : "development"
      };
      const response = await instance.post('/tasks/',task_info, {
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




