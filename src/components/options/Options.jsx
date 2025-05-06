import PropTypes from 'prop-types';

const Options = ({ options, onLeaveFeedback, onReset, showReset }) => (
    <div className="options">
        {options.map(option => (
            <button key={String(option)} onClick={() => onLeaveFeedback(option)}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
        ))}
        {showReset && <button onClick={onReset}>Reset</button>}
    </div>
);

Options.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLeaveFeedback: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    showReset: PropTypes.bool.isRequired,
};

export default Options;
