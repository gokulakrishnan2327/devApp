import api from './api';

/**
 * Set token to header
 * @param {String} token
 */
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
