import axios from 'axios';
import { warn } from 'vue';

// Create an instance of axios with custom configurations if needed
const instance = axios.create({
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/tenantholidaysapi/',
   
}); 
const get_instance = axios.create({
  baseURL: 'https://osbaseleaf-timelog.andolasoft.co.in/workhoursapi/',
   
});  

export const addHolidayList = async (holidayData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await instance.post( 'company_holidays/',holidayData,{
        params: {},
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
export const getHolidayList = async ( ) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await instance.get( 'company_holidays/',{
        params: {
            page: 1,
            size: 50,
            get_all: false
          },
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
export const deleteHolidayList = async (id ) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await instance.delete( `company_holidays/${id}`,{
        params: {},
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

  export const addWorkHourList = async (workingHourData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await get_instance.post( 'work_hours/',workingHourData,{
        params: {},
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


  export const getWorkingHourList = async ( ) => {
    try {
      const token = localStorage.getItem('accessToken');
      const tenant_id = localStorage.getItem('tenant_id');
  
      const response = await get_instance.get( 'work_hours/',{
        params: {
            page: 1,
            size: 50,
            get_all: false
          },
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