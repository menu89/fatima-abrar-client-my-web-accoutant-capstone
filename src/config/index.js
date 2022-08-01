// TODO update the urls to match your deployed heroku app and local development port

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://my-web-accountant-server.herokuapp.com/api'
    : process.env.REACT_APP_AXIOSURL;
