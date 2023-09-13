import axios from 'axios';

const baseUrl = 'https://bitter-bush-4659.fly.dev/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const remove = (_id) => {
    return axios.delete(`${baseUrl}/${_id}`);
  };

  const update = (_id, updatedPerson) => {
    return axios.put(`${baseUrl}/${_id}`, updatedPerson);
};

  export default { getAll, create, remove, update};
