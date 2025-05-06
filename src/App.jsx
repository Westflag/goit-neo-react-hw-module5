import {useEffect, useState} from 'react';
import Description from './components/description/Description';
import Options from './components/options/Options';
import Feedback from './components/feedback/Feedback';
import Notification from './components/notification/Notification';

const FEEDBACK_STORAGE_KEY = 'feedbackData';

const App = () => {
    const [feedback, setFeedback] = useState(() => {
        const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {good: 0, neutral: 0, bad: 0};
    });

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
    const positiveFeedback = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;

    const updateFeedback = (feedbackType) => {
        setFeedback(prev => ({
            ...prev,
            [feedbackType]: prev[feedbackType] + 1,
        }));
    };

    const resetFeedback = () => {
        setFeedback({good: 0, neutral: 0, bad: 0});
    };

    useEffect(() => {
        localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedback));
    }, [feedback]);

    return (
        <div className="app">
            <Description
                title="Sip Happens Café"
                message="Please leave your feedback about our service by selecting one of the options below."
            />

            <Options
                options={['good', 'neutral', 'bad']}
                onLeaveFeedback={updateFeedback}
                onReset={resetFeedback}
                showReset={totalFeedback > 0}
            />

            {totalFeedback > 0 ? (
                <Feedback
                    feedback={feedback}
                    totalFeedback={totalFeedback}
                    positiveFeedback={positiveFeedback}
                />
            ) : (
                <Notification message="No feedback yet"/>
            )}
        </div>
    );
};

export default App;
