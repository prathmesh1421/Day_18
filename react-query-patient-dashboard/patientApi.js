import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

const fetchPatients = async () => {
  const res = await API.get("/users");
  return res.data;
};

export default fetchPatients;
