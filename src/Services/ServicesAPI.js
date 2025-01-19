import axios from 'axios';
import endpoints from '../Config/EndpointAPI';
import { getSecureData } from '../Utils/Protect';

const userData = getSecureData()

const api = axios.create({
  // baseURL: endpoints, // Ganti jika ingin menggunakan base URL di sini
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'access_token' : userData?.access_token??''
  },
});

export const loginService = async (email, password) => {
  try {
    const req = { email, password };
    console.debug('[REQUEST LOGIN]', req)

    const response = await api.post(endpoints.login, req);
    
    console.debug('[RESPONSE LOGIN]', response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const registerService = async (fullName, username, email, phoneNumber, birthDate, password) => {
  try {
    const req = { fullName, username, email, phoneNumber, birthDate, password };
    console.debug('[REQUEST REGISTER]', req)

    const response = await api.post(endpoints.register, req);
    
    console.debug('[RESPONSE REGISTER]', response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error during REGISTER:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const getUserService = async (index, limit) => {
  try {
    const req = { index, limit };
    console.debug('[REQUEST getUserService]', req)

    const response = await api.get(endpoints.getUser, req);
    
    console.debug('[RESPONSE getUserService]', response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error during getUserService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};
export const getUserDetailService = async (id) => {
  try {
    const req = { };
    console.debug('[REQUEST getUserDetailService]', req)

    const response = await api.get(`${endpoints.getUserDetail}${id}`, req);
    
    console.debug('[RESPONSE getUserDetailService]', response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error during getUserDetailService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};