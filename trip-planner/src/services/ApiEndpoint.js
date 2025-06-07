import axios from 'axios'



const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
      ? 'https://backend-stlp.onrender.com'
      : 'http://localhost:5000',
  headers: {
      'Content-Type': 'application/json',
  },
  withCredentials: true,
});



export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const deleteRequest = (url, body) => {
  return axios.delete(url, {
    data: body, // ⬅️ Axios sends DELETE body here!
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log('intercpert response : ',response)
    return response;
  }, function (error) {
    console.log('intercpert response : ',error)
    return Promise.reject(error);
  });