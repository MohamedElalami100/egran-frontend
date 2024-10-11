import getCookie from '@/utils/getCookie';
import axios from 'axios';

// Axios instance
const api = axios.create({
  baseURL: 'https://cjn59lwn16.execute-api.eu-west-3.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const accessToken = getCookie("access_token"); // Implement getCookie function to read cookies
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const authenticateUser = async (username, password) => {
  try {
    const response = await api.post('/auth/authenticate', {
      username,
      password,
    });
    return response.data; // Return the response data containing JWT tokens
  } catch (error) {
    console.error("Authentication error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

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
    throw error;
    // Rethrow the error to be handled by the caller
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

// Get Flights by Admin ID
export const getFlightsInProgressByAdminId = async (adminId) => {
  try {
    const response = await api.get(`/api/flights/admin/${adminId}/InProgress`);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getdDronesByAdminId = async (adminId) => {
  try {
    const response = await api.get(`/api/drones/admin/${adminId}`);
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

// Function to check drone connection
export const checkDroneConnection = async (flightId) => {
  try {
    const response = await api.get(`/api/flights/checkConnexion/${flightId}`);
    return response.data; // Assuming the response is a boolean
  } catch (error) {
    console.error("Error checking drone connection:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// Function to delete a flight by ID
export const deleteFlight = async (flightId) => {
  try {
    await api.delete(`/api/flights/${flightId}`);
    console.log(`Flight with ID ${flightId} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete flight with ID ${flightId}:`, error);
    throw error;
  }
};

// Function to cancel a flight by ID
export const cancelFlight = async (flightId) => {
  try {
    await api.put(`/api/flights/${flightId}/cancel`);
    console.log(`Flight with ID ${flightId} canceled successfully.`);
  } catch (error) {
    console.error(`Failed to cancel flight with ID ${flightId}:`, error);
    throw error;
  }
};