import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create Farmer
export const createFarmer = async (farmer) => {
  try {
    const response = await api.post('/api/farmers', farmer);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Update Farmer
export const updateFarmer = async (id, farmer) => {
  try {
    const response = await api.put(`/api/farmers/${id}`, farmer);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Delete Farmer
export const deleteFarmer = async (id) => {
  try {
    await api.delete(`/api/farmers/${id}`);
    return { success: true }; // Return a success indicator
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Farmer by ID
export const getFarmerById = async (id) => {
  try {
    const response = await api.get(`/api/farmers/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Farmers by Admin ID
export const getFarmersByAdminId = async (adminId) => {
  try {
    const response = await api.get(`/api/farmers/admin/${adminId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Create Flight
export const createFlight = async (flight) => {
  try {
    const response = await api.post('/api/flights', flight);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Flight by ID
export const getFlightById = async (id) => {
  try {
    const response = await api.get(`/api/flights/${id}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Flights by Farmer ID
export const getFlightsByFarmerId = async (farmerId) => {
  try {
    const response = await api.get(`/api/flights/farmer/${farmerId}`);
    console.log(response.data)
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Flights by Admin ID
export const getFlightsByAdminId = async (adminId) => {
  try {
    const response = await api.get(`/api/flights/admin/${adminId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Get Dashboard Stats
export const getDashboardStats = async (farmerId) => {
  try {
    const response = await api.get(`/api/dashboard/farmer/${farmerId}`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

