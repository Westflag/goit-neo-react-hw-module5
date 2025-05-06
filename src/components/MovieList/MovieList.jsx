import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul className={styles.movieList}>
            {movies.map(movie => (
                <li key={movie.id} className={styles.movieItem}>
                    <Link
                        to={`/movies/${movie.id}`}
                        state={{ from: location }}
                        className={styles.movieLink}
                    >
                        {movie.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}