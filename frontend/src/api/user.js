import {axios} from "../Redux/action";

export async function loginApi(email, password, tokenRecaptcha) {
  return axios.post("/auth/login", {
    email,
    password,
    tokenRecaptcha,
  });
}

export async function registerApi(name,email, password,username,tokenRecaptcha) {
  return axios.post("/auth/register", {
    name,
    email,
    password,
    username,
    tokenRecaptcha
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

export async function updateUser(userId, user) {
  return axios.put(`/user/${userId}`, user);
}

export async function deleteUser(userId) {
  return axios.delete(`/user/${userId}`);
}

export async function forgetPasswordApi(email, tokenRecaptcha) {
  return axios.post("/auth/forgetPassword", {
    email,
    tokenRecaptcha,
  });
}

export async function resetPasswordApi(token, password,recaptchaToken) {
  return axios.post("/auth/resetPassword", {
    token,
    password,
    recaptchaToken
  });
}

export async function checkTokenApi(token) {
  return axios.post("/auth/checkToken", {
    token,
  });
}

export async function checkAvailability(username){
  return axios.post("/auth/checkUsername", {
    username,
  })
}

export async function verifyEmailApi (token){
  return axios.post('/auth/verifyEmail',{
    token
  })
}

export async function sendVerifyEmailApi (email){
  return axios.post('/auth/sendVerifyEmail',{
    email
  })
}