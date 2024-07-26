// src/utils/timelog.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  // baseURL: 'http://timelog.ossiba.com/',
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/analyticsapi/',
  // baseURL: 'http://ossiba.com:8084/v1/',
});


//Get BillableHours

export const getBillableHours = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/billable_hours', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Ot

export const getTotalOt = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/ot_calculation', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Time Spent

export const getTotalSpentTime = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/total_time_spent', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Timesheet approval status

export const getTimeSheetApprovalStatus = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/timesheet_status', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Timesheet overview

export const getTimeSheetOverView = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/timesheet_data', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Project overview

export const getProjectOverView = async (start_date, end_date) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      const response = await instance.get('/analytics/project_overview', {
        params: { 'start_date': start_date, 'end_date' : end_date },
        headers: {
            'Authorization': `Bearer ${token}`,
            'x-tenant-id': tenant_id
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

//Get Total Project overview

export const getDailyWorkHours = async (start_date, end_date) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    const response = await instance.get('/analytics/average_daily_work_hours', {
      params: { 'start_date': start_date, 'end_date' : end_date },
      headers: {
          'Authorization': `Bearer ${token}`,
          'x-tenant-id': tenant_id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};