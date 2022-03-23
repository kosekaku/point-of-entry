import axios from 'axios';
import {toast} from 'react-toastify';


// handle unexpected errors globally using axios interceptors
axios.interceptors.response.use(null, error => {
  const expectedErrors = error.response && error.response.status>=400 && error.response.status<500;
  if(expectedErrors){
    toast.error(error.response.data.error );
  } 
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

