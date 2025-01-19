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

export const uploadBuktiService = async (userId, paymentPeriod, paymentProof) => {
  try {
    if (!Array.isArray(paymentProof) || !paymentProof[0] || !(paymentProof[0] instanceof File)) {
      throw new Error('paymentProof must be an array containing a valid File object.');
    }

    const file = paymentProof[0];
    const formData = new FormData();    

    formData.append('userId', userId);
    formData.append('paymentPeriod', paymentPeriod);
    formData.append('paymentProof', file, file.name || 'file.png');

    console.debug('[REQUEST uploadBuktiService]', {
      userId,
      paymentPeriod,
      paymentProof: file,
    });

    const response = await api.post(endpoints.uploadBukti, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access_token': userData?.access_token ?? '',
      },
    });

    console.debug('[RESPONSE uploadBuktiService]', response.data);

    return response.data;
  } catch (error) {
    console.error('Error during uploadBuktiService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const getAllContentService = async () => {
  try {
    const req = {};
    console.debug('[REQUEST getAllContentService]', req)

    const response = await api.get(endpoints.getAllContent, req);
    
    console.debug('[RESPONSE getAllContentService]', response.data)
    
    return response.data;
  } catch (error) {
    console.error('Error during getAllContentService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const uploadContentService = async (content, page, caption, paymentProof) => {
  try {
    if (!Array.isArray(paymentProof) || !paymentProof[0] || !(paymentProof[0] instanceof File)) {
      throw new Error('Banner must be an array containing a valid File object.');
    }

    const file = paymentProof[0];
    const formData = new FormData();    

    formData.append('contentName', content);
    formData.append('page', page);
    formData.append('caption', caption);
    formData.append('paymentProof', file, file.name || 'file.png');

    console.debug('[REQUEST uploadContentService]', {
      content,
      page,
      caption,
      paymentProof: file,
    });

    const response = await api.post(endpoints.uploadContent, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'access_token': userData?.access_token ?? '',
      },
    });

    console.debug('[RESPONSE uploadContentService]', response.data);

    return response.data;
  } catch (error) {
    console.error('Error during uploadContentService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const deleteContentService = async (id) => {
  try {
    const req = { };
    console.debug('[REQUEST deleteContentService]', req)

    const response = await api.delete(`${endpoints.deleteContent}${id}`, req);
    
    console.debug('[RESPONSE deleteContentService]', response.data)
  
    return response.data;
  } catch (error) {
    console.error('Error during deleteContentService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const getGalleryService = async () => {
  try {
    const req = { };
    console.debug('[REQUEST getGalleryService]', req)

    const response = await api.get(`${endpoints.galleryContent}`, req);
    
    console.debug('[RESPONSE getGalleryService]', response.data)
  
    return response.data;
  } catch (error) {
    console.error('Error during getGalleryService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};

export const getPelatihService = async () => {
  try {
    const req = { };
    console.debug('[REQUEST getPelatihService]', req)

    const response = await api.get(`${endpoints.pelatihContent}`, req);
    
    console.debug('[RESPONSE getPelatihService]', response.data)
  
    return response.data;
  } catch (error) {
    console.error('Error during getPelatihService:', error.response || error);
    throw error.response ? error.response.data : error;
  }
};