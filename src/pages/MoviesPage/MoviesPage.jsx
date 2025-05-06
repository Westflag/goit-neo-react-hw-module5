import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import styles from './MoviesPage.module.css';
import tmdbApi from "../../api/tmdbApi.js";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.searchMovies(query);
                setMovies(response.data.results || []);
            } catch (err) {
                setError('Failed to fetch search results.');
            } finally {
                setLoading(false);
            }
        };

        void fetchSearchResults();
    }, [query]);

    function handleSubmit(e) {
        e.preventDefault();
        const value = e.target.elements.query.value.trim();
        if (value) setSearchParams({query: value});
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="query"
                    defaultValue={query}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies}/>}
        </div>
    );
}