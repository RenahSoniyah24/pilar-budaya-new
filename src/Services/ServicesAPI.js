import axios from 'axios';
import endpoints from '../Config/EndpointAPI';

const api = axios.create({
  // baseURL: endpoints, // Ganti jika ingin menggunakan base URL di sini
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginService = async (email, password) => {
  try {
    const req = { email, password };
    console.debug('[REQUEST LOGIN]', req)

    const response = await api.post(endpoints.login, req);
    
    console.debug('[RESPONSE LOGIN]', response)
    
    return response;
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
    
    console.debug('[RESPONSE REGISTER]', response)
    
    return response;
  } catch (error) {
    console.error('Error during REGISTER:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};