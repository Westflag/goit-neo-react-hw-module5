import PropTypes from 'prop-types';

const Description = ({ title, message }) => (
    <div className="description">
        <h1>{title}</h1>
        <p>{message}</p>
    </div>
);

Description.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default Description;
