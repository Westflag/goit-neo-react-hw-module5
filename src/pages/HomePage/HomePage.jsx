import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import tmdbApi from "../../api/tmdbApi.js";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.getTrendingMovies();
                setMovies(response.data.results || []);
            } catch (err) {
                setError('Failed to fetch trending movies.');
            } finally {
                setLoading(false);
            }
        };

        void fetchTrending();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Trending today</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    );
}