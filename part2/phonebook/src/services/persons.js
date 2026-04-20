import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const add = (personObj) => {
  return axios.post(baseUrl, personObj).then((response) => response.data);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, personObj) => {
  return axios.put(`${baseUrl}/${id}`, personObj).then((response) => response.data);
};

export default { getAll, add, del, update };
