import axios from 'axios';
// const https = require('https');

// // Create an HTTPS agent to ignore certificate warnings
// const agent = new https.Agent({  
//   rejectUnauthorized: false // Ignore SSL certificate errors
// });

// Axios instance
const api = axios.create({
  baseURL: 'https://ec2-35-181-166-82.eu-west-3.compute.amazonaws.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // rejectUnauthorized: false,//add when working with https sites
  // requestCert: false,//add when working with https sites
  // agent: false,//add when working with https sites
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