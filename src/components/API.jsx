import axios from "axios";

const API_BASE_URL = "https://realauto.limsa.uz/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const fetchData = async (endpoint) => {
  const response = await api.get(`/${endpoint}`);
  return response.data.data;
};

export const createData = async (endpoint, data) => {
  const response = await api.post(`/${endpoint}`, data);
  return response.data;
};

export const updateData = async (endpoint, id, data) => {
  const response = await api.put(`/${endpoint}/${id}`, data);
  return response.data;
};

export const deleteData = async (endpoint, id) => {
  const response = await api.delete(`/${endpoint}/${id}`);
  return response.data;
};
