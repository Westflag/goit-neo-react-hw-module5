import PropTypes from 'prop-types';

const Feedback = ({feedback, totalFeedback, positiveFeedback}) => {
    const {good, neutral, bad} = feedback;

    return (
        <div className="feedback">
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>Total: {totalFeedback}</p>
            <p>Positive: {positiveFeedback}%</p>
        </div>
    );
};

Feedback.propTypes = {
    feedback: PropTypes.shape({
        good: PropTypes.number.isRequired,
        neutral: PropTypes.number.isRequired,
        bad: PropTypes.number.isRequired,
    }).isRequired,
    totalFeedback: PropTypes.number, // використовується для умов, якщо треба
    positiveFeedback: PropTypes.number,

};

export default Feedback;
