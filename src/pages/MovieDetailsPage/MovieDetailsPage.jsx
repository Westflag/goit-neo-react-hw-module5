import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, Outlet, NavLink } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import tmdbApi from "../../api/tmdbApi.js";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from || '/movies');
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.getMovieDetails(movieId);
                setMovie(response.data);
            } catch (err) {
                setError('Failed to fetch movie details.');
            } finally {
                setLoading(false);
            }
        };

        void fetchDetails();
    }, [movieId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!movie) return null;

    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

    return (
        <div className={styles.container}>
            <Link to={backLinkRef.current} className={styles.backLink}>← Go back</Link>
            <div className={styles.details}>
                {poster && <img className={styles.poster} src={poster} alt={movie.title} />}
                <div className={styles.info}>
                    <h2 className={styles.title}>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
                    <p className={styles.score}>User Score: {Math.round(movie.vote_average * 10)}%</p>
                    <h3 className={styles.sectionTitle}>Overview</h3>
                    <p className={styles.overview}>{movie.overview}</p>
                    <h3 className={styles.sectionTitle}>Genres</h3>
                    <p className={styles.genres}>{movie.genres.map(g => g.name).join(', ')}</p>
                </div>
            </div>
            <h4 className={styles.sectionTitle}>Additional information</h4>
            <ul className={styles.navLinks}>
                <li>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <Outlet />
        </div>
    );
}