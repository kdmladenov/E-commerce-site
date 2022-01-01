import React from 'react';
import './styles/QuestionsAndAnswersScreen.css';
import QuestionsAndAnswers from '../components/QuestionsAndAnswers';

const QuestionsAndAnswersScreen = ({ match }) => {
  return (
    <div className="questions_and_answers_screen">
      <div className="questions_and_answers_container">
        <QuestionsAndAnswers match={match} isScreen={true} />
      </div>
    </div>
  );
};

export default QuestionsAndAnswersScreen;
