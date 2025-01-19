const API_BASE_URL = 'https://pilar-budaya.vercel.app'; 

const endpoints = {
  login: `${API_BASE_URL}/user/login`,
  register: `${API_BASE_URL}/user/register`,
  getUser: `${API_BASE_URL}/user`,
  getUserDetail: `${API_BASE_URL}/user/`,
};

export default endpoints;