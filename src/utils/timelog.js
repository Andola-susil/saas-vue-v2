// src/utils/timelog.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  baseURL: 'http://timelog.ossiba.com/',
  // baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/logtimesapi/',
  // baseURL: 'http://ossiba.com:8084/v1/',
  timeout: 1000, // Set a timeout for requests
});

const time_sheet_instance = axios.create({
  baseURL: 'http://timelog.ossiba.com/timesheetdetailsapi/',
  // baseURL: 'http://ossiba.com:8085/timesheetdetailsapi/',
  timeout: 1000, // Set a timeout for requests
});

const time_sheet_fetch_instance = axios.create({
  // baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/timesheetsapi/',
  baseURL: 'http://timelog.ossiba.com/timesheetsapi/',
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

  // Submit time sheet
export const submitTimeSheet = async (time_log) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await time_sheet_instance.post('/timesheetdetails/', time_log, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id ': '171',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get time sheet details by id
export const getTimeSheet = async (time_log_id) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await time_sheet_instance.get(`/timesheetdetails/${time_log_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': '171',
      }
    });
    return response.data; // return the response data
  } catch (error) {
    throw error;
  }
};

export const getWeekTimeSheetForWeek = async (week_number) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    const response = await time_sheet_fetch_instance.get('/timesheets/', {
      params: { 'week_number': week_number },
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': '171',
      }
    });
    
    return response.data; // return the response data
  } catch (error) {
    throw error;
  }
};




export const reviewTimeSheet = async (id, status,reason) => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await time_sheet_fetch_instance.get(`/timesheets/${id}`, {
      params: { status: status,rejection_reason: reason}, 
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

//Get all timesheets
export const getAllTimeSheets = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await time_sheet_fetch_instance.get(`/timesheets/`, {
      params: {  }, 
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