import {axios} from "../Redux/action";

export async function loginApi(email, password) {
  return axios.post("/auth/login", {
    email,
    password,
  });
}

export async function registerApi(email, password) {
  return axios.post("/auth/register", {
    email,
    password,
  });
}

export async function googleApi(response) {
    return axios.post('/auth/googlelogin',{token:response.credential})
  }

export async function getLoggedInUser() {
  return axios.get(`/auth/loggedInUser`);
}

export async function getUser(userId) {
  return axios.get(`/user/${userId}`);
}