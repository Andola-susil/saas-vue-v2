// src/utils/resource.js
import axios from 'axios';
import { warn } from 'vue';

const instance = axios.create({
    baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/resourceapi/',
    // baseURL: 'http://timelog.ossiba.com/resourceapi/',
  });
const instance_type = axios.create({
    baseURL: 'https://osbaseleaf-api.andolasoft.co.in/userInvitationsapi/',
    // baseURL: 'http://timelog.ossiba.com/resourceapi/',
  });

//Get all list of all Users

export const getResourceList = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await instance.get('/resources', {
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

export const getResourceInfoById = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await instance.get(`/resources/${id}`, {
      params: {},
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': tenant_id,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getResourceInfo = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await instance_type.get( '/user_invitations/',{
      params: { page, size: 50, get_all: false },
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': tenant_id,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
