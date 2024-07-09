// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/projectsapi/',
    // baseURL: 'http://timelog.ossiba.com/resourceapi/',
  });

//Get all list of all Users

export const getProjectList = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await instance.get('/projects/', {
      params: {'order_by' : '-id' },
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

export const createProject = async (project_name) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    const start_date = new Date().toISOString().slice(0, 10);
    const project_info = {
      "project_name": project_name,
      "project_type": "w",
      "project_priority": "low",
      "project_status": "started",
      "project_code": "",
      "project_description": "",
      "start_date": start_date
    }
    const response = await instance.post('/projects/',project_info, {
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





