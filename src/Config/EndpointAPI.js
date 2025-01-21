const API_BASE_URL = 'https://pilar-budaya-phi.vercel.app'; 

const endpoints = {
  login: `${API_BASE_URL}/user/login`,
  register: `${API_BASE_URL}/user/register`,
  getUser: `${API_BASE_URL}/user`,
  getUserDetail: `${API_BASE_URL}/user/`,
  uploadBukti: `${API_BASE_URL}/payment/upload-payment`,
  verifikasi: `${API_BASE_URL}/payment/`,
  getAllContent: `${API_BASE_URL}/content/allContent`,
  uploadContent: `${API_BASE_URL}/content/postContent`,
  deleteContent: `${API_BASE_URL}/content/deleteContent/`,
  galleryContent: `${API_BASE_URL}/content/gallery`,
  pelatihContent: `${API_BASE_URL}/content/pelatih`,
  dataGraph: `${API_BASE_URL}/payment/dataPendaftar`,
};

export default endpoints;