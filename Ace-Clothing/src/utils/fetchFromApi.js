// let baseUrl = "http://127.0.0.1:8000/api/v1";

// async function fetchFromApi(path) {
//   const res = await fetch(`${baseUrl}/${path}`);
//   const data = await res.json();
//   return data;
// }

// export default fetchFromApi;

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.6:8000/api/v1/'

const http = axios

export default http
