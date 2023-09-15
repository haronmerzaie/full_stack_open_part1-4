import axios from "axios";

// Base URL for the login API endpoint
const baseUrl = '/api/login';

// Login function that sends the credentials to the API for authentication
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
