import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import tmdbApi from "../../api/tmdbApi.js";
import styles from './MovieReviews.module.css';

export default function MovieReviews() {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const response = await tmdbApi.getMovieReviews(movieId);
                setReviews(response.data.results || []);
            } catch (err) {
                setError('Failed to fetch reviews.');
            } finally {
                setLoading(false);
            }
        }

        void fetchReviews();
    }, [movieId]);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;
    if (reviews.length === 0) return <p>We don't have any reviews for this movie.</p>;

    return (
        <ul className={styles.reviewList}>
            {reviews.map(review => (
                <li key={review.id} className={styles.reviewItem}>
                    <p className={styles.reviewAuthor}>Author: {review.author}</p>
                    <p className={styles.reviewContent}>{review.content}</p>
                </li>
            ))}
        </ul>
    );
}
