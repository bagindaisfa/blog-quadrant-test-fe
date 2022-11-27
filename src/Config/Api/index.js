import axios from "axios";
// import { BASE_URL } from '../env/index';
export const api = {
  login,
};

const storedCreds = JSON.parse(localStorage.getItem("quadrant"));
const token = storedCreds?.token;
const BASE_URL = "http://localhost:8282/";

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

async function login(data) {
  try {
    const url = `${BASE_URL}api/auth/login`;
    const headers = defaultHeaders;
    const response = await axios({
      method: "POST",
      url,
      data,
      headers,
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
    }
    return Promise.reject(error.response);
  }
}
