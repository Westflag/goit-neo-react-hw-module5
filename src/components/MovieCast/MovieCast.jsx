import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styles from './MovieCast.module.css';
import tmdbApi from "../../api/tmdbApi.js";

export default function MovieCast() {
    const {movieId} = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCast = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.getMovieCast(movieId);
                setCast(response.data.cast || []);
            } catch (err) {
                setError('Failed to fetch cast information.');
            } finally {
                setLoading(false);
            }
        }

        void fetchCast();
    }, [movieId]);

    if (loading) return <p>Loading cast...</p>;
    if (error) return <p>{error}</p>;
    if (cast.length === 0) return <p>No cast information available.</p>;

    return (
        <ul className={styles.castList}>
            {cast.map(actor => (
                <li key={actor.cast_id} className={styles.castItem}>
                    {actor.profile_path && (
                        <img
                            className={styles.castImage}
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                        />
                    )}
                    <p className={styles.castName}>{actor.name}</p>
                    <p className={styles.castCharacter}>Character: {actor.character}</p>
                </li>
            ))}
        </ul>
    );
}