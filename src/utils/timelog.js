// src/utils/timelog.js
import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  // baseURL: 'http://timelog.ossiba.com/',
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/logtimesapi/',
  // baseURL: 'http://ossiba.com:8084/v1/',
});

const time_sheet_instance = axios.create({
  // baseURL: 'http://timelog.ossiba.com/timesheetdetailsapi/',
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/timesheetdetailsapi/',
  // baseURL: 'http://ossiba.com:8085/timesheetdetailsapi/',
});

const time_sheet_fetch_instance = axios.create({
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/timesheetsapi/',
  // baseURL: 'http://timelog.ossiba.com/timesheetsapi/',
});

const line_item_instance = axios.create({
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/timesheetlineitemsapi/',
  // baseURL: 'http://timelog.ossiba.com/timesheetsapi/',
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
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await time_sheet_instance.post('/timesheetdetails/', time_log, {
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

  // Update time sheet
  export const UpdateTimeSheet = async (time_log_id,time_log) => {
    try {
      // console.log(time_log_id);
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
      
      const response = await time_sheet_instance.put(`/timesheetdetails/${time_log_id}`, time_log, {
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
// Get time sheet details by id
export const getTimeSheet = async (time_log_id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await time_sheet_instance.get(`/timesheetdetails/${time_log_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': tenant_id,
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
    const tenant_id = localStorage.getItem('tenant_id');
    
    const response = await time_sheet_fetch_instance.get('/timesheets/', {
      params: { 'week_number': week_number },
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-tenant-id': tenant_id,
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
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await time_sheet_fetch_instance.put(`/timesheets/${id}`,{ status: status,rejection_reason: reason},{
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

//Get all timesheets
export const getAllTimeSheets = async (page,week_number,status,resource_id,sortBy, sortDirection) => {
  // console.log(page,week_number,status,resource_id,sortBy,sortDirection); return false;
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await time_sheet_fetch_instance.get(`/timesheets/`, {
      params: { 'week_number' : week_number ,'resource_id' : resource_id, 'status' : status,'sort_by': sortBy,
        'sort_direction': sortDirection,'page':page}, 
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

//Save daily time sheet
export const saveTimelog = async (data) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await instance.post(`/log_times/`,data, {
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
//Get all today time logs
export const fetchTodayTimeLogs = async (page) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    const time_log_date = new Date().toISOString().slice(0, 10);
    const response = await instance.get(`/log_times/`, {
      params: { 'order_by' :'-id','time_log_date': time_log_date,'page':page}, 
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

//Delete logged time
export const deleteTimeLogs = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');
    const response = await instance.delete(`/log_times/${id}`, {
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

//Update timelog
export const updateTimelogs = async (data,id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await instance.put(`/log_times/${id}`,data, {
      params: {}, 
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-tenant-id': tenant_id,
      }
    });

    return response.data; 
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Review line items
export const reviewTimeSheetLineItems = async (data,id) => {
  try {
    const token = localStorage.getItem('accessToken');
    const tenant_id = localStorage.getItem('tenant_id');

    const response = await line_item_instance.put(`/timesheet_line_items/${id}`,data,{
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