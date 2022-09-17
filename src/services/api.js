import axios  from "axios";
// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=ab10b4e08d6019fc4fadddf3ef40951a&language=pt-BT

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;