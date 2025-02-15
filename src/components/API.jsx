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
  try {
    const response = await api.post(`/${endpoint}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Server Response:", response); // Log the response
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

export const updateData = async (endpoint, id, data) => {
  try {
    const response = await api.put(`/${endpoint}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure correct content type
        Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add authorization header if required
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

export const deleteData = async (endpoint, id) => {
  const response = await api.delete(`/${endpoint}/${id}`);
  return response.data;
};
