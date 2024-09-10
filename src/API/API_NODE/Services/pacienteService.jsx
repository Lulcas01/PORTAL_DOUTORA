import axios from 'axios';
const API_BASE_URL = 'http://localhost:3006/api/pacientes';


export const pacienteService = {
  getAll: async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
  },
  updateById: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  },
  deleteById: async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  }
};
