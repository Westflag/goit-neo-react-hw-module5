import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOGRmYThkYTIxN2JiZDJjOTczMzE5YzBiOWVhMDk2OCIsIm5iZiI6MTc0MTE4Mzk0MC42ODk5OTk4LCJzdWIiOiI2N2M4NWJjNDgyMWMxOWI1ZWJlNmZmZjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.GsqGQvJuhs5fBajX4pVoShouuBpYtTSxZm70OY12-s4'; // 🔒
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
    },
});

const tmdbApi = {
    getTrendingMovies: () => axiosInstance.get('/trending/movie/day'),
    searchMovies: query => axiosInstance.get('/search/movie', { params: { query, include_adult: false, language: 'en-US', page: 1 } }),
    getMovieDetails: id => axiosInstance.get(`/movie/${id}`, { params: { language: 'en-US' } }),
    getMovieCast: id => axiosInstance.get(`/movie/${id}/credits`, { params: { language: 'en-US' } }),
    getMovieReviews: id => axiosInstance.get(`/movie/${id}/reviews`, { params: { language: 'en-US', page: 1 } }),
};

export default tmdbApi;