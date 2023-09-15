import axios from 'axios';

// Base URL for blog API endpoint
const baseUrl = '/api/blogs';

// Token for authentication (initially set to null)
let token = null;

// Set the token for future API requests
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Fetch all blogs from the API
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

// Create a new blog entry in the API
const create = async (blog) => {
  const config = {
    headers: {Authorization: token}
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

// Update a blog entry in the API
const update = async (blog, blogId) => {
  const config = {
    headers: {Authorization: token}
  };
  const response = await axios.put(`${baseUrl}/${blogId}`, blog, config);
  return response.data;
};

// Remove a blog entry from the API
const remove = async (blogId) => {
  const config = {
    headers: {Authorization: token}
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { getAll, create, setToken, update, remove };
