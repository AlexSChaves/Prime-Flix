import axios from 'axios';
//Base da URL: https://api.themoviedb.org/3/

//https://api.themoviedb.org/3/movie/now_playing?api_key=7bccd66228dec4291aa036eae9d00ee9&language=pt-BR

const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3/',
});

export default api;
